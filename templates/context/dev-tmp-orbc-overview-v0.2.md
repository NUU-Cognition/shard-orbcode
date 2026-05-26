# Overview

/* High-level diagram-first view of a project's architecture. */
/* The diagram IS the documentation. Everything else supplements it. */
/* This is an untyped Context document — no (Type) prefix in the filename. */
/* Lives in the project's Context/ folder. */

# Filename: Context/(OrbCode Project) [Name] . Overview.md

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/overview"
status: [draft|active|stale|deprecated]
scope: [system|feature|data|integration]
artifact-refs:
  /* Overview references Systems only — see Reference Model in init-orbc.md */
  - "[[(OrbCode Project) [Name] . (System) Related System]]"
  - (continue)
template: "[[dev-tmp-orbc-overview-v0.2]]"
orbh-sessions:
  - "[[agent-session-uuid]]"
authors:
  - "[[@author]]"
---

# Overview

[One sentence: what this overview shows and why it matters]

## Diagram

/* The main visual — this IS the core of an Overview artifact */

~~~mermaid
graph TD
    subgraph [Domain/System A]
        A1[Component] --> A2[Component]
    end

    subgraph [Domain/System B]
        B1[Component] --> B2[Component]
    end

    A2 -->|[relationship]| B1
~~~

## Legend

| Symbol | Meaning |
|--------|---------|
| [Box] | [What boxes represent] |
| [Arrow] | [What arrows mean] |

## Components

| Component | Purpose | Key Files |
|-----------|---------|-----------|
| [Name from diagram] | [What it does] | `path/to/code` |
| (continue) | | |

## Scope

**What this overview covers:**
- [Included area/domain]
- (continue)

**What this overview does NOT cover:**
- [Excluded area] (-> see other Overview or System)
- (continue)
```

## Notes

- **Diagram-first**: The mermaid diagram IS the documentation
- Use for birds-eye views that don't fit in a single System
- One per project — the visual entry point for understanding the codebase
- Status: `draft` = planned. `active` = reflects current architecture. `stale` = out of date. `deprecated` = no longer relevant.
