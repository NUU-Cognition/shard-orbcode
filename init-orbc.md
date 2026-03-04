# OrbCode

A codebase understanding layer for mature production codebases. Humans understand the system through Map artifacts. Agents consume that understanding to implement and verify changes.

---

## Philosophy

### What OrbCode Is

OrbCode exists because **after MVP, the hard problem isn't writing code — it's understanding the system well enough to direct changes.** Agentic coding makes implementation easy. What remains hard is knowing what to change and why.

OrbCode gives humans a conceptual understanding of their codebase through layered, visual, human-readable artifacts. Agents read these artifacts to get the context they need to work effectively.

### What Humans Do

- Define architecture and system boundaries
- Define requirements and capabilities
- Define testing strategy and test cases
- Make taste and quality decisions
- Manage infrastructure and environments
- Review agent work through interactive submissions

### What Agents Do

- Implement logic (guided by Map artifacts and task specs)
- Implement tests (guided by test architecture and fixtures)
- Keep Map artifacts up to date after code changes
- Review other agents' implementations

### Core Principles

1. **Code is truth, Map reflects it.** The Map is downstream of the codebase. When code changes, the Map catches up. The Map is not a governance layer — it's a mirror.

2. **Post-MVP assumption.** OrbCode is for codebases that already exist and have structure. The problem is maintaining understanding, not bootstrapping.

3. **Human-readable first.** Map artifacts should be visually rich, conceptual, and understandable by a human who doesn't read code. Prefer mermaid diagrams, state machines, and clear prose.

4. **TDD for governed code.** Write the failing test first. The test describes intent before implementation exists.

5. **Verify before claiming done.** Run tests. Read the output. Don't assume.

6. **Resolution over completeness.** Don't document everything. 5-20 Map artifacts is typical. If you have more than 20, consolidate.

7. **Emergent semantics.** Create docs when needed, not upfront. The Map grows as you work.

### When Stuck

Agents should:
1. Explain what was tried
2. Show the error or blocker
3. Ask for guidance
4. **Never guess at requirements**

---

## Layers

OrbCode has three layers:

| Layer | Purpose | Artifact Types |
|-------|---------|----------------|
| **Context** | Project-level knowledge | Context, Architecture, Environment, Relationships |
| **Map** | Semantic mapping of code | Overview, System, Feature, Process, Data, API |
| **Verification** | Test infrastructure | Test Architecture, Fixture, Test, Test Runner |

Additionally, there are **Log** artifacts for historical records: Decision, Release, Submission.

And **Container** artifacts for project organization: OrbCode Workspace, OrbCode Project.

### Context Layer

Project-level knowledge that doesn't change with individual features. Free to update anytime — no task required.

| Type | Question Answered | When to Create |
|------|-------------------|----------------|
| `(Context)` | What is this and what concepts matter? | Always at workspace level |
| `(Architecture)` | What tech, structure, and design? | For non-trivial stacks |
| `(Environment)` | How do I run/deploy this? | Per environment (dev/prod) |
| `(Relationships)` | How does this project fit into the system? | For projects with dependencies |

### Map Layer (The Core)

The Map is the heart of OrbCode. Each artifact answers one human question about the codebase:

| Type | The One Question | When to Create |
|------|------------------|----------------|
| `(Overview)` | How do pieces fit together visually? | High-level diagrams, visual entry point |
| `(System)` | What are the major parts and boundaries? | Bounded contexts, subsystems (1-3 typical) |
| `(Feature)` | What capabilities exist? | Key capabilities (5-10 typical) |
| `(Process)` | How does this flow work? | Complex multi-step workflows only |
| `(Data)` | What shape is the core state? | Core entities, schemas |
| `(API)` | What can external callers invoke? | External interfaces, contracts |

**Map artifacts should be rich and conceptual.** Use mermaid diagrams for state machines (`stateDiagram-v2`), data relationships (`erDiagram`), system boundaries (`graph TD`), API flows (`sequenceDiagram`), and architecture overviews. A human should be able to read a Feature artifact and actually understand the capability — not just see a list of code-refs.

**No `(Module)` type.** Module overlaps with System. Use `code-refs` to point to file locations instead.

#### Map Modes

Every Map artifact has a `mode` field:

| Mode | When | What It Means |
|------|------|--------------|
| `live` | Default | Reflects current code reality. Code-refs point to real code. |
| `planned` | Designing new capability | Describes something that doesn't exist yet. No code-refs. |
| `altered` | Changing existing capability | Describes intended changes to something that already exists. |

**How modes flow:**

```
New thing:       (nothing) → planned → live
Changing thing:  live → altered → live
Small change:    live → (just update directly) → live
```

For **small changes**, skip the planning phase entirely. Implement the task, then update the Map artifact directly to stay `live`.

For **big changes**, draft Map artifacts as `planned` or mark existing ones `altered`. Think through it visually. Then create OrbCode Tasks from the planned/altered artifacts.

**Altered mode labeling:** When a Map artifact is in `altered` mode, use `[ALTERED]` inline labels to mark what's changing:

```markdown
## State Machine

Current states: idle, loading, ready, error

**[ALTERED]** Adding new state: `stale` between `ready` and `loading`
**[ALTERED]** Removing: `error` → `idle` transition (now goes through `stale`)
```

When the change lands, the agent strips the labels and flips mode back to `live`.

### Verification Layer

Test infrastructure artifacts that describe how testing works.

| Type | Question Answered | When to Create |
|------|-------------------|----------------|
| `(Test Architecture)` | How does testing work in this project? | One per project |
| `(Fixture)` | What test data do we need? | For reusable test data/mocks |
| `(Test)` | Does code match semantic description? | To verify Map artifacts |
| `(Test Runner)` | How do I run these tests? | Per test suite/type |

**Test naming convention:**
```
(Feature) Document Parsing . (Unit) Parse frontmatter.md
(System) Mesh Core . (Integration) Full pipeline.md
```

**Test types:** `(Unit)` for single function isolation, `(Integration)` for multiple components together.

### Log Artifacts

Minimal historical records:

| Type | Question Answered | When to Create |
|------|-------------------|----------------|
| `(Decision)` | Why did we choose this? | For significant architectural decisions |
| `(Release)` | What changed in this version? | For each release |
| `(Submission)` | Can the human verify this works? | For human review of completed work |

### Container Artifacts

| Type | Question Answered | When to Create |
|------|-------------------|----------------|
| `(OrbCode Workspace)` | How do projects fit together? | For monorepos / multi-project |
| `(OrbCode Project)` | What does this codebase do? | For each distinct codebase |

#### Project Types

Every OrbCode Project has a `project-type` field that tells agents what to expect:

| Type | What It Is | Testing | Examples |
|------|-----------|---------|----------|
| `application` | Code that runs — libraries, apps, services, CLIs | Automated tests (vitest, pytest), CI, coverage | mesh-core, a Next.js app, an API service |
| `cognitive` | Markdown-as-code — shards, prompt programs, knowledge systems | Review checklists, coherence checks, manual validation | The OrbCode shard itself, a Flint shard |

Agents should check `project-type` before looking for test infrastructure. A `cognitive` project won't have a `vitest.config.ts` — don't look for one.

---

## OrbCode Task

The `(OrbCode Task)` is a Map-aware task type. It lives alongside Projects shard tasks — it does not replace them.

The difference: an OrbCode Task knows which Map artifacts are affected. When the agent implements it, it knows what to update. When review happens, the reviewer checks Map accuracy alongside code correctness.

### Task Cycle

```
1. Create OrbCode Task
   - References affected Map artifacts
   - Describes the change in human terms

2. Implement (agent)
   - Write code + tests
   - Update Map artifacts (mode → live, update code-refs, content)

3. Agent Review (independent agent)
   - Second agent reviews: does code match Map? Do tests pass?
   - Flags issues back to implementing agent

4. Submission (for human review)
   - Sets up something the human can interact with
   - NOT "read the code" — human verifies the end product
   - Examples:
     · "Run `npm test -- --grep auth` to see auth tests pass"
     · "Visit localhost:3000/settings to see the new page"
     · "These 3 commands now work: ..."
   - Can bundle multiple tasks into one submission
```

### Planning Mode (Big Changes)

For architectural changes that need thought before implementation:

```
1. Human wants to architect a change
2. Draft Map artifacts as `planned` or mark existing ones `altered`
   - Sketch new Features, modify Data shapes, redraw System boundaries
   - Use mermaid diagrams to think through it visually
3. When satisfied, create OrbCode Tasks from the planned/altered artifacts
4. Agent implements tasks (normal task cycle)
5. Map artifacts flip to `live` as code lands
```

---

## Docs & Notes

### Docs

The `Docs/` folder holds `(Docs)` files — manual references to external documentation for technologies used in the project. Created by hand, no template. Naming: `(Docs) [Topic].md`.

### Notes

The `Notes/` folder holds project-specific concepts and references:

- **Concept notes** — Untyped freeform markdown. Just `[Name].md`.
- **`(OrbCode Reference) [Topic].md`** — Typed entry point using `tmp-orbc-reference`. Links to concept notes, mesh artifacts, and external resources.

Both Docs/ and Notes/ are informal — no task required, no Map impact.

---

## Structure

**Workspace (monorepo):**
```
Mesh/OrbCode/
└── (OrbCode Workspace) [Name]/
    ├── (OrbCode Workspace) [Name].md
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
    ├── (OrbCode Project) [Name].md
    ├── Context/
    │   ├── (Relationships) [Name].md
    │   └── (Context) [Name].md
    ├── Map/
    │   ├── (Overview) *.md
    │   ├── (System) *.md
    │   ├── (Feature) *.md
    │   ├── (Process) *.md
    │   ├── (Data) *.md
    │   ├── (API) *.md
    │   └── [Subfolder]/
    ├── Docs/
    │   └── (Docs) [Topic].md
    ├── Notes/
    │   ├── (OrbCode Reference) [Topic].md
    │   └── [Concept Name].md
    ├── Log/
    │   ├── (Decision) *.md
    │   ├── (Release) *.md
    │   └── (Submission) *.md
    ├── Tasks/
    │   └── (OrbCode Task) NNN *.md
    └── Tests/
        ├── (Test Architecture) Project.md
        ├── (Test Runner) *.md
        ├── (Fixture) *.md
        └── [Map Item] . (Test) *.md
```

**Folder organization is flexible.** Start flat — add subfolders when a layer grows complex enough. The only rules are:
- Top-level folders (Context/, Map/, Docs/, Notes/, Log/, Tasks/, Tests/) exist as needed
- Artifacts use `(Type) Name.md` naming regardless of depth
- Wikilinks work by title, not path

---

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

**Reference direction:** All `artifact-refs` flow in one direction. Never link both ways between a pair. Use backlinks for reverse lookups.

---

## Workflows

### Setup (one-time per project)

| Workflow | File | Purpose |
|----------|------|---------|
| Map Codebase | `wkfl-orbc-map.md` | Explore existing code, create initial Map artifacts |
| Setup Tests | `wkfl-orbc-setup-tests.md` | One-time test infrastructure setup |

### Task Cycle (ongoing development)

| Workflow | File | Purpose |
|----------|------|---------|
| Create Task | `wkfl-orbc-create-task.md` | Create an OrbCode Task from a change request |
| Implement Task | `wkfl-orbc-implement-task.md` | Agent implements task, updates Map |
| Review Implementation | `wkfl-orbc-review.md` | Independent agent reviews code + Map accuracy |

### Free (no task required)

| Workflow | File | Purpose |
|----------|------|---------|
| Update Context | `wkfl-orbc-update-context.md` | Refresh Context, Architecture, Environment |
| Update Map | `wkfl-orbc-update-map.md` | Sync Map artifacts to current code state |
| Refactor | `wkfl-orbc-refactor.md` | Reorganize semantic layer (no meaning change) |

---

## Templates

**Containers:** (`templates/containers/`)
| Template | File | Creates |
|----------|------|---------|
| Workspace | `tmp-orbc-workspace-v0.1.md` | `(OrbCode Workspace) Name.md` |
| Project | `tmp-orbc-project-v0.1.md` | `(OrbCode Project) Name.md` |

**Context:** (`templates/context/`)
| Template | File | Creates |
|----------|------|---------|
| Context | `tmp-orbc-context-v0.1.md` | `(Context) Name.md` |
| Architecture | `tmp-orbc-architecture-v0.1.md` | `(Architecture) Name.md` |
| Environment | `tmp-orbc-environment-v0.1.md` | `(Environment) Name.md` |
| Relationships | `tmp-orbc-relationships-v0.1.md` | `(Relationships) Name.md` |

**Map:** (`templates/map/`)
| Template | File | Creates |
|----------|------|---------|
| Overview | `tmp-orbc-overview-v0.1.md` | `(Overview) Name.md` |
| System | `tmp-orbc-system-v0.1.md` | `(System) Name.md` |
| Feature | `tmp-orbc-feature-v0.1.md` | `(Feature) Name.md` |
| Process | `tmp-orbc-process-v0.1.md` | `(Process) Name.md` |
| Data | `tmp-orbc-data-v0.1.md` | `(Data) Name.md` |
| API | `tmp-orbc-api-v0.1.md` | `(API) Name.md` |

**Task:** (`templates/task/`)
| Template | File | Creates |
|----------|------|---------|
| OrbCode Task | `tmp-orbc-task-v0.1.md` | `(OrbCode Task) NNN Name.md` |

**Log:** (`templates/log/`)
| Template | File | Creates |
|----------|------|---------|
| Decision | `tmp-orbc-decision-v0.1.md` | `(Decision) Name.md` |
| Release | `tmp-orbc-release-v0.1.md` | `(Release) Version.md` |
| Submission | `tmp-orbc-submission-v0.1.md` | `(Submission) Name.md` |

**Verification:** (`templates/verification/`)
| Template | File | Creates |
|----------|------|---------|
| Test Architecture | `tmp-orbc-test-architecture-v0.1.md` | `(Test Architecture) Project Name.md` |
| Fixture | `tmp-orbc-fixture-v0.1.md` | `(Fixture) Name.md` |
| Test | `tmp-orbc-test-v0.1.md` | `[Map Item] . (Test) Name.md` |
| Test Runner | `tmp-orbc-test-runner-v0.1.md` | `(Test Runner) Name.md` |

**Notes:** (`templates/notes/`)
| Template | File | Creates |
|----------|------|---------|
| Reference | `tmp-orbc-reference-v0.1.md` | `(OrbCode Reference) Topic.md` |

---

## Knowledge

| File | Purpose |
|------|---------|
| `knw-orbc-vitest.md` | Vitest setup for TypeScript |
| `knw-orbc-pytest.md` | pytest setup for Python |

---

## Agent Instructions

### Session Start

1. Read `(OrbCode Project) [Name].md` to understand the project
2. Read relevant Context/ artifacts (Architecture, Environment)
3. Check Notes/ for `(OrbCode Reference)` files
4. Check Map/ for artifacts related to your task
5. Check Tests/ for existing test infrastructure

### Before Implementation

1. **Understand the requirement** — Ask if unclear, don't guess
2. **Identify affected Map artifacts** — Which Features, Systems, Data shapes?
3. **Propose approach** — Get human approval before major work
4. **Check test infrastructure** — Test Runner exists? Fixtures needed?

### During Implementation

1. **Follow TDD** — Write failing test first, always
2. **Run tests after each change** — Stay green or know why red
3. **Commit frequently** — Small, focused commits
4. **Update Map artifacts** — Keep `code-refs`, `mode`, and content current

### Before Claiming Done

1. **Run full test suite** — Not just the new tests
2. **Read the output** — Don't assume, verify
3. **Confirm all pass** — No skipped, no flaky
4. **Update Map artifact mode** — `planned`/`altered` → `live`
5. **Check refs are valid** — `code-refs` point to real files
