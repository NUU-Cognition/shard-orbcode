---
required-reading:
  - "[[dev-tmp-orbc-view-v0.1]]"
---

# OrbCode

OrbCode gives a person **views** of a software product. A view answers one question of a person, in words that a person who does not read code can read. Each node of a view links to the code and to the stories of Orbtest. The command `flint orbcode` uses these links to show the proof of each node and to tell when a view is no longer true.

Example: a person asks "Show me the flow of the onboarding." An agent writes a view. The person reads it and asks "Split it into streams." The agent writes the view again in the new shape. The person sees which steps have proof and opens the report of one case.

## What a View Is

A view is one perspective on one product, made for one question of a person. OrbCode 0.7 had one complete map for each codebase. OrbCode 1.0 has many free views. Six rules define a view:

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
    ├── (OrbCode Project) <Product>.md   # The Project file
    ├── Views/
    │   └── (View) <Name>.md             # One file for each view
    └── Candidates/
        └── <candidate-id>.md            # A complete view file that waits for the apply
```

A project of OrbCode 0.7 also has the folders `Context/`, `Map/`, `Notes/`, and sometimes `Testing/`. They are the legacy form (see Legacy Form).

## The Project File

One Project file for each product: `Mesh/OrbCode/(OrbCode Project) <Product>/(OrbCode Project) <Product>.md`. Make it with [[dev-tmp-orbc-project-v0.3]].

| Field | Meaning |
|-------|---------|
| `codebase` | A wikilink to a codebase reference marker: `"[[rf-cb-<slug>]]"`. Never a raw path. The markers are in `Mesh/Metadata/References/Codebases/`. The frontmatter `name` of the marker is the codebase name, and `flint resolve codebase <name>` gives its path on this machine. Each `code-refs` path of a view is relative to this path. |
| `product-root` | The Orbtest product root, relative to the codebase: the folder that holds `orbtest/`. The value is `"."` when it is the codebase root. The `--root` of each `flint orbtest` command is the codebase path joined with `product-root`. Omit the field when the product has no `orbtest/` folder. |
| `project-type` | `application` (code that runs) or `cognitive` (Markdown as code: shards and prompt programs) |
| `status` | `active` or `archived` |

The Products table of the Orbtest section of `Mesh/(System) Flint Init.md` gives the product root of each product that Orbtest tests.

## The View File

A view is one Markdown file: `Views/(View) <Name>.md`. The file has the form of an Orbtest spec: prose for a person, one heading for each node, and one fenced block with the fields that a tool reads. One file for each view makes a change of shape one edit. The template is [[dev-tmp-orbc-view-v0.1]]. It has one complete example.

### The Frontmatter

| Field | Required | Value |
|-------|----------|-------|
| `format` | Yes | `orbcode-view/1` |
| `id` | Yes | A UUID v4. It never changes. A command finds a view by this UUID or by its name. |
| `project` | Yes | A wikilink to the Project: `"[[(OrbCode Project) <Product>]]"` |
| `question` | Yes | The question of the person, as one sentence |
| `shape` | Yes | `flow`, `streams`, `layers`, `tree`, `table`, or `free` |
| `lifetime` | Yes | `draft` or `kept` |
| `curation` | Yes | `proposed` or `accepted` |
| `derived-from` | No | A wikilink to the view that this view came from, or `""` |
| `base_hash` | Candidate only | The SHA-256 hex of the bytes of the view file when the candidate was made, or `null` for a new view. The apply removes it. |
| `tags` | Yes | `"#orbc/view"` |
| `template`, `authors`, `orbh-sessions` | Flint | The Flint conventions |

The frontmatter of a view has no `reviewed` field. A command refuses a name that two views have, so give each view a name that is unique in the Mesh (see The Name of a View).

### The Body

1. **One H1 title.** The H1 is the name of the view. The file name is `(View) <H1 title>.md`.
2. **The answer.** The prose after the H1 answers the question in one to three sentences.
3. **An explicit id on each heading.** Each H2 to H6 heading ends with a stable id: `### Set up the machine {#setup}`. An id matches `[a-z0-9]+(-[a-z0-9]+)*` and is unique in the view. Two titles can be equal. Two ids cannot.
4. **Depth is containment.** A section is inside the nearest heading above it that has a lower level. The prose of a section ends at the next heading.
5. **At most one node block.** A section has zero or one fenced YAML mapping with the exact info string `node`. A section with a `node` block is a **node**. A section with no `node` block is a **group**. A heading inside a fence is not a heading.
6. **A bad part does not hide the others.** A block that does not parse and a duplicate id are findings. The other nodes of the view still load.
7. **Links.** `next: [id]` means that the process can continue there. `uses: [id]` means a dependency. `inside: id`, when it is given, must be equal to the id of the parent heading. The containment has no cycle. `next` and `uses` can have a cycle.
8. **Stable ids.** A node keeps its id when it moves and when its title changes. A new node gets a new id. Never give the id of a removed node to a node with another claim.
9. **No limit of nodes.** For a large view, the surface collapses the groups. Propose a split to the person when a view gets too large to read (see Quality Rules).

The hierarchy rules of OrbCode 0.7 (one parent, the parent whitelist, and the typed references) are not rules of a view. They are rules of the migration of a 0.7 project only.

### The Name of a View

The name is the H1 title: short, and in the words of the person ("Onboarding", "Architecture of Flint"). Mesh names are unique. Before you write a new view, search the Mesh for `(View) <Name>.md`. When the name exists, add ` of <Product>` ("Onboarding of Steel").

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
| `code-refs` | list of text | Paths in the grammar below, relative to the codebase of the project |
| `stories` | list of ids | Orbtest story ids, for example `setup.steps` |
| `criteria` | list of addresses | Criterion addresses `<story-id>#<index>`, 0-based. Use it only when the node needs some criteria of a story. An explicit list, also an empty list, replaces the criteria of the `stories`. An address gives its story, so the story need not be in `stories`. |
| `next` | list of ids | The nodes where the process can continue |
| `uses` | list of ids | The nodes that this node depends on |
| `inside` | id | The id of the parent heading. Optional. |
| `action` | text | For a step: what the person does |
| `result` | text | For a step: what the person then sees |
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

### The Grammar of `code-refs`

```
"src/auth/"                            # a directory
"src/auth/session.ts"                  # a file
"src/auth/session.ts#SessionManager"   # a symbol in a file
"src/auth/session.ts:L20-L80"          # a line range: a weak anchor, do not use it in a kept view
```

Each path is relative to the codebase of the project. Each path must exist. For the match with the `components` of the specs, the command removes the symbol part and the line part.

## The Six Shapes

Select the shape from the question. "Architecture" is not a shape: an architecture is `layers` or `tree`.

| Shape | It fits when | How to write it |
|-------|--------------|-----------------|
| `flow` | The question is "how does X happen?", and the answer is one sequence. | H2 nodes of `kind: step` in the order of the process, each with `next` to the step that follows. A `kind: decision` node has two or more `next`. |
| `streams` | The answer has two or more sequences with separate purposes: "split the flow into streams", "what does each role do?". | One H2 for each stream: a group, or a node of `kind: stream`. H3 steps inside, with `next` in each stream. A `next` to a step of another stream shows a hand-over. |
| `layers` | The question is "how is it built?": parts in levels from the person down to the storage. | One H2 group for each layer, the layer nearest to the person first. H3 nodes (`system`, `module`, `feature`, `data`) inside, with `uses` to the layers below. |
| `tree` | The question is "what are the parts of X?", and each part has one owner. | The depth of the headings is the tree. A 0.7 project migrates to this shape. |
| `table` | The question compares items on the same properties: "list each command with its proof", "compare the setup of Flint and Steel". | One H2 node for each item, with the same fields in each block and the same order of sentences in each prose. |
| `free` | No other shape fits. | Any headings and links. Say in the answer after the H1 how to read the view. |

## Lifetime and Curation

| Field | Values | Rule |
|-------|--------|------|
| `lifetime` | `draft`, `kept` | A new view is `draft`. A reshape keeps the value of the view. Only a person sets `kept`. `kept` means that the person wants to keep the view true. |
| `curation` | `proposed`, `accepted` | An agent always writes `proposed`. Only a person sets `accepted`. The acceptance blocks nothing. Each change by an agent sets the view back to `proposed`. |

A draft that no person opened for 30 days is a candidate for removal. Only a person removes a view, with `flint helper delete "(View) <Name>"`. An agent never removes a view.

## The Candidate and the Apply

A workflow never writes a file in `Views/`. It writes a **candidate**: a complete view file in `Candidates/<candidate-id>.md`. Then a person or Steel applies it.

1. **The candidate id** is `<view-slug>-<UTC time as yyyymmdd-hhmmss>`, for example `onboarding-20260929-013000`. The view slug is the H1 title in lower case, with each run of other characters than `a-z` and `0-9` replaced by one `-`. The id is the file stem.
2. **A new view** gets a new UUID in `id` and `base_hash: null`.
3. **A reshape** keeps the `id` of the view. Its `base_hash` is the SHA-256 hex of the bytes of the view file. Compute it before you read the view: `shasum -a 256 "<view file>"` (the first word).
4. **The check:** `flint orbcode check --candidate <candidate-id>` prints the findings of the candidate. Repair each error.
5. **The difference:** `flint orbcode diff <view> --candidate <candidate-id>` prints the added, the removed, the moved, and the changed nodes by id.
6. **The apply:** `flint orbcode apply <view> --candidate <candidate-id>` replaces the view only when the hash of the current view file is equal to `base_hash`. `<view>` is the name or the UUID of the view; for a new view, give the UUID of the candidate. The apply removes `base_hash`, writes `Views/(View) <H1 title>.md`, and removes the candidate. A conflict writes nothing and keeps the candidate. Steel does the same with `POST /api/orbcode/views/:id/apply`. The apply is not the acceptance of the curation.
7. **The discard:** `flint orbcode discard --candidate <candidate-id>` removes a candidate.

When the apply gives a conflict, the view changed after the candidate was made. Read the view again, and write a new candidate from the current view.

In an interactive session, apply a candidate only when the person agrees. In a headless session, never apply and never discard: Steel or the person does it.

### The Result of a Headless Workflow

A headless workflow ends with one JSON value of the schema `orbcode-result/1`, and nothing else:

```json
{"schema":"orbcode-result/1","view_id":"<uuid>","candidate_id":"<candidate-id>","base_hash":"<sha256 hex or null>","summary":"<one or two sentences for the person>"}
```

When no candidate was written, `candidate_id` is `null`, `view_id` is the UUID of the view or `null`, and the summary says why. See [[dev-hinit-orbc]].

## The Review Anchor

Each node can store `reviewed: { commit, at, meaning_hash, contract_hash }` in its block.

- `meaning_hash` is the hash of the claim of the node: its prose and its fields that are not references. `contract_hash` is the hash of its references: `code-refs`, `stories`, and `criteria`. The place of the node in the view is in no hash, so a move keeps the anchor.
- Only `flint orbcode review <view> [--node <id>...]` writes anchors. With no `--node`, it writes the anchor of each node.
- In a candidate, copy the `reviewed` mapping of a node unchanged when its claim and its references do not change. When the claim or the references change, remove the `reviewed` mapping of that node. Never write or edit a value of `reviewed`.
- The check compares the referenced code (also the changes of the working tree) and the content of the referenced stories with the anchor. The finding `review-due` means "a review is necessary". It does not mean "the claim is false".

## Findings

Each finding is about what a view says. No finding is about what a view leaves out.

| Finding | Level | Meaning |
|---------|-------|---------|
| `format` | error | The frontmatter or a `node` block does not parse, an id is missing or used two times, a link names a node that the view does not have, or `inside` is not the parent heading |
| `code-ref-missing` | error | A `code-refs` path or symbol does not exist |
| `story-missing` | error | A story id or a criterion address does not exist in Orbtest |
| `review-due` | warning | The claim, the referenced code, or the referenced stories changed after the `reviewed` anchor |
| `anchor-unknown` | warning | The commit of an anchor is not in the Git history |
| `never-reviewed` | warning | A kept view has no `reviewed` anchor |
| `no-contract` | note | A node names no story and no criterion |

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

A match by code gives **related cases**: the cases of each spec whose `components` path is equal to a `code-refs` path, or inside it, or a parent of it. Related cases never prove the claim of a node. Only the contract link (node, story, criterion, case) gives proof.

## The Commands

`flint orbcode` is a part of the Flint CLI. It is not a shard script.

| Command | Result | Writes |
|---------|--------|--------|
| `flint orbcode list [--project <name>] [--json]` | The views: name, question, shape, lifetime, curation, proof counts, findings | No |
| `flint orbcode view <view> [--json]` | The join of one view, schema `orbcode-view/1` | No |
| `flint orbcode check [<view>] [--paths <path...>] [--json]` | The findings. Exit 0 with no error, 1 with an error, 2 when nothing loads. | No |
| `flint orbcode check --candidate <candidate-id> [--json]` | The findings of a candidate, with the same exit codes | No |
| `flint orbcode diff <view> --candidate <candidate-id> [--json]` | The added, the removed, the moved, and the changed nodes | No |
| `flint orbcode review <view> [--node <id>...] [--commit <sha>]` | Writes the `reviewed` anchors | Yes |
| `flint orbcode apply <view> --candidate <candidate-id> [--project <name>]` | Replaces the view when the hash is equal to `base_hash` | Yes |
| `flint orbcode discard --candidate <candidate-id> [--project <name>]` | Removes the candidate | Yes |

`<view>` is the UUID or the name of a view. In a workflow, give the UUID.

The Orbtest commands that the workflows read (each with `--root <product root>`): `flint orbtest story list`, `flint orbtest story show <id>`, `flint orbtest coverage --json`, and `flint orbtest behaviour list --json`. The `components` of a spec are in the frontmatter of `orbtest/behaviour/specs/<spec-id>.md`.

When `flint orbcode` is not a command of your CLI (an older build), check a candidate by reading it against the rules of this file, and say so in your result. Do not move a candidate into `Views/` by hand.

## Quality Rules of a View

These rules are the most important part of OrbCode. A view that breaks them does not help the person.

1. **Write for a person who does not read code.** Use the words of the person and of the product, not the names of functions, files, or packages. Code names go in `code-refs` only.
2. **One idea for each node.** When the prose of a node needs two claims, make two nodes.
3. **A short title.** Two to six words. A verb phrase for a step ("Set up the machine"). A noun phrase for a part ("The shard lock").
4. **Prose first.** Each node has one to three sentences of prose before its block. The prose is for the person. The block is for the tools.
5. **Select, do not dump.** Include only what answers the question. Five to fifteen nodes is a good size. Do not make one node for each file, each story, or each command. When a view needs more than 25 nodes, propose a split into two views.
6. **Anchor each claim.** Each node that makes a claim about the product has `code-refs` or `stories`, and when you can, both. Only a `kind: note` node and a group have neither.
7. **Prefer stories to criteria.** Name `criteria` only when the node needs some criteria of a story, not all.
8. **Answer first.** The prose after the H1 answers the question in one to three sentences.
9. **Simplified Technical English.** Short sentences, active voice, and one term for one thing.
10. **Tell the truth about gaps.** When a part of the answer has no story, say so in the prose of its node. Never invent a story id, a criterion address, or a path.

## The Loop with the Code

1. **A product task.** At the end of a product task, run `flint orbcode check --paths <changed paths>`. Each `review-due` finding names a view. Compare the view with the code. When the view is wrong, change it with the workflow `reshape`. When it is correct, run `flint orbcode review <view> --node <id>` for the nodes that you compared.
2. **A new story.** The Orbtest workflows do not make a view. A view is made when a person asks.
3. **A release.** `flint orbcode check` is not a part of a release gate. A view is an aid for a person, not a contract of the product.

## Legacy Form (OrbCode 0.7)

A 0.7 project is one map of a codebase. Its files are `(OrbCode Project) <Project> . (<Type>) <Name>.md` in `Map/`, with the types System, Module, Feature, and Data, and with the documents of `Context/` and `Notes/`. The shard keeps the four type files and the templates `tmp-orbc-system-v0.2`, `tmp-orbc-module-v0.2`, `tmp-orbc-feature-v0.2`, `tmp-orbc-data-v0.2`, `tmp-orbc-project-v0.2`, and the context and note templates, so an agent and the plate can read a 0.7 project.

- Do not make a new 0.7 artifact. Make a view.
- The rules of 0.7 (one `parent`, the parent whitelist, the typed `artifact-refs`, and the status values `draft`, `active`, `stale`, `deprecated`, `untested`, `verified`) apply only to the 0.7 files and to their migration.
- The migration [[dev-mig-orbc-0.7.3-to-1.0.0]] makes one view of the shape `tree` from each 0.7 project. It moves and deletes no 0.7 file.

## The Plate and the Decisions

The OrbCode plate in Steel draws a view of the shape `tree` or `layers` as a graph, with the proof badge and the finding badge. It shows where agents work now: see [[dev-knw-orbc-orbcraft]]. The decisions of the model are in [[dev-knw-orbc-decisions]].
