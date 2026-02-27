# (Overview) [Name]

/* High-level diagram-first view of a domain, system, or feature area. */
/* Overview answers: "How do these pieces fit together visually?" */
/* Use for: system landscapes, feature relationships, data flows, integration maps */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/overview"
status: [draft|active|deprecated]
scope: [system|feature|data|integration]
code-refs:
  - [relevant/paths/]
artifact-refs:
  - "[[(System) Related System]]"
  - "[[(Feature) Related Feature]]"
  - (continue)
template: tmp-orbc-overview
---

# (Overview) [Name]

[One sentence: what this overview shows and why it matters]

## Diagram

/* The main visual — this is the core of an Overview artifact */

```mermaid
graph TD
    subgraph [Domain/System A]
        A1[Component] --> A2[Component]
    end

    subgraph [Domain/System B]
        B1[Component] --> B2[Component]
    end

    A2 -->|[relationship]| B1
```

/* Choose diagram type based on what you're showing:
   - graph TD/LR: component relationships, dependencies
   - flowchart: data/control flow
   - sequenceDiagram: interactions over time
   - erDiagram: data relationships
   - C4Context/C4Container: architectural context
*/

## Legend

/* Explain what the diagram elements mean */

| Symbol | Meaning |
|--------|---------|
| [Box] | [What boxes represent] |
| [Arrow] | [What arrows mean] |
| [Color/Style] | [If using colors or styles] |

## Components

/* Brief description of each major element in the diagram */

| Component | Purpose | Key Files |
|-----------|---------|-----------|
| [Name from diagram] | [What it does] | `path/to/code` |
| (continue) | | |

## Relationships

/* Explain the connections shown */

| From | To | Relationship |
|------|-----|-------------|
| [Component A] | [Component B] | [How they interact] |
| (continue) | | |

## Scope

**What this overview covers:**
- [Included area/domain]
- (continue)

**What this overview does NOT cover:**
- [Excluded area] (→ see [[(Overview) Other Overview]])
- (continue)

## Related

- [[(System) Detailed System]] — implementation details
- [[(Feature) Key Feature]] — specific capability
- [[(Overview) Adjacent Overview]] — neighboring domain
- (continue)
```

## Notes

- **Diagram-first**: The mermaid diagram IS the documentation
- Use for birds-eye views that don't fit in a single System or Feature
- Great for: onboarding, cross-cutting concerns, integration points
- Keep diagrams simple — 5-10 components max, link to details
- Update diagram when structure changes

## When to Use Overview vs Other Types

| Use Overview When | Use System When | Use Process When |
|-------------------|-----------------|------------------|
| Showing multiple systems together | Documenting one bounded context | Showing sequential flow |
| Explaining integration points | Detailing internal components | Documenting a workflow |
| Providing birds-eye orientation | Defining boundaries | Explaining how data moves |
