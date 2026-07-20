import { readFileSync } from 'node:fs';

const registry = JSON.parse(readFileSync(new URL('../data/deadlines/california.json', import.meta.url), 'utf8'));

function normalize(value) {
  return String(value ?? '').toLocaleLowerCase('en-US').replace(/[^a-z0-9]+/g, ' ').trim();
}

function resolveCounty({ county, city } = {}) {
  const countyKey = normalize(county);
  const cityKey = normalize(city);
  return registry.counties.find((item) => normalize(item.id) === countyKey || normalize(item.name) === countyKey)
    ?? registry.counties.find((item) => cityKey && item.cities.some((candidate) => normalize(candidate) === cityKey))
    ?? null;
}

function nextOccurrence(item, now) {
  if (item.date) return item.date;
  const year = now.getUTCFullYear();
  const today = Date.UTC(year, now.getUTCMonth(), now.getUTCDate());
  let due = Date.UTC(year, item.month - 1, item.day);
  if (due < today) due = Date.UTC(year + 1, item.month - 1, item.day);
  return new Date(due).toISOString().slice(0, 10);
}

function daysAway(date, now) {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.ceil((Date.parse(`${date}T00:00:00Z`) - today) / 86400000);
}

export function publicTimeline(input = {}, { now = new Date() } = {}) {
  const state = normalize(input.state || 'CA');
  const country = normalize(input.country || 'US');
  if (!['ca', 'california'].includes(state) || !['us', 'usa', 'united states'].includes(country)) {
    return {
      supported: false,
      reason: 'The first release supports California locations only.',
      supportedStates: ['CA']
    };
  }

  const county = resolveCounty(input);
  const categorySet = Array.isArray(input.categories) && input.categories.length
    ? new Set(input.categories.map(normalize))
    : null;

  const deadlines = registry.deadlines
    .map((item) => {
      const date = nextOccurrence(item, now);
      return {
        ...item,
        date,
        source: item.source === 'county'
          ? county?.taxSource ?? 'https://www.boe.ca.gov/proptaxes/calendar.htm'
          : item.source,
        daysAway: daysAway(date, now)
      };
    })
    .filter((item) => item.daysAway >= 0)
    .filter((item) => !categorySet || categorySet.has(normalize(item.category)))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    supported: true,
    registryVersion: registry.version,
    generatedAt: now.toISOString(),
    region: {
      country: 'US',
      state: 'California',
      stateCode: 'CA',
      county: county?.name ?? null,
      city: input.city || null,
      timezone: input.timezone || null,
      confidence: county ? 'city-or-county-match' : 'statewide'
    },
    notice: registry.notice,
    countyOptions: registry.counties.map(({ id, name, cities }) => ({ id, name, cities })),
    deadlines,
    conditional: registry.conditional
  };
}

export function timelineRegistrySummary() {
  return {
    version: registry.version,
    state: registry.state,
    countyCount: registry.counties.length,
    deadlineCount: registry.deadlines.length
  };
}
