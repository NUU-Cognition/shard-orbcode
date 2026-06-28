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
parent:
  /* Always rendered. Leave empty for a root Data artifact (a top-level schema/entity).
     A Data artifact's parents MUST all be other Data artifacts.
     Scalar (single parent) or list (multiple parents) both accepted:
       parent: "[[(Data) Parent Schema]]"
       parent:
         - "[[(Data) Parent Schema]]"
         - "[[(Data) Shared Entity]]"
     The first-listed parent drives the sidebar tree. */
code-refs:
  - path/to/types.ts
  - path/to/schema.sql
  - (continue)
artifact-refs:
  /* Free-form "related to" links — graph edges on the canvas, NOT hierarchy.
     Hierarchy (sidebar tree) is determined exclusively by the `parent:` field above.
     Use this only for non-parent relationships between Data (e.g. a related schema).
     Data references Data only — see Reference Model. Omit if there are none. */
  - "[[(Data) Related Schema]]"
  - (continue)
template: "[[dev-tmp-orbc-data-v0.2]]"
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
- Data forms a hierarchy via the `parent:` field — a sub-schema sets `parent: [[(Data) Parent Schema]]`. Data references Data only; it never references Systems, Features, or UIs.
- Features and Systems reference Data via `artifact-refs` — use backlinks to find them.
