# (Environment) [Name]

/* An environment — the infrastructure context in which the project operates. */
/* Environment answers: "Where does this run?" */
/* Lives in Context/ but is displayed on the map canvas in the infrastructure band. */
/* Leaf node — no outbound artifact-refs. */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/environment"
status: [draft|active|stale|deprecated]
template: "[[dev-tmp-orbc-environment-v0.2]]"
---

[Description: what this environment provides and when it's used]

## Configuration

| Aspect | Detail |
|--------|--------|
| Type | [CI|local|Docker|staging|preview|production|etc.] |
| Runner | [Vitest|Playwright|GitHub Actions|Vercel|etc.] |
| Trigger | [push|PR|manual|scheduled|deploy] |
| Platform | [GitHub Actions|local machine|Docker Compose|Vercel|AWS|etc.] |

## Capabilities

/* What this environment provides that others don't */

- [Capability 1 — e.g., "Full filesystem access for integration tests"]
- [Capability 2 — e.g., "Isolated Docker network for service tests"]
- (continue)

## Constraints

/* Limitations of this environment */

- [Constraint 1 — e.g., "No GUI — headless browser only"]
- [Constraint 2 — e.g., "5 minute timeout per test"]
- (continue)

```

## Notes

- Environments are leaf nodes — no `artifact-refs`. Test Suites and E2E tests reference them.
- Lives in Context/ folder but rendered on the map canvas in the infrastructure band.
- Status: `draft` = planned. `active` = currently used. `stale` = out of date. `deprecated` = retired.
