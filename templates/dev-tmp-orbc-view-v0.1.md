---
description: "A view of a product (format orbcode-view/1): the frontmatter, the headings with ids, the node blocks, and one complete example"
---

# Filename: Mesh/OrbCode/(OrbCode Project) [Product]/Candidates/[candidate-id].md

/*
  A workflow writes a view as a CANDIDATE in Candidates/. The apply (flint orbcode apply, or Steel)
  moves it to Views/(View) <H1 title>.md and removes base_hash. Never write a file in Views/ yourself.

  candidate-id: <view-slug>-<UTC yyyymmdd-hhmmss>, for example onboarding-20260929-013000.
  The view slug is the H1 title in lower case; each run of characters other than a-z and 0-9 becomes one "-".

  FRONTMATTER CONTRACT (format orbcode-view/1). Write boringly valid YAML: replace the VALUES, keep the shapes.
  No comment and no option list inside the frontmatter.
  - format: always "orbcode-view/1".
  - id: a new UUID v4 for a new view. For a reshape, the id of the view, unchanged.
  - project: the wikilink to the Project of the product.
  - question: the question of the person, as one sentence.
  - shape: flow | streams | layers | tree | table | free. "architecture" is not a shape.
  - lifetime: draft for a new view. A reshape keeps the value of the view. Only a person writes kept.
  - curation: always proposed. Only a person writes accepted.
  - derived-from: "" or the wikilink of the view that this view came from.
  - base_hash: null for a new view. For a reshape, the SHA-256 hex of the bytes of the view file,
    computed before you read it: shasum -a 256 "<view file>".
  - The frontmatter has no reviewed field.
*/

````markdown
---
format: "orbcode-view/1"
id: "GENERATE-UUID4"
tags:
  - "#orbc/view"
project: "[[(OrbCode Project) PRODUCT]]"
question: "THE QUESTION OF THE PERSON?"
shape: "flow"
lifetime: "draft"
curation: "proposed"
derived-from: ""
base_hash: null
template: "[[dev-tmp-orbc-view-v0.1]]"
orbh-sessions:
  - "[[AGENT-SESSION-UUID]]"
authors:
  - "[[@author]]"
---

# [Name of the view: two to five words in the words of the person. It is unique in the Mesh.]

[The answer to the question in one to three sentences, for a person who does not read code. For the shape free, also say how to read the view.]

/* A GROUP: a heading with no node block. Use it for a stream, a layer, or a part of a tree. */

## [Title of the group] {#group-id}

[One or two sentences: what the group holds and why it is a group.]

/* A NODE: a heading, one to three sentences of prose, and one node block.
   The id is the slug of the first title. It never changes, also when the title changes.
   Each id matches [a-z0-9]+(-[a-z0-9]+)* and is unique in the view.
   The depth of the heading is the containment: this H3 is inside the H2 above it. */

### [Title of the node: two to six words] {#node-id}

[One to three sentences of prose: the one idea of this node, in the words of the person. Say a gap when the node has no story.]

```node
kind: "step"
action: "WHAT THE PERSON DOES"
result: "WHAT THE PERSON THEN SEES"
next: [NEXT-NODE-ID]
uses: [NODE-ID]
code-refs:
  - "PATH/RELATIVE/TO/THE/CODEBASE/file.ts"
stories: [STORY-ID]
criteria: [STORY-ID#0]
```

(continue)
````

/*
  THE HEADING IDS
  - Replace group-id and node-id with the slug of the first title of the section, for example {#set-up-the-machine}.

  THE NODE BLOCK
  - Replace each UPPER CASE value. action and result are for a step only: omit them for other kinds.
  - next: the ids of the nodes where the process continues. uses: the ids of the nodes that this node depends on.
  - code-refs: path/, path/file.ext, or path/file.ext#symbol, relative to the codebase of the project.
  - stories: Orbtest story ids. criteria: <story-id>#<index>, 0-based, only when the node needs some criteria of a story.
  - Each field is optional, but write kind in each block. Omit a field that has no value; do not write an empty list,
    except criteria: [] when you want no criteria of the stories.
  - kind: step | stream | system | module | feature | data | actor | decision | note (another word draws a plain node).
  - next, uses, inside: ids of this view only. inside must equal the id of the parent heading; you can omit it.
  - code-refs: each path must exist in the codebase. Prefer a file or a directory. A line range (:L20-L80) is a weak anchor.
  - stories and criteria: each id and each address must exist in Orbtest (flint orbtest story show <id>).
  - reviewed: never write it. Copy it unchanged in a reshape only when the claim and the references of the node do not change.
  - Never write a proof state, a count, a case, a run, a report path, or a finding. flint orbcode computes them.
*/

## Notes

### The shape decides the headings

| Shape | Headings |
|-------|----------|
| `flow` | H2 nodes of `kind: step` in order, each with `next`. A `kind: decision` node has two or more `next`. |
| `streams` | One H2 for each stream (a group, or a node of `kind: stream`), H3 steps inside |
| `layers` | One H2 group for each layer, the layer nearest to the person first, H3 nodes inside with `uses` downward |
| `tree` | The depth of the headings is the tree of the parts |
| `table` | One H2 node for each item, with the same fields in each block |
| `free` | Any headings. The answer after the H1 says how to read the view. |

### The anchor that the command writes

`flint orbcode review` adds this mapping to a node block. It is shown here so that you can know it. Do not write it.

```yaml
reviewed:
  commit: "<40 hex>"
  at: "2026-09-29T00:00:00Z"
  meaning_hash: "<hash of the prose and the fields that are not references>"
  contract_hash: "<hash of code-refs, stories, and criteria>"
```

### A complete example (shape `flow`)

File: `Mesh/OrbCode/(OrbCode Project) Flint/Candidates/from-a-failure-to-a-repair-20260929-020000.md`. After the apply: `Views/(View) From a Failure to a Repair.md`.

````markdown
---
format: "orbcode-view/1"
id: "5f0d8a52-3c1e-4b7a-9e62-0c4f1d2b7a90"
tags:
  - "#orbc/view"
project: "[[(OrbCode Project) Flint]]"
question: "What happens when a Flint command fails, and how does a person get a repair?"
shape: "flow"
lifetime: "draft"
curation: "proposed"
derived-from: ""
base_hash: null
template: "[[tmp-orbc-view-v0.1]]"
orbh-sessions:
  - "[[cd5c7675-ce52-4f4d-9508-3fb2432e94b9]]"
authors:
  - "[[@Nathan]]"
---

# From a Failure to a Repair

When a Flint command fails because of the state of the machine or of the Flint, the CLI keeps a private record of the failure. The person then checks the machine with `flint doctor`, or starts a repair session with `flint fix`.

## A command fails {#a-command-fails}

A Flint command stops with an error. When the cause is the state of the machine or of the Flint, and not a typing mistake, the CLI keeps a record of the failure.

```node
kind: step
result: "The output gives a next command, then the line Or: flint fix."
next: [keep-the-record]
code-refs:
  - "apps/flint-cli/src/failure-record.ts#watchFailures"
criteria: [setup.fix#0, setup.fix#3]
```

## Keep the record {#keep-the-record}

The CLI writes one private file with the command, the exit code, the next commands, and the end of the output. The file holds no credential. The CLI keeps the newest 20 records.

```node
kind: data
next: [select-the-repair]
code-refs:
  - "apps/flint-cli/src/failure-record.ts#recordFailure"
criteria: [setup.fix#1, setup.fix#4]
```

## Select the repair {#select-the-repair}

The person can run the next command of the output, check the whole machine, or ask an agent for a repair.

```node
kind: decision
next: [check-the-machine, start-a-repair-session]
criteria: [setup.fix#0]
```

## Check the machine {#check-the-machine}

`flint doctor` checks the machine and the current Flint and changes nothing. It gives one row for each check and one next command for each problem.

```node
kind: step
action: "flint doctor"
result: "Each failed check has a mark and one next command that runs."
next: [start-a-repair-session]
code-refs:
  - "apps/flint-cli/src/commands/repair/doctor.ts#runDoctor"
stories: [setup.doctor]
```

## Start a repair session {#start-a-repair-session}

`flint fix` starts an agent session in the Computer Flint. The session gets the failure record and follows the repair skill of the Flint shard.

```node
kind: step
action: "flint fix"
result: "An agent session starts with the failure record and writes one repair note."
code-refs:
  - "apps/flint-cli/src/commands/repair/fix.ts#planFix"
criteria: [setup.fix#5, setup.fix#6]
```
````

What the example does:

- The answer after the H1 is two sentences, in the words of a person.
- Each node has one idea, a short title, and prose before its block.
- Each node that makes a claim has `code-refs` and a story or criteria. It names `criteria` because it needs only some criteria of `setup.fix`. The node "Check the machine" needs the whole story, so it names `stories`.
- The decision node has two `next`. The view holds no proof state: `flint orbcode view` computes it.
