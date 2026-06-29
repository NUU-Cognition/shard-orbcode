# (Data) [Name]

/* A core data structure, entity, or schema. */
/* Data answers: "What shape is the core state?" */
/*
  FRONTMATTER CONTRACT:
  - All wikilinks FULLY QUALIFIED: (OrbCode Project) <Project> . (Type) <Name>
  - parent: exactly ONE wikilink to its owner — a System, Module, Feature, or another Data (for sub-schemas).
    Never a list. Omit ("") only for a genuinely top-level shared schema.
  - status (structural): draft | active | stale | deprecated
  - curation: proposed | accepted
  - artifact-refs: Data only (non-parent relationships between schemas)
  - code-refs grammar: "path/", "path/file.ext", "path/file.ext#symbol"
  Generate VALID YAML — replace the placeholder VALUES, keep the shapes.
*/

```markdown
---
id: "GENERATE-UUID4"
tags:
  - "#orbc/data"
status: "active"
curation: "proposed"
parent: "[[(OrbCode Project) PROJECT . (Feature) Login]]"
code-refs:
  - "src/auth/types.ts#Session"
artifact-refs:
  - "[[(OrbCode Project) PROJECT . (Data) User]]"
spec-refs: []
template: "[[dev-tmp-orbc-data-v0.2]]"
orbh-sessions:
  - "[[AGENT-SESSION-UUID]]"
authors:
  - "[[@author]]"
---

# (Data) [Name]

[Description: what this data represents and why it matters]

## Schema

~~~typescript
interface Name {
  id: string;
  // (fields)
}
~~~

## Relationships

~~~mermaid
erDiagram
    EntityA ||--o{ EntityB : "has many"
    EntityA }|--|| EntityC : "belongs to"
~~~

## Invariants

- [Rule 1 — e.g., "status can only move forward"]

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | [Purpose] |
```

## Notes

- Focus on semantics and invariants, not just field lists.
- `parent` is the single conceptual **owner** of this data — the System, Module, or Feature it primarily belongs to (or another Data for a sub-schema). This is what makes Data collapse under its owner on the plate. For shared data, pick the primary owner as `parent` and let every other user link it via `artifact-refs`.
- Data references Data only via `artifact-refs`; it never references Systems, Modules, or Features upward.
- Status: `draft` = planned, `active` = reflects current schema, `stale` = out of date, `deprecated` = retired. Committed by the human in the plate; `curation: proposed` until accepted.
