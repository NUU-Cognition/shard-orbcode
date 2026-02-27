# (System) [Name]

/* Bounded context or major subsystem. Highest level of the Map. */
/* Systems answer: "What are the major parts and boundaries?" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/system"
status: [draft|active|deprecated]
code-refs:
  - [main/directory/path/]
  - (continue)
artifact-refs:
  - "[[(Feature) Key Feature]]"
  - "[[(Process) Main Flow]]"
  - "[[(Data) Core Entity]]"
  - (continue)
template: tmp-orbc-system
---

# (System) [Name]

[Description: what this system does and why it exists]

## Boundaries

**Owns:**
- [What this system is responsible for]
- (continue)

**Does not own:**
- [What belongs elsewhere] (→ [Other System])
- (continue)

## Components

/* Optional — skip for simple systems */

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

- Start mapping here — every codebase has 1-5 systems
- Boundaries section is the most important
- Components table is optional for simple systems
- Link to Features and Data this system contains
