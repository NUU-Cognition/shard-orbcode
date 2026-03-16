# OrbCode

A semantic documentation layer for post-MVP codebases. OrbCode gives developers and agents a structured, human-readable understanding of what a codebase does — without requiring anyone to read the source code.

---

## What OrbCode Is

OrbCode exists because **after MVP, the hard problem isn't writing code — it's understanding the system well enough to direct changes.** The codebase is the source of truth. OrbCode is the mirror — a semantic mapping that reflects what the code does in conceptual, visual, human-readable form.

OrbCode is **not** a project management tool. It doesn't drive development. You build features, fix bugs, and ship code however you normally do. OrbCode is where you come back afterward to document what exists, how it connects, and how it's tested.

### When OrbCode Enters the Picture

OrbCode is for codebases that already exist and have structure. Before MVP, code is exploratory — you don't need a semantic layer. After MVP, when the system has settled enough to be worth modelling, you create the OrbCode layer. From that point forward, you keep it current as the codebase evolves.

### Core Principles

1. **Code is truth, Map reflects it.** The Map is downstream of the codebase. When code changes, the Map catches up. The Map is not a governance layer — it's a mirror.

2. **Post-MVP assumption.** The problem is maintaining understanding, not bootstrapping.

3. **Human-readable first.** Map artifacts should be visually rich, conceptual, and understandable by a human who doesn't read code. Prefer mermaid diagrams, state machines, and clear prose.

4. **Resolution over completeness.** Don't document everything. 5-20 Map artifacts is typical. If you have more than 20, consolidate.

5. **Emergent semantics.** Create docs when needed, not upfront. The Map grows as you work.

6. **Flexible grouping.** The human decides how to think about the codebase — what constitutes a "system", a "feature", a "process". OrbCode doesn't impose structure; it reflects the structure the developer sees.

---

## Naming Convention

All artifacts are **namespaced under their project** using dot notation. The project is the root; everything else is a derivative.

```
(OrbCode Project) [Name] . (Type) [Artifact Name].md
```

| Component | Format | Example |
|-----------|--------|---------|
| Project prefix | Full project name | `(OrbCode Project) Mesh Core` |
| Separator | ` . ` (space-dot-space) | |
| Type | Parenthesised type | `(Feature)`, `(System)`, `(Data)` |
| Name | Descriptive title | `Document Parsing`, `Link Graph` |

### Singular vs Named Artifacts

Context-layer types that are one-per-project drop the name:

```
(OrbCode Project) Mesh Core . (Context).md            # One per project
(OrbCode Project) Mesh Core . (Architecture).md        # One per project
(OrbCode Project) Mesh Core . (Relationships).md       # One per project
(OrbCode Project) Mesh Core . (Test Architecture).md   # One per project
(OrbCode Project) Mesh Core . (Overview).md            # One per project
```

Types that can have multiples always include a name:

```
(OrbCode Project) Mesh Core . (Environment) Dev.md     # Multiple possible
(OrbCode Project) Mesh Core . (Feature) Document Parsing.md
(OrbCode Project) Mesh Core . (System) Parser Pipeline.md
(OrbCode Project) Mesh Core . (Data) Document Model.md
```

### Derivatives (Tests and Sub-Features)

Tests and sub-features are derivatives of Map artifacts — they chain with additional dots:

```
(OrbCode Project) Mesh Core . (Feature) Document Parsing . (Test) Unit.md
(OrbCode Project) Mesh Core . (Feature) Document Parsing . (Sub) Frontmatter.md
(OrbCode Project) Mesh Core . (System) Parser Pipeline . (Test) Integration.md
```

Keep derivative chains to two dots maximum. If you're going three deep, reconsider your granularity.

---

## Layers

OrbCode has three layers plus containers:

| Layer | Purpose | Artifact Types |
|-------|---------|----------------|
| **Container** | Project organisation | OrbCode Workspace, OrbCode Project |
| **Context** | Project-level knowledge | Context, Architecture, Environment, Relationships |
| **Map** | Semantic mapping of code | Overview, System, Feature, Process, Data, API |
| **Verification** | Test documentation | Test Architecture, Fixture, Test |

### Container Artifacts

| Type | Question Answered | When to Create |
|------|-------------------|----------------|
| `(OrbCode Workspace)` | How do projects fit together? | For monorepos / multi-project systems |
| `(OrbCode Project)` | What does this codebase do? | For each distinct codebase |

Every OrbCode Project has a `project-type` field:

| Type | What It Is | Testing | Examples |
|------|-----------|---------|----------|
| `application` | Code that runs — libraries, apps, services, CLIs | Automated tests (vitest, pytest), CI | mesh-core, a Next.js app |
| `cognitive` | Markdown-as-code — shards, prompt programs | Coherence checks, manual validation | The OrbCode shard itself |

### Context Layer

Project-level knowledge that doesn't change with individual features. Free to update anytime.

| Type | Question Answered | When to Create |
|------|-------------------|----------------|
| `(Context)` | What is this and what concepts matter? | Always — one per project |
| `(Architecture)` | What tech, structure, and design? | For non-trivial stacks |
| `(Environment)` | How do I run/deploy this? | Per environment (dev/prod) |
| `(Relationships)` | How does this project fit into the system? | For projects with dependencies |

### Map Layer (The Core)

The Map is the heart of OrbCode. Each artifact answers one human question about the codebase:

| Type | The One Question | When to Create |
|------|------------------|----------------|
| `(Overview)` | How do pieces fit together visually? | High-level diagrams, visual entry point |
| `(System)` | What are the major parts and boundaries? | Bounded contexts, subsystems (1-3 typical) |
| `(Feature)` | What capabilities exist? | Key capabilities (5-15 typical) |
| `(Process)` | How does this flow work? | Complex multi-step workflows only |
| `(Data)` | What shape is the core state? | Core entities, schemas |
| `(API)` | What can external callers invoke? | External interfaces, contracts |

**Map artifacts should be rich and conceptual.** Use mermaid diagrams for state machines, data relationships, system boundaries, API flows, and architecture overviews. A human should be able to read a Feature artifact and actually understand the capability — not just see a list of file paths.

#### What a Feature Document Contains

Feature artifacts are the bread and butter. Each one should include:

1. **One-line summary** — What this capability does
2. **Description** — How it works conceptually, what problem it solves
3. **Inputs and outputs** — What goes in, what comes out (data types, formats)
4. **System context** — Which System it belongs to, how it interacts with other Features
5. **Key data structures** — The specific types/schemas this feature works with (linking to Data artifacts)
6. **High-level logic** — State machines, decision trees, flow diagrams (mermaid). The conceptual model of how it behaves
7. **Edge cases and constraints** — What it doesn't do, known limitations
8. **How it's tested** — Test strategy, linking to the Test derivative
9. **Code refs** — Where to find it in the codebase (file paths from codebase root)

#### Map Modes

Every Map artifact has a `mode` field:

| Mode | When | What It Means |
|------|------|--------------|
| `live` | Default | Reflects current code reality. Code-refs point to real code. |
| `planned` | During initial mapping | Describes something being documented for the first time. |
| `altered` | During major refactors | Marks intended changes to something that already exists. |

Most of the time, everything is just `live`. You change code, you update the Map, it stays `live`. The `planned` mode is mainly used during initial mapping when drafting artifacts. The `altered` mode is a temporary flag during major refactors — use `[ALTERED]` inline labels to mark what's changing, then strip them when the refactor lands.

### Verification Layer

Documentation of how testing works and what's covered.

| Type | Question Answered | When to Create |
|------|-------------------|----------------|
| `(Test Architecture)` | How does testing work in this project? | One per project |
| `(Fixture)` | What reusable test data exists? | For reusable test data/mocks |
| `(Test)` | Does code match its Map description? | To verify Map artifacts |

**Test naming:** Tests are derivatives of the Map artifact they verify:
```
(OrbCode Project) Mesh Core . (Feature) Document Parsing . (Test) Unit.md
(OrbCode Project) Mesh Core . (System) Parser Pipeline . (Test) Integration.md
```

**Test types:** `(Unit)` for single function isolation, `(Integration)` for multiple components together.

---

## Structure

**Workspace (monorepo):**
```
Mesh/OrbCode/
├── (OrbCode Workspace) [Name]/
│   ├── (OrbCode Workspace) [Name].md
│   └── ... . (Context).md, ... . (Overview).md
│
├── (OrbCode Project) [Project A]/
│   └── ...
└── (OrbCode Project) [Project B]/
    └── ...
```

**Project (single codebase):**
```
Mesh/OrbCode/
└── (OrbCode Project) [Name]/
    ├── (OrbCode Project) [Name].md                        # Project index
    │
    ├── Context/
    │   ├── ... . (Context).md
    │   ├── ... . (Architecture).md
    │   ├── ... . (Environment) Dev.md
    │   └── ... . (Relationships).md
    │
    ├── Map/
    │   ├── ... . (Overview).md
    │   ├── ... . (System) Subsystem Name.md
    │   ├── ... . (Feature) Feature Name.md
    │   ├── ... . (Process) Flow Name.md
    │   ├── ... . (Data) Schema Name.md
    │   ├── ... . (API) Interface Name.md
    │   └── [Subfolder]/                                    # Arbitrary grouping
    │       ├── ... . (Feature) Related Feature.md
    │       └── ... . (Data) Related Data.md
    │
    ├── Verification/
    │   ├── ... . (Test Architecture).md
    │   ├── ... . (Fixture) Sample Data.md
    │   └── ... . (Feature) X . (Test) Unit.md
    │
    └── Notes/
        ├── (OrbCode Reference) [Topic].md                  # Structured index
        └── [Concept Name].md                               # Freeform notes
```

**Rules:**
- `Context/`, `Map/`, `Verification/` are standard subfolders inside a project
- Inside `Map/`, arbitrary subfolders group related artifacts by domain area
- Subfolders are organisational only — wikilinks work by title, not path
- The project index file sits at the root of its folder, not in a subfolder
- Start flat. Add subfolders when a layer gets crowded
- `Notes/` is informal — no formal process, no Map impact

---

## Linking

**Code refs:** Full paths from codebase root in the `code-refs` frontmatter field.

**Artifact refs:** Wikilinks to other Map artifacts. Must be quoted in YAML:
```yaml
artifact-refs:
  - "[[(OrbCode Project) Mesh Core . (Feature) Document Parsing]]"
```

**Test linking:** Tests link to Map items via filename derivation (the dot notation handles this naturally).

**Reference direction:** All `artifact-refs` flow in one direction. Never link both ways between a pair. Use backlinks for reverse lookups.

---

## Relationship to Specifications

OrbCode depends on the Specifications shard. The relationship is **one-way** — OrbCode sits on top of Specifications.

| | Specifications | OrbCode |
|--|---------------|---------|
| **Direction** | Prescriptive — defines what code *should* do | Descriptive — reflects what code *does* |
| **Relative to code** | Upstream (before/alongside code) | Downstream (after code exists) |
| **Language** | RFC 2119 (MUST/SHOULD/MAY) | Conceptual, visual, mermaid diagrams |

Map artifacts can reference Specs via `artifact-refs` for critical interfaces. The Spec is the normative source of truth; the Map artifact is the human-readable understanding. Most post-MVP code just needs Map artifacts — Specs are only needed when normative precision matters.

---

## Processes

There are four things you do with OrbCode:

### 1. Initial Mapping (one-time per project)

When a codebase reaches post-MVP, create the full semantic layer:
1. Create `(OrbCode Project)` with project index
2. Write Context layer (what it is, how it's built, how to run it)
3. Explore codebase — identify systems, features, data structures
4. Create Map artifacts for each
5. Document test infrastructure in Verification layer

### 2. Map After Change (ongoing)

After changing existing code, update the corresponding Map artifacts:
1. Read the changed code
2. Read the current Map artifact
3. Update description, inputs/outputs, logic, diagrams
4. Update any connected artifacts (Data, System) if affected

### 3. Map New Feature (ongoing)

After adding a new capability to the codebase:
1. Create a new Feature (or System, Data, etc.) artifact
2. Link to relevant Systems, Data, other Features
3. Document test coverage
4. Update Overview if the system picture changed

### 4. Map Sync (periodic)

Verify all Map artifacts are current with the codebase:
1. Walk through each Map artifact
2. Compare against current code via code-refs
3. Update stale descriptions, fix broken refs
4. Flag removed or significantly changed code

Context updates (architecture changes, new environments, dependency shifts) happen freely whenever needed — no formal process.

---

## Workflows

| Workflow | File | Purpose |
|----------|------|---------|
| Map Codebase | `wkfl-orbc-map.md` | Initial mapping of a post-MVP codebase |
| Add Artifact | `wkfl-orbc-add.md` | Create a new Map artifact after adding a feature |
| Update Artifact | `wkfl-orbc-update.md` | Update an existing Map artifact after code changes |
| Sync Map | `wkfl-orbc-sync.md` | Verify all artifacts are current, fix drift |
| Update Context | `wkfl-orbc-update-context.md` | Refresh Context layer artifacts |

---

## Templates

**Containers:** (`templates/containers/`)

| Template | File | Creates |
|----------|------|---------|
| Workspace | `tmp-orbc-workspace-v0.2.md` | `(OrbCode Workspace) Name.md` |
| Project | `tmp-orbc-project-v0.2.md` | `(OrbCode Project) Name.md` |

**Context:** (`templates/context/`)

| Template | File | Creates |
|----------|------|---------|
| Context | `tmp-orbc-context-v0.2.md` | `... . (Context).md` |
| Architecture | `tmp-orbc-architecture-v0.2.md` | `... . (Architecture).md` |
| Environment | `tmp-orbc-environment-v0.2.md` | `... . (Environment) Name.md` |
| Relationships | `tmp-orbc-relationships-v0.2.md` | `... . (Relationships).md` |

**Map:** (`templates/map/`)

| Template | File | Creates |
|----------|------|---------|
| Overview | `tmp-orbc-overview-v0.2.md` | `... . (Overview).md` |
| System | `tmp-orbc-system-v0.2.md` | `... . (System) Name.md` |
| Feature | `tmp-orbc-feature-v0.2.md` | `... . (Feature) Name.md` |
| Process | `tmp-orbc-process-v0.2.md` | `... . (Process) Name.md` |
| Data | `tmp-orbc-data-v0.2.md` | `... . (Data) Name.md` |
| API | `tmp-orbc-api-v0.2.md` | `... . (API) Name.md` |

**Verification:** (`templates/verification/`)

| Template | File | Creates |
|----------|------|---------|
| Test Architecture | `tmp-orbc-test-architecture-v0.2.md` | `... . (Test Architecture).md` |
| Fixture | `tmp-orbc-fixture-v0.2.md` | `... . (Fixture) Name.md` |
| Test | `tmp-orbc-test-v0.2.md` | `... . (Map Item) . (Test) Name.md` |

**Notes:** (`templates/notes/`)

| Template | File | Creates |
|----------|------|---------|
| Reference | `tmp-orbc-reference-v0.2.md` | `(OrbCode Reference) Topic.md` |

---

## Knowledge

| File | Purpose |
|------|---------|
| `knw-orbc-vitest.md` | Vitest setup for TypeScript projects |
| `knw-orbc-pytest.md` | pytest setup for Python projects |

---

## Agent Instructions

### Reading an OrbCode Project

1. Read `(OrbCode Project) [Name].md` to understand the project
2. Read Context/ artifacts (Context, Architecture, Environment)
3. Read Map/ artifacts related to your task
4. Check Verification/ for test infrastructure

### Updating the Map

1. Read the relevant code in the codebase
2. Read the corresponding Map artifact
3. Compare — does the artifact accurately describe the code?
4. Update description, diagrams, code-refs as needed
5. Keep mode as `live`

### When Stuck

1. Explain what was tried
2. Show the error or blocker
3. Ask for guidance
4. **Never guess at requirements**
