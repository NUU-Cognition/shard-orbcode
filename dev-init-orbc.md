# OrbCode

A semantic documentation layer for codebases. OrbCode gives developers and agents a structured, human-readable understanding of what a codebase does — and what it should do next.

---

## What OrbCode Is

OrbCode is a **semantic workspace** — both reflecting what code does and planning what it should do next. The codebase is the source of truth. OrbCode is the mirror and the planning surface.

### When OrbCode Enters the Picture

OrbCode is for codebases that already exist and have structure. Before MVP, code is exploratory. After MVP, when the system has settled, you create the OrbCode layer. From that point forward, you keep it current and use it to plan changes.

### Core Principles

1. **Code is truth, Map reflects it.** The Map is downstream of the codebase. When code changes, the Map catches up.
2. **Reflection and planning.** OrbCode is both a mirror (describing what exists) and a planning surface (describing what should exist). The `draft` status bridges them.
3. **Human-readable first.** Map artifacts should be conceptual and understandable by a human who doesn't read code. Use mermaid diagrams, state machines, and clear prose.
4. **Resolution over completeness.** Don't document everything. 5-20 Map artifacts is typical. If you have more than 20, consolidate.
5. **Emergent semantics.** Create docs when needed, not upfront. The Map grows as you work.

---

## Naming Convention

All artifacts are **namespaced under their project** using dot notation.

```
(OrbCode Project) [Name] . (Type) [Artifact Name].md
```

### Singular vs Named Artifacts

Types that can have multiples always include a name:

```
(OrbCode Project) Mesh Core . (Feature) Document Parsing.md
(OrbCode Project) Mesh Core . (System) Parser Pipeline.md
(OrbCode Project) Mesh Core . (Environment) Dev.md
```

### Tests

Tests use descriptive names and link to features via `artifact-refs`, not through the filename:

```
(OrbCode Project) Mesh Core . (Test) Document Parsing Validation.md
```

The feature being tested is referenced in frontmatter, not encoded in the name.

---

## Layers

| Layer | Purpose | Content |
|-------|---------|---------|
| **Container** | Organisation | Workspace, Project (typed) |
| **Context** | Project knowledge | Overview, Context, Architecture, Tech Stack, Relationships (untyped) + Environment (typed, displayed on map) |
| **Map** | Semantic mirror + planning surface | System, Feature, Data, UI, Dependency, Consumer (all typed) |
| **Testing** | Verification | Test Suite, Test, E2E (all typed) |
| **Notes** | Free-form | References, notes, concepts |

### Container Artifacts

| Type | Question Answered | When to Create |
|------|-------------------|----------------|
| `(OrbCode Workspace)` | How do projects fit together? | For monorepos / multi-project systems |
| `(OrbCode Project)` | What does this codebase do? | For each distinct codebase |

Every OrbCode Project has a `project-type` field:

| Type | What It Is | Testing | Examples |
|------|-----------|---------|----------|
| `application` | Code that runs — libraries, apps, services, CLIs | Automated tests | mesh-core, a Next.js app |
| `cognitive` | Markdown-as-code — shards, prompt programs | Coherence checks | The OrbCode shard itself |

### Context Layer

Project-level knowledge. Free-form documents namespaced under the project using dot notation but **without type parentheses**.

**Standard Context documents (all have templates):**

| Document | Naming | Template | Purpose |
|----------|--------|----------|---------|
| Overview | `... . Overview.md` | `dev-tmp-orbc-overview-v0.2` | High-level diagram-first visual architecture |
| Context | `... . Context.md` | `dev-tmp-orbc-context-v0.2` | Scope, key concepts, conventions, important files |
| Architecture | `... . Architecture.md` | `dev-tmp-orbc-architecture-v0.2` | Directory structure, logical architecture, patterns, constraints |
| Tech Stack | `... . Tech Stack.md` | `dev-tmp-orbc-tech_stack-v0.2` | Language, runtime, build, test, key dependencies |
| Relationships | `... . Relationships.md` | `dev-tmp-orbc-relationships-v0.2` | Inter-project dependencies, consumers, test boundaries, contracts |

These are untyped — no `(Type)` prefix in the filename, but they do have templates and frontmatter.

**Additional Context documents** can be created for project-specific knowledge using the same naming: `(OrbCode Project) [Name] . [Topic].md` (no type parentheses).

**Environment** is the one typed Context-layer artifact. It uses the `(Environment)` type prefix and has a template, because it participates in the visual map canvas (rendered in the infrastructure band).

### Map Layer (The Core)

The Map is the heart of OrbCode. Each artifact answers one human question about the codebase:

| Type | The One Question | References | When to Create |
|------|------------------|------------|----------------|
| `(System)` | What are the major parts and boundaries? | Systems, Features, Data, UI, Dependency, Consumer | Bounded contexts, subsystems (1-3 typical) |
| `(Feature)` | What capabilities exist? | Features, Data, UI, Dependency | Key capabilities (5-15 typical) |
| `(Data)` | What shape is the core state? | — (leaf node) | Core entities, schemas |
| `(UI)` | What does the user see or invoke? | UIs (hierarchy) | Pages, views, CLI surfaces, REST endpoints |
| `(Dependency)` | What does this project depend on? | — (leaf node) | External libraries, services, APIs consumed |
| `(Consumer)` | What depends on this project? | Systems, Features, Data, UI | Downstream services, clients, integrations |

**Map artifacts should be rich and conceptual.** Use mermaid diagrams for state machines, data relationships, system boundaries, and architecture overviews.

#### What a Feature Document Contains

1. **One-line summary** — What this capability does
2. **Description** — How it works conceptually, what problem it solves
3. **Inputs and outputs** — What goes in, what comes out
4. **System context** — Which System it belongs to, how it interacts with other Features
5. **Key data structures** — Linking to Data artifacts
6. **High-level logic** — State machines, decision trees, flow diagrams (mermaid)
7. **Edge cases and constraints** — What it doesn't do, known limitations
8. **Code refs** — Where to find it in the codebase

### Testing Layer

Three types only: **Test Suite**, **Test**, **E2E**.

| Type | Question Answered | References | When to Create |
|------|-------------------|------------|----------------|
| `(Test Suite)` | How are tests grouped? | Tests, Features, Systems, Environment | Groups tests by concern |
| `(Test)` | Does code match its Map description? | Features | To verify Map artifacts |
| `(E2E)` | What end-to-end paths are tested? | Features, Systems, Environment | Cross-system integration tests |

**Test naming:** Tests use descriptive names. The feature being tested is linked via `artifact-refs`, not the filename:
```
(OrbCode Project) Mesh Core . (Test) Document Parsing Validation.md
```

---

## Status Models

Three tiers:

### Tier 1 — Actionable entities (Feature, UI)

| Status | Meaning |
|--------|---------|
| `draft` | Planned — no code yet. Create a task to implement. |
| `untested` | Code exists, not yet human-verified |
| `stale` | Was verified, now out of date with code |
| `verified` | Human confirmed artifact matches code |

```
draft → untested → verified
    any state → stale → untested → verified
```

### Tier 2 — Structural entities (System, Data, Dependency, Consumer, Environment)

| Status | Meaning |
|--------|---------|
| `draft` | Planned — not yet in codebase |
| `active` | Current and accurate |
| `stale` | Out of date with code |
| `deprecated` | No longer relevant |

```
draft → active → deprecated
    active → stale → active
```

### Tier 3 — Test entities (Test, Test Suite, E2E)

| Status | Meaning |
|--------|---------|
| `draft` | Planned — not yet implemented. Create a task to implement. |
| `pass` | Passing |
| `fail` | Failing |
| `stale` | Out of date with code |
| `deprecated` | No longer relevant |

```
draft → pass ↔ fail
    any state → stale → pass/fail
    any state → deprecated
```

All transitions are **manual** — set by the user via the plate UI.

---

## Structure

**Project (single codebase):**
```
Mesh/OrbCode/
└── (OrbCode Project) [Name]/
    ├── (OrbCode Project) [Name].md                        # Project index
    │
    ├── Context/                                           # Untyped project knowledge + typed Environments
    │   ├── ... . Overview.md                              # Untyped — diagram-first visual architecture
    │   ├── ... . Context.md                               # Untyped — scope, concepts, conventions
    │   ├── ... . Architecture.md                          # Untyped — structure, patterns, constraints
    │   ├── ... . Tech Stack.md                            # Untyped — language, build, dependencies
    │   ├── ... . Relationships.md                         # Untyped — inter-project connections
    │   ├── ... . [Topic].md                               # Untyped — additional project-specific knowledge
    │   └── ... . (Environment) Dev.md                     # Typed — appears on map
    │
    ├── Map/                                               # All typed map artifacts
    │   ├── ... . (System) Subsystem Name.md
    │   ├── ... . (Feature) Feature Name.md
    │   ├── ... . (Data) Schema Name.md
    │   ├── ... . (UI) View Name.md
    │   ├── ... . (Dependency) Library Name.md
    │   ├── ... . (Consumer) Client Name.md
    │   └── [Subfolder]/                                   # Arbitrary grouping
    │
    ├── Testing/                                           # Test documentation
    │   ├── ... . (Test Suite) Suite Name.md
    │   ├── ... . (Test) Descriptive Name.md
    │   └── ... . (E2E) Flow Name.md
    │
    └── Notes/
        ├── (OrbCode Reference) [Topic].md
        ├── ... . [Topic].md                               # General note — project-specific knowledge
        └── [Concept Name].md
```

---

## Reference Model

OrbCode enforces a **type-constrained reference graph**. Each type has defined valid `artifact-refs` targets.

```
     Environment    Dependency
           \          /
            v        v
     ┌─── Systems ───────── Test Suites
     |     / | \                / |
     |    v  v  v              v  v
     | Features ──────────── Tests
     |  / | \
     | v  v  v
     | Data  UI
     |
     v
   Consumer
     |
    E2E
```

| Type | Can Reference (`artifact-refs`) | Gets Referenced By |
|------|--------------------------------|-------------------|
| **System** | Systems, Features, Data, UI, Dependency, Consumer | Systems |
| **Feature** | Features, Data, UI, Dependency | Systems, Features, Test Suites, Tests, E2E |
| **Data** | — (leaf node) | Features, Systems |
| **UI** | UIs (hierarchy only) | Features, Systems |
| **Dependency** | — (leaf node) | Features, Systems |
| **Consumer** | Systems, Features, Data, UI | Systems |
| **Environment** | — (leaf node) | Test Suites, E2E |
| **Test Suite** | Tests, Features, Systems, Environment | — (grouping) |
| **Test** | Features | Test Suites |
| **E2E** | Features, Systems, Environment | — (cross-system) |

### Rules

1. **Systems are the root.** Entry point of the Map graph. References sub-systems, features, data, UIs, dependencies, consumers.
2. **Features are capabilities.** References sub-features, data, UIs, dependencies. Never references systems.
3. **Data is shape.** Leaf node. Entities, schemas, types.
4. **UI is surface.** References sub-UIs only. Covers all surfaces: pages, views, panels, CLI commands, REST endpoints, GraphQL.
5. **Dependency is upstream.** Leaf node. External libraries, services, APIs consumed.
6. **Consumer is downstream.** References systems, features, data, UIs it depends on.
7. **Environment is infrastructure.** Leaf node. CI, local, Docker, staging. Lives in Context/ but rendered on map.
8. **Test Suites group tests.** References tests, features/systems covered, environments they run in.
9. **Tests verify features.** References feature(s) verified via `artifact-refs`. Named descriptively.
10. **E2E tests span systems.** References features, systems, environments.

**Reference direction:** All `artifact-refs` flow in one direction. Never link both ways. Use backlinks for reverse lookups.

### Hierarchy vs. References

`artifact-refs` and `parent` have **separate jobs**. Do not conflate them.

| Field | Purpose | Shape | Used By |
|-------|---------|-------|---------|
| `parent:` | The single hierarchy signal — who owns this artifact in the tree | A single wikilink, or omit for a root | Sidebar tree, depth layout, parent-system label |
| `artifact-refs:` | Free-form "related to" links | List of wikilinks | Graph edges on the map canvas |

The rules:

- **Hierarchy is exclusively `parent:`.** The renderer does not infer parent-child from `artifact-refs`.
- **Types that can have a parent:** System (parent = System), Feature (parent = System or Feature), UI (parent = UI), Test Suite (parent = Test Suite), Test (parent = Test Suite). Leaf types (Data, Dependency, Consumer, Environment, E2E) do not have `parent:`.
- **Roots omit `parent:`** (or leave it empty). A System with no parent is a root System.
- **`artifact-refs:` is orthogonal to hierarchy.** A System listing a Feature in `artifact-refs` produces a graph edge but **not** a parent-child relationship. To make that Feature a child of the System, set `parent: "[[(System) ...]]"` on the Feature.

---

## Spatial Model (Plate Rendering)

**Vertical bands** (top to bottom):

| Band | Types | Purpose |
|------|-------|---------|
| Infrastructure | Environment, Dependency | Where things run + external inputs |
| Core | Systems → Features → Data/UI | The codebase itself |
| Downstream | Consumer | External outputs |
| Cross-system | E2E | End-to-end verification |

**Horizontal split** within Core band:
- **Left column**: Map entities (Systems → Features → Data/UI)
- **Right column**: Testing entities (Test Suites alongside Systems, Tests alongside Features)

---

## Relationship to Specifications

OrbCode depends on the Specifications shard. The relationship is **one-way** — OrbCode sits on top of Specifications.

| | Specifications | OrbCode |
|--|---------------|---------|
| **Direction** | Prescriptive — defines what code *should* do | Descriptive — reflects what code *does* |
| **Relative to code** | Upstream (before/alongside code) | Downstream (after code exists) |

Map artifacts can reference Specs via `artifact-refs` for critical interfaces.

---

## Processes

### 1. Initial Mapping (one-time per project)

1. Create `(OrbCode Project)` with project index
2. Write Context documents + Environment artifacts
3. Explore codebase — identify systems, features, data
4. Create Map artifacts
5. Document test infrastructure in Testing layer

### 2. Planning Changes

1. Create draft artifact describing intended change
2. Link to relevant existing artifacts
3. Create a Task to implement
4. Implement → update status
5. Verify → mark verified
6. Propagate: update parent System, Overview

### 3. Reflecting Changes (after coding)

1. Read changed code + corresponding Map artifact
2. Update description, diagrams, code-refs
3. Mark affected artifacts as `stale` first if you didn't start from the map

### 4. Map Sync (periodic)

1. Walk all artifacts, compare against code
2. Mark stale, update, flag for removal
3. Report gaps

---

## Workflows

| Workflow | File | Purpose |
|----------|------|---------|
| Map Codebase | `dev-wkfl-orbc-map.md` | Initial mapping of a post-MVP codebase |
| Add Artifact | `dev-wkfl-orbc-add.md` | Create a new Map artifact |
| Update Artifact | `dev-wkfl-orbc-update.md` | Update an existing Map artifact after code changes |
| Sync Map | `dev-wkfl-orbc-sync.md` | Verify all artifacts are current, fix drift |
| Update Context | `dev-wkfl-orbc-update-context.md` | Refresh Context layer documents |

---

## Templates

**Containers:** (`templates/containers/`)

| Template | File | Creates |
|----------|------|---------|
| Workspace | `dev-tmp-orbc-workspace-v0.2.md` | `(OrbCode Workspace) Name.md` |
| Project | `dev-tmp-orbc-project-v0.2.md` | `(OrbCode Project) Name.md` |

**Context:** (`templates/context/`)

| Template | File | Creates |
|----------|------|---------|
| Context | `dev-tmp-orbc-context-v0.2.md` | `... . Context.md` |
| Architecture | `dev-tmp-orbc-architecture-v0.2.md` | `... . Architecture.md` |
| Tech Stack | `dev-tmp-orbc-tech_stack-v0.2.md` | `... . Tech Stack.md` |
| Relationships | `dev-tmp-orbc-relationships-v0.2.md` | `... . Relationships.md` |
| Overview | `dev-tmp-orbc-overview-v0.2.md` | `... . Overview.md` |
| Environment | `dev-tmp-orbc-environment-v0.2.md` | `... . (Environment) Name.md` |

**Map:** (`templates/map/`)

| Template | File | Creates |
|----------|------|---------|
| System | `dev-tmp-orbc-system-v0.2.md` | `... . (System) Name.md` |
| Feature | `dev-tmp-orbc-feature-v0.2.md` | `... . (Feature) Name.md` |
| Data | `dev-tmp-orbc-data-v0.2.md` | `... . (Data) Name.md` |
| UI | `dev-tmp-orbc-ui-v0.2.md` | `... . (UI) Name.md` |
| Dependency | `dev-tmp-orbc-dependency-v0.2.md` | `... . (Dependency) Name.md` |
| Consumer | `dev-tmp-orbc-consumer-v0.2.md` | `... . (Consumer) Name.md` |
| Test Suite | `dev-tmp-orbc-test-suite-v0.2.md` | `... . (Test Suite) Name.md` |
| E2E | `dev-tmp-orbc-e2e-v0.2.md` | `... . (E2E) Name.md` |

**Testing:** (`templates/verification/`)

| Template | File | Creates |
|----------|------|---------|
| Test | `dev-tmp-orbc-test-v0.2.md` | `... . (Test) Name.md` |

**Notes:** (`templates/notes/`)

| Template | File | Creates |
|----------|------|---------|
| Reference | `dev-tmp-orbc-reference-v0.2.md` | `(OrbCode Reference) Topic.md` |
| Note | `dev-tmp-orbc-note-v0.2.md` | `... . [Topic].md` |

---

## Scripts

| Script | File | Purpose |
|--------|------|---------|
| `tree` | `scripts/tree.ts` | Compact hierarchical view of OrbCode projects |

```bash
flint shard orbcode tree                                    # List all projects
flint shard orbcode tree "(OrbCode Project) Flint"          # Show systems (depth 1)
flint shard orbcode tree "(OrbCode Project) Flint" 2        # Systems + children
flint shard orbcode tree "(OrbCode Project) Flint" --verbose # Status + code-refs
flint shard orbcode tree "(OrbCode Project) Flint" --json    # Machine-readable
```

---

## Knowledge

| File | Purpose |
|------|---------|
| `dev-knw-orbc-orbcraft.md` | OrbCraft visualization system — agent presence on the OrbCode Map Plate |
| `dev-knw-orbc-vitest.md` | Vitest setup for TypeScript projects |
| `dev-knw-orbc-pytest.md` | pytest setup for Python projects |

---

## Agent Instructions

### Reading an OrbCode Project

1. Run `flint shard orbcode tree "(OrbCode Project) [Name]"` to see the structure
2. Read Context/ documents as needed
3. Read specific Map/ artifacts related to your task
4. Check Testing/ for test infrastructure

### Updating the Map

1. Read the relevant code in the codebase
2. Read the corresponding Map artifact
3. Compare — does the artifact accurately describe the code?
4. Update description, diagrams, code-refs as needed
5. Update status if the lifecycle state has changed

### Planning a Change

1. Create a draft artifact describing the intended change
2. Link to relevant existing artifacts via `artifact-refs`
3. Create a Task to implement the change
4. After implementation, update status to `untested`/`pass`
5. After verification, update status to `verified`
6. Propagate: update parent System and Overview as needed
