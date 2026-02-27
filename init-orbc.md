# OrbCode

Semantic mapping for agent-operated development. Map codebases so agents can understand and modify them effectively.

---

## Philosophy

### Agent-Operated Development

OrbCode is an **agent-operated development system**. Agents do the work. Humans oversee.

Agents read specs, write code, run tests, verify results. Humans set direction, make decisions, and approve. The semantic layer exists to give agents the context they need to work autonomously.

### The Three Truths

| Truth | What It Is | Where It Lives |
|-------|------------|----------------|
| **Semantic** | What we intend | Map artifacts, Context, Specifications |
| **Code** | What exists | Codebase files, configs, dependencies |
| **Verification** | What we can prove | Test output + git history |

Agents keep these aligned. When they diverge, agents detect and reconcile. The semantic layer is never "correct" — it's a living model that tracks intent. The code is reality. Tests prove the relationship.

### Core Principles

1. **Agents execute, humans oversee** — Agents run tests, write code, verify. Humans set direction and approve.

2. **TDD for governed code** — Write the failing test first. No exceptions. The test describes intent before implementation exists.

3. **Verify before claiming done** — Run tests. Read the output. Don't assume. Only then report completion.

4. **Emergent semantics** — Create docs when needed, not upfront. The semantic layer grows as you work. Don't pre-plan everything.

5. **Git is the record** — Commits, test output, and passing CI are the evidence. No separate "evidence artifacts." The repo tells the story.

6. **Resolution over completeness** — Don't document everything. Start with System + key Features. Add depth only where complexity demands it. 5-20 artifacts is typical, not 200.

### Resolution Principle

**Document only what answers a human question.** Each artifact type answers exactly ONE question:

| Artifact | The One Question |
|----------|------------------|
| `(System)` | "What are the major parts and boundaries?" |
| `(Feature)` | "What capabilities exist?" |
| `(Process)` | "How does this flow work end-to-end?" |
| `(Data)` | "What shape is the core state?" |
| `(API)` | "What can external callers invoke?" |
| `(Overview)` | "How do the pieces fit together visually?" |

**Start shallow, deepen selectively:**

```
1. One Overview diagram           ──► Visual entry point
         │
         ▼
2. 1-3 Systems                    ──► Bounded contexts only
         │
         ▼
3. Key Features (not exhaustive)  ──► 5-10 capabilities
         │
         ▼
4. Process/Data/API as needed     ──► Only where complexity demands
```

**The main risk is over-granularity.** If you're creating more than 20 artifacts, stop and consolidate. Code layout is better captured via `code-refs` across artifacts than by creating `(Module)` artifacts.

**Why no `(Module)` type?** Module tends to overlap with System and adds "is it a Module or System?" ambiguity. Use `code-refs` to point to file locations instead.

### Semantic ↔ Code Relationship

The relationship between layers is **bidirectional but asymmetric**:

**Direction 1: Semantic → Code (Specification)**

Design in semantic layer first, then implement:
1. Write `(Feature)` describing what it should do
2. Write `(Test)` describing how to verify it
3. Implement the code
4. Update `code-refs` to point to implementation

This is **specification-driven development**. The semantic layer is the source of truth for *intent*. Use for greenfield projects and new features.

**Direction 2: Code → Semantic (Discovery)**

Existing code informs the semantic layer:
1. Explore codebase
2. Identify patterns, systems, features
3. Create Map artifacts to document what exists
4. Tests verify the discovered behavior

This is **brownfield documentation**. The code is the source of truth for *reality*. Use for existing codebases.

**The Feedback Loop:**

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   SEMANTIC LAYER                    CODE LAYER          │
│   (intent)                          (reality)           │
│                                                         │
│   ┌──────────────┐                ┌──────────────┐      │
│   │  (Feature)   │ ──specifies──► │   code.ts    │      │
│   │  (Data)      │                │   types.ts   │      │
│   │  (API)       │                │   api.ts     │      │
│   └──────────────┘                └──────────────┘      │
│          ▲                              │               │
│          │                              │               │
│          └─────────── informs ──────────┘               │
│                                                         │
│   VERIFICATION LAYER                                    │
│   (proof)                                               │
│                                                         │
│   ┌──────────────┐                ┌──────────────┐      │
│   │   (Test)     │ ──describes──► │  test.ts     │      │
│   │   (Fixture)  │                │  fixture.ts  │      │
│   └──────────────┘                └──────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Key insight:** The semantic layer references the code layer. The code layer does NOT import or depend on the semantic layer. Agents bridge the gap by reading semantic artifacts and executing against code.

### Stages of Work

| Stage | Activity | Direction |
|-------|----------|-----------|
| **Design** | Write specs in semantic layer | Semantic → Code |
| **Implement** | Write code matching specs | — |
| **Document** | Update refs, add discoveries | Code → Semantic |
| **Verify** | Run tests, update status | Both |
| **Refactor** | Evolve both together | Both |

The semantic layer and code evolve together. Neither is permanently "ahead" — they inform each other continuously.

### Project Phases

| Phase | Description | Workflow |
|-------|-------------|----------|
| **Greenfield** | New project, design first | `wkfl-orbc-greenfield` |
| **Init** | Map existing codebase + write test suite | `wkfl-orbc-map` + `wkfl-orbc-setup-tests` |
| **Stabilize** | Review layers, establish first stable baseline | `wkfl-orbc-stabilize` |
| **Development** | Ongoing work with OrbCode in place | `wkfl-orbc-plan-implementation` |
| **Evolution** | Refactor semantic layer as code changes | `wkfl-orbc-refactor` |

### TDD Discipline

For governed code, follow the cycle:

```
1. Write failing test     ──► Describe what should happen
         │
         ▼
2. Run test (red)         ──► Confirm it fails for the right reason
         │
         ▼
3. Implement minimally    ──► Just enough to pass
         │
         ▼
4. Run test (green)       ──► Confirm it passes
         │
         ▼
5. Refactor               ──► Clean up while staying green
         │
         ▼
6. Commit                 ──► Record the change
```

**No code without a failing test first.** The test is the specification made executable.

### What OrbCode Is NOT

| Not This | But This |
|----------|----------|
| Automated CI pipeline | Agent-operated workflow |
| Upfront planning ceremony | Emergent semantics |
| ID schemes everywhere (RQ-001) | Filename-based linking |
| Separate evidence artifacts | Git + test output |
| Documentation for humans only | Context for agents to work |
| Comprehensive coverage | Right resolution for the project |

### When Stuck

Agents should:
1. Explain what was tried
2. Show the error or blocker
3. Ask for guidance
4. **Never guess at requirements**

Humans should:
1. Clarify intent
2. Update semantic artifacts if unclear
3. Approve or redirect approach

---

## Four Layers

OrbCode separates knowledge into four layers:

| Layer | Purpose | Artifact Types |
|-------|---------|----------------|
| **Context** | Project-level knowledge | Context, Architecture, Environment, Relationships |
| **Map** | Semantic mapping of code | Overview, System, Feature, Process, Data, API |
| **Log** | Historical records | Release, Release Prep, Test Log, Decision, UoW, Submission |
| **Verification** | Test infrastructure | Fixture, Test Environment, Test Runner, Test |

## Container Artifacts

| Type | Question Answered | When to Create |
|------|-------------------|----------------|
| `(OrbCode Workspace)` | How do projects fit together? | For monorepos / multi-project |
| `(OrbCode Project)` | What does this codebase do? | For each distinct codebase |

**Workspace vs Project:**

| Aspect | Workspace | Project |
|--------|-----------|---------|
| Context/ | **Required** — always has Context, Architecture, Environment | **Optional** — only for complex packages |
| Map/ | **None** — workspaces don't map code | **Varies by project type** |
| Scope | Monorepo-level truth | Single codebase/package |

**Project Types:**

Not all projects are product codebases. The `project-type` field signals what kind of project this is and which layers to emphasize:

| Type | What It Is | Primary Layer | Map Depth | Verification Depth |
|------|-----------|--------------|-----------|-------------------|
| `product` | Library, app, service, CLI | Map | Full | Grows with codebase |
| `verification` | Integration test suite | Verification | Thin (1 System for scope) | Rich (Architecture, Runners, Environments) |
| `cognitive` | Flint shard, prompt program | Map | Describes program structure | Adapted (checklists, not automated tests) |

`project-type` determines emphasis, not existence — all projects CAN have any layer. A verification project still has a Map (just thin). A product project still has Tests (just secondary to Map).

This keeps environmental and architectural knowledge centralized at Workspace level while allowing per-project exceptions where needed.

## Context Artifacts

| Type | Question Answered | When to Create |
|------|-------------------|----------------|
| `(Context)` | What is this and what concepts matter? | **Always** at Workspace level |
| `(Architecture)` | What tech, structure, and design? | For non-trivial stacks |
| `(Environment)` | How do I run/deploy this? | Per environment (dev/prod) |
| `(Relationships)` | How does this project fit into the system? | For projects in a workspace with dependencies |

**Architecture has three sections:**
- **Tech Stack** — languages, frameworks, dependencies
- **Directory Structure** — folder layout and key paths
- **Logical Architecture** — conceptual diagram of how components relate

**Relationships describes inter-project connections:**
- **Dependencies** — what other projects this one uses
- **Consumers** — what projects use this one
- **Test Boundaries** — what this project tests vs what it delegates
- **Contracts** — shared interfaces between projects

## Map Artifacts

The recommended Map set is **System + Feature + Process + Data + API + Overview**. Each answers one question:

| Type | The One Question | When to Create |
|------|------------------|----------------|
| `(Overview)` | How do pieces fit together visually? | High-level diagrams, visual entry point |
| `(System)` | What are the major parts and boundaries? | Bounded contexts, subsystems (1-3 typical) |
| `(Feature)` | What capabilities exist? | Key capabilities (5-10 typical) |
| `(Process)` | How does this flow work? | Complex multi-step workflows only |
| `(Data)` | What shape is the core state? | Core entities, schemas |
| `(API)` | What can external callers invoke? | External interfaces, contracts |

**Overview vs System:** Overview is diagram-first and shows multiple systems/features together. System documents one bounded context in detail.

**No `(Module)` type:** Module overlaps with System and creates ambiguity. Use `code-refs` across artifacts to indicate file locations instead.

## Log Artifacts

| Type | Question Answered | When to Create |
|------|-------------------|----------------|
| `(Release)` | What changed in this version? | For each release |
| `(Release Prep)` | What needs to happen before release? | When preparing a release |
| `(Test Log)` | What did we test and find? | For significant test runs |
| `(Decision)` | Why did we choose this? | For significant architectural decisions |
| `(UoW)` | What changed across layers? | When opening a stability transition |
| `(Submission)` | Can the human verify this works? | Before closing a UoW or first stabilisation |

**Log vs Context:** Log artifacts are temporal (tied to a point in time). Context artifacts are evergreen (current state of knowledge).

## Verification Artifacts

| Type | Question Answered | When to Create |
|------|-------------------|----------------|
| `(Test Architecture)` | How does testing work in this project? | One per project, after initial test setup |
| `(Fixture)` | What test data do we need? | For reusable test data/mocks |
| `(Test Environment)` | What infrastructure do tests need? | For DB/service setup code |
| `(Test Runner)` | How do I run these tests? | Per test suite/type |
| `(Test)` | Does code match semantic description? | To verify Map artifacts |

**Test Architecture:** Each project gets one `(Test Architecture)` artifact that ties together its runners, environments, and fixtures. It describes how tests actually execute and how the different test types interact. This is the agent's entry point for understanding a project's test setup.

**Test Naming Convention:**
```
(Feature) Document Parsing . (Unit) Parse frontmatter.md
(System) Mesh Core . (Integration) Full pipeline.md
```

**Test Types:**
- `(Unit)` — single function/method isolation
- `(Integration)` — multiple components together

**Reference Chain:**
```
(Knowledge) → (Test Runner) → (Test Environment) → (Fixture) → (Test) → (Map Artifact)
                    ↑
         (Test Architecture) ties these together per project
```

This ensures tests remain tied to semantic intent rather than just code paths, supporting long-term refactors.

## Sustainability & Drift Control

The semantic layer must survive refactors. Key tactics:

### Unidirectional References

All `artifact-refs` flow in ONE direction. Never link both ways between a pair of artifacts. See [[(Overview) Artifact Reference Model]] for the full direction map.

**Key rules:**
- **Containment flows down** — System → Feature, not Feature → System
- **Dependencies point toward what you use** — Feature → Data, not Data → Feature
- **Verification points up at Map** — Test → Feature, not Feature → Test
- **Log points at what it records** — Decision → Feature, not Feature → Decision

Reverse lookups use backlinks (Obsidian) or search — never explicit back-references.

### Keep Artifact Titles Stable

Artifact titles are identifiers. When code moves or renames:
- **Don't rename the artifact** — `(Feature) User Authentication` stays the same
- **Update `code-refs`** — Point to new file locations
- **Only update outbound `artifact-refs`** — Don't chase backlinks

### Link Tests to Map Items, Not File Paths

```yaml
# Good — stable
artifact-refs:
  - "[[(Feature) Document Parsing]]"

# Fragile — breaks on rename
code-refs:
  - src/old-path/parser.ts  # Will need updating
```

Tests reference Map artifacts. Map artifacts reference code. When code moves, only `code-refs` change. Tests never need updating because they link by artifact title, not file path.

### Treat Map Artifacts as Living

Don't proliferate types. Instead:
- **Merge** small artifacts that overlap
- **Split** large artifacts that cover too much
- **Update** existing artifacts rather than creating new ones
- Use the **Refactor workflow** (`wkfl-orbc-refactor`) for systematic changes

### When to Update vs Create

| Situation | Action |
|-----------|--------|
| Feature behavior changed | Update existing `(Feature)` |
| New capability added | Create new `(Feature)` |
| Two features merged in code | Merge `(Feature)` artifacts |
| Feature split into two | Split `(Feature)` artifact |
| Code moved to new file | Update `code-refs` only |

## Stability Model

OrbCode projects track whether their three governed layers (Map, Code, Verification) are in sync. This is the **stability state** — an explicit signal of whether agents can trust the current state or whether a transition is in progress.

### State Machine

```
                  stabilize
   ┌─────────┐  ──────────────►  ┌─────────┐
   │ initial │                   │  stable  │
   └─────────┘                   └────┬─────┘
   (pre-governance)                   │
                              open UoW │ ▲ close UoW
                                      ▼ │
                                 ┌──────────┐
                                 │ unstable │
                                 └──────────┘
```

| State | Meaning | `uow` field |
|-------|---------|-------------|
| `initial` | Project in setup phase, pre-governance — no UoW | Absent |
| `stable` | Map + Code + Verification agree | Absent |
| `unstable` | A UoW is open, layers being changed | Present — links to open UoW |

### What Stability Means

- **Stability = consistency between Map, Code, and Verification**
- "Stable" does NOT mean tests pass — it means layers agree on current state
- Context-layer changes are **free** — they do not affect stability
- A project where tests fail but Map accurately describes the failure is stable
- A project where Map says "planned" but code is implemented is NOT stable

### Unit of Work (UoW)

Once a project is `stable`, every change that touches Map, Code, or Verification opens a `(UoW)` — a numbered Log artifact that tracks the transition from stable → unstable → stable.

**UoW lifecycle:**
1. **Open** — Agent opens a UoW, project becomes `unstable`, project `uow` field links to it
2. **Work** — Agent makes changes across layers, recording them in the UoW checklists
3. **Infer** — UoW tracks what work remains (Inferred Work section)
4. **Submit** — Agent creates a `(Submission)` with human-verifiable steps
5. **Approve** — Human verifies and approves the submission
6. **Close** — Internal Sync confirms layers match + Submission approved, UoW closes, project returns to `stable`

**Key properties:**
- UoWs are numbered sequentially per project: `(UoW) 001`, `(UoW) 002`, etc.
- The `initial` phase is pre-governance — no UoW exists. Setup workflows (greenfield, map, setup-tests) run freely. The Stabilize workflow transitions `initial → stable`, and UoW 001 is the first change after that.
- Context-layer changes do NOT require a UoW
- If a UoW grows too large, close it at a reasonable boundary and open a new one
- Internal Sync is the stability gate — it verifies layer alignment before a UoW can close

### UoW Protocol (Cross-Cutting)

**Every ongoing workflow that modifies Map, Code, or Verification MUST follow this protocol (once the project is `stable`):**

```
1. Check project stability field
2. If initial → this protocol does not apply yet (use setup workflows freely)
3. If stable → open a new UoW (wkfl-orbc-uow, action: open)
4. If unstable → use the existing UoW
5. Do work (the workflow's own steps)
6. Log all changes in the UoW (wkfl-orbc-uow, action: log)
7. If work is complete → attempt closure (wkfl-orbc-uow, action: close)
```

This is an **invariant** for post-stabilization work, not a suggestion. No governed-layer changes happen outside a UoW once the project is `stable`. The UoW Management workflow (`wkfl-orbc-uow`) handles the mechanics of opening, logging, and closing.

### Which Workflows Use UoW

**Change workflows** (require UoW):
| Workflow | UoW Required | Reason |
|----------|-------------|--------|
| UoW Management | Owns it | Opens, logs in, and closes UoWs |
| Change Semantic | Yes | Modifies Map layer (add, update, status) |
| Change Verification | Yes | Modifies Verification layer (tests, fixtures, restructure) |
| Internal Sync | Gate | Verifies alignment before UoW can close |
| Plan Implementation | No | Plans future work — doesn't modify layers directly |
| Plan Change | No | Plans future work — doesn't modify layers directly |

**Setup workflows** (pre-governance, no UoW):
| Workflow | UoW Required | Reason |
|----------|-------------|--------|
| Project Bootstrapping | No | Pre-governance setup — `initial` phase |
| Codebase Mapping | No | Pre-governance setup — `initial` phase |
| Setup Tests | No | Pre-governance setup — `initial` phase |
| Stabilize | No | Reviews layers, transitions `initial → stable` — governance starts after |

**Free workflows** (no UoW):
| Workflow | UoW Required | Reason |
|----------|-------------|--------|
| Refactor | No | Reorganization preserves layer agreement |
| Update Context | No | Context layer only — free changes |
| Enrichment | No | Context layer only — free changes |
| Cross-Project Sync | No | Relationships = Context layer |

## Docs

The `Docs/` folder inside an OrbCode project holds `(Docs)` files — manual references to external documentation for technologies used in the project. Each file points to where documentation can be found (URLs, package docs, API references, etc.).

`(Docs)` files are created manually (no template). They use the naming convention `(Docs) [Topic].md`.

**Example:**
```markdown
# (Docs) Convex

- Official docs: https://docs.convex.dev
- Schema reference: https://docs.convex.dev/database/schemas
- Testing guide: https://docs.convex.dev/testing
```

This is a reference layer, not a semantic layer — agents consult Docs/ when they need to look up how a technology works.

## Notes

The `Notes/` folder inside an OrbCode project holds project-specific concepts and references to knowledge elsewhere in the Flint mesh or on the web. It contains two kinds of content:

**Concept notes** — Untyped freeform markdown. Codebase-specific concepts explained in this project's context. Just `[Name].md` with no template or required frontmatter.

**`(OrbCode Reference) [Topic].md`** — Typed entry point using `tmp-orbc-reference`. Links to concept notes in this Notes/ folder, wikilinks to Mesh artifacts elsewhere in the Flint, and URLs to external resources. Acts as the structured gateway into the Notes/ folder.

**Example:**
```
Notes/
├── (OrbCode Reference) Parsing Concepts.md   # Typed entry point (template)
├── Semantic Layer.md                          # Untyped concept note
├── Resolution Principle.md                    # Untyped concept note
└── ...
```

**Notes/ vs Docs/:** Docs/ = "how does this technology work?" (external documentation links). Notes/ = "what are the key concepts here and where do they connect?" (project concepts + mesh/external references).

Like Docs/, Notes/ is informal — no UoW required, no stability impact.

## Knowledge

The `knowledge/` folder contains actual setup guides (not templates). Agents reference these when setting up test infrastructure.

| File | Purpose |
|------|---------|
| `knw-orbc-vitest.md` | Vitest setup for TypeScript |
| `knw-orbc-pytest.md` | pytest setup for Python |

Knowledge files use the naming convention `knw-orbc-[topic].md`.

## Structure

**Workspace (monorepo):**
```
Mesh/OrbCode/
└── (OrbCode Workspace) [Name]/
    ├── (OrbCode Workspace) [Name].md   # Index
    ├── Context/
    │   ├── (Context) Overview.md
    │   ├── (Architecture) Tech Stack.md
    │   └── (Environment) Development.md
    └── Projects listed in index → link to OrbCode Projects
```

**Project (single codebase):**
```
Mesh/OrbCode/
└── (OrbCode Project) [Name]/
    ├── (OrbCode Project) [Name].md     # Index
    ├── Context/                         # Optional
    │   ├── (Relationships) [Name].md
    │   └── (Context) [Name].md
    ├── Map/                             # Subfolders allowed
    │   ├── (Overview) *.md
    │   ├── (System) *.md
    │   ├── (Feature) *.md
    │   ├── (Process) *.md
    │   ├── (Data) *.md
    │   ├── (API) *.md
    │   └── [Subfolder]/                 # Group by subsystem, domain, etc.
    │       └── (Feature) *.md
    ├── Docs/                            # Manual reference files
    │   └── (Docs) [Topic].md
    ├── Notes/                           # Concepts + references
    │   ├── (OrbCode Reference) [Topic].md
    │   └── [Concept Name].md
    ├── Log/                             # Subfolders allowed
    │   ├── (Release) *.md
    │   ├── (Decision) *.md
    │   ├── (UoW) NNN *.md
    │   └── ...
    └── Tests/                           # Subfolders allowed
        ├── (Test Architecture) Project.md  # How testing works here
        ├── (Test Runner) *.md
        ├── (Fixture) *.md
        └── [Subfolder]/
            └── [Map Item] . (Test) *.md
```

**Folder organization within layers is flexible.** Start flat — add subfolders when a layer grows complex enough to warrant grouping. Common patterns:
- Group by subsystem: `Map/Auth/`, `Map/Billing/`
- Group by domain: `Map/Core/`, `Map/Integrations/`
- Group by lifecycle: `Log/Releases/`, `Log/Decisions/`

Don't pre-plan folder structure. Let it emerge as the project grows. The only hard rules are:
- The top-level folders (Context/, Map/, Docs/, Notes/, Log/, Tests/) exist as needed
- Artifacts use the same `(Type) Name.md` naming regardless of depth
- Wikilinks still work — they link by title, not path

## Workflows

**Setup:** (`workflows/setup/`) — Pre-governance. Run once per project during `initial` phase.
| Workflow | File | Purpose |
|----------|------|---------|
| Greenfield | `wkfl-orbc-greenfield.md` | Bootstrap new project (context → map → tests) |
| Map Codebase | `wkfl-orbc-map.md` | Create semantic map of existing codebase |
| Setup Tests | `wkfl-orbc-setup-tests.md` | One-time test infrastructure setup |
| Stabilize | `wkfl-orbc-stabilize.md` | Final review, transitions `initial → stable` — governance begins after |

**Change:** (`workflows/change/`) — Requires UoW. Modifies governed layers.
| Workflow | File | Purpose |
|----------|------|---------|
| UoW Management | `wkfl-orbc-uow.md` | Open, log in, and close Units of Work (stability lifecycle) |
| Change Semantic | `wkfl-orbc-change-semantic.md` | Modify Map layer (add, update, change status) |
| Change Verification | `wkfl-orbc-change-verification.md` | Modify Verification layer (create tests, fixtures, restructure) |
| Plan Implementation | `wkfl-orbc-plan-implementation.md` | Create increment + tasks from Map artifacts |
| Internal Sync | `wkfl-orbc-internal-sync.md` | Audit Map ↔ Code ↔ Verification alignment, UoW stability gate |
| Plan Change | `wkfl-orbc-plan-change.md` | Top-down cross-layer planning from change request |

**Free:** (`workflows/free/`) — No UoW. Does not break layer agreement.
| Workflow | File | Purpose |
|----------|------|---------|
| Refactor | `wkfl-orbc-refactor.md` | Reorganize semantic layer (no meaning change) |
| Update Context | `wkfl-orbc-update-context.md` | Refresh Context, Architecture, Environment, Relationships |
| Cross-Project Sync | `wkfl-orbc-cross-project-sync.md` | Sync relationships, context, consistency across workspace projects |
| Enrichment | `wkfl-orbc-enrichment.md` | Pull deeper context from codebase, sibling projects, external docs |

## Templates

**Containers:** (`templates/containers/`)
| Template | File | Creates |
|----------|------|---------|
| Workspace | `tmp-orbc-workspace.md` | `(OrbCode Workspace) Name.md` |
| Project | `tmp-orbc-project.md` | `(OrbCode Project) Name.md` |

**Context:** (`templates/context/`)
| Template | File | Creates |
|----------|------|---------|
| Context | `tmp-orbc-context.md` | `(Context) Name.md` |
| Architecture | `tmp-orbc-architecture.md` | `(Architecture) Name.md` |
| Environment | `tmp-orbc-environment.md` | `(Environment) Name.md` |
| Relationships | `tmp-orbc-relationships.md` | `(Relationships) Name.md` |

**Map:** (`templates/map/`)
| Template | File | Creates |
|----------|------|---------|
| Overview | `tmp-orbc-overview.md` | `(Overview) Name.md` |
| System | `tmp-orbc-system.md` | `(System) Name.md` |
| Feature | `tmp-orbc-feature.md` | `(Feature) Name.md` |
| Process | `tmp-orbc-process.md` | `(Process) Name.md` |
| Data | `tmp-orbc-data.md` | `(Data) Name.md` |
| API | `tmp-orbc-api.md` | `(API) Name.md` |

**Log:** (`templates/log/`)
| Template | File | Creates |
|----------|------|---------|
| Release | `tmp-orbc-release.md` | `(Release) Version.md` |
| Release Prep | `tmp-orbc-release-prep.md` | `(Release Prep) Version.md` |
| Test Log | `tmp-orbc-test-log.md` | `(Test Log) Name.md` |
| Decision | `tmp-orbc-decision.md` | `(Decision) Name.md` |
| UoW | `tmp-orbc-uow.md` | `(UoW) NNN Description.md` |
| Submission | `tmp-orbc-submission.md` | `(Submission) NNN Description.md` |

**Verification:** (`templates/verification/`)
| Template | File | Creates |
|----------|------|---------|
| Test Architecture | `tmp-orbc-test-architecture.md` | `(Test Architecture) Project Name.md` |
| Fixture | `tmp-orbc-fixture.md` | `(Fixture) Name.md` |
| Test Environment | `tmp-orbc-test-environment.md` | `(Test Environment) Name.md` |
| Test Runner | `tmp-orbc-test-runner.md` | `(Test Runner) Name.md` |
| Test | `tmp-orbc-test.md` | `[Map Item] . (Test) Name.md` |
| Knowledge | `tmp-orbc-knowledge.md` | `knw-orbc-[topic].md` |

**Notes:** (`templates/notes/`)
| Template | File | Creates |
|----------|------|---------|
| Reference | `tmp-orbc-reference.md` | `(OrbCode Reference) Topic.md` |

## Linking

**Code refs:** Full paths from codebase root in `code-refs` field.

**Artifact refs:** Wikilinks to other Map artifacts. Must be quoted in YAML:
```yaml
artifact-refs:
  - "[[(Feature) Related Feature]]"
```

**Test linking:** Tests link to Map items via filename:
```
(API) Users.md                    # The API
(API) Users . (Test) Unit.md      # Tests for that API
```

## Agent Instructions

### Session Start

1. Read `(OrbCode Project) [Name].md` to understand the project
2. Read relevant Context/ artifacts (Architecture, Environment)
3. Check Notes/ for `(OrbCode Reference)` files — they link to concept notes, mesh artifacts, and external resources that provide extra context
4. Check Map/ for artifacts related to your task
5. Check Tests/ for existing test infrastructure

### Before Implementation

1. **Understand the requirement** — Ask if unclear, don't guess
2. **Identify affected artifacts** — Which Features, Data, APIs?
3. **Propose approach** — Get human approval before major work
4. **Check test infrastructure** — Test Runner exists? Fixtures needed?

### During Implementation

1. **Follow TDD** — Write failing test first, always
2. **Run tests after each change** — Stay green or know why red
3. **Commit frequently** — Small, focused commits with clear messages
4. **Update artifacts** — Keep `code-refs` and `status` current

### Before Claiming Done

1. **Run full test suite** — Not just the new tests
2. **Read the output** — Don't assume, verify
3. **Confirm all pass** — No skipped, no flaky
4. **Update artifact status** — `planned` → `implemented`
5. **Check refs are valid** — `code-refs` point to real files

### When Mapping a Codebase

1. Start with an `(Overview)` diagram showing major parts
2. Add `(System)` for each bounded context (1-3 typically)
3. Add `(Feature)` for key capabilities (5-10 typically)
4. Add `(Process)` only for complex multi-step flows
5. Add `(Data)` for core entities
6. Add `(API)` for external interfaces

**Resolution check:** If you have > 20 artifacts, you're probably too granular. Consolidate.

### When to Use Overview

- Showing how multiple systems relate
- Integration/dependency diagrams
- Onboarding — "start here" visual orientation
- Cross-cutting concerns that span systems

### When Stuck

1. **Explain what you tried** — Be specific
2. **Show the error** — Copy actual output
3. **Ask for guidance** — Don't spin
4. **Never guess at requirements** — Clarify first

### Verification Checklist

Before reporting task complete:

- [ ] All new code has tests
- [ ] All tests pass
- [ ] `code-refs` updated in artifacts
- [ ] `status` updated (`planned` → `implemented`)
- [ ] No broken `artifact-refs`
- [ ] References flow in correct direction (no back-references)
- [ ] Commit made with clear message
