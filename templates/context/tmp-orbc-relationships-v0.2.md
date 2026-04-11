# Relationships

/* How this project relates to other projects — dependencies, consumers, boundaries. */
/* This is an untyped Context document — no (Type) prefix in the filename. */
/* Lives in the project's Context/ folder. */

# Filename: Context/(OrbCode Project) [Name] . Relationships.md

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/relationships"
status: [active|stale]
artifact-refs:
  - "[[related OrbCode Project(s)]]"
template: "[[tmp-orbc-relationships-v0.2]]"
orbh-sessions:
  - "[[agent-session-uuid]]"
authors:
  - "[[@author]]"
---

# Relationships

[1-2 sentence summary of this project's position — what it depends on and what depends on it]

## Position

**Role:** [What this project provides to the ecosystem]

**Workspace:** [[(OrbCode Workspace) Parent Workspace]]

/* Mermaid graph showing this project's position relative to dependencies and consumers */

~~~mermaid
graph TD
    THIS["This Project"]
    DEP1["Dependency 1"] --> THIS
    THIS --> CON1["Consumer 1"]
~~~

## Dependencies

/* What this project depends on */

| Project | What It Provides | Integration Point |
|---------|-----------------|-------------------|
| [Project or package] | [What it gives this project] | [File or API boundary] |
| (continue) | | |

## Consumers

/* What depends on this project */

| Project | What It Receives | Integration Point |
|---------|-----------------|-------------------|
| [Project or tool] | [What it gets from this project] | [File or API boundary] |
| (continue) | | |

## Test Boundaries

**This project tests:**
- [What's tested here]
- (continue)

**This project does NOT test (delegated to others):**
- [What's tested elsewhere] → [where]
- (continue)

## Shared Concerns

/* Cross-cutting things shared with sibling projects */

- **[Concern]:** [How it's handled]
- (continue)

## Contracts

/* Explicit interfaces this project provides or consumes */

| Contract | With | Nature | Location |
|----------|------|--------|----------|
| [Interface name] | [Other project] | [provides|consumes] | [File path] |
| (continue) | | | |

## Related

- [[(OrbCode Project) [Name] . Context]] — scope, concepts, conventions
- [[(OrbCode Project) [Name] . Architecture]] — directory structure and patterns
- (continue)
```

## Notes

- The mermaid graph should show direction of dependency flow
- Test Boundaries clarify what's tested here vs. elsewhere — prevents duplicate or missing coverage
- Contracts section is optional — omit for projects with no explicit interface contracts
- Status: `active` = current. `stale` = out of date with code.
