import test from 'node:test';
import assert from 'node:assert/strict';
import { publicTimeline } from '../src/public-timeline.js';

test('maps San Ramon to Contra Costa County', () => {
  const result = publicTimeline(
    { country: 'US', state: 'CA', city: 'San Ramon' },
    { now: new Date('2026-07-19T12:00:00Z') }
  );
  assert.equal(result.supported, true);
  assert.equal(result.region.county, 'Contra Costa');
  assert.ok(result.deadlines.length > 0);
  assert.ok(result.deadlines.every((item) => item.daysAway >= 0));
});

test('uses the selected county source for county property deadlines', () => {
  const result = publicTimeline(
    { country: 'US', state: 'CA', county: 'santa-clara' },
    { now: new Date('2026-07-19T12:00:00Z') }
  );
  const propertyDeadline = result.deadlines.find((item) => item.id === 'unsecured-tax');
  assert.equal(result.region.county, 'Santa Clara');
  assert.match(propertyDeadline.source, /santaclaracounty\.gov/);
});

test('rejects regions outside California', () => {
  const result = publicTimeline({ country: 'US', state: 'TX', city: 'Austin' });
  assert.equal(result.supported, false);
  assert.deepEqual(result.supportedStates, ['CA']);
});
