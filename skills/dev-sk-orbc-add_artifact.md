---
description: "Create a single OrbCode Map artifact (System, Module, Feature, or Data) from the matching template"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start-dev orbc` if you haven't already.

# Skill: Add Artifact

Create one OrbCode Map artifact in a project, following the type's template and the frontmatter/plate contract. Atomic — no human checkpoints. Use directly, or as the create primitive called by the Init Project and OrbCode Edit workflows.

# Input

- **Project**: the OrbCode project (folder under `Mesh/OrbCode/`) the artifact belongs to
- **Type**: `System | Module | Feature | Data`
- **Name**: the artifact name
- **What it is**: enough context to write the artifact — description, parent, the code it maps

# Actions

1. **Orient.** Read the project index and relevant Context docs. To read code, resolve the codebase from the project's `codebase` (`[[rf-cb-*]]`) marker: `flint resolve codebase <Name>`.
2. **Pick the template:** System → `dev-tmp-orbc-system-v0.2`; Module → `dev-tmp-orbc-module-v0.2`; Feature → `dev-tmp-orbc-feature-v0.2`; Data → `dev-tmp-orbc-data-v0.2`.
3. **Generate the body** per the template — conceptual and human-readable, mermaid where it clarifies. Not placeholders.
4. **Name and place.** Dot notation: `(OrbCode Project) [Project] . (Type) [Name].md`, in the project's `Map/` folder.
5. **Write boringly-valid YAML frontmatter** (no `/* */` comments, no `[a|b|c]` lists inside frontmatter):
   - `id` (uuid v4), `tags` (`#orbc/<type>`), `template`
   - `status` — honest current reality: `active` for structural (System/Module/Data), `untested` for a Feature with code, `draft` if planned-but-unbuilt.
   - **`curation: "proposed"`** — always. The human flips it to `accepted` in the plate. **Never** write `accepted`, and never write `verified` status.
   - `parent:` — **exactly one** fully-qualified wikilink to a whitelisted parent (Module←System; Feature←Module/System/Feature; Data←System/Module/Feature/Data). `""` only for a root System or top-level shared Data.
   - `code-refs:` — grammar-valid anchors relative to the codebase root: `"path/"`, `"path/file.ext"`, `"path/file.ext#symbol"`.
   - `artifact-refs:` — **fully-qualified** wikilinks, Map types only, type-valid per the Reference Model, one direction.
   - `spec-refs:`/`task-refs:` — use these (not `artifact-refs`) for Spec or Task links. Omit if none.
   - `orbh-sessions` and `authors` per Flint conventions.
6. **Suggest, don't sweep.** If a parent artifact should reference this new one, propose that edit rather than silently rewriting many files.
7. **Validate.** Run `flint shard orbc validate "(OrbCode Project) [Project]"` and fix anything it reports.

# Output

- One Map artifact at the correct path: valid filename `(Type)` token, valid YAML, `curation: proposed`, single whitelisted `parent`, grammar-valid `code-refs`, fully-qualified `artifact-refs`
- Status left honest-but-proposed for the human to accept and promote in the plate
