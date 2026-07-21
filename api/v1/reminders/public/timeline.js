import { publicTimeline } from '../../../../src/public-timeline.js';

function sendJson(response, status, payload) {
  response.status(status);
  response.setHeader('content-type', 'application/json; charset=utf-8');
  response.setHeader('cache-control', 'no-store');
  response.setHeader('access-control-allow-origin', '*');
  response.setHeader('access-control-allow-methods', 'GET,POST,OPTIONS');
  response.setHeader('access-control-allow-headers', 'content-type');
  return response.json(payload);
}

function inputFromRequest(request) {
  if (request.method === 'POST') return request.body ?? {};
  return {
    country: request.query?.country,
    state: request.query?.state,
    county: request.query?.county,
    city: request.query?.city,
    timezone: request.query?.timezone,
    categories: typeof request.query?.categories === 'string'
      ? request.query.categories.split(',').map(value => value.trim()).filter(Boolean)
      : request.query?.categories
  };
}

export default function handler(request, response) {
  if (request.method === 'OPTIONS') return sendJson(response, 204, {});
  if (!['GET', 'POST'].includes(request.method)) {
    return sendJson(response, 405, { error: 'method_not_allowed' });
  }

  try {
    return sendJson(response, 200, publicTimeline(inputFromRequest(request)));
  } catch (error) {
    console.error(error);
    return sendJson(response, 500, {
      error: 'public_timeline_failed',
      message: error.message
    });
  }
}
