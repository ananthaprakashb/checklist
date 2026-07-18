const LOCATION_KEYS = ['country', 'state', 'county', 'city'];

function normalize(value) {
  return String(value ?? '').trim().toLocaleLowerCase('en-US');
}

function locationMatches(layerLocation, requestedLocation) {
  if (!layerLocation) return true;
  return LOCATION_KEYS.every((key) => {
    if (layerLocation[key] == null) return true;
    return normalize(layerLocation[key]) === normalize(requestedLocation[key]);
  });
}

function getPath(object, dottedPath) {
  return dottedPath.split('.').reduce((current, key) => current?.[key], object);
}

function parseLiteral(raw) {
  const value = raw.trim();
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  const quoted = value.match(/^(['"])(.*)\1$/);
  return quoted ? quoted[2] : undefined;
}

export function evaluateCondition(expression, context = {}) {
  if (!expression) return { result: true, known: true };
  const match = expression.match(/^\s*([A-Za-z_][\w.]*)\s*(===|==|!==|!=|<=|>=|<|>)\s*(.+?)\s*$/);
  if (!match) return { result: null, known: false, reason: 'unsupported_condition' };

  const [, path, operator, rawExpected] = match;
  const actual = getPath(context, path);
  const expected = parseLiteral(rawExpected);
  if (actual === undefined || expected === undefined) {
    return { result: null, known: false, reason: 'missing_context_or_literal' };
  }

  const operations = {
    '==': () => actual === expected,
    '===': () => actual === expected,
    '!=': () => actual !== expected,
    '!==': () => actual !== expected,
    '<': () => actual < expected,
    '<=': () => actual <= expected,
    '>': () => actual > expected,
    '>=': () => actual >= expected
  };
  return { result: operations[operator](), known: true };
}

function expandTask(task, microById, expandMicro) {
  const expanded = { ...task };
  if (!expandMicro || !task.micro_checklist_id) return expanded;

  const micro = microById.get(task.micro_checklist_id);
  expanded.micro_checklist = micro
    ? { id: micro.id, title: micro.title, steps: micro.steps ?? [], status: micro.status, version: micro.version }
    : null;
  if (!micro) expanded.warnings = ['micro_checklist_not_found'];
  return expanded;
}

export function composeChecklist({ checklist, microById, location = {}, context = {}, expandMicro = false }) {
  if (!checklist) throw new Error('Checklist is required');

  const matchingLayers = (checklist.layers ?? []).filter((layer) => locationMatches(layer.location, location));
  const tasksBySemanticKey = new Map();
  const sources = [];
  const warnings = [];

  for (const layer of matchingLayers) {
    for (const source of layer.sources ?? []) {
      if (!sources.some((item) => item.url === source.url)) sources.push(source);
    }

    for (const task of layer.tasks ?? []) {
      const evaluation = evaluateCondition(task.condition, context);
      if (evaluation.known && evaluation.result === false) continue;

      const key = task.semantic_key ?? `${layer.level}:${task.sequence}:${task.title}`;
      tasksBySemanticKey.set(key, {
        ...task,
        source_layer: layer.id ?? layer.level,
        source_location: layer.location ?? null,
        condition_evaluation: task.condition
          ? (evaluation.known ? evaluation.result : null)
          : undefined
      });
      if (task.condition && !evaluation.known) {
        warnings.push({ code: 'condition_not_evaluated', task: key, condition: task.condition });
      }
    }
  }

  const tasks = [...tasksBySemanticKey.values()]
    .sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0) || String(a.title).localeCompare(String(b.title)))
    .map((task) => expandTask(task, microById, expandMicro));

  return {
    id: checklist.id,
    title: checklist.title,
    type: checklist.type ?? 'macro',
    version: checklist.version,
    status: checklist.status,
    risk_level: checklist.risk_level,
    location,
    matched_layers: matchingLayers.map((layer) => ({ level: layer.level, id: layer.id, location: layer.location ?? null })),
    tasks,
    sources,
    warnings
  };
}

export function parseLocation(searchParams) {
  return Object.fromEntries(
    LOCATION_KEYS
      .map((key) => [key, searchParams.get(key)])
      .filter(([, value]) => value != null && value !== '')
  );
}
