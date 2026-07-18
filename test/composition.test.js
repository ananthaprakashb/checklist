import test from 'node:test';
import assert from 'node:assert/strict';
import { composeChecklist, evaluateCondition } from '../src/composition.js';

const checklist = {
  id: 'example',
  title: 'Example',
  layers: [
    {
      level: 'generic',
      tasks: [
        { sequence: 10, semantic_key: 'prepare', title: 'Prepare', micro_checklist_id: 'prepare' },
        { sequence: 20, semantic_key: 'conditional', title: 'Conditional', condition: 'property.year_built < 1978' }
      ]
    },
    {
      level: 'state',
      location: { country: 'US', state: 'CA' },
      tasks: [{ sequence: 15, semantic_key: 'prepare', title: 'Prepare for California', micro_checklist_id: 'prepare-ca' }]
    },
    {
      level: 'city',
      location: { country: 'US', state: 'CA', city: 'San Ramon' },
      tasks: [{ sequence: 30, semantic_key: 'local', title: 'Local task' }]
    }
  ]
};

const microById = new Map([
  ['prepare-ca', { id: 'prepare-ca', title: 'Prepare CA', steps: ['One', 'Two'], status: 'draft', version: '0.1.0' }]
]);

test('condition evaluator supports safe comparisons', () => {
  assert.deepEqual(evaluateCondition('property.year_built < 1978', { property: { year_built: 1960 } }), { result: true, known: true });
  assert.equal(evaluateCondition('household.has_pets == true', { household: { has_pets: false } }).result, false);
  assert.equal(evaluateCondition('runSomething()', {}).known, false);
});

test('composition inherits matching layers and lets specific layers replace semantic keys', () => {
  const result = composeChecklist({
    checklist,
    microById,
    location: { country: 'US', state: 'CA', city: 'San Ramon' },
    context: { property: { year_built: 1985 } },
    expandMicro: true
  });

  assert.deepEqual(result.tasks.map((task) => task.title), ['Prepare for California', 'Local task']);
  assert.equal(result.tasks[0].source_layer, 'state');
  assert.deepEqual(result.tasks[0].micro_checklist.steps, ['One', 'Two']);
  assert.equal(result.matched_layers.length, 3);
});

test('unknown conditions remain visible with a warning', () => {
  const result = composeChecklist({ checklist, microById, location: {} });
  assert.equal(result.tasks.some((task) => task.semantic_key === 'conditional'), true);
  assert.equal(result.warnings[0].code, 'condition_not_evaluated');
});
