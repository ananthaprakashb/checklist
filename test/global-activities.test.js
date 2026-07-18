import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from '../src/app.js';

function emptyCatalog() {
  return {
    checklists: [],
    micros: [],
    activities: [],
    checklistById: new Map(),
    microById: new Map()
  };
}

async function withServer(run) {
  const server = createServer({ catalog: emptyCatalog() });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

test('global activity catalog exposes 62 location-independent activities', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/v1/global-activities`);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.count, 62);
    assert.equal(body.items.every((item) => item.scope === 'global' && item.location_specific === false), true);
    assert.equal(body.items.every((item) => item.task_count === 5), true);
  });
});

test('global activity detail, task, and subtask endpoints return nested data', async () => {
  await withServer(async (baseUrl) => {
    const detail = await fetch(`${baseUrl}/api/v1/global-activities/secure-online-accounts`);
    assert.equal(detail.status, 200);
    const activity = await detail.json();
    assert.equal(activity.tasks.length, 5);

    const tasks = await fetch(`${baseUrl}/api/v1/global-activities/secure-online-accounts/tasks`);
    assert.equal((await tasks.json()).items.length, 5);

    const task = await fetch(`${baseUrl}/api/v1/global-activities/secure-online-accounts/tasks/protect-access`);
    assert.equal(task.status, 200);
    assert.equal((await task.json()).subtasks.length, 2);

    const subtasks = await fetch(`${baseUrl}/api/v1/global-activities/secure-online-accounts/tasks/protect-access/subtasks`);
    const subtaskBody = await subtasks.json();
    assert.equal(subtaskBody.items.length, 2);
    assert.match(subtaskBody.items[0].title, /password/i);
  });
});

test('common task patterns expose actionable subtasks', async () => {
  await withServer(async (baseUrl) => {
    const expected = [
      ['daily-task-planning', 'prioritize', /important/i],
      ['grocery-shopping-list', 'build-list', /categor/i],
      ['meeting-agenda-follow-up', 'follow-up', /owner/i],
      ['employee-onboarding', 'prepare', /account/i],
      ['bug-report-triage', 'reproduce', /steps/i],
      ['assignment-tracker', 'submit', /submission/i]
    ];

    for (const [activityId, taskId, pattern] of expected) {
      const response = await fetch(`${baseUrl}/api/v1/global-activities/${activityId}/tasks/${taskId}/subtasks`);
      assert.equal(response.status, 200);
      const body = await response.json();
      assert.equal(body.items.length, 2);
      assert.equal(body.items.some((item) => pattern.test(item.title)), true);
    }
  });
});

test('global activity endpoints support category filtering, search, and 404s', async () => {
  await withServer(async (baseUrl) => {
    const filtered = await fetch(`${baseUrl}/api/v1/global-activities?category=career`);
    assert.equal((await filtered.json()).count, 5);

    const marketing = await fetch(`${baseUrl}/api/v1/global-activities?category=marketing`);
    assert.equal((await marketing.json()).count, 2);

    const searched = await fetch(`${baseUrl}/api/v1/global-activities?q=onboarding`);
    assert.equal((await searched.json()).count, 2);

    const missing = await fetch(`${baseUrl}/api/v1/global-activities/not-real`);
    assert.equal(missing.status, 404);
    assert.equal((await missing.json()).error, 'global_activity_not_found');
  });
});