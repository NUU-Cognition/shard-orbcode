# (System) [Name]

/* Bounded context or major subsystem. Highest level of the Map. */
/* Systems answer: "What are the major parts and boundaries?" */
/* Use mermaid to show component relationships and boundaries. */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/system"
mode: [live|planned|altered]
status: [draft|active|deprecated]
code-refs:
  - [main/directory/path/]
  - (continue)
artifact-refs:
  - "[[(Feature) Key Feature]]"
  - "[[(Process) Main Flow]]"
  - "[[(Data) Core Entity]]"
  - (continue)
template: "[[tmp-orbc-system-v0.1]]"
---

# (System) [Name]

[Description: what this system does, why it exists, and its role in the larger codebase. Write for a human.]

## Architecture

/* Visual overview of this system's internal structure */

~~~mermaid
graph TD
    subgraph [System Name]
        A[Component A] --> B[Component B]
        B --> C[Component C]
    end

    EXT[External Dependency] -.->|uses| A
    C -.->|calls| OUT[External Service]
~~~

/* Show the major components and how they connect. Keep it to 5-10 nodes max. */

## Boundaries

**Owns:**
- [What this system is responsible for]
- (continue)

**Does not own:**
- [What belongs elsewhere] (→ [Other System])
- (continue)

## Key Concepts

/* Domain concepts specific to this system that agents need to know */

| Concept | Meaning |
|---------|---------|
| [Term] | [What it means in this system] |
| (continue) | |

## Components

/* Skip for simple systems */

| Component | Purpose | Location |
|-----------|---------|----------|
| [Name] | [What it does] | `path/to/code` |
| (continue) | | |

## Interfaces

/* How this system communicates */

**Inbound:** [APIs, events consumed, entry points]

**Outbound:** [Services called, events published]

## Related

- [[(Feature) Key Feature]] — [relationship]
- [[(System) Adjacent System]] — [how they interact]
- (continue)
```

## Notes

- Start mapping here — every codebase has 1-3 systems
- The Architecture diagram is the most important section
- Boundaries section defines what's in vs out
- `mode: live` = current code. `planned` = proposed system. `altered` = changes incoming.
