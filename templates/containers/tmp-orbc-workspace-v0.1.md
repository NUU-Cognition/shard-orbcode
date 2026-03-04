# (OrbCode Workspace) [Name]

/* Top-level container for monorepos or multi-project setups. */
/* Workspace answers: "How do these projects fit together?" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/workspace"
status: [active|archived]
template: "[[tmp-orbc-workspace-v0.1]]"
---

# (OrbCode Workspace) [Name]

[Description: what this workspace contains and its purpose]

## Projects

/* OrbCode Projects contained in this workspace */

| Project | Type | Location | Purpose |
|---------|------|----------|---------|
| [[(OrbCode Project) Name]] | [library|application|service|cli|shard|etc] | `path/to/package` | [What it does] |
| (continue) | | | |

## Package Graph

/* How packages/projects depend on each other */

~~~mermaid
graph TD
    A[Package A] --> B[Package B]
    A --> C[Package C]
    B --> D[Shared Utils]
    C --> D
~~~

/* Or as a table: */

| Package | Depends On |
|---------|------------|
| [Package] | [Dependencies] |
| (continue) | |

## Shared Concerns

/* Cross-cutting things that apply to all projects */

- **[Concern]:** [How it's handled across projects]
- (continue)

## Context

/* Links to context-layer artifacts */

- [[(Context) Workspace Overview]] — what this workspace is
- [[(Architecture) Tech Stack]] — shared technologies
- [[(Environment) Development]] — dev setup
- (continue)

## Conventions

/* Workspace-wide rules */

- [Convention that applies to all projects]
- (continue)
```

## Notes

- One Workspace per monorepo or multi-project setup
- Projects link to individual OrbCode Projects
- Context folder contains Architecture/Environment artifacts
- Package Graph shows inter-project dependencies
- Project Type column uses the same values as the project template's Type field
