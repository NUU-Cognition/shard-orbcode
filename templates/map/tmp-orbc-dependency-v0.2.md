# (Dependency) [Name]

/* An external library, service, or API that this project depends on. */
/* Dependency answers: "What does this project rely on from outside?" */
/* Dependencies are leaf nodes — they have no outbound artifact-refs. */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/dependency"
status: [draft|active|stale|deprecated]
template: "[[tmp-orbc-dependency-v0.2]]"
---

[Description: what this dependency provides and why we rely on it]

## What It Provides

- [Capability 1 — e.g., "PostgreSQL relational storage with JSONB support"]
- [Capability 2]
- (continue)

## Integration Point

| Aspect | Detail |
|--------|--------|
| Type | [library|service|API|database|platform] |
| Version | [version constraint or "latest"] |
| Protocol | [npm package|HTTP REST|gRPC|TCP|file system|etc.] |
| Config | [env var or config key used to connect] |

## Constraints

- [Constraint 1 — e.g., "Rate limited to 1000 req/min"]
- [Constraint 2 — e.g., "No offline fallback"]
- (continue)

```

## Notes

- Dependencies are leaf nodes — no `artifact-refs`. Systems and Features reference Dependencies, not vice versa.
- Status: `draft` = planned. `active` = currently used. `stale` = out of date. `deprecated` = migrating away.
