# OrbCode

A **hand-curated semantic map** of a codebase. OrbCode gives developers and agents a structured, human-readable understanding of what a codebase does — and a surface to plan what it should do next.

---

## What OrbCode Is

OrbCode is a **hand-curated semantic map**: a human decides what belongs on it. The codebase is the source of truth; the Map mirrors what exists *and* plans what's next; the **plate** (the visual canvas) is the cockpit the human steers from.

- **Any stage.** OrbCode is not gated to post-MVP code. You can map intended architecture as `draft` before a line is written, or mirror a mature system. It is a thinking tool from day one.
- **As big as it needs to be.** Curation means *intentional selection*, not a size cap. A small service might be 8 artifacts; a large system might be 150. Both are fine **if a human chose every node.** What OrbCode never does is auto-dump the whole graph.
- **Cognitive load is managed by structure, not size.** A big map stays legible because it collapses — System → Module → Feature → Data — and because the plate offers semantic zoom, saved views, and stable spatial layout. The hierarchy is the load-management tool.

### The Invariants

These hold regardless of project, size, or stage. Everything else is a tool in service of them.

1. **Hand-curated.** Every artifact enters the map by human intent. The agent may *draft*, but the human chooses what belongs. OrbCode is curation, not auto-generation.
2. **Code is truth, the Map reflects it.** The Map is downstream of the codebase. When code changes, the Map catches up; where they disagree, code wins.
3. **Any stage.** Usable before, during, or after the code exists. `draft` bridges planning and reflection.
4. **Navigable by structure.** Legibility comes from hierarchy + semantic zoom, not from staying small.
5. **Human-guided.** The agent *proposes and maintains*; the human *disposes* (accepts, curates, commits status) — in the plate.
6. **Drift-detected.** Curated maps rot unless kept honest. Artifacts anchor to code via `code-refs`, `stale` is a first-class status, and `orbc validate` checks the contract.

### What Makes OrbCode Different

Against the field of codebase-mapping tools (Backstage, C4, CodeSee, Sourcetrail…), OrbCode's edge is three things — protect them:

- **Curation over completeness.** Auto-tools chase "show everything" and then fight the resulting hairball. OrbCode shows only what a human selected as worth understanding.
- **Live human↔agent presence.** The plate shows where agents are working *right now*. No prior tool surfaces this on a human-facing map.
- **Map-as-planning-surface.** Not an inventory of what exists — a surface you reason and plan changes on.

---

## Operating Stance

**The agent proposes; the human disposes.** OrbCode is human-guided by default.

- The agent's job: **draft** new artifacts (as `curation: proposed`), **maintain** existing ones against code, and **flag drift** (`stale`). Always prefer one artifact done well over ten done fast. Small, high-confidence diffs with a human checkpoint — never a 40-artifact sweep.
- The human's job: decide **what** goes on the map, **accept** proposals (`curation: accepted`), curate wording and structure, and **commit status transitions** in the plate.
- **Status transitions are the human's.** The agent writes an honest *current-reality* status (e.g. `active`/`untested`) but always with `curation: proposed`; it never marks an artifact `verified` or flips `curation` to `accepted` itself.

This stance is why the resolution guideline, the curation field, the manual status model, and the checkpointed workflows all exist — they are one philosophy, not separate rules.

---

## Naming Convention

All artifacts are **namespaced under their project** using dot notation.

```
(OrbCode Project) [Name] . (Type) [Artifact Name].md
```

```
(OrbCode Project) Mesh Core . (System) Parser Pipeline.md
(OrbCode Project) Mesh Core . (Module) Auth.md
(OrbCode Project) Mesh Core . (Feature) Document Parsing.md
(OrbCode Project) Mesh Core . (Data) Document Schema.md
```

> **Plate contract:** the plate detects an artifact's **type from the filename** — the `(Type)` token after the ` . ` separator. The filename pattern is not cosmetic; it is how the canvas knows what each node is. Never drop or rename the `(Type)` token.

**Wikilinks in frontmatter are FULLY QUALIFIED** — `[[(OrbCode Project) Mesh Core . (Module) Auth]]`, never the short `[[(Module) Auth]]`. The plate resolver and the tree script key on the full basename; short links silently fail to resolve. Body prose may use aliases for readability: `[[(OrbCode Project) Mesh Core . (Module) Auth|Auth]]`.

---

## The Core Spine — Four Types

OrbCode ships a deliberately small, load-bearing core. The Map is built from four types:

| Type | The one question | `parent` (exactly one) | `artifact-refs` (Map types) | Status model |
|------|------------------|------------------------|-----------------------------|--------------|
| **System** | What are the major architectural boundaries? | System, or empty for a root | System, Module, Feature, Data | structural |
| **Module** | What cohesive area groups these capabilities? | System | Module, Feature, Data | structural |
| **Feature** | What single capability exists? | Module \| System \| Feature | Feature, Data | actionable |
| **Data** | What shape is the core state? | System \| Module \| Feature \| Data | Data (non-parent relations) | structural |

**Module** is the chunking layer that keeps a large map legible (precedented: C4 System→Container→Component, Backstage System→Component). It is **optional** — a small project can go System → Feature directly. Define a Module as *a cohesive implementation area that groups related Features behind a stable internal interface — often a package, folder, namespace, or service component.* A Module is **System-like in responsibility, but not a bounded architectural seam** (that is what separates it from a System). A folder/package is **evidence** for a Module, not proof — the unit is the responsibility/interface, not the filesystem object.

**Data has a real place in the hierarchy.** Its `parent` is its primary conceptual **owner** — the System, Module, or Feature it belongs to (or another Data for a sub-schema). This is what makes Data collapse under its owner on the plate. For shared data, pick the primary owner as `parent` and let every other user link it via `artifact-refs`.

**Project kinds.** Every project declares `project-type`: `application` (code that runs — libraries, apps, services, CLIs) or `cognitive` (markdown-as-code — shards, prompt programs). The kind shapes how a project is verified (automated tests vs coherence checks) — and is the field the Testing layer will key off when it is reintroduced.

Map artifacts should be **rich and conceptual** — a human who doesn't read code should understand them. Use mermaid diagrams for state machines, data relationships, and system boundaries.

---

## Reference Model (Core Spine)

OrbCode enforces a **type-constrained reference graph**. `artifact-refs` carries **OrbCode Map types only**:

| Type | `artifact-refs` may contain | Gets referenced by |
|------|-----------------------------|--------------------|
| **System** | System, Module, Feature, Data | System |
| **Module** | Module, Feature, Data | System, Module |
| **Feature** | Feature, Data | System, Module, Feature |
| **Data** | Data | System, Module, Feature, Data |

**Rules:**

1. **Systems are the root.** Entry point of the Map graph.
2. **Modules group capabilities.** System-like in responsibility but not a bounded seam: reference Features, Data, and sub-Modules. Never reference Systems upward.
3. **Features are capabilities.** Reference sub-Features and Data. Never reference Systems or Modules upward.
4. **Data is shape.** References sub-Data only (non-parent schema relations).
5. **Reference direction is one-way.** Never link both ways. Use backlinks for reverse lookups.

### Reference fields are split by target

`artifact-refs` is for the Map graph **only**. Other relationships get their own field so the plate can render the core graph without swallowing specs, tasks, and context docs into the same edge soup:

| Field | Targets | Purpose |
|-------|---------|---------|
| `artifact-refs` | OrbCode Map types (type-constrained, above) | Graph edges on the plate canvas |
| `spec-refs` | Specifications shard artifacts | Critical-interface contracts |
| `task-refs` | Tasks (Projects shard) | Implementation work |
| `context-refs` | Context-layer docs | Background reading (optional) |

### Hierarchy vs. References

`parent:` and `artifact-refs:` have **separate jobs** — do not conflate them.

| Field | Purpose | Shape | Used by |
|-------|---------|-------|---------|
| `parent:` | The single hierarchy signal — the one owner of this artifact | **Exactly one** wikilink, or `""` for a root | Sidebar tree, depth layout, collapse cascade |
| `artifact-refs:` | "Related to" links, type-constrained to Map types | List of wikilinks | Graph edges on the plate canvas |

- **`parent` is singular.** Exactly one owner, or empty for a root. It is **never a list** — secondary relationships go in `artifact-refs`. (This is a hard contract change from earlier drafts that allowed multiple parents.)
- **Hierarchy is exclusively `parent:`.** The renderer never infers parent-child from `artifact-refs`.
- **Parent whitelist:** System ← System; Module ← System; Feature ← Module | System | Feature; Data ← System | Module | Feature | Data.

---

## Frontmatter Contract

The templates are the source of truth for shape; this is the summary the validator enforces. **Generate boringly-valid YAML** — replace placeholder *values*, keep the shapes. Never put `/* */` comments or `[a|b|c]` option-lists inside frontmatter; those degrade parsing.

```yaml
id: "GENERATE-UUID4"
tags:
  - "#orbc/<type>"          # system | module | feature | data
status: "active"            # see Status Models
curation: "proposed"        # proposed (agent draft) | accepted (human-committed)
parent: "[[(OrbCode Project) Proj . (System) Name]]"   # exactly one, fully qualified, or ""
code-refs:
  - "src/area/"
artifact-refs:
  - "[[(OrbCode Project) Proj . (Feature) Name]]"
spec-refs: []
template: "[[dev-tmp-orbc-<type>-v0.2]]"
orbh-sessions:
  - "[[session-uuid]]"
authors:
  - "[[@author]]"
```

### `code-refs` grammar

`code-refs` is the staleness anchor, so it has a small grammar the future drift checker keys on. Paths are relative to the project's resolved `codebase`:

```
"src/auth/"                       # a directory
"src/auth/session.ts"             # a file
"src/auth/session.ts#SessionManager"   # a symbol within a file
"src/auth/session.ts:L20-L80"     # a line range — TEMPORARY, weak anchor; avoid for stable refs
```

Prefer `path/`, `path/file.ext`, and `path/file.ext#symbol`. The validator checks path existence first, then symbol existence where a parser exists.

---

## Plate Contract

The plate **is** the payoff — it encodes meaning spatially, shows status at a glance, renders the reference graph, and surfaces live agent presence. It reads OrbCode artifacts mechanically, so these conventions are a hard contract:

| Signal | Source | Must be |
|--------|--------|---------|
| **Type** | filename `(Type)` token after ` . ` | exactly `(System)` / `(Module)` / `(Feature)` / `(Data)` |
| **Status** | `status:` | a valid enum for that type's tier (below) |
| **Curation** | `curation:` | `proposed` or `accepted` |
| **Edges** | `artifact-refs:` | fully-qualified wikilinks, Map-type-valid per the Reference Model |
| **Hierarchy** | `parent:` | exactly one fully-qualified wikilink to a whitelisted parent |
| **Code badge** | `code-refs:` | list of grammar-valid anchor strings |
| **Spec edges** | `spec-refs:` | Specifications wikilinks (rendered distinctly, not as Map edges) |
| **Project kind** | `project-type:` on the Project | `application` or `cognitive` |
| **Codebase** | `codebase:` on the Project | a `[[rf-cb-*]]` reference marker (never a raw path) |

> **The plate may degrade silently, but `orbc validate` must fail loudly.** A status typo or short wikilink just drops the signal on the canvas — so the validator is the safety net that turns silent degradation into a reported error.

### Plate Requirements

Because the size cap is gone, the plate's scaling features are **requirements, not polish**. The minimum behaviours:

1. **Collapse** by System and Module.
2. **Semantic zoom**: project → systems → modules → features/data.
3. **Deterministic layered layout** by type rank (not force-directed).
4. **Sticky coordinates** per artifact (move only when the artifact itself moves).
5. **Full-wikilink resolver** (short alias only as a fallback).
6. **Status + curation badges** (proposed artifacts render distinctly from accepted).
7. **Drift badge** from `code-ref` validation.
8. **Saved views / focus slices** for large maps (see below).
9. **Reduced-motion** agent presence (see [[dev-knw-orbc-orbcraft]]).
10. **Validation panel** surfacing broken contract signals.

**Saved views** let the user keep multiple stable windows onto one big graph. They are plate-local metadata (e.g. on the Project index or plate state), **not** a new OrbCode type:

```yaml
views:
  - name: "Auth slice"
    roots: ["[[(OrbCode Project) Mesh Core . (Module) Auth]]"]
    depth: 2
    show: [systems, modules, features, data]
```

---

## Status Models

`status` describes **code reality**; `curation` describes **human acceptance**. They are orthogonal — an agent writes an honest `status` with `curation: proposed`; the human flips `curation` to `accepted` (and promotes status) in the plate. All status transitions are committed by the human.

### Structural entities — System, Module, Data

| Status | Meaning |
|--------|---------|
| `draft` | Planned — not yet in the codebase |
| `active` | Current and accurate |
| `stale` | Out of date with code |
| `deprecated` | No longer relevant |

```
draft → active → deprecated
    active → stale → active
```

### Actionable entities — Feature

| Status | Meaning |
|--------|---------|
| `draft` | Planned — no code yet |
| `untested` | Code exists, not yet human-verified |
| `stale` | Was verified, now out of date with code |
| `verified` | Human confirmed the artifact matches code |

```
draft → untested → verified
    any state → stale → untested → verified
```

---

## Staleness & Drift

A hand-curated map rots unless kept honest. OrbCode's stance ("code is truth, the Map reflects it") is a **reflexion model**: the Map states a structure, and reality (the code) either *converges*, *diverges*, or is *absent*.

The minimum defense:

1. **`code-refs` anchoring** (with the grammar above). Every Feature and Data artifact — ideally every System/Module — lists the anchors it describes. This is the link between an artifact and the reality it mirrors.
2. **`stale` is first-class.** When code drifts from an artifact, the human sets `stale`. Stale is an honest signal that re-curation is due, not a failure.
3. **Agent flags, human re-curates.** When the agent notices an artifact no longer matches its `code-refs`, it suggests `stale`; the human decides the fix.
4. **`orbc validate`** checks the contract (and, where a parser exists, code-ref symbol existence) — the bridge to automated drift detection.

**Fast-follow:** auto-flag `stale` when a `code-ref` moves or vanishes (on PR), and conformance checks that fail when the real import graph diverges from the asserted `artifact-refs`.

---

## Spatial Model (Plate Rendering)

For now the Map is the **Core band** only — a single top-to-bottom depth flow:

```
System  →  Module  →  Feature  →  Data
```

laid out with deterministic layered positioning and sticky coordinates. The fuller band model (Infrastructure / Downstream / Cross-system) returns when the deferred types (Environment, Dependency, Consumer, E2E) are reintroduced.

---

## Structure

```
Mesh/OrbCode/
└── (OrbCode Project) [Name]/
    ├── (OrbCode Project) [Name].md                  # Project index
    ├── Context/                                     # Untyped project knowledge (optional)
    │   ├── ... . Overview.md                        # Diagram-first "start here"
    │   ├── ... . Context.md                         # Scope, concepts, conventions, glossary
    │   ├── ... . Architecture.md                    # Directory structure, patterns, constraints
    │   ├── ... . Tech Stack.md                      # Language, build, test, key dependencies
    │   └── ... . Relationships.md                   # Inter-project connections
    ├── Map/                                         # Typed map artifacts (the core spine)
    │   ├── ... . (System) Name.md
    │   ├── ... . (Module) Name.md
    │   ├── ... . (Feature) Name.md
    │   └── ... . (Data) Name.md
    └── Notes/
        ├── (OrbCode Reference) [Topic].md
        └── ... . [Topic].md
```

**Context layer** documents are untyped (no `(Type)` prefix) and optional. Keep their boundaries crisp: **Overview** is the one-screen visual entry point; **Architecture** is how the code is organized; **Context** is the conceptual glossary and conventions.

---

## Deferred Types

Several types from earlier OrbCode are intentionally parked. Their templates have been removed to keep the shard focused; re-author a template (and restore its row in the Reference Model + band in the Spatial Model) when a type earns its keep:

| Deferred type | Reintroduce when | Brings back |
|---------------|------------------|-------------|
| **UI** | there's a user/CLI/API surface worth mapping | surface mapping under Features |
| **Dependency** | you want to show what the project consumes | Infrastructure band (inputs) |
| **Environment** | you map where things run (CI, local, Docker) | Infrastructure band |
| **Consumer** | you map what depends on this project | Downstream band |
| **Test Suite / Test / E2E** | the Testing layer earns its keep | verification layer + the `cognitive`-project "coherence check" story |

Nothing is lost — this is sequencing.

---

## Relationship to Specifications

OrbCode **composes with** the Specifications shard (it does not hard-depend on it). The relationship is one-way and conceptual:

| | Specifications | OrbCode |
|--|---------------|---------|
| **Direction** | Prescriptive — what code *should* do | Descriptive — what code *does* |
| **Relative to code** | Upstream | Downstream / reflective |

Map artifacts reference Specs via the dedicated **`spec-refs`** field (not `artifact-refs`) for critical interfaces. This is a composition, not a manifest dependency — `shard.yaml` does not list Specifications under `dependencies`.

---

## Validation

`orbc validate` is the safety net that makes the plate contract enforceable instead of fatalistic:

```bash
flint shard orbc validate "(OrbCode Project) Mesh Core"
```

It checks: the Project has a resolvable `codebase: [[rf-cb-*]]`; every Map file follows dot-notation naming; the filename `(Type)` token matches the `tag`; required fields exist; `status` is valid for the type; `curation` is valid; `parent` is singular, resolves, and is whitelisted; `artifact-refs` resolve and obey the Reference Model; `code-refs` are grammar-valid and their paths exist relative to the resolved codebase (symbol existence where a parser exists); no deferred types appear; no short wikilinks appear in frontmatter; and the YAML parses cleanly.

---

## Processes

OrbCode work is incremental and human-guided. The default loop is: *human points at something → agent drafts or updates **one** artifact (as `proposed`) → human accepts and commits status in the plate.*

These map onto the capabilities: **Init Project** seeds a new project; **OrbCode Edit** handles planning, reflecting, and drift; the **Add Artifact** skill is the create-one-artifact primitive both workflows call.

### 1. Seeding a project
Create the `(OrbCode Project)` index, add a few Context docs (Overview first), and seed the anchor Systems + top Modules/Features. Seed, don't sweep.

### 2. Planning a change
Create a `draft` artifact, link relevant artifacts via `artifact-refs`, link the implementation Task via `task-refs`. Human promotes status as work lands.

### 3. Reflecting a change (after coding)
Read the changed code and the artifact, update description/diagrams/`code-refs`. If you didn't start from the map, suggest `stale` first, then re-curate.

### 4. Drift audit (occasional)
Run `orbc validate`, compare each artifact against its `code-refs`, and flag divergence for the human.

---

## Skills

| Skill | File | Purpose |
|-------|------|---------|
| Add Artifact | `dev-sk-orbc-add_artifact.md` | Create a single Map artifact (System / Module / Feature / Data) following the template + contract |

## Workflows

| Workflow | File | Purpose |
|----------|------|---------|
| Init Project | `dev-wkfl-orbc-init_project.md` | Stand up a new project — resolve the codebase, gather context, seed anchor artifacts (human-checkpointed) |
| OrbCode Edit | `dev-wkfl-orbc-edit.md` | The general workflow — create/update artifacts, plan changes as `draft`, and flag drift |

---

## Templates

**Core (map):** `dev-tmp-orbc-{system,module,feature,data}-v0.2.md`
**Container:** `dev-tmp-orbc-project-v0.2.md`
**Context:** `dev-tmp-orbc-{overview,context,architecture,tech_stack,relationships}-v0.2.md`
**Notes:** `dev-tmp-orbc-{reference,note}-v0.2.md`

The deferred types (UI, Dependency, Consumer, Environment, Test Suite, Test, E2E) have **no templates** — re-author one when a type is reintroduced.

---

## Scripts

| Script | Purpose |
|--------|---------|
| `tree` | Compact hierarchical view of OrbCode projects |
| `validate` | Check a project against the plate/frontmatter contract |

```bash
flint shard orbc tree "(OrbCode Project) Flint" --verbose    # Status + code-refs
flint shard orbc validate "(OrbCode Project) Flint"          # Contract check
```

---

## Knowledge

| File | Purpose |
|------|---------|
| `dev-knw-orbc-decisions.md` | ADRs — the spine, Module, and contract decisions |
| `dev-knw-orbc-orbcraft.md` | OrbCraft — agent presence on the OrbCode plate (incl. reduced-motion rules) |
| `dev-knw-orbc-vitest.md` | Optional support — Vitest setup, used when verifying `application` projects |
| `dev-knw-orbc-pytest.md` | Optional support — pytest setup, used when verifying `application` projects |

---

## Agent Instructions

### Reading an OrbCode project
1. Run `flint shard orbc tree "(OrbCode Project) [Name]"` to see the structure.
2. Read Context/ docs as needed, then the specific Map/ artifacts for your task.

### Proposing / maintaining the Map
1. Read the relevant code first — code is truth. Resolve the codebase from the Project's `[[rf-cb-*]]` marker.
2. Draft or update the artifact: description, diagrams, grammar-valid `code-refs`.
3. **Propose, don't dispose.** Write an honest `status` but always `curation: proposed`; if an artifact no longer matches its `code-refs`, suggest `stale`. Never set `verified` or flip `curation: accepted`.
4. Keep diffs small and high-confidence. One artifact done well beats ten done fast.
5. Preserve the contract: exact `(Type)` filename token, **fully-qualified** wikilinks in frontmatter, singular whitelisted `parent`, Map-type-valid `artifact-refs`, valid `status`/`curation`. Run `orbc validate` when done.
