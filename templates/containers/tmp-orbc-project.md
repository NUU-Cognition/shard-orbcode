# (OrbCode Project) [Name]

/* Entry point for a single codebase/package. */
/* Project answers: "What does this codebase do and how is it structured?" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/project"
status: [active|archived]
project-type: [product|verification|cognitive]
stability: [initial|stable|unstable]
uow: "[[(UoW) NNN Description]]"  /* present only when unstable */
codebase: [path/to/codebase/root]
workspace: "[[(OrbCode Workspace) Parent Workspace]]"
template: tmp-orbc-project
---

# (OrbCode Project) [Name]

[Description: what this codebase does]

## Adaptations

/* Optional — omit this section if the project follows standard OrbCode conventions.
   Use this to document any ways this project deviates from the default structure.
   Agents MUST read this section before working on the project — it overrides standard assumptions. */

- [Describe how this project differs from the standard OrbCode structure and why]
- (continue)

## Overview

**Purpose:** [Why this codebase exists]

**Language:** [Primary language(s)]

**Type:** [library|application|service|cli|test-suite|shard|etc]

## Map

/* Product projects: full Map layer (Systems, Features, Data, APIs, Processes).
   Verification projects: thin Map — typically just one System defining test boundaries.
   Cognitive projects: Map describes the program's conceptual structure. */

### Systems

- [[(System) Main System]] — [brief description]
- (continue)

### Key Features

/* Product and cognitive projects: list capabilities.
   Verification projects: skip or keep minimal. */

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

/* All project types can have a Verification section.
   Verification projects: this is the primary content — test architecture, runners, fixtures.
   Product projects: grows as tests are added.
   Cognitive projects: may use review checklists instead of automated tests. */

- [[(Test Architecture) Project Name]] — how testing works
- [[(Test Runner) Name]] — how to run tests
- (continue)

## Context

/* Optional — only if project needs its own context beyond workspace */

- [[(Relationships) Project Name]] — how this project relates to others
- [[(Context) Project Context]] — project-specific knowledge
- (continue)

## Docs

/* Manual references to external documentation. Created by hand, no template. */

- [[(Docs) Technology Name]] — [what docs this covers]
- (continue)

## Entry Points

/* Where to start reading the code */

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

## Project Types

| Type | Primary Layer | Map Depth | Verification Depth | When to Use |
|------|--------------|-----------|-------------------|-------------|
| `product` | Map | Full (Systems, Features, Data, APIs) | Grows with codebase | Libraries, apps, services, CLIs |
| `verification` | Verification | Thin (1 System for boundaries) | Rich (Test Architecture, Runners, Environments, Fixtures) | Integration test suites, cross-project verification |
| `cognitive` | Map | Describes program structure | Adapted (review checklists, not automated tests) | Flint shards, prompt programs, markdown-as-code |

## Stability

| State | Meaning | `uow` field |
|-------|---------|-------------|
| `initial` | Project in setup phase, pre-governance — no UoW | Absent |
| `stable` | Map + Code + Verification layers agree | Absent |
| `unstable` | A UoW is open — layers are being changed | Present — links to open UoW |

- Stability tracks consistency between Map, Code, and Verification layers
- Context-layer changes do NOT affect stability (free to change anytime)
- "Stable" does NOT mean tests pass — it means layers agree on current state
- The `uow` field is only present when `stability` is `unstable`
- The `initial` phase is pre-governance — setup workflows run freely. The Stabilize workflow (`wkfl-orbc-stabilize`) transitions `initial → stable`. UoW 001 is the first change after stabilization.

## Adaptations

The Adaptations section documents how a project deviates from standard OrbCode conventions. It is optional — omit it if the project is standard. When present, agents must read it before working on the project because it overrides default assumptions.

**Common adaptations:**
- **Delegated verification** — Tests live in a sibling project (e.g. an integration test package). The Verification layer of this project points to that sibling instead of containing its own Tests/ folder. The sibling should be a `verification` project type.
- **Shared codebase** — Multiple OrbCode projects map overlapping code (e.g. a monorepo package used by several consumers). Describe which parts this project owns vs shares.
- **Non-standard layer location** — A layer lives somewhere unexpected (e.g. Docs/ in a different repo, tests in a parent package).
- **Custom artifact types** — The project uses artifact types not in the standard taxonomy (e.g. `(Docs)` files for external reference).
- **Modified stability rules** — The project relaxes or tightens the standard stability model (e.g. a prototype project that doesn't require full verification coverage to stabilize).

Adaptations are freeform — describe the deviation and why it exists. Agents should treat Adaptations as project-local overrides to the rules in `init-orbc.md`.

## Notes

- One Project per distinct codebase/package
- `project-type` determines which layers are emphasized, not which exist — all projects CAN have any layer
- `codebase` field points to the root directory for code-refs
- Layer folders (Map/, Context/, Log/, Tests/) support arbitrary subfolders
- Verification projects are workspace-level entities that prove other projects work together
