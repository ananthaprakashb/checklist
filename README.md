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

### Leasing a property as a landlord in Manteca

```text
generic → United States → California → San Joaquin County → Manteca
```

```http
GET /api/v1/checklists/lease-property-landlord?country=US&state=CA&county=San%20Joaquin&city=Manteca&expand=micro
```

The landlord slice covers property readiness, pricing, compliant advertising, written screening criteria, consumer reports, applicant decisions, leases, disclosures, move-in funds, condition evidence, habitability, lawful entry, rent and termination controls, code compliance, utilities, notices and deposit accounting.

Files:

- [`data/macros/lease-property-landlord.json`](data/macros/lease-property-landlord.json) — layered landlord workflow and authoritative references.
- [`data/micro/property-leasing-landlord.json`](data/micro/property-leasing-landlord.json) — reusable landlord sub-checklists.
- [`openapi/property-leasing-landlord.yaml`](openapi/property-leasing-landlord.yaml) — draft landlord API contract.

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
| Housing | Compare loans, inspect homes and rentals, review leases and disclosures, screen applicants, manage deposits, document condition, activate utilities, request repairs and complete closing or move-out |

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
GET /api/v1/checklists/lease-property-landlord?country=US&state=CA&county=San%20Joaquin&city=Manteca&expand=micro
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
