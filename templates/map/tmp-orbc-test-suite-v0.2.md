# (Test Suite) [Name]

/* A grouping of tests by concern. Sits spatially to the right of systems. */
/* Test Suite answers: "How are tests organized and grouped?" */
/* Many-to-many with systems — a suite can span multiple systems, a system can have multiple suites (or none). */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/test-suite"
status: [draft|pass|fail|stale|deprecated]
artifact-refs:
  /* Test Suites reference Tests, Features, Systems, Environment — see Reference Model */
  - "[[referenced tests, features, systems, and environments]]"
  - (continue)
template: "[[tmp-orbc-test-suite-v0.2]]"
---

[Description: what this test suite covers and why these tests are grouped together]

## Tests

/* Tests contained in this suite — wikilinks to (Test) artifacts */

- [[test artifact]]
- (continue)

## Coverage

| Aspect | Detail |
|--------|--------|
| Systems | [which systems this suite covers] |
| Features | [which features are tested] |
| Type | [unit|integration|mixed] |

## Environment

/* Where this suite runs */

- [[(Environment) CI]] — [how it's used]
- (continue)

```

## Notes

- Test Suites reference Tests, Features, Systems, and Environments via `artifact-refs`.
- Suites are many-to-many with systems — not every system has a suite, and suites can cross-cut.
- Rendered as cards with the same visual weight as System cards on the plate.
- Status: `draft` = planned. `pass` = all passing. `fail` = one or more failing. `stale` = out of date. `deprecated` = no longer maintained.
