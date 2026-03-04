# (Relationships) [Name]

/* How this project relates to other projects in the workspace. */
/* Relationships answers: "How does this project fit into the system and where are its boundaries?" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/relationships"
status: [draft|active|deprecated]
artifact-refs:
  - "[[(OrbCode Project) Dependency Project]]"
template: "[[tmp-orbc-relationships-v0.1]]"
---

# (Relationships) [Name]

[Description: how this project fits into the broader system]

## Position

/* Where this project sits in the overall system */

**Role:** [What this project is responsible for in the system]

**Workspace:** [[(OrbCode Workspace) Parent Workspace]]

~~~mermaid
graph TD
    THIS["[This Project]"]
    DEP1["[Dependency]"]
    CON1["[Consumer]"]

    DEP1 -->|provides| THIS
    THIS -->|provides| CON1
~~~

/* Diagram showing this project's position relative to others */

## Dependencies

/* Projects this project depends on — what it needs from others */

| Project | What It Provides | Integration Point |
|---------|-----------------|-------------------|
| [[(OrbCode Project) Name]] | [What this project uses from it] | [API, shared types, data, etc.] |
| (continue) | | |

## Consumers

/* Projects that depend on this project — what it provides to others */

| Project | What It Receives | Integration Point |
|---------|-----------------|-------------------|
| [[(OrbCode Project) Name]] | [What this project provides] | [API, shared types, data, etc.] |
| (continue) | | |

## Test Boundaries

/* What this project tests vs what it delegates to other projects */

**This project tests:**
- [What is verified here — scope of this project's test suite]
- (continue)

**This project does NOT test (delegated to others):**
- [What is tested by dependency projects] → [[(OrbCode Project) Owner]]
- (continue)

**Mocking strategy:**
- [How dependencies are mocked at the boundary — adapters, stubs, fakes]
- (continue)

## Shared Concerns

/* Cross-cutting things managed at workspace level that affect this project */

- **[Concern]:** [How it affects this project specifically]
- (continue)

## Contracts

/* Agreements between this project and its neighbors */

| Contract | With | Nature | Location |
|----------|------|--------|----------|
| [Interface/API name] | [[(OrbCode Project) Other]] | [consumes\|provides] | `path/to/contract` |
| (continue) | | | |
```

## Notes

- One Relationships per project (at most) — skip for standalone projects with no workspace
- `artifact-refs` reference other OrbCode Projects this one depends on (outbound only)
- Consumer list is informational — consumers don't go in `artifact-refs` (their Relationships will reference this project)
- Test Boundaries is critical for verification projects that span multiple products
- Mocking strategy helps agents understand what to fake when writing tests
- Keep this updated when projects are added, removed, or restructured
