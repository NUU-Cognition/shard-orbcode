# (Data) [Name]

/* A core data structure, entity, or schema. */
/* Data answers: "What shape is the data?" */
/* Use erDiagram for relationships, stateDiagram for entity lifecycle. */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/data"
mode: [live|planned|altered]
status: [draft|active|deprecated]
code-refs:
  - path/to/types.ts
  - path/to/schema.sql
  - (continue)
template: "[[tmp-orbc-data-v0.1]]"
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

/* Or as a table for simpler relationships: */

| Related | Relationship |
|---------|--------------|
| [[(Data) Other]] | [has many|belongs to|references] |
| (continue) | |

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

/* Rules that must always be true — most valuable section */

- [Rule 1 — e.g., "status can only move forward"]
- [Rule 2]
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
- Use erDiagram for entity relationships, stateDiagram for lifecycle
- `mode: live` = current schema. `planned` = proposed entity. `altered` = schema changes incoming.
- Data is a leaf node — no `artifact-refs`. Parent System references Data, not vice versa.
