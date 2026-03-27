# OrbCode

A semantic documentation layer for post-MVP codebases. OrbCode gives developers and agents a structured, human-readable understanding of what a codebase does — without requiring anyone to read the source code.

**Version:** 0.3.0 | **Shorthand:** `orbc` | **Depends:** shard-flint

## What It Does

After MVP, the hard problem isn't writing code — it's understanding the system well enough to direct changes. OrbCode creates a semantic mirror of a codebase: structured markdown artifacts that describe features, systems, data models, and processes in conceptual, visual, human-readable form.

OrbCode is not a project management tool. It doesn't drive development. You build, ship, and fix code however you normally do. OrbCode documents what exists afterward.

## Core Concepts

- **Code is truth, Map reflects it.** The Map is downstream of the codebase. When code changes, the Map catches up.
- **Three layers:** Context (project knowledge), Map (semantic mirror of code), Verification (test documentation).
- **Dot notation naming:** `(OrbCode Project) Name . (Type) Artifact Name.md`
- **Map modes:** `live` (reflects code), `planned` (being drafted), `altered` (marking refactor changes).
- **Project types:** `application` (executable code, automated tests) or `cognitive` (markdown-as-code, review-based).

## Structure

```
Shards/(Dev) OrbCode/
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
    ├── context/            # Context, Architecture, Environment, Relationships (4)
    ├── map/                # Overview, System, Feature, Process, Data, API (6)
    ├── verification/       # Test Architecture, Fixture, Test (3)
    └── notes/              # Reference (1)
```

**Output in Mesh:**

```
Mesh/OrbCode/
└── (OrbCode Project) [Name]/
    ├── (OrbCode Project) [Name].md     # Project index
    ├── Context/                         # What it is, how it's built
    ├── Map/                             # Semantic mirror of the codebase
    ├── Verification/                    # Test documentation
    └── Notes/                           # Informal knowledge
```

## Artifact Types (16 templates)

| Layer | Types |
|-------|-------|
| Container | `(OrbCode Workspace)`, `(OrbCode Project)` |
| Context | `(Context)`, `(Architecture)`, `(Environment)`, `(Relationships)` |
| Map | `(Overview)`, `(System)`, `(Feature)`, `(Process)`, `(Data)`, `(API)` |
| Verification | `(Test Architecture)`, `(Fixture)`, `(Test)` |
| Notes | `(OrbCode Reference)` |

## Workflows

| Workflow | When |
|----------|------|
| **Map Codebase** | One-time initial mapping of a post-MVP codebase |
| **Add Artifact** | After adding a new feature to the codebase |
| **Update Artifact** | After changing existing code |
| **Sync Map** | Periodic health check across all artifacts |
| **Update Context** | When project-level knowledge changes |

## Usage

1. Load `init-orbc.md` — it contains the complete shard reference
2. Run a workflow (typically `wkfl-orbc-map.md` for first-time setup)
3. Keep the Map current with `update`, `add`, and `sync` workflows as the codebase evolves

Resolution target: 5-20 Map artifacts per project. Don't document everything — document what answers human questions.
