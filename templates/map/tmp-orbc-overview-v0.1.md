# (Overview) [Name]

/* High-level diagram-first view of a domain, system, or feature area. */
/* Overview answers: "How do these pieces fit together visually?" */
/* The diagram IS the documentation. Everything else supplements it. */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/overview"
mode: [live|planned|altered]
status: [draft|active|deprecated]
scope: [system|feature|data|integration]
code-refs:
  - [relevant/paths/]
artifact-refs:
  - "[[(System) Related System]]"
  - "[[(Feature) Related Feature]]"
  - (continue)
template: "[[tmp-orbc-overview-v0.1]]"
---

# (Overview) [Name]

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

/* Choose diagram type based on what you're showing:
   - graph TD/LR: component relationships, dependencies
   - flowchart: data/control flow
   - sequenceDiagram: interactions over time
   - erDiagram: data relationships
*/

## Legend

| Symbol | Meaning |
|--------|---------|
| [Box] | [What boxes represent] |
| [Arrow] | [What arrows mean] |
| [Color/Style] | [If using colors or styles] |

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
- [Excluded area] (→ see [[(Overview) Other Overview]])
- (continue)
```

## Notes

- **Diagram-first**: The mermaid diagram IS the documentation
- Use for birds-eye views that don't fit in a single System or Feature
- Great for: onboarding, cross-cutting concerns, integration points
- Keep diagrams simple — 5-10 components max, link to details
- `mode: live` = current architecture. `planned` = proposed. `altered` = changes incoming.
