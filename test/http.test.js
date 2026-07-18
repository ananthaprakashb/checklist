import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from '../src/app.js';

function fixtureCatalog() {
  const checklist = {
    id: 'example',
    title: 'Example checklist',
    status: 'draft',
    layers: [
      { level: 'generic', tasks: [{ sequence: 10, semantic_key: 'first', title: 'First', micro_checklist_id: 'first' }] },
      { level: 'city', location: { country: 'US', state: 'CA', city: 'San Ramon' }, tasks: [{ sequence: 20, semantic_key: 'local', title: 'Local' }] }
    ]
  };
  const micro = { id: 'first', title: 'First micro', steps: ['Do it'] };
  return {
    checklists: [checklist],
    micros: [micro],
    activities: [{ id: 'activity', category: 'safety', priority: 'P0', build_status: 'seeded', location: { country: 'US', state: 'CA', city: 'San Ramon' } }],
    checklistById: new Map([[checklist.id, checklist]]),
    microById: new Map([[micro.id, micro]])
  };
}

async function withServer(run) {
  const server = createServer({ catalog: fixtureCatalog() });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

test('health and composed GET endpoints respond with JSON', async () => {
  await withServer(async (baseUrl) => {
    const health = await fetch(`${baseUrl}/api/v1/health`);
    assert.equal(health.status, 200);
    assert.equal((await health.json()).checklist_count, 1);

    const response = await fetch(`${baseUrl}/api/v1/checklists/example?country=US&state=CA&city=San%20Ramon&expand=micro`);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.deepEqual(body.tasks.map((task) => task.title), ['First', 'Local']);
    assert.deepEqual(body.tasks[0].micro_checklist.steps, ['Do it']);
  });
});

test('POST compose accepts context and location', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/v1/checklists/compose`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ checklist_id: 'example', location: { country: 'US', state: 'CA', city: 'San Ramon' }, expand_micro: true })
    });
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.matched_layers.length, 2);
  });
});

test('activity filters and missing resources return expected results', async () => {
  await withServer(async (baseUrl) => {
    const activities = await fetch(`${baseUrl}/api/v1/activities?city=San%20Ramon&priority=P0`);
    assert.equal((await activities.json()).items.length, 1);

    const missing = await fetch(`${baseUrl}/api/v1/checklists/missing`);
    assert.equal(missing.status, 404);
    assert.equal((await missing.json()).error, 'checklist_not_found');
  });
});
