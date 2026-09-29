---
description: "Give each OrbCode 0.7 project the 1.0 Project fields and the folders Views and Candidates, and make one view of the shape tree from its map"
type: agent
migration:
  from: "0.7.3"
  to: "1.0.0"
---

> [!important] THIS FILE IS A MIGRATION. WHEN RUN, EXECUTE THE STEPS AGAINST THE WORKSPACE, THEN MARK IT FINISHED.

# Migration: OrbCode 0.7.3 → 1.0.0 (a map becomes a view)

OrbCode 1.0.0 replaces the one complete map of a codebase with views. A view is one file that answers one question (see [[dev-init-orbc]]). This migration keeps each 0.7 project readable and gives it one view of the shape `tree`, made from its map. The view has the question "What are the parts of <Product>, as the OrbCode 0.7 map shows them?".

The migration moves no 0.7 file and deletes no 0.7 file. The files of `Context/`, `Map/`, `Notes/`, and `Testing/` stay. A person decides later to archive them. The type files System, Module, Feature, and Data stay installed. The build installs the new type file `(Type) View (OrbCode Shard).md`.

The rules of 0.7 (one `parent`, the parent whitelist, and the typed `artifact-refs`) apply in this migration only, to read the map.

# Steps

1. **List the projects.** List each folder `Mesh/OrbCode/(OrbCode Project) <Project>/` that has a Project file `(OrbCode Project) <Project>.md`. A folder `(OrbCode Workspace) <Name>/` is not a project: change nothing in it.

2. **Update each Project file.** For each project:
   - **codebase.** When `codebase` is a wikilink `"[[rf-cb-<slug>]]"`, keep it. When it is a raw path, find the marker in `Mesh/Metadata/References/Codebases/` whose codebase resolves to the same folder on this machine (`flint resolve codebase <name>`, where `<name>` is the frontmatter `name` of the marker), or whose name is the name of the project. Write `codebase: "[[<marker stem>]]"`. When no marker fits, keep the raw path and name the project in the report with the next step `flint reference codebase fulfill <Name> <path>`.
   - **product-root.** Find the row of the product in the Products table of the Orbtest section of `Mesh/(System) Flint Init.md`. When the product root of the row is inside the codebase, write `product-root:` with the path of the product root relative to the codebase (`"."` when they are the same folder). When no row fits, write no `product-root`.
   - **template.** Write `template: "[[tmp-orbc-project-v0.3]]"`.
   - Keep each other field and the body of the Project file.
   - Make the folders `Views/` and `Candidates/` beside the Project file.

3. **Read the map.** For each project, read each file in `Map/` whose name is `(OrbCode Project) <Project> . (<Type>) <Name>.md`. For each file, keep: the type, the name, `status`, `parent`, `artifact-refs`, `code-refs`, and the first paragraph of the body after the H1.
   - Skip a file with `status: deprecated`.
   - Skip each file of `Testing/` (the types Test Suite, Test, and E2E). Orbtest now gives the proof. Count them in the report.
   - A file of a deferred type (UI, Dependency, Consumer, Environment, Process) is a node too.

4. **Make the tree.**
   - Each file of step 3 is one node. Its `kind` is its type in lower case, with each space replaced by `-` (`system`, `module`, `feature`, `data`, `ui`, `dependency`).
   - The node id is the slug of its name: lower case, and each run of characters other than `a-z` and `0-9` replaced by one `-`. When two nodes get the same id, add `-2`, `-3`, and so on.
   - The heading level comes from `parent`: a node with no `parent` (or with a `parent` that is not in the map) is an H2. A child is one level below its parent. When `parent` is a list (an older 0.7 form), use the first item as the parent, and put the other items in `uses`.
   - A node below H6 stays at H6, under its nearest ancestor at H5, and its real parent goes in `uses`. Name each such node in the report.
   - Order the siblings: System, Module, Feature, Data, then the other kinds, and by name in each kind.

5. **Write the view.** Write `Mesh/OrbCode/(OrbCode Project) <Project>/Views/(View) Map of <Project>.md` with [[dev-tmp-orbc-view-v0.1]]. This is a new view, not a change of a view, so the migration writes it in `Views/` directly, with no `base_hash` line.
   - Frontmatter: `format: "orbcode-view/1"`, a new UUID in `id`, `project: "[[(OrbCode Project) <Project>]]"`, `question: "What are the parts of <Project>, as the OrbCode 0.7 map shows them?"`, `shape: "tree"`, `lifetime: "kept"`, `curation: "proposed"`, `derived-from: ""`, the tag `"#orbc/view"`, and `template: "[[tmp-orbc-view-v0.1]]"`.
   - A person curated and kept the 0.7 map, so the view is `kept`. `flint orbcode check` then gives `never-reviewed` until a person reviews it.
   - H1: `Map of <Project>`. The answer after the H1: the first paragraph of the Project file, and one sentence that says that the view comes from the 0.7 map.
   - Each node: the heading `<Name> {#<id>}`, the first paragraph of the 0.7 body as prose, and the line `The 0.7 artifact: [[<full file name without .md>|<Name>]].` Add the sentence `The code of this part does not exist yet.` when the status was `draft`.
   - The block: `kind`; `code-refs` with each 0.7 `code-refs` path that exists in the codebase (name each path that does not exist in the report); and `uses` with the id of each `artifact-refs` target that is a node of the view. Write no `stories`, no `criteria`, and no `reviewed`: the 0.7 map has no link to Orbtest. Each node then gets the note `no-contract`.

6. **Change nothing else.** Change no file in `Map/`, `Context/`, `Notes/`, or `Testing/`. Change no installed type file. Write nothing in a repository.

## Verification

Run each check. When one fails, stop and report. Do not finish the migration.

1. Each Project file of step 1 has `template: "[[tmp-orbc-project-v0.3]]"`, and each project folder has the folders `Views/` and `Candidates/`.
2. Each project with one file or more in `Map/` has the file `Views/(View) Map of <Project>.md`, with `format: "orbcode-view/1"` and `shape: "tree"`.
3. When `flint orbcode` is a command of the CLI, `flint orbcode check "<view UUID>"` prints no finding of the level error for each new view. When it is not a command, check by reading: each heading has a unique id, each `uses` names an id of the view, and each block parses as YAML.
4. The count of files in each `Map/` folder is the same as before the migration.

The report lists, for each project: the node count, the skipped files with the reason, the removed `code-refs` paths, the nodes at H6 with their real parent, and each Project file whose `codebase` is still a raw path.

Then run `flint shard migrate finish orbc`. Check that `flint shard status orbc` prints `No pending migrations` and version `1.0.0`.
