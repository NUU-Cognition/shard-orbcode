# (Consumer) [Name]

/* An external service, client, or integration that depends on this project. */
/* Consumer answers: "What depends on this project's outputs?" */
/* Consumers reference the systems, features, data, and UIs they consume from this project. */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/consumer"
status: [draft|active|stale|deprecated]
template: "[[dev-tmp-orbc-consumer-v0.2]]"
---

[Description: what this consumer does and how it uses this project]

## What It Consumes

- [Output 1 — e.g., "REST API for user management"]
- [Output 2 — e.g., "Event stream via webhooks"]
- (continue)

## Integration Point

| Aspect | Detail |
|--------|--------|
| Type | [service|app|client|integration|webhook] |
| Protocol | [HTTP REST|gRPC|WebSocket|event bus|file export|etc.] |
| Contract | [API version, schema, or spec they depend on] |
| Owner | [team or org responsible for the consumer] |

## Constraints

- [Constraint 1 — e.g., "Expects < 200ms p99 latency"]
- [Constraint 2 — e.g., "Cannot handle breaking schema changes"]
- (continue)

```

## Notes

- Consumers reference systems, features, data, and UIs they consume via `artifact-refs`. Systems also reference their consumers.
- Status: `draft` = planned. `active` = actively consuming. `stale` = out of date. `deprecated` = no longer relevant.
