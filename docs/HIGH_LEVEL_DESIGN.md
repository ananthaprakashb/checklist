# Checklist API — High-Level Design

## 1. Purpose

Checklist API is a public, curated catalog of reusable checklists for everyday, technical, personal, travel, household, administrative, and other activities.

The core design principle is **composition**:

- A **micro checklist** represents one small, independently useful activity.
- A **macro checklist** combines multiple micro checklists into a larger workflow.
- Applications and users can retrieve, filter, compose, customize, and version these checklists through a public API.

Examples:

- `charge-phone` is a micro checklist.
- `pack-essential-documents` is a micro checklist.
- `prepare-for-airport-departure` is a macro checklist composed from those and other micro checklists.

## 2. Goals

### Initial goals

1. Define a consistent schema for micro checklists.
2. Seed the catalog with high-value, broadly reusable micro activities.
3. Expose read-only public endpoints.
4. Support composition of micro checklists into macro tasks.
5. Establish a transparent curation, review, and versioning process.
6. Keep the first implementation simple enough to run from static curated data.

### Non-goals for the first release

- User accounts or authentication.
- Saving personal checklist completion state.
- AI-generated checklist publication without review.
- Real-time collaboration.
- Region-specific legal, medical, financial, or safety guarantees.
- A full database-backed administration portal.

## 3. Design principles

### Atomic

Each micro checklist should represent one clear activity that can usually be completed in a short period.

### Reusable

A micro checklist should be useful in several larger workflows. For example, `verify-address-and-hours` can be reused for appointments, restaurants, government offices, and repair visits.

### Composable

Macro checklists reference micro checklist IDs rather than copying their content whenever possible.

### Curated

Every public checklist should have an owner, review status, source notes where applicable, and version history.

### Context-aware but not over-specific

The base checklist should cover the common case. Optional variants and conditions should handle differences such as travel mode, device type, weather, age group, or location.

### Safe

Checklists involving health, finance, law, security, or emergencies must include appropriate scope notes and should rely on authoritative sources before publication.

## 4. Domain model

### 4.1 Micro checklist

A micro checklist is the smallest curated workflow unit.

```json
{
  "id": "travel.verify-reservation",
  "slug": "verify-reservation",
  "title": "Verify a reservation",
  "summary": "Confirm that a booking is valid and that its important details are correct.",
  "category": "travel",
  "tags": ["booking", "confirmation", "preparation"],
  "estimated_minutes": 5,
  "risk_level": "low",
  "status": "published",
  "version": "1.0.0",
  "steps": [
    {
      "id": "open-confirmation",
      "order": 1,
      "text": "Open the latest confirmation from the official provider.",
      "required": true
    },
    {
      "id": "confirm-details",
      "order": 2,
      "text": "Confirm the date, time, names, location, quantity, and payment status.",
      "required": true
    },
    {
      "id": "save-access-copy",
      "order": 3,
      "text": "Save an offline or easily accessible copy of the confirmation.",
      "required": false
    }
  ],
  "inputs": [],
  "conditions": [],
  "source_notes": [],
  "created_at": "2026-07-18T00:00:00Z",
  "updated_at": "2026-07-18T00:00:00Z"
}
```

### 4.2 Checklist step

A step should contain:

- Stable step ID.
- Display order.
- Clear action text beginning with a verb.
- Required or optional status.
- Optional explanation.
- Optional condition.
- Optional safety note.
- Optional expected output.

### 4.3 Macro checklist

A macro checklist composes reusable micro checklists and may include a small number of macro-specific steps.

```json
{
  "id": "travel.prepare-for-domestic-flight",
  "title": "Prepare for a domestic flight",
  "category": "travel",
  "version": "1.0.0",
  "includes": [
    { "checklist_id": "travel.verify-reservation", "order": 1 },
    { "checklist_id": "personal.pack-identification", "order": 2 },
    { "checklist_id": "personal.charge-essential-devices", "order": 3 },
    { "checklist_id": "travel.check-route-and-departure-time", "order": 4 }
  ]
}
```

### 4.4 Category

Initial top-level categories:

- `daily`
- `personal`
- `home`
- `travel`
- `technical`
- `work`
- `administrative`
- `shopping`
- `vehicle`
- `events`
- `safety`

Categories are intentionally broad. Tags provide more precise discovery.

## 5. Initial micro-activity catalog

The first catalog should focus on activities that are common, atomic, and reusable across macro workflows.

### 5.1 Daily and personal

#### Charge essential devices

1. Identify the devices needed for the upcoming activity.
2. Check the current battery level of each device.
3. Connect each device to a compatible charger.
4. Confirm that charging has started.
5. Pack the required cable, adapter, or power bank.

#### Pack identification

1. Determine which form of identification is required.
2. Confirm that the identification is valid and not expired.
3. Verify that the name matches the reservation or application.
4. Place it in a secure and accessible location.
5. Store a backup copy when appropriate and permitted.

#### Prepare medications for an outing

1. Identify medications needed during the time away.
2. Confirm dosage instructions and timing.
3. Check that enough medication is available.
4. Keep medication in properly labeled packaging when appropriate.
5. Pack required supporting items such as water or a measuring device.

> Medical checklists require expert review and clear disclaimers before publication.

#### Check weather before leaving

1. Check the forecast for the destination and travel period.
2. Review temperature, precipitation, wind, and severe-weather alerts.
3. Select suitable clothing and protective items.
4. Adjust travel time or plans when conditions may cause delays.

#### Secure home before leaving

1. Turn off or safely leave necessary appliances.
2. Close and lock accessible windows.
3. Lock exterior doors.
4. Confirm water, heating, cooling, and lighting settings.
5. Arm the security system when applicable.
6. Verify that keys are packed.

### 5.2 Travel and transportation

#### Verify a reservation

1. Open the latest confirmation from the official provider.
2. Confirm date, time, names, location, quantity, and payment status.
3. Review cancellation, check-in, and arrival instructions.
4. Save an accessible or offline copy.
5. Add important times and confirmation details to the calendar.

#### Check route and departure time

1. Confirm the destination address.
2. Review the preferred route.
3. Check current traffic, closures, transit changes, or weather effects.
4. Add parking, fueling, transfer, and buffer time.
5. Set the planned departure time.
6. Save the route for offline access when useful.

#### Prepare a vehicle for a short trip

1. Check fuel or charge level.
2. Inspect visible tire condition.
3. Confirm lights and warning indicators are normal.
4. Clear visibility through windows and mirrors.
5. Pack license, registration, insurance, and essential emergency items.
6. Confirm the destination and parking plan.

#### Prepare for public transit

1. Confirm the route and correct direction.
2. Check the current schedule and service alerts.
3. Verify fare, ticket, or transit-card readiness.
4. Identify the boarding point and transfer locations.
5. Allow time for walking, transfers, and delays.

#### Pack a day bag

1. Confirm the expected duration and planned activities.
2. Pack identification, payment method, keys, and phone.
3. Pack water and necessary food or snacks.
4. Add weather-appropriate clothing or protection.
5. Add activity-specific items.
6. Remove unnecessary valuables and excess weight.

### 5.3 Technical

#### Restart a device safely

1. Save open work.
2. Close applications that may block shutdown.
3. Confirm no update, transfer, backup, or installation is in progress.
4. Use the operating system’s restart option.
5. Wait for startup to complete.
6. Verify that the original issue is resolved.

#### Capture an error for troubleshooting

1. Record the exact error message.
2. Capture a screenshot or relevant log excerpt.
3. Record the time and action that triggered the error.
4. Note the application, version, device, and environment.
5. Record whether the issue is repeatable.
6. Remove secrets and personal information before sharing.

#### Prepare before a software deployment

1. Confirm the intended release version and scope.
2. Verify required reviews and approvals.
3. Confirm automated tests and build checks passed.
4. Review configuration and secret changes.
5. Confirm monitoring and rollback plans.
6. Notify affected stakeholders.
7. Record the deployment start time.

#### Create a secure account

1. Confirm that the website or application is authentic.
2. Use a unique password or passkey.
3. Store credentials in a trusted password manager.
4. Enable multi-factor authentication.
5. Save recovery codes securely.
6. Review privacy, notification, and recovery settings.

#### Back up an important file

1. Confirm the correct source file and latest version.
2. Choose an approved backup destination.
3. Copy or synchronize the file.
4. Verify that the backup completed.
5. Open or validate the backed-up copy.
6. Record the backup date when needed.

### 5.4 Administrative and appointments

#### Prepare for an appointment

1. Confirm the appointment date, time, location, and format.
2. Review preparation instructions.
3. Gather required identification and documents.
4. Prepare questions, notes, and relevant history.
5. Confirm payment, insurance, or fee information when applicable.
6. Plan travel and arrival time.
7. Save the provider’s contact information.

#### Submit an online form

1. Confirm that the form is on the official or intended website.
2. Review required fields and supporting documents.
3. Gather accurate information before starting.
4. Complete all required fields.
5. Review entries for accuracy.
6. Save a copy before submission when possible.
7. Submit the form.
8. Save the confirmation number and receipt.

#### Pay a bill

1. Verify the biller and account.
2. Confirm the amount due and due date.
3. Review unexpected charges or changes.
4. Choose the correct payment method and date.
5. Confirm the payment details before submitting.
6. Save the receipt or confirmation number.
7. Verify that the payment posts correctly.

> Financial checklists should avoid individualized financial advice unless reviewed and clearly scoped.

### 5.5 Shopping and household

#### Prepare a shopping list

1. Review current supplies.
2. Identify the purpose and time period covered by the purchase.
3. Add required items and quantities.
4. Group items by store section or supplier.
5. Mark substitutes and priority items.
6. Review budget or spending limit.
7. Remove duplicates and nonessential items.

#### Receive a package

1. Confirm that the package belongs to the recipient and address.
2. Inspect the exterior for visible damage or tampering.
3. Record damage before opening when necessary.
4. Open the package safely.
5. Verify contents against the order.
6. Test or inspect the item within the return period.
7. Retain packaging and documentation until acceptance.

#### Leave a room clean

1. Remove trash and recycling.
2. Return misplaced items.
3. Clear and wipe primary surfaces.
4. Put away tools, supplies, dishes, or clothing.
5. Sweep or vacuum visible debris.
6. Turn off unnecessary lights and equipment.

### 5.6 Events and meetings

#### Prepare for a meeting

1. Confirm the purpose, time, attendees, and location or link.
2. Review the agenda and previous action items.
3. Prepare required documents and data.
4. Write key questions and desired decisions.
5. Test audio, video, or presentation equipment.
6. Join or arrive early enough to resolve problems.

#### Host a small gathering

1. Confirm date, time, location, and expected attendance.
2. Send essential instructions to guests.
3. Plan food, drinks, seating, and accessibility.
4. Prepare the space and restrooms.
5. Confirm safety, parking, weather, and cleanup arrangements.
6. Keep contact information and a backup plan available.

## 6. Composition strategy

Macro checklist generation follows these rules:

1. Select micro checklists based on the requested goal.
2. Resolve prerequisites and dependencies.
3. Remove duplicate or equivalent steps.
4. Apply context conditions.
5. Order steps by dependency, urgency, and practical sequence.
6. Preserve the source micro-checklist IDs for traceability.
7. Return a composed checklist without mutating the curated source records.

Example composition:

`attend-an-in-person-appointment` may include:

- `administrative.prepare-for-appointment`
- `daily.check-weather-before-leaving`
- `travel.check-route-and-departure-time`
- `personal.charge-essential-devices`
- `personal.pack-identification`
- `home.secure-home-before-leaving`

## 7. Proposed API

Base path:

```text
/api/v1
```

### 7.1 Health

```http
GET /api/v1/health
```

### 7.2 List checklists

```http
GET /api/v1/checklists
```

Supported query parameters:

- `type=micro|macro`
- `category=travel`
- `tag=preparation`
- `status=published`
- `q=reservation`
- `limit=20`
- `cursor=<opaque-cursor>`

### 7.3 Get a checklist

```http
GET /api/v1/checklists/{id}
```

### 7.4 List categories

```http
GET /api/v1/categories
```

### 7.5 List tags

```http
GET /api/v1/tags
```

### 7.6 Compose a macro checklist

Initial implementation may expose a deterministic preview endpoint:

```http
POST /api/v1/checklists/compose
Content-Type: application/json

{
  "title": "Prepare for an in-person appointment",
  "checklist_ids": [
    "administrative.prepare-for-appointment",
    "travel.check-route-and-departure-time",
    "personal.pack-identification"
  ],
  "context": {
    "transport_mode": "car",
    "weather_sensitive": true
  }
}
```

Response:

```json
{
  "data": {
    "type": "composed",
    "title": "Prepare for an in-person appointment",
    "source_checklist_ids": [
      "administrative.prepare-for-appointment",
      "travel.check-route-and-departure-time",
      "personal.pack-identification"
    ],
    "steps": []
  },
  "meta": {
    "generated_at": "2026-07-18T00:00:00Z"
  }
}
```

This endpoint should not publish or persist the generated composition in the first release.

## 8. API response conventions

Success:

```json
{
  "data": {},
  "meta": {}
}
```

Error:

```json
{
  "error": {
    "code": "CHECKLIST_NOT_FOUND",
    "message": "The requested checklist was not found.",
    "details": {}
  }
}
```

Recommended HTTP statuses:

- `200` successful read or composition.
- `400` invalid request.
- `404` checklist not found.
- `422` valid JSON with unsupported composition rules.
- `429` rate limit exceeded.
- `500` unexpected server failure.

## 9. Suggested repository structure

```text
.
├── README.md
├── docs/
│   ├── HIGH_LEVEL_DESIGN.md
│   ├── CONTRIBUTING_CHECKLISTS.md
│   └── API.md
├── data/
│   ├── categories.json
│   ├── micro/
│   │   ├── daily.json
│   │   ├── personal.json
│   │   ├── travel.json
│   │   ├── technical.json
│   │   └── administrative.json
│   └── macro/
├── schemas/
│   ├── checklist.schema.json
│   └── composition-request.schema.json
├── src/
│   ├── app
│   ├── routes
│   ├── services
│   ├── repositories
│   ├── validation
│   └── middleware
└── tests/
    ├── unit
    ├── integration
    └── contract
```

The exact source layout may vary with the selected language and framework, but curated checklist data and validation schemas should remain separate from HTTP transport code.

## 10. Logical architecture

```text
API Consumer
    |
    v
HTTP API / Routing
    |
    +--> Request Validation
    |
    +--> Checklist Query Service
    |       |
    |       +--> Curated Checklist Repository
    |
    +--> Composition Service
            |
            +--> Dependency Resolver
            +--> Step Deduplicator
            +--> Condition Evaluator
            +--> Ordering Rules
```

### Components

#### HTTP API

Handles routing, query parsing, response formatting, rate limiting, and version headers.

#### Checklist repository

Loads validated checklist records from version-controlled JSON or YAML files in the first release.

#### Query service

Filters checklists by ID, type, category, tag, status, and search text.

#### Composition service

Combines checklists, resolves dependencies, applies conditions, removes duplicates, and returns traceable output.

#### Validation

Validates all curated data during development, continuous integration, and application startup.

## 11. Data storage strategy

### Phase 1: version-controlled files

Use JSON or YAML files as the source of truth.

Advantages:

- Simple public contribution workflow.
- Full Git history and reviewability.
- Easy static validation.
- No database required for initial read traffic.
- Easy CDN or serverless deployment.

### Future phase: indexed datastore

Introduce a database or search index only when needed for:

- High-volume search.
- Localization.
- User customization.
- Editorial workflows.
- Analytics.
- Large-scale relationship queries.

The repository should remain the canonical source for curated public checklist definitions unless a deliberate migration is approved.

## 12. Curation lifecycle

Proposed checklist statuses:

- `draft`
- `in_review`
- `published`
- `deprecated`
- `archived`

Publication workflow:

1. Contributor proposes a micro checklist.
2. Automated schema and wording checks run.
3. Reviewer evaluates atomicity, clarity, reuse, safety, and duplication.
4. Domain review is required for high-risk topics.
5. Checklist is published with version `1.0.0`.
6. Later changes follow semantic versioning principles.

## 13. Quality rules for checklist content

A checklist should:

- Begin each step with a clear action verb.
- Use one primary action per step.
- Avoid vague phrases such as “handle everything.”
- Avoid hidden dependencies.
- State conditions explicitly.
- Separate required and optional steps.
- Avoid unnecessary personal data collection.
- Link or record authoritative sources when factual guidance matters.
- Avoid duplicating another micro checklist.
- Remain understandable without the macro checklist that includes it.

## 14. Versioning

### API versioning

Use path-based major versions:

```text
/api/v1
```

### Checklist versioning

Use semantic versions:

- Patch: wording clarification without changing meaning.
- Minor: backward-compatible optional steps or metadata.
- Major: changed intent, required steps, or safety behavior.

Checklist IDs should remain stable. Deprecated checklists should identify their replacement.

## 15. Security, privacy, and safety

- Public read endpoints should not require authentication initially.
- Apply reasonable rate limits and payload-size limits.
- Do not accept executable content in curated records.
- Sanitize all rendered text.
- Avoid storing personal checklist input in the first release.
- Redact secrets and personal data from technical troubleshooting examples.
- Require stronger editorial review for health, legal, financial, security, child-safety, and emergency content.
- Include source and review metadata where factual accuracy or regional variation matters.

## 16. Observability

Track:

- Request count and latency by endpoint.
- Error rate and error code.
- Most requested checklist IDs and categories.
- Composition failures and deduplication decisions.
- Data validation failures at startup and in CI.

Do not log personal context submitted to composition endpoints unless explicitly designed, disclosed, and protected.

## 17. Testing strategy

### Schema tests

- Every checklist validates against the schema.
- IDs are unique.
- Step IDs are unique within a checklist.
- Referenced micro checklists exist.
- Dependency cycles are rejected.

### Unit tests

- Filtering and search.
- Dependency resolution.
- Step deduplication.
- Conditional inclusion.
- Stable ordering.

### Integration tests

- Endpoint status and response shape.
- Pagination behavior.
- Invalid request handling.
- Composition using curated fixtures.

### Contract tests

Publish and validate an OpenAPI contract to protect API consumers from accidental breaking changes.

## 18. Delivery phases

### Phase 0 — Documentation foundation

- High-level design.
- Initial micro-activity catalog.
- README and project direction.

### Phase 1 — Data foundation

- JSON Schema.
- Curated category and checklist data.
- Validation command.
- Contribution guide.

### Phase 2 — Read-only API

- Health endpoint.
- List and retrieve checklists.
- Filter by category and tags.
- OpenAPI documentation.
- Unit and integration tests.

### Phase 3 — Composition

- Deterministic composition endpoint.
- Dependency resolution.
- Deduplication and ordering.
- Context conditions.

### Phase 4 — Scale and editorial tooling

- Localization.
- Search index.
- Editorial workflow.
- Usage analytics.
- Optional authenticated personalization.

## 19. Decisions to make before implementation

1. Language and web framework.
2. JSON versus YAML for curated checklist records.
3. Hosting target and deployment model.
4. Search implementation for the first release.
5. Pagination convention.
6. License for code and curated checklist content.
7. Review requirements for high-risk categories.
8. Whether the composition endpoint belongs in v1 or follows the read-only MVP.

## 20. Recommended first implementation slice

The smallest useful implementation should include:

- A schema for micro checklists.
- Approximately 20 curated micro checklists.
- Static JSON source files.
- `GET /api/v1/health`.
- `GET /api/v1/checklists`.
- `GET /api/v1/checklists/{id}`.
- Category and tag filtering.
- OpenAPI documentation.
- Automated schema, unit, and endpoint tests.

This creates a stable public foundation before introducing persistent user data or AI-assisted generation.
