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
   - **codebase.** When `codebase` is a wikilink `"[[rf-cb-<slug>]]"`, keep it. When it is a raw path, find the marker of the project in `Mesh/Metadata/References/Codebases/`. For each marker, `flint resolve codebase <name>` gives its folder (`<name>` is the frontmatter `name` of the marker). A raw path of 0.7 often names a folder of another machine, so the `code-refs` paths of the map are the best evidence. Use the first rule that matches:
     1. **Evidence.** Collect the `code-refs` paths of each file of `Map/` (step 3), without the symbol part and the line part. For each marker, count the paths that exist in its folder. When one marker has the highest count, and the count is half of the paths or more, select it. Example: the 0.7 project NUU Steel has the raw path `.../main`, but 43 of its 44 paths exist in the folder of the marker `rf-cb-steel`.
     2. **A part of the path.** A part of the raw path is the folder name of a marker (compare with the letter case), and the folder of the marker joined with the parts after it exists. The parts after it are the **rest**. Example: `/Users/x/dev/nuu/main/packages/cli-core` gives the marker of `.../Repos/main` and the rest `packages/cli-core`.
     3. **The end of the path.** The folder of a marker joined with the end of the raw path exists. Try the longest end first. The end is the rest.
     4. **No match.** Keep the raw path, and name the project in the report with the next step `flint reference codebase fulfill <Name> <path>`.

     When a rule of 1 to 3 matches, write `codebase: "[[<marker stem>]]"`.
   - **product-root.** Read the Products table of the Orbtest section of `Mesh/(System) Flint Init.md`. Find a row whose product root is the folder of the codebase or a folder inside it. Write `product-root:` with the path of that product root relative to the codebase (`"."` when they are the same folder). When no row fits, write no `product-root`.
   - **template.** Write `template: "[[tmp-orbc-project-v0.3]]"`.
   - Keep each other field and the body of the Project file.
   - Make the folders `Views/` and `Candidates/` beside the Project file.

3. **Read the map.** For each project, read each file in `Map/` and in its subfolders whose name is `(OrbCode Project) <Project> . (<Type>) <Name>.md`. For each file, keep: the type, the name, `status`, `parent`, `artifact-refs`, `code-refs`, and the first paragraph of the body after the H1.
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
   - The block: `kind`; `code-refs`; and `uses` with the id of each `artifact-refs` target that is a node of the view. For `code-refs`, keep each 0.7 path that exists in the codebase as it is written. Else, when step 2 gave a rest, keep the rest joined with the path when that exists. Else remove the path, and name it in the report. When the codebase of the project does not resolve (rule 4 of step 2), keep each 0.7 path as it is, because no path can be checked.

6. **Change nothing else.** Change no file in `Map/`, `Context/`, `Notes/`, or `Testing/`. Change no installed type file. Write nothing in a repository.

## Verification

Run each check. When one fails, stop and report. Do not finish the migration.

1. Each Project file of step 1 has `template: "[[tmp-orbc-project-v0.3]]"`, and each project folder has the folders `Views/` and `Candidates/`.
2. Each project with one file or more in `Map/` has the file `Views/(View) Map of <Project>.md`, with `format: "orbcode-view/1"` and `shape: "tree"`.
3. When `flint orbcode` is a command of the CLI, `flint orbcode check "<view UUID>"` prints no finding of the level error for each new view. When it is not a command, check by reading: each heading has a unique id, each `uses` names an id of the view, and each block parses as YAML.
4. The count of files in each `Map/` folder is the same as before the migration.

The report lists, for each project: the node count, the skipped files with the reason, the removed `code-refs` paths, the nodes at H6 with their real parent, and each Project file whose `codebase` is still a raw path.

Then run `flint shard migrate finish orbc`. Check that `flint shard status orbc` prints `No pending migrations` and version `1.0.0`.
