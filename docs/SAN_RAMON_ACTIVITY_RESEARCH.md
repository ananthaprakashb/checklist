# San Ramon activity checklist research

## Goal

Expand Checklist API from individual housing workflows into a location-aware catalog of recurring activities for residents, property owners, families, volunteers and small businesses.

## Research method

An activity is prioritized when it combines several of the following:

1. It happens frequently or affects many households.
2. Missing a step can cause safety, legal, financial or deadline consequences.
3. It crosses multiple organizations or jurisdictions.
4. It requires documents, evidence, appointments, approvals or follow-up.
5. It has conditional branches that are easy to overlook.
6. Its substeps can be reused in other workflows.

Official sources are preferred. Time-sensitive values such as dates, fees, forms, service providers and portal behavior must remain source-linked and should not be copied into checklist logic without a review date.

## Initial San Ramon priority map

### P0: build first

- Move to San Ramon and establish resident services.
- Prepare a household for earthquakes, wildfire, flooding and other emergencies.
- Complete a home improvement project with the correct permits and inspections.
- Report a city service, traffic, police or safety issue through the correct channel.
- Prepare specifically for wildfire season.
- Prepare specifically for earthquakes.

### P1: build next

- Register for recreation classes, camps and programs.
- Start a business or home occupation.
- Enroll a child in the correct public school.
- Hire and manage a home-service contractor.
- Prepare a home for an extended vacation absence.

### P2: subsequent catalog

- Adopt, license and prepare for a pet.
- Participate in City Council, commission or planning meetings.
- Organize a neighborhood or special event.
- Obtain and use library services.
- Volunteer locally.
- Reserve a park, field or community facility.

## First implementation

Five macro checklists are seeded:

- `move-to-san-ramon`
- `prepare-san-ramon-household-emergency`
- `complete-san-ramon-home-project`
- `report-san-ramon-service-issue`
- `register-san-ramon-recreation-program`

Each macro uses generic, U.S., California, Contra Costa County and San Ramon overlays only when that level adds a meaningful requirement. Tasks that contain multiple actions or meaningful risk reference reusable micro-checklists.

## API examples

```http
GET /api/v1/activities?country=US&state=CA&county=Contra%20Costa&city=San%20Ramon&priority=P0
GET /api/v1/checklists?country=US&state=CA&county=Contra%20Costa&city=San%20Ramon
GET /api/v1/checklists/move-to-san-ramon?country=US&state=CA&county=Contra%20Costa&city=San%20Ramon&expand=micro
GET /api/v1/micro-checklists/enroll-san-ramon-emergency-alerts
```

## Authoritative source set

- City of San Ramon Residents and City Services pages.
- City of San Ramon New Resident Information.
- City of San Ramon Emergency Preparedness and Emergency Alerts.
- City of San Ramon Permit Center and Building and Safety.
- City of San Ramon Citizen Request Management and Police Services.
- City of San Ramon Recreation Guide and Registration Information.
- California DMV new-resident guidance.
- California Department of Public Health emergency-supply guidance.
- USA.gov moving guidance.

## Next build order

1. Resolve the remaining micro-checklist references in the five seeded workflows.
2. Add specialized wildfire and earthquake macro checklists rather than overloading the general emergency workflow.
3. Build `start-san-ramon-business` using federal, California, Contra Costa and City overlays.
4. Build school enrollment using the school district as an additional authority layer.
5. Add schemas and automated validation for stable IDs, source freshness, unresolved micro references and valid jurisdiction inheritance.
6. Implement the read-only discovery and composition endpoints.
