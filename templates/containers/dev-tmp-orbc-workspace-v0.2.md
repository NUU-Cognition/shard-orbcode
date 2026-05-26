# (OrbCode Workspace) [Name]

/* Top-level container for monorepos or multi-project setups. */
/* Workspace answers: "How do these projects fit together?" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/workspace"
status: [active|archived]
template: "[[dev-tmp-orbc-workspace-v0.2]]"
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

## Shared Concerns

/* Cross-cutting things that apply to all projects */

- **[Concern]:** [How it's handled across projects]
- (continue)

## Context

/* Free-form context docs — no required types. Environment artifacts are typed. */

- Architecture — [notes on shared tech stack]
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
- Context/ contains free-form docs + typed Environment artifacts
