import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function jsonFiles(relativeDir) {
  const dir = join(ROOT, relativeDir);
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .map((entry) => join(dir, entry.name))
    .sort();
}

function normalizeMacroDocument(document, sourceFile) {
  if (Array.isArray(document.checklists)) {
    return document.checklists.map((checklist) => ({
      ...checklist,
      version: checklist.version ?? document.version,
      status: checklist.status ?? document.status,
      risk_level: checklist.risk_level ?? document.risk_level,
      composition: checklist.composition ?? document.composition,
      source_file: sourceFile
    }));
  }

  return [{ ...document, source_file: sourceFile }];
}

export function loadCatalog() {
  const macroFiles = jsonFiles('data/macros');
  const microFiles = jsonFiles('data/micro');

  const checklists = macroFiles.flatMap((path) =>
    normalizeMacroDocument(readJson(path), path.slice(ROOT.length + 1))
  );

  const micros = microFiles.flatMap((path) => {
    const document = readJson(path);
    return (document.checklists ?? []).map((checklist) => ({
      ...checklist,
      version: checklist.version ?? document.version,
      status: checklist.status ?? document.status,
      source_file: path.slice(ROOT.length + 1)
    }));
  });

  const activities = jsonFiles('data/catalogs').flatMap((path) => {
    const document = readJson(path);
    const rows = document.activities ?? document.items ?? document.checklists ?? [];
    return rows.map((row) => ({
      ...row,
      location: row.location ?? document.location,
      version: row.version ?? document.version,
      status: row.status ?? document.status,
      source_file: path.slice(ROOT.length + 1)
    }));
  });

  const checklistById = new Map(checklists.map((item) => [item.id, item]));
  const microById = new Map(micros.map((item) => [item.id, item]));

  return { checklists, micros, activities, checklistById, microById };
}

export function catalogSummary(catalog) {
  const categories = new Set();
  const tags = new Set();

  for (const item of [...catalog.checklists, ...catalog.micros, ...catalog.activities]) {
    if (item.category) categories.add(item.category);
    for (const tag of item.tags ?? []) tags.add(tag);
  }

  return {
    checklist_count: catalog.checklists.length,
    micro_checklist_count: catalog.micros.length,
    activity_count: catalog.activities.length,
    categories: [...categories].sort(),
    tags: [...tags].sort()
  };
}
