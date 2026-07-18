# Checklist API

A public, curated API of reusable checklists for everyday, technical, personal, travel, household, administrative, work, event, and other activities.

The project starts at the **micro-task level**. Each micro checklist captures one small activity. Larger **macro checklists** are assembled by composing these reusable building blocks.

## Project vision

Checklist API should make it easy to:

- Discover activities that benefit from a checklist.
- Find a trusted checklist for a common activity.
- Reuse the same micro checklist across many larger workflows.
- Compose micro checklists into an ordered macro checklist.
- Apply country, state, county, city and other authority overlays.
- Preserve authoritative sources and freshness metadata.
- Curate and improve checklist quality through public review.

## San Ramon activity discovery slice

The first broader local catalog researches activities that commonly require multiple steps, records, deadlines, agencies or safety decisions in San Ramon.

Initial seeded checklists:

- Move to San Ramon.
- Prepare a San Ramon household for emergencies.
- Complete a permitted home project.
- Report a city service or safety issue.
- Register for a recreation class, camp or program.

Priority research also identified wildfire preparation, earthquake preparation, starting a business, school enrollment, contractor hiring, vacation-home preparation, pet services, civic participation, neighborhood events and library use.

```http
GET /api/v1/activities?country=US&state=CA&county=Contra%20Costa&city=San%20Ramon&priority=P0
GET /api/v1/checklists?country=US&state=CA&county=Contra%20Costa&city=San%20Ramon
GET /api/v1/checklists/move-to-san-ramon?country=US&state=CA&county=Contra%20Costa&city=San%20Ramon&expand=micro
```

Files:

- [`data/catalogs/san-ramon-activity-priorities.json`](data/catalogs/san-ramon-activity-priorities.json) — researched and prioritized activity opportunities.
- [`data/macros/san-ramon-resident-activities.json`](data/macros/san-ramon-resident-activities.json) — five initial layered macro checklists.
- [`data/micro/san-ramon-resident-activities.json`](data/micro/san-ramon-resident-activities.json) — reusable resident sub-checklists.
- [`openapi/san-ramon-activities.yaml`](openapi/san-ramon-activities.yaml) — activity discovery and checklist composition contract.
- [`docs/SAN_RAMON_ACTIVITY_RESEARCH.md`](docs/SAN_RAMON_ACTIVITY_RESEARCH.md) — research method, priorities, sources and roadmap.

## Location-aware housing vertical slices

### Buying a home in San Ramon

```http
GET /api/v1/checklists/buy-home?country=US&state=CA&county=Contra%20Costa&city=San%20Ramon&expand=micro
```

Files:

- [`data/macros/buy-home.json`](data/macros/buy-home.json)
- [`data/micro/home-buying.json`](data/micro/home-buying.json)
- [`openapi/home-buying.yaml`](openapi/home-buying.yaml)

### Renting a home in Manteca

```http
GET /api/v1/checklists/rent-home?country=US&state=CA&county=San%20Joaquin&city=Manteca&expand=micro
```

Files:

- [`data/macros/rent-home.json`](data/macros/rent-home.json)
- [`data/micro/home-renting.json`](data/micro/home-renting.json)
- [`openapi/home-renting.yaml`](openapi/home-renting.yaml)
- [`docs/RENT_HOME_MANTECA.md`](docs/RENT_HOME_MANTECA.md)

### Leasing a property as a landlord in Manteca

```http
GET /api/v1/checklists/lease-property-landlord?country=US&state=CA&county=San%20Joaquin&city=Manteca&expand=micro
```

Files:

- [`data/macros/lease-property-landlord.json`](data/macros/lease-property-landlord.json)
- [`data/micro/property-leasing-landlord.json`](data/micro/property-leasing-landlord.json)
- [`openapi/property-leasing-landlord.yaml`](openapi/property-leasing-landlord.yaml)

## Proposed public API

Initial base path:

```text
/api/v1
```

Planned endpoints:

```http
GET  /api/v1/health
GET  /api/v1/activities
GET  /api/v1/checklists
GET  /api/v1/checklists/{id}
GET  /api/v1/checklists/{id}/layers
GET  /api/v1/micro-checklists/{id}
GET  /api/v1/categories
GET  /api/v1/tags
POST /api/v1/checklists/compose
```

The first implementation should prioritize read-only activity discovery, catalog and composed-checklist endpoints. Composition can initially be deterministic and non-persistent.

## Core data concepts

### Activity opportunity

A researched activity that is scored by frequency, consequences, agency count, document burden, deadline sensitivity and reuse potential. It may be `seeded`, `researched` or in the `backlog`.

### Micro checklist

The smallest independently useful activity. It has a stable ID, category, tags, estimated time, version, status and ordered steps.

### Macro checklist

A larger workflow made by referencing ordered micro-checklist IDs, with optional macro-specific context.

### Jurisdiction layer

A country, state, county, city, district or other authority-specific overlay. It contains only tasks that supplement or refine its parent layers. A composed response records `source_layer` and `source_location` for traceability.

### Composition

A deterministic process that resolves dependencies, applies conditions, merges jurisdiction overlays, removes duplicates, orders actions and preserves source checklist IDs.

## Content decomposition rule

Create or reference a micro checklist when a task:

- Has multiple ordered actions.
- Can cause meaningful safety, legal, financial or deadline consequences.
- Requires evidence, comparison, verification or escalation.
- Has conditional branches or a professional handoff.
- Is reusable in another activity.

## Architecture direction

```text
API Consumer
    |
    v
HTTP API and Validation
    |
    +--> Activity Discovery Service
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

For the first release, version-controlled JSON or YAML files should be the source of truth. This keeps checklist contributions public, reviewable, testable and deployable without requiring a database.

All legal, safety, financial and government-process content is marked `draft` or risk-scoped, must retain authoritative references and requires periodic review because laws, forms, fees, programs and local procedures change.
