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
template: "[[tmp-orbc-project-v0.2]]"
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

### Systems

- [[(System) Main System]] — [brief description]
- (continue)

### Key Features

- [[(Feature) Core Feature]] — [brief description]
- (continue)

### Data

- [[(Data) Core Entity]] — [brief description]
- (continue)

### UIs

- [[(UI) Main View]] — [brief description]
- (continue)

### Dependencies

- [[(Dependency) Library Name]] — [brief description]
- (continue)

### Consumers

- [[(Consumer) Client Name]] — [brief description]
- (continue)

## Testing

- [[(Test Suite) Suite Name]] — [what it covers]
- [[(E2E) Flow Name]] — [what it verifies]
- (continue)

## Context

/* Untyped project knowledge — namespaced with dot notation but no type parentheses.
   Standard documents: Overview, Context, Architecture, Tech Stack, Relationships.
   Additional topic-specific docs can be added.
   Environment artifacts are the one typed Context document — they appear on the map. */

- [[(OrbCode Project) [Name] . Overview]] — visual architecture overview
- [[(OrbCode Project) [Name] . Context]] — scope, concepts, conventions
- [[(OrbCode Project) [Name] . Architecture]] — structure, patterns, constraints
- [[(OrbCode Project) [Name] . Tech Stack]] — language, build, dependencies
- [[(OrbCode Project) [Name] . Relationships]] — inter-project connections
- [[(OrbCode Project) [Name] . (Environment) Dev]] — dev environment
- (continue)

## Notes

/* Optional — project-specific concepts, references, and general notes */

- [[(OrbCode Reference) Topic]] — [what it covers]
- [[(OrbCode Project) [Name] . [Topic]]] — [general note description]
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
- Context/ contains Overview + standard docs + typed Environment artifacts
- Testing/ contains Test Suite, Test, and E2E artifacts
- Map/ contains System, Feature, Data, UI, Dependency, Consumer
- Notes/ contains References and general notes
