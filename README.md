# OrbCode

A semantic documentation layer for codebases. OrbCode gives developers and agents a structured, human-readable understanding of what a codebase does — and what it should do next.

**Version:** 0.6.0 | **Shorthand:** `orbc` | **Depends:** shard-flint

## What It Does

OrbCode is a semantic workspace — both reflecting what code does and planning what it should do next. It creates structured markdown artifacts that describe features, systems, data models, and user surfaces in conceptual, visual, human-readable form.

## Core Concepts

- **Code is truth, Map reflects it.** The Map is downstream of the codebase.
- **Reflection + planning.** Document what exists AND plan what should exist. `draft` status bridges them.
- **Four layers:** Context (project knowledge), Map (semantic mirror), Testing (verification), Notes (free-form).
- **Dot notation naming:** `(OrbCode Project) Name . (Type) Artifact Name.md`
- **Project types:** `application` (executable code) or `cognitive` (markdown-as-code).

## Structure

```
Shards/(Dev) Orbcode/
├── shard.yaml              # Manifest
├── init-orbc.md            # Source of truth — load this first
├── knowledge/
│   ├── knw-orbc-vitest.md  # Vitest setup reference
│   └── knw-orbc-pytest.md  # pytest setup reference
├── workflows/
│   ├── wkfl-orbc-map.md           # Initial mapping (one-time)
│   ├── wkfl-orbc-add.md           # Add new Map artifact
│   ├── wkfl-orbc-update.md        # Update existing Map artifact
│   ├── wkfl-orbc-sync.md          # Periodic drift check
│   └── wkfl-orbc-update-context.md # Refresh Context layer
└── templates/
    ├── containers/         # Workspace, Project (2)
    ├── context/            # Overview, Context, Architecture, Tech Stack, Relationships, Environment (6)
    ├── map/                # System, Feature, Data, UI, Dependency, Consumer, Test Suite, E2E (8)
    ├── verification/       # Test (1)
    └── notes/              # Reference, Note (2)
```

**Output in Mesh:**

```
Mesh/OrbCode/
└── (OrbCode Project) [Name]/
    ├── (OrbCode Project) [Name].md     # Project index
    ├── Context/                         # Untyped project knowledge + typed Environments
    │   ├── ... . Overview.md           # Visual architecture overview (untyped)
    │   ├── ... . Context.md            # Scope, concepts, conventions (untyped)
    │   ├── ... . Architecture.md       # Structure, patterns, constraints (untyped)
    │   ├── ... . Tech Stack.md         # Language, build, dependencies (untyped)
    │   ├── ... . Relationships.md      # Inter-project connections (untyped)
    │   └── ... . (Environment) Dev.md  # Typed — appears on map
    ├── Map/                             # Semantic mirror of the codebase
    ├── Testing/                         # Test Suites, Tests, E2E
    └── Notes/                           # Informal knowledge
```

## Artifact Types (19 templates)

| Layer | Types |
|-------|-------|
| Container | `(OrbCode Workspace)`, `(OrbCode Project)` |
| Context | `Overview`, `Context`, `Architecture`, `Tech Stack`, `Relationships` (untyped) + `(Environment)` (typed) |
| Map | `(System)`, `(Feature)`, `(Data)`, `(UI)`, `(Dependency)`, `(Consumer)` |
| Testing | `(Test Suite)`, `(Test)`, `(E2E)` |
| Notes | `(OrbCode Reference)`, `Note` |

## Usage

1. Load `dev-init-orbc.md` — it contains the complete shard reference
2. Run a workflow (typically `dev-wkfl-orbc-map.md` for first-time setup)
3. Keep the Map current with `update`, `add`, and `sync` workflows
4. Plan changes by creating draft artifacts and linking tasks

Resolution target: 5-20 Map artifacts per project.
