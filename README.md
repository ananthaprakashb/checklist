# Checklist API

A public, curated API of reusable checklists for everyday, technical, personal, travel, household, administrative, work, event, and other activities.

The project starts at the **micro-task level**. Each micro checklist captures one small activity. Larger **macro checklists** are assembled by composing these reusable building blocks.

## Project vision

Checklist API should make it easy to:

- Discover a trusted checklist for a common activity.
- Reuse the same micro checklist across many larger workflows.
- Compose micro checklists into an ordered macro checklist.
- Curate and improve checklist quality through public review.
- Expose stable, versioned checklist data through a simple API.
- Add contextual variants without duplicating entire checklists.

## Location-aware housing vertical slices

### Buying a home in San Ramon

```text
generic → United States → California → Contra Costa County → San Ramon
```

```http
GET /api/v1/checklists/buy-home?country=US&state=CA&county=Contra%20Costa&city=San%20Ramon&expand=micro
```

Files:

- [`data/macros/buy-home.json`](data/macros/buy-home.json)
- [`data/micro/home-buying.json`](data/micro/home-buying.json)
- [`openapi/home-buying.yaml`](openapi/home-buying.yaml)

### Renting a home in Manteca

```text
generic → United States → California → San Joaquin County → Manteca
```

```http
GET /api/v1/checklists/rent-home?country=US&state=CA&county=San%20Joaquin&city=Manteca&expand=micro
```

The rental slice covers planning, budgeting, application preparation, scam prevention, unit inspection, screening, lease review, deposits, disclosures, habitability, utilities, move-in evidence, repair requests, fair-housing assistance and move-out.

Files:

- [`data/macros/rent-home.json`](data/macros/rent-home.json) — layered generic, U.S., California, San Joaquin County and Manteca tasks.
- [`data/micro/home-renting.json`](data/micro/home-renting.json) — reusable rental sub-checklists.
- [`openapi/home-renting.yaml`](openapi/home-renting.yaml) — draft rental API contract.
- [`docs/RENT_HOME_MANTECA.md`](docs/RENT_HOME_MANTECA.md) — scope, research basis and local decisions.

The composed response should merge only the matching overlays, deduplicate by stable semantic key, preserve originating jurisdiction and authoritative sources, apply conditions, and optionally expand micro-checklist steps.

All housing content is marked `draft` and `high` risk. It is educational, must retain citations, and requires periodic review because laws, forms, fees, programs and local procedures change.

## Initial micro-checklist areas

| Area | Example micro activities |
|---|---|
| Daily and personal | Charge devices, pack identification, check weather, prepare medications, secure the home |
| Travel and transportation | Verify reservations, check routes, prepare a vehicle, prepare for transit, pack a day bag |
| Technical | Restart safely, capture an error, prepare a deployment, create a secure account, back up a file |
| Administrative | Prepare for an appointment, submit an online form, pay a bill |
| Shopping and household | Prepare a shopping list, receive a package, leave a room clean |
| Events and work | Prepare for a meeting, host a small gathering |
| Housing | Compare loans, inspect homes and rentals, review leases and disclosures, verify deposits, document condition, activate utilities, request repairs and complete closing or move-out |

The proposed checklist steps and content-quality rules are documented in the [High-Level Design](docs/HIGH_LEVEL_DESIGN.md).

## Proposed public API

Initial base path:

```text
/api/v1
```

Planned endpoints:

```http
GET  /api/v1/health
GET  /api/v1/checklists
GET  /api/v1/checklists/{id}
GET  /api/v1/checklists/{id}/layers
GET  /api/v1/micro-checklists/{id}
GET  /api/v1/categories
GET  /api/v1/tags
POST /api/v1/checklists/compose
```

Example queries:

```http
GET /api/v1/checklists?type=micro&category=housing
GET /api/v1/checklists/buy-home?country=US&state=CA&county=Contra%20Costa&city=San%20Ramon
GET /api/v1/checklists/rent-home?country=US&state=CA&county=San%20Joaquin&city=Manteca&expand=micro
```

The first implementation should prioritize read-only catalog endpoints. Composition can initially be deterministic and non-persistent.

## Core data concepts

### Micro checklist

The smallest independently useful activity. It has a stable ID, category, tags, estimated time, version, status, and ordered steps.

### Macro checklist

A larger workflow made by referencing ordered micro-checklist IDs, with optional macro-specific context.

### Jurisdiction layer

A country, state, county, city, or other authority-specific overlay. It contains only the tasks that supplement or refine its parent layers. A composed response records `source_layer` and `source_location` for traceability.

### Composition

A deterministic process that resolves dependencies, applies conditions, merges jurisdiction overlays, removes duplicates, orders actions, and preserves source checklist IDs.

## Architecture direction

```text
API Consumer
    |
    v
HTTP API and Validation
    |
    +--> Checklist Query Service --> Curated Checklist Repository
    |
    +--> Composition Service
            +--> Jurisdiction Resolver
            +--> Dependency Resolver
            +--> Step Deduplicator
            +--> Condition Evaluator
            +--> Ordering Rules
```

For the first release, version-controlled JSON or YAML files should be the source of truth.

## Content decomposition rule

A macro task should reference a micro checklist when any of these are true:

- The task has multiple ordered actions.
- Missing one substep can cause meaningful cost, delay, safety, legal, financial, privacy or housing risk.
- The activity is reusable in another macro workflow.
- The task requires evidence, comparison, verification or escalation.
- The task has conditional branches or a specialized professional handoff.

Unresolved references remain visible through `unresolved_micro_checklist_ids` until curated rather than being silently treated as atomic.

## Delivery plan

### Phase 0 — Documentation foundation

- Define the product and architecture.
- Identify initial micro activities.
- Document checklist quality and composition rules.

### Phase 1 — Data foundation

- Add checklist JSON Schema.
- Add curated micro checklists.
- Add data validation and contribution guidance.
- Validate jurisdiction inheritance and source metadata.

### Phase 2 — Read-only API

- Implement health, list, get, layer, and micro-checklist endpoints.
- Add category, tag, location, phase, and text filtering.
- Publish OpenAPI contracts.
- Add unit, integration, and contract tests.

### Phase 3 — Composition

- Add deterministic macro-checklist composition.
- Resolve jurisdiction layers, dependencies, and conditions.
- Deduplicate and order steps.
- Return unresolved micro references and source freshness metadata.

### Phase 4 — Scale and curation

- Add localization, indexed search, editorial tooling, analytics, and optional personalization.
- Add scheduled source review for high-risk checklist content.

## Documentation

- [High-Level Design](docs/HIGH_LEVEL_DESIGN.md)
- [Home-buying API contract](openapi/home-buying.yaml)
- [Manteca rental research](docs/RENT_HOME_MANTECA.md)
- [Home-renting API contract](openapi/home-renting.yaml)

## Current status

The project is in **Phase 0/1: design and initial curated data**. The housing slices supply researched contracts and seed data, but no web server has been selected or implemented yet.

## Contributing

Future checklist proposals should be evaluated for atomicity, reusability, clear actions, prerequisites, conditions, duplication, safety, authoritative sourcing, jurisdiction, freshness, stable IDs and versioning.

## License

A code license and a license for curated checklist content must be selected before the first public release.
