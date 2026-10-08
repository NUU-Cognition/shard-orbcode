---
required-reading:
  - "[[dev-tmp-orbc-view-v0.1]]"
---

# OrbCode

OrbCode gives a person **views** of a software product, on top of the **static map** of the product (see The Two Layers). A view answers one question of a person, in words that a person who does not read code can read. Each node of a view links to the code and to the stories of Orbtest. The command `flint orbcode` uses these links to show the proof of each node and to tell when a view is no longer true.

Example: a person asks "Show me the flow of the onboarding." An agent writes a view. The person reads it and asks "Split it into streams." The agent writes the view again in the new shape. The person sees which steps have proof and opens the report of one case.

## The Two Layers

A product in OrbCode has two layers. The OrbCode plate draws them on one map.

| Layer | What it is | Files | Its question |
|-------|------------|-------|--------------|
| The static map | The main drawing and the static description of the product. Each part has one place and one parent. The types are System, Module, Feature, and Data. | One file for each part in `Map/`: `(OrbCode Project) <Product> . (<Type>) <Name>.md` | What are the parts of the product? |
| Processes | An ordered set of steps with one start and one result. A process is a view of the shape `flow` or `streams`. It runs on top of the static map. | One view file for each process in `Views/` | How does X happen? |

- **The static map is the main drawing.** The plate opens on it. A System is a major boundary of the product, a Module is an area that groups features, a Feature is one capability, and a Data is a shape of state that the product keeps.
- **A process runs on top of the map.** Each step of a process names the static part where it runs, with the node field `part` (see The Anchor of a Step). When a person selects a process, the plate lights its parts with the numbers of the steps, and shows the steps in a strip below the map.
- **The other shapes stay valid.** A view of the shape `layers`, `tree`, `table`, or `free` is a free perspective, as before. Its nodes can name their parts with `part` too.
- **The static map is the main map of the template `software`, and it changes only through a map change that a person applies.** The ITE reads an OrbCode project as a program of the template `software`, and its static map is its main map (Task 1127; see The Main Map in the ITE shard, `flint shard start ite`). An agent proposes a map change with `flint ite map change propose` (the jobs `map-create`, `map-expand`, `map-refactor`, `map-cover`, and `map-update` of the ITE). Only a person applies it, in Steel or with `flint ite map change apply`, and a revert gives the exact old bytes back. No workflow of this shard writes, changes, or removes a file of `Map/` directly. When the map has no part for a step, the step shows the gap (the finding `no-part`), and the workflow names the gap in its result.

## What a View Is

A view is one perspective on one product, made for one question of a person. OrbCode 0.7 had one complete map for each codebase. OrbCode 1.0 keeps that map as the static map, and adds many free views. Six rules define a view:

| Rule | Meaning |
|------|---------|
| Not exhaustive | A view holds only what answers its question. No check counts what a view leaves out. |
| Not mutually exclusive | The same code and the same story can be in many views, with other names and in other groups. |
| Free shape | A view has the shape that its question needs (see The Six Shapes). |
| Made in a conversation | A person asks, an agent writes, the person asks for a change, and the agent writes again. |
| Low cost | A view is one file. A person can discard it with no loss, because the code and the stories are the truth. |
| Honest | Each node that makes a claim about the product links to code or to stories. Thus a command can tell when the view is no longer true. |

## The Three Planes

| Plane | Question | Home | Writer |
|-------|----------|------|--------|
| Views | How does a person want to see the product? | The Mesh: `Mesh/OrbCode/` | An agent or a person |
| Contract | What must the product do? | The repository: `orbtest/stories/` | An agent, through `flint orbtest story` |
| Proof | Does the product do it? | The repository: `orbtest/behaviour/`, `orbtest/ui/`, and `orbtest/.local/runs/` | The Orbtest CLI |

OrbCode writes only in the Views plane. It reads the Contract plane and the Proof plane. An OrbCode workflow never writes a story, a spec, or a case. When a view needs a story that does not exist, write the gap in the prose of the node and tell the person. The Orbtest shard adds stories.

## A Writer Writes Meaning, a Command Computes Facts

A view holds **meaning**: the titles, the prose, the groups, the links between the nodes, and the references to the code and to the stories. A view never holds a **fact** that a command can compute:

- No proof state, no count of criteria, no list of cases, no run id, and no report path.
- No finding: no drift, no missing path, and no missing story.
- No list of the views of a project. `flint orbcode list` computes it.
- No `reviewed` anchor that you write yourself. Only `flint orbcode review` writes an anchor.

`flint orbcode` computes the facts each time that it reads a view. It computes the proof of each node from the coverage of Orbtest, the related cases from the `components` of the specs, and the findings from the code, the stories, and the anchors. You can show these facts to a person in a conversation. Do not write them into a view.

## Folder Layout

```
Mesh/OrbCode/
└── (OrbCode Project) <Product>/
    ├── (OrbCode Project) <Product>.md          # The Project file
    ├── Map/
    │   └── (OrbCode Project) <Product> . (<Type>) <Name>.md   # The static map: one file for each part
    ├── Views/
    │   └── (View) <Name>.md                    # One file for each view
    ├── Candidates/
    │   └── <candidate-id>.md                   # A complete view file that waits for the apply
    └── History/
        └── <view-slug>-<yyyymmdd-hhmmss>.md    # A replaced or removed form of a view
```

- `Map/` holds the static map. `flint orbcode` reads each Markdown file below `Map/`, also in its subfolders; a subfolder is for display only. The name of a part is its file name with no extension. Only a map change that a person applies writes in `Map/`.
- `Views/` holds the views. `flint orbcode apply` writes a view there. You never write a file in `Views/` yourself.
- `Candidates/` holds the candidates. A workflow writes its candidate there.
- The map changes of the static map (`steel-map-change/1`) are not in the project: they are in `Steel/Programs/<Product>/Proposals/` of the Flint. Each is one file, with its operations, the base hash of each file, the preview of the tree before and after, and the record of the apply. Only the change engine of the ITE (`flint ite map change ...`, and the routes of Steel) writes there. Never write, edit, or move a file there.
- `History/` holds the forms of a view that an apply replaced or that `flint orbcode remove` removed. The command keeps the newest 5 forms of each view and removes the older forms. Only `flint orbcode` writes in `History/`. Never write, edit, or move a file there.

A project of OrbCode 0.7 also has the folders `Context/`, `Notes/`, and sometimes `Testing/`. They are the legacy form (see The Static Map and the Legacy Form).

## The Project File

One Project file for each product: `Mesh/OrbCode/(OrbCode Project) <Product>/(OrbCode Project) <Product>.md`. Make it with [[dev-tmp-orbc-project-v0.3]].

| Field | Meaning |
|-------|---------|
| `codebase` | A wikilink to a codebase reference marker: `"[[rf-cb-<slug>]]"`. Never a raw path. The markers are in `Mesh/Metadata/References/Codebases/`. The frontmatter `name` of the marker is the codebase name. `flint resolve codebase <name>` prints its path on this machine on the first line. Each `code-refs` path of a view is relative to this path. |
| `product-root` | The Orbtest product root, relative to the codebase: the folder that holds `orbtest/`. The value is `"."` when it is the codebase root. The `--root` of each `flint orbtest` command is the codebase path joined with `product-root`. Omit the field when the product has no `orbtest/` folder. |
| `project-type` | `application` (code that runs) or `cognitive` (Markdown as code: shards and prompt programs) |
| `status` | `active` or `archived` |

The Products table of the Orbtest section of `Mesh/(System) Flint Init.md` gives the product root of each product that Orbtest tests.

When the product has no codebase marker, the person adds the reference: `flint reference codebase "<Name>" <path>`, then `flint sync` (the sync writes the marker). When the marker exists but its path is not known on this machine, the person runs `flint fulfill codebase "<Name>" <path>`. `flint reference list` shows each codebase name and its state.

## The View File

A view is one Markdown file: `Views/(View) <Name>.md`. The file has the form of an Orbtest spec: prose for a person, one heading for each node, and one fenced block with the fields that a tool reads. One file for each view makes a change of shape one edit. The template is [[dev-tmp-orbc-view-v0.1]]. It has one complete example.

### The Frontmatter

| Field | In | Value |
|-------|----|-------|
| `format` | Each file | `orbcode-view/1` |
| `id` | Each file | A UUID v4. In a view, the `id` is the id of the view: it never changes, and a command finds a view by it or by its name. A candidate and a history file have their own new `id`, because each id of the Mesh is unique. |
| `view_id` | Candidate, history file | The UUID of the view that the file belongs to. For a new view, a new UUID: the apply gives it to the view as its `id`. The apply removes `view_id`. |
| `base_hash` | Candidate | The SHA-256 hex of the bytes of the view file when the candidate was made, or `null` for a new view. The apply removes it. |
| `project` | Each file | A wikilink to the Project: `"[[(OrbCode Project) <Product>]]"` |
| `question` | Each file | The question of the person, as one sentence |
| `shape` | Each file | `flow`, `streams`, `layers`, `tree`, `table`, or `free` |
| `lifetime` | Each file | `draft` or `kept`. A history file has `history`. |
| `curation` | Each file | `proposed` or `accepted` |
| `derived-from` | Optional | A wikilink to the view that this view came from, or `""` |
| `replaced-by`, `removed` | History file | The command writes them: the candidate that replaced this form, or `removed: true` |
| `tags` | Each file | `"#orbc/view"` |
| `template`, `authors`, `orbh-sessions` | Each file | The Flint conventions |

The frontmatter of a view has no `reviewed` field. A candidate of the old form has no `view_id`, and its `id` is the id of the view. The check gives it a `format` warning with the repair: set `view_id` to that id, and give `id` a new UUID.

### The Body

1. **One H1 title.** The H1 is the name of the view. The file name is `(View) <H1 title>.md`. Do not use the characters `\ / : * ? " < > | # ^ [ ]` in the H1.
2. **The answer.** The prose after the H1 answers the question in one to three sentences.
3. **An explicit id on each heading.** Each H2 to H6 heading ends with a stable id: `### Set up the machine {#set-up-the-machine}`. Make the id from the first title: its slug, or a shorter form of the slug (`{#left-out}` for "What this view leaves out"). An id matches `[a-z0-9]+(-[a-z0-9]+)*` and is unique in the view. Two titles can be equal. Two ids cannot.
4. **Depth is containment.** A section is inside the nearest heading above it that has a lower level. The prose of a section ends at the next heading.
5. **At most one node block.** A section has zero or one fenced YAML mapping with the exact info string `node`. A section with a `node` block is a **node**. A section with no `node` block is a **group**. A heading inside a fence is not a heading.
6. **A bad part does not hide the others.** A block that does not parse and a duplicate id are findings. The other nodes of the view still load.
7. **Links.** `next: [id]` means that the process can continue there. `uses: [id]` means a dependency. `inside: id`, when it is given, must be equal to the id of the parent heading. The containment has no cycle. `next` and `uses` can have a cycle.
8. **Stable ids.** A node keeps its id when it moves and when its title changes. A new node gets a new id. Never give the id of a removed node to a node with another claim.
9. **No limit of nodes.** For a large view, the surface collapses the groups. Propose a split to the person when a view gets too large to read (see Quality Rules).

The hierarchy rules of OrbCode 0.7 (one parent, the parent whitelist, and the typed references) are not rules of a view. They are rules of the migration of a 0.7 project only.

### The Name of a View

The name is the H1 title: short, and in the words of the person ("Onboarding", "Architecture of Flint"). A name of the Mesh is unique, and the apply of a new view refuses a name that the Mesh has. The match ignores the case of the letters. Before you write a new view, search the Mesh: `find Mesh -iname "(View) <Name>.md"` from the Flint root. When the name exists, add ` of <Product>` ("Onboarding of Steel"). `flint orbcode diff` tells you before the apply (see The Candidate and the Apply).

## The Node Block

Each field is optional. A block must be a YAML mapping, so write one field or more. Write `kind` in each block.

````markdown
### Set up the machine {#set-up-the-machine}

The person runs one command. It asks for a Name and makes the home of the machine.

```node
kind: step
action: flint setup
result: The home of the machine exists, and the CLI names the next command.
next: [make-the-first-flint]
code-refs:
  - apps/flint-cli/src/commands/setup/setup.ts
stories: [setup.steps]
criteria: [setup.steps#0, setup.steps#3]
```
````

| Field | Type | Meaning |
|-------|------|---------|
| `kind` | word | A word of the vocabulary below. A view can use another word; the surface then draws a plain node. |
| `code-refs` | list of text | Paths in the grammar below |
| `stories` | list of ids | Orbtest story ids, for example `setup.steps` |
| `criteria` | list of addresses | Criterion addresses `<story-id>#<index>`, 0-based. Use it only when the node needs some criteria of a story. An explicit list, also an empty list, replaces the criteria of the `stories`. An address gives its story, so the story need not be in `stories`. |
| `next` | list of ids | The nodes where the process can continue |
| `uses` | list of ids | The nodes that this node depends on |
| `inside` | id | The id of the parent heading. Optional. |
| `action` | text | For a step: what the person does |
| `result` | text | For a step: what the person then sees |
| `part` | text | The static part where the node runs: the full name of one artifact of `Map/`. See The Anchor of a Step. |
| `actor` | text | Who acts at this moment of a process, as a short name that a person reads. See The Anchor of a Step. |
| `reviewed` | mapping | The review anchor. Only `flint orbcode review` writes it (see The Review Anchor). |

### The Vocabulary of `kind`

| Kind | Use it for |
|------|------------|
| `step` | One action of a person or of the product in a process |
| `stream` | A lane: a sequence of steps with one purpose |
| `system` | A major boundary of the product |
| `module` | A cohesive area of code that groups features |
| `feature` | One capability of the product |
| `data` | A shape of state that the product keeps |
| `actor` | A person or an outside system that acts on the product |
| `decision` | A point where a process continues on one of two or more paths |
| `note` | A remark that makes no claim about the product. It needs no reference. |

System, Module, Feature, and Data are the four types of OrbCode 0.7. In 1.0 they are words of `kind`.

A node of the kind `note` that names no story and no criterion has no proof state, and it gets no `no-contract` finding. When it has `code-refs`, the check still checks each path. Use a note for what the view leaves out, and for a remark that helps the person read the view.

### The Grammar of `code-refs`

```
"src/auth/"                            # a folder of the codebase of the project
"src/auth/session.ts"                  # a file
"src/auth/session.ts#SessionManager"   # a symbol in a file
"src/auth/session.ts:L20-L80"          # a line range: a weak anchor, do not use it in a kept view
"@Steel/apps/steel-cli/src/serve.ts"   # a file of another codebase of the Flint
```

- A path with no `@` is relative to the codebase of the project. Each path must exist.
- `@<Codebase name>/<path>` names a path in another codebase of the Flint. The name after `@` is the `name` of its codebase marker (`flint reference list` shows the names), for example `@Steel/` or `@Plates/`. Use it when one step of the answer is in another repository.
- A path that leaves the codebase (`../plates/...`, or an absolute path) gives the error `code-ref-missing`. Use `@<Codebase name>/<path>` in its place.
- A symbol (`#Name`) is a name that the file declares: a function, a class, a type, or a constant. It need not be exported. The check only looks for the name as a whole word in the file, so a symbol is a weak anchor too: prefer the file when the whole file holds the claim.
- For the match with the `components` of the specs, the command removes the symbol part and the line part. Only a path of the codebase of the project gives related cases. A path of another codebase gives none.
- `flint orbcode review` anchors a node to the HEAD commit of the codebase of the project, and to the HEAD commit of each other codebase that its `code-refs` name.

**Name files, not large folders.** A code-ref matches each spec whose `components` path is equal to it, inside it, or a parent of it. A broad code-ref (a large folder such as `packages/flint/src/`) matches many specs and gives the person hundreds of related cases that tell nothing. After a review, each change of a file in that folder also gives the finding `review-due`. Name the one file or the small folder that holds the claim of the node.

## The Anchor of a Step

A step of a process names the static part where it runs, with the field `part`. It names who acts with the field `actor`. The anchor joins the two layers: the plate lights the part of each step on the map, and the panel of a part lists the processes that pass through it.

````markdown
### Create the first Flint {#create-the-first-flint}

A Flint is one folder for notes and for shards. The person runs one command with a name for the Flint.

```node
kind: step
actor: "Person"
part: "(OrbCode Project) Flint . (Feature) Flint Init"
action: 'flint create "<name>"'
next: [check-the-inputs]
criteria: [setup.steps#2]
```
````

The rules of the anchor:

1. **The value of `part`** is the full name of one artifact of `Map/` of the same project: its file name with no extension, for example `(OrbCode Project) Flint . (Feature) Flint Init`. A wikilink to that name also works, and so does the short name after the last ` . ` (`(Feature) Flint Init`) when only one artifact of the map has it. In a workflow, write the full name, in quotes.
2. **The part owns the description of the capability.** The step says only what occurs at this moment of the process. Do not copy the rules and the edge cases of the part into the step.
3. **Name the part that holds the whole step.** Usually this is a Feature. A coarse step can name a Module or a System. A step that only keeps state can name a Data.
4. **Select the part by its text, not only by its code.** `flint orbcode view <view> --json` gives each node with no `part` its proposed parts: the artifacts whose `code-refs` match a code-ref of the node (see The Commands). A proposal is not a claim. Read the file of the artifact. Name it only when its description says what the step does. A proposed part that describes another capability is not the part of the step.
5. **Never invent a part.** Take each name from `flint orbcode parts --project <Product> --json`. When the map has no part for a step, leave `part` out. The step then gets the finding `no-part` (a note), which shows a gap of the static map. Name the gap in your result. Never write a new file in `Map/` for it. A part of the map of another project is not a part of this map, also when the two projects have one codebase: leave `part` out, and name that part and its project in your result.
6. **Only a part of the four types.** A 0.7 map can hold an artifact of another type word, for example `(Process) Sync Pipeline`. It is not a static part, because a process is a view. Do not name it in `part`.
7. **The part owns the wide anchor to the code.** A step keeps its own `code-refs` when its claim is narrower than the part: one file or one symbol.
8. **`actor`** is who acts at this moment, as a short name that a person reads: `Person` when the person acts, the name of the product (`Flint`) when the product acts, or the name of another actor (`Agent`, `Git`). Write it when the prose says who acts. Use one name for one actor in the whole view: the plate draws one lane for each name.
9. **Both fields are in the review anchor.** `part` is a reference: it is in the `contract_hash`, as `code-refs`, `stories`, and `criteria` are. `actor` is a field of the claim: it is in the `meaning_hash`. When a candidate adds or changes one of them, the node changes: remove its `reviewed` mapping. A node with neither field keeps the hashes that it had before.

## The Six Shapes

Select the shape from the question. "Architecture" is not a shape: an architecture is `layers` or `tree`.

| Shape | It fits when | How to write it |
|-------|--------------|-----------------|
| `flow` | The question is "how does X happen?", and the answer is one sequence. It is a process. | H2 nodes of `kind: step` in the order of the process, each with `next` to the step that follows, and with its `part` and `actor` (see The Anchor of a Step). A `kind: decision` node has two or more `next`. A step that happens one time before the process (a setup) is a step at the start, with `next` to the first step of the process; say "one time" in its prose. Use `uses` only for a part that is not a step. |
| `streams` | The answer has two or more sequences with separate purposes: "split the flow into streams", "what does each role do?". It is a process. | One H2 for each stream: a group, or a node of `kind: stream`. H3 steps inside, with `next` in each stream, and with their `part` and `actor`. A `next` to a step of another stream shows a hand-over. |
| `layers` | The question is "how is it built?": parts in levels from the person down to the storage. | One H2 group for each layer, the layer nearest to the person first. H3 nodes (`system`, `module`, `feature`, `data`) inside, with `uses` to the layers below. |
| `tree` | The question is "what are the parts of X?", and each part has one owner. | The depth of the headings is the tree. A 0.7 project migrates to this shape. |
| `table` | The question compares items on the same properties: "list each command with its proof", "compare the setup of Flint and Steel". | One H2 node for each item, with the same fields in each block and the same order of sentences in each prose. |
| `free` | No other shape fits. | Any headings and links. Say in the answer after the H1 how to read the view. |

## Lifetime and Curation

| Field | Values | Rule |
|-------|--------|------|
| `lifetime` | `draft`, `kept` | A new view is `draft`. A reshape keeps the value of the view. `kept` means that the person wants to keep the view true. |
| `curation` | `proposed`, `accepted` | An agent always writes `proposed`. `accepted` means that the person read the view and agrees with it. The acceptance blocks nothing. |

- **Only a person decides `kept` and `accepted`.** The person sets them with `flint orbcode set <view> --lifetime kept` and `flint orbcode set <view> --curation accepted`, or in Steel. Only these two keys of the file change. An agent runs `flint orbcode set` only when the person asks for it in the session.
- **An apply is not an acceptance.** When a candidate replaces an `accepted` view, the apply sets the view back to `proposed`, so that the person sees each change that came after the acceptance.
- **Only a person removes a view.** `flint orbcode remove <view>` removes a `draft` view and its candidates. It writes the view to `History/` first, so `flint orbcode restore` can bring it back. It refuses a `kept` view: the person sets `--lifetime draft` first. An agent never removes a view, and nobody removes a view with `rm` or `flint helper delete`.
- A draft that no person opened for 30 days is a candidate for removal.

## The Candidate and the Apply

A workflow never writes a file in `Views/`. It writes a **candidate**: a complete view file in `Candidates/<candidate-id>.md`. Then a person or Steel applies it.

1. **The candidate id** is `<view-slug>-<UTC time as yyyymmdd-hhmmss>`, for example `onboarding-20260929-013000`. The view slug is the H1 title in lower case, with each run of other characters than `a-z` and `0-9` replaced by one `-`. The id is the file stem.
2. **A new view:** `view_id` is a new UUID (the id of the view after the apply). `id` is a second new UUID (the id of the candidate file). `base_hash: null`.
3. **A reshape:** `view_id` is the `id` of the view. `id` is a new UUID. `base_hash` is the SHA-256 hex of the bytes of the view file. Compute it before you read the view: `shasum -a 256 "<view file>"` (the first word).
4. **Verify the candidate** with the three commands that write nothing:
   - `flint orbcode check --candidate <candidate-id>` prints the findings. Repair each error, and run it again until it exits 0.
   - `flint orbcode view --candidate <candidate-id>` shows the candidate as the view will show it: the proof state, the criteria, and the related cases of each node. Read it: a node with hundreds of related cases has a code-ref that is too broad.
   - `flint orbcode diff <view_id> --candidate <candidate-id>` prints the added, the removed, the moved, and the changed nodes by id, and says `an apply now writes the view` or `an apply now is a conflict`. For a new view it says `is a new view with <n> node(s)`, and a conflict there means that the name is taken: give the view another H1 title.
5. **The apply:** `flint orbcode apply <view_id> --candidate <candidate-id>`. For a reshape, the name of the view also works. The apply replaces the view only when the hash of the current view file is equal to `base_hash`. It writes the replaced view to `History/` first. Then it gives the view the `id` of `view_id`, removes `view_id` and `base_hash`, writes `Views/(View) <H1 title>.md`, and removes the candidate. A conflict writes nothing, keeps the candidate, and exits 1. Steel does the same with `POST /api/orbcode/views/:id/apply`. The apply is not the acceptance of the curation.
6. **The discard:** `flint orbcode discard --candidate <candidate-id>` removes a candidate.
7. **The undo:** `flint orbcode history <view>` lists the forms of a view in `History/`, the newest first. `flint orbcode restore <view> --from <history-id>` makes a candidate `restore-<history-id>` from one form, with the `base_hash` of the view now. The view does not change until a person applies that candidate.

When the apply gives a conflict, the view changed after the candidate was made. Read the view again, and write a new candidate from the current view.

In an interactive session, apply a candidate only when the person agrees. In a headless session, never apply: Steel or the person does it.

### The Result of a Headless Workflow

A headless workflow ends with one JSON value of the schema `orbcode-result/1`, and nothing else:

```json
{"schema":"orbcode-result/1","view_id":"<uuid>","candidate_id":"<candidate-id>","base_hash":"<sha256 hex or null>","summary":"<one to three short sentences for the person>"}
```

`view_id` is the `view_id` of the candidate: the UUID of the view, not the `id` of the candidate file. The `summary` has one to three short sentences. When no candidate was written, `candidate_id` is `null`, `view_id` is the UUID of the view or `null`, and the summary starts with `No candidate:` and says why. See [[dev-hinit-orbc]].

## The Review Anchor

Each node can store `reviewed: { commit, at, meaning_hash, contract_hash }` in its block. A node with a code-ref of another codebase also stores `commits`: one commit for each other codebase, by its name.

- `meaning_hash` is the hash of the claim of the node: its prose and its fields that are not references. `contract_hash` is the hash of its references: `code-refs`, `stories`, and `criteria`. The place and the title of the node are in no hash, so a move keeps the anchor.
- Only `flint orbcode review <view> [--node <id>...]` writes anchors. With no `--node`, it writes the anchor of each node that has a node block.
- In a candidate, copy the `reviewed` mapping of a node unchanged when its claim and its references do not change. When the claim or the references change, remove the `reviewed` mapping of that node. Never write or edit a value of `reviewed`.
- The check compares the referenced code (also the changes of the working tree and the new files) and the content of the referenced stories with the anchor. The finding `review-due` means "a review is necessary". It does not mean "the claim is false".

## Findings

Each finding is about what a view says. No finding is about what a view leaves out.

| Finding | Level | Meaning |
|---------|-------|---------|
| `format` | error | The frontmatter or a `node` block does not parse, an id is missing or used two times, a link names a node that the view does not have, or `inside` is not the parent heading. Also a file of `Map/` that does not parse, and two files of `Map/` with one name. |
| `format` | warning | A candidate has the old form (no `view_id`) |
| `code-ref-missing` | error | A `code-refs` path or symbol does not exist, a path leaves its codebase, or the codebase after `@` does not resolve |
| `story-missing` | error | A story id or a criterion address does not exist in Orbtest |
| `part-missing` | error | The `part` of a node names no artifact of `Map/` of the project: the name is wrong, two artifacts have that short name, the file of the artifact does not load, or the project has no `Map/` |
| `project` | error or warning | The codebase of the Project does not resolve, the product root is outside the codebase or has no Orbtest definitions, or the proof of the project is not complete |
| `review-due` | warning | The claim, the referenced code, or the referenced stories changed after the `reviewed` anchor |
| `anchor-unknown` | warning | The commit of an anchor is not in the Git history, or the codebase does not resolve |
| `never-reviewed` | warning | A node of a kept view has no `reviewed` anchor |
| `no-contract` | note | A node names no story and no criterion, and it is not of the kind `note` |
| `no-part` | note | A node of the kind `step` or `decision` names no part, and the project has a `Map/`. The detail gives the nearest proposed part, or says that the map has no part for it. It shows a gap of the static map, or a step that waits for its part. |

## The Proof of a Node

The command computes the proof. Do not write it. The criteria of a node are its `criteria`, else each criterion of its `stories`. Orbtest gives each criterion one of six states: `proven`, `failing`, `stale`, `gap`, `not-run`, `waived`. The summary of a node or of a group comes from the set of its unique criterion addresses:

| State | Rule |
|-------|------|
| `no-contract` | The node has no criterion |
| `failing` | Else a criterion is `failing` |
| `stale` | Else a criterion is `stale` |
| `proven` | Else each criterion is `proven` |
| `partial` | Else one criterion or more is `proven` |
| `unproven` | Else no criterion is `proven` |

A node of the kind `note` with no story and no criterion has no proof state (`proof: null`).

A match by code gives **related cases**: the cases of each spec whose `components` path is equal to a `code-refs` path, or inside it, or a parent of it. Related cases never prove the claim of a node. Only the contract link (node, story, criterion, case) gives proof. The join gives `related_cases` and `related_cases_total`. Up to 100 related cases, `related_cases` holds each of them. Above 100, it holds only the 20 cases whose spec has the nearest `components` path, and `related_cases_total` gives the count of all.

## The Commands

`flint orbcode` is a part of the Flint CLI. It is not a shard script. `<view>` is the UUID or the name of a view: the file stem `(View) <Name>`, the stem with no `(View) `, or the H1 title. A command refuses a name that two views have. In a workflow, give the UUID. Each command takes `--project <name>` to limit it to one project, and `--json` for one JSON line.

| Command | Result | Writes |
|---------|--------|--------|
| `flint orbcode list` | The views with the question, the UUID, the shape, the lifetime, the curation, the proof counts, the finding counts, and the number of candidates. `--json` also lists each candidate with its `view_id`. | Nothing |
| `flint orbcode view <view>` | The join of one view (schema `orbcode-view/1`): each node with its proof state, its criteria, its cases, its related cases, its static parts, and its findings | Nothing |
| `flint orbcode view --candidate <id>` | The join of one candidate, as the view will show it after the apply | Nothing |
| `flint orbcode check [<view>]` | The findings of one view, or of each view | Nothing |
| `flint orbcode check --candidate <id>` | The findings of one candidate | Nothing |
| `flint orbcode check --paths <path...>` | The findings of each view that has a node whose `code-refs` match one of the paths. A path is absolute, or relative to the codebase of the project. When no view matches, it says so and exits 0. | Nothing |
| `flint orbcode diff <view> --candidate <id>` | The added, the removed, the moved, and the changed nodes, and whether an apply now is a conflict. For a new view, `<view>` is the `view_id` of the candidate. | Nothing |
| `flint orbcode diff --candidate <id> --against-candidate <id>` | The difference of two candidates of one view | Nothing |
| `flint orbcode history <view>` | The forms of the view in `History/`, the newest first | Nothing |
| `flint orbcode parts` | The static parts of each project (the artifacts of `Map/`): the type, the parent, the processes that pass through each part, and the count of its code-refs that name no file. `--json` gives the schema `orbcode-parts/1`. | Nothing |
| `flint orbcode review <view> [--node <id>...] [--commit <sha>]` | Writes the `reviewed` anchors | The node blocks of the view |
| `flint orbcode apply <view> --candidate <id>` | Replaces the view when its hash is equal to `base_hash` | The view, one file of `History/`; it removes the candidate |
| `flint orbcode discard --candidate <id>` | Removes the candidate | Removes one candidate |
| `flint orbcode restore <view> --from <history-id>` | Makes a candidate from one form of `History/` | One candidate |
| `flint orbcode set <view> [--lifetime <draft\|kept>] [--curation <proposed\|accepted>]` | The decision of a person | The two keys of the view |
| `flint orbcode remove <view>` | Removes a draft view and its candidates. It refuses a kept view. | One file of `History/`; it removes the view and its candidates |

**The parts of the static map.** Two commands give the parts. Both write nothing.

- `flint orbcode parts --project <Product> --json` gives `projects` (each with `name`, `map`, the folder `Map/` or `null` when the project has none, `codebase`, and `parts`, the count of its parts) and `parts`: each artifact of `Map/` with `id`, `project`, `name` (the full name), `title`, `type`, `parent` (the full name of its parent, or `null`), `code_refs`, `stories`, `file`, `processes`, and `dead_code_refs`. `processes` lists each view of the shape `flow` or `streams` with the ids of its nodes that name the part in `part`. A proposal does not count. It also gives the `findings` of the static map.
- `flint orbcode view <view> --json` gives each node the fields `part` and `actor` as written, and the computed fields `parts` and `parts_total`. Each item of `parts` has `id`, `name`, `title`, `type`, and `source`. The `source` is `named` when the node names the artifact with `part`, and `proposed` when the node has no `part` and a code-ref of the artifact matches a code-ref of the node. A node with `part` has one `named` item, or none when the map does not have that part. A node with no `part` has at most 5 `proposed` items, the nearest first, and `parts_total` counts each match. A code-ref of the root of the codebase proposes nothing. A group and a node of the kind `note` have no parts.

The exit codes: 0 done; 1 a finding of the level error (`check`), or a conflict of an apply; 2 a refusal (an unknown view or candidate, a name that two views have, a kept view for `remove`, or no view to check), and nothing was written. Each write runs inside one lock of the Flint. Steel uses the same code through the routes `/api/orbcode/*` of the Flint server.

The Orbtest commands that the workflows read (each with `--root <product root>`): `flint orbtest story list`, `flint orbtest story show <id>`, `flint orbtest coverage --json`, and `flint orbtest behaviour list --json`. The `components` of a spec are in the frontmatter of `orbtest/behaviour/specs/<spec-id>.md`.

When `flint orbcode` is not a command of your CLI (an older build), check a candidate by reading it against the rules of this file, and say so in your result. Do not move a candidate into `Views/` by hand.

## Quality Rules of a View

These rules are the most important part of OrbCode. The reader of a view is a person who does not read code. A view that breaks these rules does not help that person.

1. **Answer first.** The prose after the H1 answers the question in one to three sentences.
2. **Prose first.** Each node has one to three sentences of prose before its block. The sentence of a gap counts as one of them. The prose is for the person. The block is for the tools. A person must understand the view from the prose alone.
3. **One idea for each node.** When the prose of a node needs two claims, make two nodes.
4. **The words of the person, not of the code.** Use the words of the person and of the product. A command that the person types, such as `flint setup`, is a word of the person. A function, a file, a package, a type, or a variable of the code is not: put it in `code-refs` only.
5. **Explain each product word at its first use.** A product word is a name that the product gives to a thing, such as "Flint", "shard", "lock", or "Orbh". A word of an outside tool that the person sees, such as "origin" or "commit" of Git, is a product word too. At its first use in the view, say what it is in a few words: "A Flint is one folder for notes and for shards." After that, use the same word each time. When a word needs a long explanation and the answer does not need it, leave it out. A label that the CLI prints to the person, such as a line of a report, is a word of the person: quote it.
6. **A short title.** Two to six words. A verb phrase for a step ("Set up the machine"). A noun phrase for a part ("The shard lock").
7. **Select, do not dump.** Include only what answers the question. Five to fifteen nodes is a good size. Do not make one node for each file, each story, or each command. When a view needs more than 25 nodes, propose a split into two views.
8. **Anchor each claim.** Each node that makes a claim about the product has `code-refs` or `stories`, and when you can, both. Name files, not large folders. Only a `kind: note` node and a group have neither.
9. **Anchor each step of a process to the map.** In a view of the shape `flow` or `streams`, give each step the `part` where it runs, and the `actor` when the prose says who acts. Take each part from the static map. When the map has no part for a step, leave `part` out and name the gap (see The Anchor of a Step).
10. **Prefer stories to criteria.** Name `criteria` only when the node needs some criteria of a story, not all.
11. **Tell the truth about gaps.** When a part of the answer has no story, say so in the prose of its node. Never invent a story id, a criterion address, or a path. A claim that the product does not do a thing is a claim too: anchor it to the code or to a story that says it. When no story says it, write "No story proves this." in the prose.
12. **End with what the view leaves out.** The last section of a good view is one node of `kind: note`, for example `## What this view leaves out {#left-out}`. Its prose names the parts of the product that the view does not show, and why. The person then knows that the view is not the whole product.
13. **Simplified Technical English.** Short sentences, active voice, and one term for one thing.

## The Loop with the Code

1. **A product task.** At the end of a product task, follow [[dev-sk-orbc-check_after_task]]. It runs `flint orbcode check --paths <changed paths>`. For each `review-due` finding on a kept view, the agent compares the view with the code. When the view is wrong, the agent changes it through a candidate. When the view is correct, the agent runs `flint orbcode review`. The check is an aid: it never blocks a landing or a release.
2. **A new story.** The Orbtest workflows do not make a view. A view is made when a person asks.
3. **A release.** `flint orbcode check` is not a part of a release gate. A view is an aid for a person, not a contract of the product.

## The Static Map and the Legacy Form (OrbCode 0.7)

The static map is the map of OrbCode 0.7: the files `(OrbCode Project) <Project> . (<Type>) <Name>.md` in `Map/`, with the types System, Module, Feature, and Data. OrbCode 1.0 keeps it as the main drawing (see The Two Layers). The documents of `Context/` and `Notes/` stay the legacy form. The shard keeps the four type files and the templates `tmp-orbc-system-v0.2`, `tmp-orbc-module-v0.2`, `tmp-orbc-feature-v0.2`, `tmp-orbc-data-v0.2`, `tmp-orbc-project-v0.2`, and the context and note templates, so an agent and the plate can read a project.

- No workflow of this shard writes, changes, or removes a file of `Map/`. A gap of the map goes into the result of the workflow, for the person. The static map changes only through a map change of the ITE that a person applies (see The Two Layers).
- The rules of 0.7 (one `parent`, the parent whitelist, the typed `artifact-refs`, and the status values `draft`, `active`, `stale`, `deprecated`, `untested`, `verified`) apply only to the files of `Map/` and to their migration. They are not rules of a view.
- The migration [[dev-mig-orbc-0.7.3-to-1.0.0]] makes one view of the shape `tree` from each 0.7 project. It moves and deletes no 0.7 file.

## Skills and Workflows

| File | Use it when |
|------|-------------|
| [[dev-wkfl-orbc-view]] | A person asks a question about a product, and no view answers it. Also a new process, with the parts of a focus of the map. |
| [[dev-wkfl-orbc-reshape]] | A person asks for a change of a view in words. Also "name the parts of the steps" of a process. |
| [[dev-sk-orbc-check_after_task]] | A product task ends: check the views against the changed code |

## The Plate and the Decisions

The OrbCode plate in Steel opens on the static map of a product. The list "Processes" beside the tree of the parts gives each view of the shape `flow` or `streams`. When a person selects a process, the map lights its parts with the numbers of the steps, and a strip below the map shows the steps in lanes by actor or by system. A step with no part shows "no part on the map". In a focus of the map, "Make a process of this" starts the workflow `view` with the full names of the parts of the focus, and "Change this process" starts the workflow `reshape`. The plate also draws each shape of a view, with the proof badge and the finding badge, and shows where agents work now: see [[dev-knw-orbc-orbcraft]]. The decisions of the model are in [[dev-knw-orbc-decisions]].
