import { createServer as createNodeServer } from 'node:http';
import { catalogSummary, loadCatalog } from './catalog.js';
import { composeChecklist, parseLocation } from './composition.js';

const JSON_LIMIT = 1024 * 1024;

function sendJson(response, status, payload) {
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'content-type'
  });
  response.end(JSON.stringify(payload, null, 2));
}

function publicChecklist(item) {
  const { layers, source_file, composition, ...summary } = item;
  return {
    ...summary,
    source_file,
    layer_count: layers?.length ?? 0,
    composition
  };
}

function matches(value, expected) {
  if (!expected) return true;
  return String(value ?? '').toLocaleLowerCase('en-US') === expected.toLocaleLowerCase('en-US');
}

async function readJsonBody(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (Buffer.byteLength(body) > JSON_LIMIT) {
      const error = new Error('Request body exceeds 1 MB');
      error.statusCode = 413;
      throw error;
    }
  }
  if (!body) return {};
  try {
    return JSON.parse(body);
  } catch {
    const error = new Error('Request body must be valid JSON');
    error.statusCode = 400;
    throw error;
  }
}

function checklistList(catalog, url) {
  const type = url.searchParams.get('type');
  const status = url.searchParams.get('status');
  const risk = url.searchParams.get('risk_level');
  const query = url.searchParams.get('q')?.toLocaleLowerCase('en-US');

  return catalog.checklists
    .filter((item) => matches(item.type ?? 'macro', type))
    .filter((item) => matches(item.status, status))
    .filter((item) => matches(item.risk_level, risk))
    .filter((item) => !query || `${item.id} ${item.title} ${item.description ?? ''}`.toLocaleLowerCase('en-US').includes(query))
    .map(publicChecklist);
}

function activityList(catalog, url) {
  const location = parseLocation(url.searchParams);
  const priority = url.searchParams.get('priority');
  const category = url.searchParams.get('category');
  const buildStatus = url.searchParams.get('build_status');

  return catalog.activities.filter((item) => {
    const itemLocation = item.location ?? {};
    const locationMatch = Object.entries(location).every(([key, value]) => matches(itemLocation[key], value));
    return locationMatch && matches(item.priority, priority) && matches(item.category, category) && matches(item.build_status, buildStatus);
  });
}

function routeId(pathname, prefix, suffix = '') {
  if (!pathname.startsWith(prefix) || (suffix && !pathname.endsWith(suffix))) return null;
  const end = suffix ? -suffix.length : undefined;
  const id = pathname.slice(prefix.length, end);
  return id && !id.includes('/') ? decodeURIComponent(id) : null;
}

export function createApp({ catalog = loadCatalog() } = {}) {
  return async function handler(request, response) {
    const url = new URL(request.url, 'http://localhost');

    if (request.method === 'OPTIONS') return sendJson(response, 204, {});

    try {
      if (request.method === 'GET' && url.pathname === '/api/v1/health') {
        return sendJson(response, 200, { status: 'ok', service: 'checklist-api', ...catalogSummary(catalog) });
      }

      if (request.method === 'GET' && url.pathname === '/api/v1/checklists') {
        return sendJson(response, 200, { items: checklistList(catalog, url) });
      }

      if (request.method === 'GET' && url.pathname === '/api/v1/activities') {
        return sendJson(response, 200, { items: activityList(catalog, url) });
      }

      if (request.method === 'GET' && url.pathname === '/api/v1/categories') {
        return sendJson(response, 200, { items: catalogSummary(catalog).categories });
      }

      if (request.method === 'GET' && url.pathname === '/api/v1/tags') {
        return sendJson(response, 200, { items: catalogSummary(catalog).tags });
      }

      const microId = routeId(url.pathname, '/api/v1/micro-checklists/');
      if (request.method === 'GET' && microId) {
        const micro = catalog.microById.get(microId);
        return micro
          ? sendJson(response, 200, micro)
          : sendJson(response, 404, { error: 'micro_checklist_not_found', id: microId });
      }

      const layersId = routeId(url.pathname, '/api/v1/checklists/', '/layers');
      if (request.method === 'GET' && layersId) {
        const checklist = catalog.checklistById.get(layersId);
        return checklist
          ? sendJson(response, 200, { id: checklist.id, layers: checklist.layers ?? [] })
          : sendJson(response, 404, { error: 'checklist_not_found', id: layersId });
      }

      const checklistId = routeId(url.pathname, '/api/v1/checklists/');
      if (request.method === 'GET' && checklistId) {
        const checklist = catalog.checklistById.get(checklistId);
        if (!checklist) return sendJson(response, 404, { error: 'checklist_not_found', id: checklistId });

        const expandMicro = url.searchParams.get('expand') === 'micro';
        const location = parseLocation(url.searchParams);
        const result = composeChecklist({ checklist, microById: catalog.microById, location, expandMicro });
        return sendJson(response, 200, result);
      }

      if (request.method === 'POST' && url.pathname === '/api/v1/checklists/compose') {
        const body = await readJsonBody(request);
        const checklist = catalog.checklistById.get(body.checklist_id);
        if (!body.checklist_id) return sendJson(response, 400, { error: 'checklist_id_required' });
        if (!checklist) return sendJson(response, 404, { error: 'checklist_not_found', id: body.checklist_id });

        const result = composeChecklist({
          checklist,
          microById: catalog.microById,
          location: body.location ?? {},
          context: body.context ?? {},
          expandMicro: body.expand === 'micro' || body.expand_micro === true
        });
        return sendJson(response, 200, result);
      }

      return sendJson(response, 404, { error: 'route_not_found', path: url.pathname });
    } catch (error) {
      console.error(error);
      return sendJson(response, error.statusCode ?? 500, {
        error: error.statusCode ? 'invalid_request' : 'internal_server_error',
        message: error.message
      });
    }
  };
}

export function createServer(options) {
  return createNodeServer(createApp(options));
}

let defaultHandler;

export default function handler(request, response) {
  defaultHandler ??= createApp();
  return defaultHandler(request, response);
}
