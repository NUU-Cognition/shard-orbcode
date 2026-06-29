# (System) [Name]

/* Bounded context or architectural seam — the root of the Map. */
/* Systems answer: "What are the major boundaries?" */
/*
  FRONTMATTER CONTRACT (the plate + validator enforce this):
  - All wikilinks are FULLY QUALIFIED: (OrbCode Project) <Project> . (Type) <Name>
  - parent: exactly ONE wikilink to another System, or "" for a root System. Never a list.
  - status (structural): draft | active | stale | deprecated
  - curation: proposed (agent draft) | accepted (human-committed in the plate)
  - artifact-refs: Map types only — System, Module, Feature, Data
  - spec-refs: Specifications shard artifacts (optional)
  - code-refs grammar: "path/", "path/file.ext", "path/file.ext#symbol"
  Generate VALID YAML — replace the placeholder VALUES, keep the shapes.
*/

```markdown
---
id: "GENERATE-UUID4"
tags:
  - "#orbc/system"
status: "active"
curation: "proposed"
parent: ""
code-refs:
  - "src/area/"
artifact-refs:
  - "[[(OrbCode Project) PROJECT . (Module) Auth]]"
  - "[[(OrbCode Project) PROJECT . (Data) Core Entity]]"
spec-refs: []
template: "[[dev-tmp-orbc-system-v0.2]]"
orbh-sessions:
  - "[[AGENT-SESSION-UUID]]"
authors:
  - "[[@author]]"
---

# (System) [Name]

[Description: what this system does, why it exists, and its role in the larger codebase. Write for a human.]

## Architecture

~~~mermaid
graph TD
    subgraph SystemName
        A[Component A] --> B[Component B]
        B --> C[Component C]
    end
    EXT[External Dependency] -.->|uses| A
~~~

## Boundaries

**Owns:**
- [What this system is responsible for]

**Does not own:**
- [What belongs elsewhere] (-> [Other System])

## Key Concepts

| Concept | Meaning |
|---------|---------|
| [Term] | [What it means in this system] |

## Components

| Component | Purpose | Location |
|-----------|---------|----------|
| [Name] | [What it does] | `path/to/code` |

## Interfaces

**Inbound:** [Events consumed, entry points]

**Outbound:** [Services called, events published]
```

## Notes

- Most projects start with 1-3 root Systems; very large or multi-domain codebases may have more.
- A System owns Modules (package-level groupings) and/or Features directly.
- `parent` is a single owning System (or empty for a root). Secondary relationships go in `artifact-refs`.
- Status: `draft` = planned, `active` = reflects current code, `stale` = out of date, `deprecated` = retired. All transitions are committed by the human in the plate; `curation: proposed` until the human accepts.
- Body prose may use aliased links for readability: `[[(OrbCode Project) PROJECT . (Module) Auth|Auth]]`. Frontmatter must stay fully qualified.
