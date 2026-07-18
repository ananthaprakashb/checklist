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
GET  /api/v1/categories
GET  /api/v1/tags
POST /api/v1/checklists/compose
```

Example query:

```http
GET /api/v1/checklists?type=micro&category=travel&tag=preparation
```

The first implementation should prioritize read-only catalog endpoints. Composition can initially be deterministic and non-persistent.

## Core data concepts

### Micro checklist

The smallest independently useful activity. It has a stable ID, category, tags, estimated time, version, status, and ordered steps.

### Macro checklist

A larger workflow made by referencing ordered micro-checklist IDs, with optional macro-specific context.

### Composition

A deterministic process that resolves dependencies, applies conditions, removes duplicate steps, orders actions, and preserves source checklist IDs for traceability.

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
            +--> Dependency Resolver
            +--> Step Deduplicator
            +--> Condition Evaluator
            +--> Ordering Rules
```

For the first release, version-controlled JSON or YAML files should be the source of truth. This keeps checklist contributions public, reviewable, testable, and easy to deploy without requiring a database.

## Delivery plan

### Phase 0 — Documentation foundation

- Define the product and architecture.
- Identify initial micro activities.
- Document checklist quality and composition rules.

### Phase 1 — Data foundation

- Add checklist JSON Schema.
- Add approximately 20 curated micro checklists.
- Add data validation and contribution guidance.

### Phase 2 — Read-only API

- Implement health, list, and get endpoints.
- Add category, tag, and text filtering.
- Publish an OpenAPI contract.
- Add unit, integration, and contract tests.

### Phase 3 — Composition

- Add deterministic macro-checklist composition.
- Resolve dependencies and conditions.
- Deduplicate and order steps.

### Phase 4 — Scale and curation

- Add localization, indexed search, editorial tooling, analytics, and optional personalization.

## Documentation

- [High-Level Design](docs/HIGH_LEVEL_DESIGN.md) — goals, domain model, initial micro-checklist catalog, API proposal, architecture, curation, safety, testing, and roadmap.

## Current status

The project is in **Phase 0: documentation and design**. Application implementation should begin only after the initial design decisions—framework, data format, hosting, pagination, licensing, and high-risk review policy—are agreed upon.

## Contributing

Contribution guidelines will be added with the data schema. Future checklist proposals should be evaluated for:

- Atomicity.
- Reusability.
- Clear action-oriented steps.
- Explicit prerequisites and conditions.
- Duplication with existing checklists.
- Safety and authoritative sourcing where applicable.
- Stable IDs and versioning.

## License

A code license and a license for curated checklist content must be selected before the first public release.
