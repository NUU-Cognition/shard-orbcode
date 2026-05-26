# (E2E) [Name]

/* An end-to-end test that spans multiple systems. */
/* E2E answers: "What cross-system paths are verified?" */
/* Sits below the Consumer band as a horizontal span. */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/e2e"
status: [draft|pass|fail|stale|deprecated]
artifact-refs:
  /* E2E tests reference Features, Systems, and Environments — see Reference Model */
  - "[[referenced features, systems, and environments]]"
  - (continue)
template: "[[dev-tmp-orbc-e2e-v0.2]]"
---

[Description: what end-to-end flow this test exercises and what it validates]

## Flow

/* The path this E2E test takes through the system — ordered steps */

1. [Step 1 — e.g., "CLI invokes `flint init` with a preset"]
2. [Step 2 — e.g., "Sync pipeline runs all 10 phases"]
3. [Step 3 — e.g., "Export produces markdown bundle"]
4. (continue)

## Systems Crossed

- [[system artifact]]
- (continue)

## Environment

| Aspect | Detail |
|--------|--------|
| Runner | [Vitest|Playwright|manual|etc.] |
| Fixtures | [what test data is needed] |
| Env | [[(Environment) CI]] |

## Assertions

- [Assertion 1 — e.g., "Output directory contains expected files"]
- [Assertion 2 — e.g., "No errors in sync log"]
- (continue)

```

## Notes

- E2E tests reference Features, Systems, and Environments via `artifact-refs`.
- They span system boundaries — that's what makes them E2E rather than integration tests within a suite.
- Rendered as horizontal cards below the Consumer band on the plate.
- Status: `draft` = planned. `pass` = passing. `fail` = failing. `stale` = out of date. `deprecated` = no longer maintained.
