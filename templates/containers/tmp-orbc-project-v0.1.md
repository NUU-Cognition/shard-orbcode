# (OrbCode Project) [Name]

/* Entry point for a single codebase/package. */
/* Project answers: "What does this codebase do and how is it structured?" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/project"
status: [active|archived]
project-type: [application|cognitive]
codebase: [path/to/codebase/root]
workspace: "[[(OrbCode Workspace) Parent Workspace]]"
template: "[[tmp-orbc-project-v0.1]]"
---

# (OrbCode Project) [Name]

[Description: what this codebase does]

## Adaptations

/* Optional — omit if the project follows standard OrbCode conventions.
   Documents how this project deviates from the default structure.
   Agents MUST read this section before working on the project. */

- [Describe deviation and why]
- (continue)

## Overview

**Purpose:** [Why this codebase exists]

**Language:** [Primary language(s)]

**Type:** [library|application|service|cli|shard|etc]

## Map

### Overviews

/* Optional — high-level diagrams */

- [[(Overview) Architecture Overview]] — [brief description]
- (continue)

### Systems

- [[(System) Main System]] — [brief description]
- (continue)

### Key Features

- [[(Feature) Core Feature]] — [brief description]
- (continue)

### Processes

- [[(Process) Main Flow]] — [brief description]
- (continue)

### Data

- [[(Data) Core Entity]] — [brief description]
- (continue)

### APIs

- [[(API) Public API]] — [brief description]
- (continue)

## Verification

- [[(Test Architecture) Project Name]] — how testing works
- [[(Test Runner) Name]] — how to run tests
- (continue)

## Context

/* Optional — only if project needs its own context beyond workspace */

- [[(Relationships) Project Name]] — how this project relates to others
- [[(Context) Project Context]] — project-specific knowledge
- (continue)

## Notes

/* Optional — project-specific concepts and references */

- [[(OrbCode Reference) Topic]] — [what it covers]
- (continue)

## Docs

- [[(Docs) Technology Name]] — [what docs this covers]
- (continue)

## Entry Points

| Entry Point | Purpose |
|-------------|---------|
| `path/to/main.ts` | [Application entry] |
| `path/to/index.ts` | [Library exports] |
| (continue) | |

## Related

- [[(OrbCode Workspace) Parent]] — containing workspace
- [[(OrbCode Project) Sibling]] — related project
- (continue)
```

## Notes

- One Project per distinct codebase/package
- `codebase` field points to the root directory for code-refs
- Layer folders (Map/, Context/, Log/, Tasks/, Tests/) support arbitrary subfolders
