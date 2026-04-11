# (Data) [Name]

/* A core data structure, entity, or schema. */
/* Data answers: "What shape is the data?" */
/* Use erDiagram for relationships, stateDiagram for entity lifecycle. */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/data"
status: [draft|active|stale|deprecated]
code-refs:
  - path/to/types.ts
  - path/to/schema.sql
  - (continue)
template: "[[tmp-orbc-data-v0.2]]"
---

[Description: what this data represents and why it matters]

## Schema

~~~typescript
interface [Name] {
  id: string;
  [field]: [type];
  // (continue)
}
~~~

## Relationships

/* Use erDiagram for complex relationships */

~~~mermaid
erDiagram
    [Entity A] ||--o{ [Entity B] : "has many"
    [Entity A] }|--|| [Entity C] : "belongs to"
~~~

## Lifecycle

/* Optional — use stateDiagram if the entity has meaningful state transitions */

~~~mermaid
stateDiagram-v2
    [*] --> [Initial]
    [Initial] --> [Active]: [event]
    [Active] --> [Archived]: [event]
    [Archived] --> [*]
~~~

## Invariants

- [Rule 1 — e.g., "status can only move forward"]
- (continue)

## Fields

/* Only document non-obvious fields */

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | [Purpose] |
| `[field]` | [type] | [Yes|No] | [What it represents] |
| (continue) | | | |

```

## Notes

- Focus on semantics, not just field lists
- Invariants are the most valuable section
- Status: `draft` = planned. `active` = reflects current schema. `stale` = out of date. `deprecated` = no longer relevant.
- Data is a leaf node — no `artifact-refs`. Parent System/Feature references Data, not vice versa.
