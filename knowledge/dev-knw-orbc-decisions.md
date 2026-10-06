---
description: "Architecture Decision Records for the OrbCode information model (the two layers and the anchor, the candidate and the history, the view model, the spine, Module, the contract)"
---

# OrbCode Decisions (ADRs)

Lightweight, append-only records of the architecturally-significant decisions about OrbCode's own information model. Each entry: context, decision, consequences. Newest first.

---

## ADR-006 — The two layers and the anchor (OrbCode 1.0.0)

**Context.** ADR-004 made a view replace the map. The operator tested OrbCode 1.0 on 2026-09-29: the map of 0.7 (System, Module, Feature, Data) is the best drawing of a product, because each part has one place. A view of the shape `flow` or `streams` had no link to that map, so a process could not show where it runs. Report 090 of the Flint NUU Flint ("How to Represent a Codebase Conceptually") compared the methods and the tools of the field and measured the map of Flint: 72 artifacts, and 6 of the 10 steps of the view "Onboarding" with no part on the map.

**Decision.**
- **Two layers.** The static map (`Map/`, one file for each part, the types System, Module, Feature, and Data) is the main drawing and the static description of a product. A process is a view of the shape `flow` or `streams`, and it runs on top of the map. The shapes `layers`, `tree`, `table`, and `free` stay valid views. A process is not a new type of the map, and a step is not a file.
- **The anchor.** A node names its static part with `part`: the full name of one artifact of `Map/`, a wikilink to it, or a short name that only one artifact has. A node names who acts with `actor`. The part owns the description of the capability. The step says only what occurs at this moment.
- **Computed, not written.** `flint orbcode view` gives each node `parts` and `parts_total`: the named part, or at most 5 parts proposed from the match of the `code-refs`, the nearest first. A proposal is not a claim: a writer reads the artifact and selects the part. `flint orbcode parts` gives each part with the processes whose nodes name it and the count of its dead code-refs. Only a named part counts as a process of a part.
- **Two findings.** `part-missing` (error): a `part` names no artifact of the map. `no-part` (note): a step or a decision names no part. The `no-part` notes of the processes are the list of the gaps of the static map.
- **The hashes.** `part` is a reference, in the `contract_hash`. `actor` is a field of the claim, in the `meaning_hash`. A node with neither field keeps its hashes, so each review anchor stays valid.
- **No workflow changes the map.** The workflows `view` and `reshape` take each part from `flint orbcode parts` and never invent one. A step with no part stays with no part, and the result of the workflow names the gap. No workflow writes a file of `Map/` until a rule says who approves a change of the static map.
- **Task 1127: the static map is the main map.** The rule of approval exists now: the static map is the main map of the software framework, and it changes only through a map change (`ite-map-change/1`, a file in `Changes/` of the project) that a person applies. An agent proposes with `flint ite map change propose`; a person applies or reverts. The workflows `view` and `reshape` of this shard still write no file of `Map/`.

**Consequences.** The OrbCode plate opens on the map, lists the processes, lights the parts of a selected process with the numbers of its steps, and shows the steps in a strip below the map. The type files and the templates of System, Module, Feature, and Data describe the static map, not only a legacy form. Not in this decision: the type Actor; the fields `reads` and `writes` of a step; the fields `process-kind`, `trigger`, and `result` of a process; a change set of many files of the map (Report 090, sections D.4 and F.2).

---

## ADR-005 — The candidate, the history, and the ids (OrbCode 1.0.0)

**Context.** ADR-004 made the candidate and the conditional apply. The first real use of the page Views of Steel and of the first views (Tasks 1089, 1090, and 1092 of the Flint NUU Flint) found three gaps. First, a candidate had the `id` of its view, so two files of the Mesh had one id, and a change by id could change the wrong file. Second, an apply replaced the view with no way back, so a person could not undo a reshape. Third, a person had no command to keep, accept, or remove a view: the person edited the frontmatter by hand or deleted the file. The manager of Task 1086 decided each change as an addition to Design Revision 1.

**Decision.**
- **Each file has its own id.** A view has its `id`. A candidate and a history file have their own new `id`, and the field `view_id` names the view. For a new view, the candidate has a new `view_id`, and the apply gives it to the view as its `id`. A candidate of the old form (no `view_id`) still loads, with a `format` warning and its repair.
- **An apply keeps the replaced form.** Before an apply replaces a view, it writes the replaced content to `History/<view-slug>-<UTC yyyymmdd-hhmmss>.md`, with `view_id`, `lifetime: history`, and `replaced-by: <candidate-id>`. The command keeps the newest 5 forms of each view. `flint orbcode history` lists them. `flint orbcode restore --from <history-id>` makes a candidate from one form: an undo is an apply like each other change, with the same check of `base_hash`.
- **An apply is not an acceptance.** When a candidate replaces an `accepted` view, the apply sets the view back to `proposed`, so that the person sees each change after the acceptance.
- **The decisions of a person are commands.** `flint orbcode set` changes `lifetime` and `curation`, and only these two keys of the file. `flint orbcode remove` removes a `draft` view and its candidates, and writes the view to `History/` first. It refuses a `kept` view. Steel uses the same code through `POST /api/orbcode/views/:id/fields` and `DELETE /api/orbcode/views/:id`.
- **A workflow verifies its own candidate.** Before its result, a workflow runs `check --candidate`, `view --candidate`, and `diff`, the three commands that write nothing.
- **Two additions for a real view.** A code-ref can name another codebase of the Flint with `@<Codebase name>/<path>`. A node of the kind `note` with no story has no proof state and no finding, so a view can end with a note of what it leaves out.

**Consequences.** Two files of the Mesh never share an id, and each change of a view can be undone for its newest 5 forms. The shard text names `view_id` in the template and in the result `orbcode-result/1` (its `view_id` is the `view_id` of the candidate). Only `flint orbcode` writes in `History/`. The migration 0.7.3 → 1.0.0 is not changed: it writes views, not candidates.

---

## ADR-004 — The view model (OrbCode 1.0.0)

**Context.** OrbCode 0.7 did not reach its goal. A person could not use the map to understand a product. The map had no link to proof, no check of drift, and no surface that a person opens each day. The scripts `tree` and `validate` did not run: they were `.ts` files, and the loader reads `.js` files. The model was rigid: one hierarchy for each codebase, one owner for each artifact, and one approval for each artifact. Orbtest now gives what OrbCode did not have: stories as contracts, criteria with states, anchors with commits, and the `components` paths of each spec. On 2026-09-29 the operator gave the direction: a map is not exhaustive and not mutually exclusive; it is the perspective from which a person wants to look at the product. The design is Design Revision 1 of Task 1086 in the Flint NUU Flint.

**Decision.**
- **A view replaces the map.** A view is one file that answers one question of a person. It is not exhaustive, not mutually exclusive, has a free shape (`flow`, `streams`, `layers`, `tree`, `table`, `free`), is made in a conversation, has a low cost, and is honest.
- **One file for each view** (format `orbcode-view/1`), with one heading for each node, a stable id on each heading, and one fenced `node` block for the fields that a tool reads. Two views never share a node. A reshape is one edit.
- **Three planes.** Views (the Mesh, written by an agent or a person), Contract (the stories of Orbtest), and Proof (the runs of Orbtest).
- **A writer writes meaning, a command computes facts.** A view stores no proof state, no case, and no finding. `flint orbcode`, a part of the Flint CLI, computes them. The shard has no script.
- **A candidate and a conditional apply.** A workflow writes a candidate. The apply replaces a view only when the hash of the view is the `base_hash` of the candidate.
- **One review anchor for each node** (`reviewed`), written only by `flint orbcode review`. The finding `review-due` replaces the status `stale`.
- **`curation` stays** (`proposed` or `accepted`), and `lifetime` (`draft` or `kept`) is new. The `status` values of 0.7 are not fields of a view.
- **The 0.7 types become words of `kind`.** The type files and the templates of System, Module, Feature, and Data stay as the legacy form. The workflows `init_project` and `edit` and the skill `add_artifact` are removed: they made 0.7 artifacts. The workflows `view` and `reshape` replace them, each with a headless twin for Steel.

**Consequences.** A person asks for a view, reads it, and changes its shape in a conversation. Each node shows the proof of Orbtest. A 0.7 project becomes one view of the shape `tree` through the migration `mig-orbc-0.7.3-to-1.0.0`. The plate must draw a view and read the join of `flint orbcode view`. The views need Orbtest stories for proof: a node with no story shows `no-contract`.

---

## ADR-003 — Harden the frontmatter/plate contract

**Context.** The v0.7 conceptual thesis outran its mechanical contract: templates allowed multi-parent, used short (non-namespaced) wikilinks, embedded `/* */` comments and `[a|b|c]` option-lists inside YAML, and agent-written statuses looked human-committed. The plate "silently degrades" on malformed input, so ambiguity is expensive.

**Decision.**
- **`parent` is singular** — exactly one owning wikilink, or `""` for a root. Secondary relations go in `artifact-refs`.
- **`Data.parent = System | Module | Feature | Data`** — Data now has a real place in the hierarchy and collapses under its owner (previously Data-only, which broke the stated spine).
- **Fully-qualified wikilinks in frontmatter** — `[[(OrbCode Project) Proj . (Type) Name]]`; short links are a contract error. Body prose may alias.
- **`curation: proposed | accepted`** — separates code-reality (`status`) from human acceptance. Agents write `proposed`; humans accept in the plate.
- **Reference fields split** — `artifact-refs` (Map types only), `spec-refs`, `task-refs`, `context-refs`.
- **`code-refs` grammar** — `path/`, `path/file.ext`, `path/file.ext#symbol`, optional temporary `:Lx-Ly`.
- **Boringly-valid template YAML** — placeholder values, no comments/option-lists inside frontmatter; explanatory comments live above the fenced block.
- **`orbc validate`** — a script that fails loudly where the plate degrades silently. (Removed in 1.0.0: the script did not run. `flint orbcode check` replaces it. See ADR-004.)
- **Plate scaling promoted to requirements** (collapse, semantic zoom, sticky layout, saved views, reduced-motion presence) since the size cap was removed.

**Consequences.** The contract is now enforceable by tooling, not just prose. The plate needs to read `curation` and the split ref fields. Existing deployed artifacts (none yet) would need a migration. Folded into 0.7.0 — no version bump.

---

## ADR-002 — Introduce the Module layer

**Context.** The jump from a 1–3 "System" to a flat list of Features gave no mid-level chunk, and large maps had no way to collapse to a legible size.

**Decision.** Add **Module** between System and Feature: *a cohesive implementation area that groups related Features behind a stable internal interface — often a package/folder/namespace/service component.* System-like in responsibility, but not a bounded architectural seam. A folder/package is evidence for a Module, not proof. Optional — small projects skip it. Precedented by C4 (System→Container→Component) and Backstage (System→Component).

**Consequences.** The plate needs a Module node type (icon, colour, Core-band placement, parent-whitelist). Module is the chunking level that makes "as big as it needs to be" navigable.

---

## ADR-001 — The hand-curated four-type spine

**Context.** Earlier OrbCode tried to model a whole city (12 types, four bands) before the roads were paved, and leaned toward auto-generated completeness — which produces hairballs, not understanding.

**Decision.** Reduce to a hand-curated core spine — **System → Module → Feature → Data** — with the invariants: hand-curated, code-is-truth, any-stage, navigable-by-structure, human-guided, drift-detected. Defer UI / Dependency / Consumer / Environment / Test Suite / Test / E2E (remove their templates) until each earns its keep. Codebase is referenced via a `[[rf-cb-*]]` marker, never a raw path. Capability surface: one skill (`add_artifact`) + two workflows (`init_project`, `edit`).

**Consequences.** A clean load-bearing spine; the plate is the payoff and the markdown is the data layer. Deferred types return by restoring a template, a Reference-Model row, and a Spatial-Model band.
