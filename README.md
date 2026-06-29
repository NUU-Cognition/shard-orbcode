# OrbCode

A **hand-curated semantic map** of a codebase. OrbCode gives developers and agents a structured, human-readable understanding of what a codebase does — and a surface to plan what it should do next.

**Version:** 0.7.0 | **Shorthand:** `orbc` | **Depends:** shard-flint

## What It Does

OrbCode is a hand-curated semantic map: a human decides what belongs on it. The codebase is the source of truth; the Map mirrors what exists and plans what's next; the **plate** (visual canvas) is the cockpit the human steers from. It creates conceptual, human-readable markdown artifacts — systems, modules, features, and data shapes — rendered as an interactive, navigable graph.

## The Invariants

1. **Hand-curated** — every artifact is a human's deliberate choice, not auto-generated.
2. **Code is truth, the Map reflects it** — the Map is downstream of the codebase.
3. **Any stage** — usable before, during, or after the code exists; `draft` bridges planning and reflection.
4. **Navigable by structure** — legibility comes from hierarchy + semantic zoom, not from staying small. The map is as big as it needs to be.
5. **Human-guided** — the agent proposes and maintains; the human disposes (curates, commits status) in the plate.
6. **Drift-detected** — artifacts anchor to code via `code-refs`; `stale` is a first-class status.

## The Core Spine

The Map is built from four types. `parent` is **exactly one** owner (singular); `artifact-refs` carries Map-type relations only.

| Type | The one question | `parent` (one) | `artifact-refs` |
|------|------------------|----------------|-----------------|
| `(System)` | What are the major architectural boundaries? | System / root | System, Module, Feature, Data |
| `(Module)` | What cohesive area groups these capabilities? | System | Module, Feature, Data |
| `(Feature)` | What single capability exists? | Module / System / Feature | Feature, Data |
| `(Data)` | What shape is the core state? | System / Module / Feature / Data | Data |

**Deferred** (no templates — re-author when reintroduced): `(UI)`, `(Dependency)`, `(Consumer)`, `(Environment)`, `(Test Suite)`, `(Test)`, `(E2E)`.

Naming is dot-notation: `(OrbCode Project) Name . (Type) Artifact Name.md`. The plate detects an artifact's **type from the filename**. Frontmatter wikilinks are **fully qualified**; `code-refs` follow a small grammar (`path/`, `path/file.ext`, `path/file.ext#symbol`); `status` describes code reality and `curation: proposed|accepted` describes human acceptance. See the init for the full contract.

## Structure

```
Shards/(Dev Remote) OrbCode/
├── shard.yaml              # Manifest (types: System, Module, Feature, Data)
├── dev-init-orbc.md        # Source of truth — load this first
├── install/                # Type definitions (System, Module, Feature, Data)
├── knowledge/              # decisions (ADRs), orbcraft, vitest, pytest
├── scripts/                # tree, validate
├── skills/                 # add_artifact
├── workflows/              # init_project, edit
└── templates/
    ├── containers/         # Project
    ├── context/            # Overview, Context, Architecture, Tech Stack, Relationships
    ├── map/                # System, Module, Feature, Data
    └── notes/              # Reference, Note
```

**Output in Mesh:**

```
Mesh/OrbCode/
└── (OrbCode Project) [Name]/
    ├── (OrbCode Project) [Name].md     # Project index
    ├── Context/                         # Untyped project knowledge (optional)
    ├── Map/                             # Semantic mirror: System → Module → Feature → Data
    └── Notes/                           # Informal knowledge
```

## Usage

1. Load `dev-init-orbc.md` — it contains the complete shard reference.
2. Run `dev-wkfl-orbc-init_project.md` to stand up a project — resolve the codebase, gather context, seed anchor artifacts.
3. Evolve the map with `dev-wkfl-orbc-edit.md` (create/update artifacts, flag drift); create a single artifact directly with the `dev-sk-orbc-add_artifact.md` skill.
4. Plan changes by creating `draft` artifacts and linking tasks via `task-refs`.
5. Check the contract with `flint shard orbc validate "(OrbCode Project) <Name>"` — it fails loudly where the plate would degrade silently.

Resolution is about **relevance, not a number** — seed a small anchor set and let the human grow the map deliberately. The agent proposes; the human commits status in the plate.
