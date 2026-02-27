# (Data) [Name]

/* A core data structure, entity, or schema. */
/* Data answers: "What shape is the data?" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/data"
status: [draft|active|deprecated]
code-refs:
  - path/to/types.ts
  - path/to/schema.sql
  - (continue)
template: tmp-orbc-data
---

[Description: what this data represents]

## Schema

~~~typescript
interface [Name] {
  id: string;
  [field]: [type];
  // (continue)
}
~~~

## Fields

/* Only document non-obvious fields */

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | [Purpose] |
| `[field]` | [type] | [Yes|No] | [What it represents] |
| (continue) | | | |

## Relationships

/* Optional: use erDiagram for complex relationships */

| Related | Relationship |
|---------|--------------|
| [[(Data) Other]] | [has many|belongs to|references] |
| (continue) | |

## Invariants

/* Rules that must always be true — most valuable section */

- [Rule 1 — e.g., "status can only move forward"]
- [Rule 2]
- (continue)

```

## Notes

- Focus on semantics, not just field lists
- Invariants are the most valuable section
- Skip lifecycle/validation unless complex
- Data is a leaf node — no `artifact-refs`. Parent System references Data, not vice versa.
