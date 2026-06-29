# (OrbCode Project) [Name]

/* Entry point for a single codebase. */
/* Project answers: "What does this codebase do and how is it structured?" */
/*
  FRONTMATTER CONTRACT:
  - codebase: REQUIRED. A codebase-reference marker wikilink — a file in
    Mesh/Metadata/References/Codebases/ (e.g. [[rf-cb-steel]]). NEVER a raw path;
    paths are per-machine and live inside the marker. Resolve with `flint resolve codebase <Name>`.
    All `code-refs` on Map artifacts are paths relative to this codebase root.
  - project-type: application (code that runs) | cognitive (markdown-as-code: shards, prompt programs)
  - status: active | archived
  Generate VALID YAML — replace the placeholder VALUES, keep the shapes.
*/

```markdown
---
id: "GENERATE-UUID4"
tags:
  - "#orbc/project"
status: "active"
project-type: "application"
codebase: "[[rf-cb-steel]]"
template: "[[dev-tmp-orbc-project-v0.2]]"
orbh-sessions:
  - "[[AGENT-SESSION-UUID]]"
authors:
  - "[[@author]]"
---

# (OrbCode Project) [Name]

[Description: what this codebase does]

## Adaptations

/* Optional — omit if the project follows standard OrbCode conventions.
   Documents how this project deviates from the default structure.
   Agents MUST read this section before working on the project. */

- [Describe deviation and why]

## Overview

**Purpose:** [Why this codebase exists]

**Language:** [Primary language(s)]

**Type:** [library|application|service|cli|shard|etc]

## Map

/* The core spine: System -> Module -> Feature -> Data */

### Systems

- [[(OrbCode Project) [Name] . (System) Main System]] — [brief description]

### Modules

- [[(OrbCode Project) [Name] . (Module) Area]] — [brief description]

### Features

- [[(OrbCode Project) [Name] . (Feature) Core Feature]] — [brief description]

### Data

- [[(OrbCode Project) [Name] . (Data) Core Entity]] — [brief description]

## Context

- [[(OrbCode Project) [Name] . Overview]] — visual architecture overview
- [[(OrbCode Project) [Name] . Context]] — scope, concepts, conventions
- [[(OrbCode Project) [Name] . Architecture]] — structure, patterns, constraints
- [[(OrbCode Project) [Name] . Tech Stack]] — language, build, dependencies
- [[(OrbCode Project) [Name] . Relationships]] — inter-project connections

## Notes

- [[(OrbCode Reference) Topic]] — [what it covers]

## Entry Points

| Entry Point | Purpose |
|-------------|---------|
| `path/to/main.ts` | [Application entry] |

## Related

- [[(OrbCode Project) Sibling]] — related project
```

## Notes

- One Project per distinct codebase.
- `codebase` is **always** a `[[rf-cb-*]]` codebase-reference marker — never a raw path.
- `Map/` contains the core spine: System, Module, Feature, Data.
- `Context/` contains Overview + the standard untyped docs.
- Frontmatter wikilinks are fully qualified; body prose may use aliases for readability.
