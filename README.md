# Checklist API

A public, curated API of reusable checklists for everyday, technical, personal, travel, household, administrative, work, event, and other activities.

The project starts at the **micro-task level**. Each micro checklist captures one small activity—such as verifying a reservation, charging essential devices, preparing for an appointment, capturing a software error, or checking a route. Larger **macro checklists** are assembled by composing these reusable building blocks.

## Project vision

Checklist API should make it easy to:

- Discover a trusted checklist for a common activity.
- Reuse the same micro checklist across many larger workflows.
- Compose micro checklists into an ordered macro checklist.
- Curate and improve checklist quality through public review.
- Expose stable, versioned checklist data through a simple API.
- Add contextual variants without duplicating entire checklists.

## Example

A macro task such as **prepare for an in-person appointment** could combine:

- Prepare for an appointment.
- Check the weather before leaving.
- Check the route and departure time.
- Charge essential devices.
- Pack identification.
- Secure the home before leaving.

Each item is independently useful and can also be reused in travel, work, school, healthcare, government, and event workflows.

## First vertical slice: buying a home

The first researched vertical slice is a layered checklist for buying a home. It demonstrates how one generic workflow can inherit increasingly specific jurisdiction overlays without duplicating the complete checklist.

Available layers:

```text
generic
  └── United States
       └── California
            └── Contra Costa County
                 └── San Ramon
```

Example request:

```http
GET /api/v1/checklists/buy-home?country=US&state=CA&county=Contra%20Costa&city=San%20Ramon&expand=micro
```

The composed response should:

1. Start with the generic home-buying lifecycle.
2. Merge U.S. mortgage and federal-protection tasks.
3. Merge California disclosure, escrow, title, hazard, tax, and insurance tasks.
4. Merge Contra Costa County assessment, supplemental-tax, recording, and exemption tasks.
5. Merge San Ramon zoning, permit, utility, wildfire, school-boundary, and local-context tasks.
6. Deduplicate tasks by stable semantic key.
7. Preserve the originating jurisdiction and authoritative sources.
8. Optionally expand reusable micro-checklist steps.

Files:

- [`data/macros/buy-home.json`](data/macros/buy-home.json) — layered macro checklist and authoritative references.
- [`data/micro/home-buying.json`](data/micro/home-buying.json) — initial reusable micro checklists for complex tasks.
- [`openapi/home-buying.yaml`](openapi/home-buying.yaml) — draft API contract for the vertical slice.

The content is marked `draft` and `high` risk. It is educational, must retain citations, and requires periodic review because laws, forms, programs, maps, fees, and agency procedures change.

## Initial micro-checklist areas

The first catalog is organized around broadly reusable activities:

| Area | Example micro activities |
|---|---|
| Daily and personal | Charge devices, pack identification, check weather, prepare medications, secure the home |
| Travel and transportation | Verify reservations, check routes, prepare a vehicle, prepare for transit, pack a day bag |
| Technical | Restart safely, capture an error, prepare a deployment, create a secure account, back up a file |
| Administrative | Prepare for an appointment, submit an online form, pay a bill |
| Shopping and household | Prepare a shopping list, receive a package, leave a room clean |
| Events and work | Prepare for a meeting, host a small gathering |
| Housing | Compare loans, inspect a home, review disclosures, verify permits, estimate taxes, review HOA records, complete closing |

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
GET /api/v1/checklists?type=micro&category=travel&tag=preparation
GET /api/v1/checklists/buy-home?country=US&state=CA
GET /api/v1/checklists/buy-home?country=US&state=CA&county=Contra%20Costa&city=San%20Ramon
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

A deterministic process that resolves dependencies, applies conditions, merges jurisdiction overlays, removes duplicate steps, orders actions, and preserves source checklist IDs for traceability.

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

For the first release, version-controlled JSON or YAML files should be the source of truth. This keeps checklist contributions public, reviewable, testable, and easy to deploy without requiring a database.

## Content decomposition rule

A macro task should reference a micro checklist when any of these are true:

- The task has multiple ordered actions.
- Missing one substep can cause meaningful cost, delay, safety, legal, financial, or privacy risk.
- The activity is reusable in another macro workflow.
- The task requires evidence, comparison, verification, or escalation.
- The task has conditional branches or a specialized professional handoff.

The home-buying slice currently expands the highest-value examples, including Loan Estimate comparison, independent inspection, HOA review, wire verification, California hazard review, Contra Costa supplemental-tax preparation, San Ramon permit review, zoning review, utility identification, and final walk-through. Remaining referenced IDs are intentionally discoverable through `unresolved_micro_checklist_ids` until curated.

## Delivery plan

### Phase 0 — Documentation foundation

- Define the product and architecture.
- Identify initial micro activities.
- Document checklist quality and composition rules.

### Phase 1 — Data foundation

- Add checklist JSON Schema.
- Add approximately 20 curated micro checklists.
- Add data validation and contribution guidance.
- Validate jurisdiction inheritance and source metadata.

### Phase 2 — Read-only API

- Implement health, list, get, layer, and micro-checklist endpoints.
- Add category, tag, location, phase, and text filtering.
- Publish an OpenAPI contract.
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

- [High-Level Design](docs/HIGH_LEVEL_DESIGN.md) — goals, domain model, initial micro-checklist catalog, API proposal, architecture, curation, safety, testing, and roadmap.
- [Home-buying API contract](openapi/home-buying.yaml) — first location-aware API slice.

## Current status

The project is in **Phase 0/1: design and initial curated data**. The home-buying slice supplies a researched contract and seed data, but no web server has been selected or implemented yet.

## Contributing

Contribution guidelines will be added with the data schema. Future checklist proposals should be evaluated for:

- Atomicity.
- Reusability.
- Clear action-oriented steps.
- Explicit prerequisites and conditions.
- Duplication with existing checklists.
- Safety and authoritative sourcing where applicable.
- Jurisdiction and source freshness.
- Stable IDs and versioning.

## License

A code license and a license for curated checklist content must be selected before the first public release.
