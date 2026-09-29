---
description: "Headless: make a candidate view of a product from the question of a person, verify it, and return one orbcode-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart orbc` if you haven't already.

# Workflow: View (Headless)

Make one new candidate view that answers one question of a person, with no person in the session. Steel or the person reads the candidate and applies it. The rules of the view file and the quality rules are in [[dev-init-orbc]]. The rules of a headless session are in [[dev-hinit-orbc]].

# Input

- The product (for example `Flint`), or its Project `(OrbCode Project) <Product>`
- The question of the person
- (Optional) A shape or a name that the person asks for

# Actions

## Stage 1: Understand the Question

1. Run `flint orbh session set phase reading`.
2. Say the question again in one sentence. Search the story list and the commands of the product for each main word of the question: two commands can fit one question (for example two commands that move notes). When the question can have two meanings, select the meaning that best helps the person, and keep it for the `summary`.
3. Find the Project: `Mesh/OrbCode/(OrbCode Project) <Product>/(OrbCode Project) <Product>.md`.
   - When the Project does not exist, make it with [[dev-tmp-orbc-project-v0.3]] and the folders `Views/` and `Candidates/`. Take the codebase marker from `Mesh/Metadata/References/Codebases/` and the product root from the Products table of `Mesh/(System) Flint Init.md`.
   - When no codebase marker exists for the product, return a failure (rule 7 of [[dev-hinit-orbc]]) with the next step `flint reference codebase "<Name>" <path>`, then `flint sync`. When the marker exists but the codebase path does not resolve, return a failure with the next step `flint fulfill codebase "<Name>" <path>`.
4. Resolve the codebase path (the first line of `flint resolve codebase <name>`, where `<name>` is the frontmatter `name` of the marker) and the product root (the codebase path joined with `product-root`).
5. Read the views that exist: `flint orbcode list --project "<Product>"`. When a view already answers the question (its question has the same meaning, or its nodes hold your answer), still write the new candidate, and name the view that exists in the `summary`. A view on a related question is not an answer: name it in the note of what your view leaves out.
6. Once you know the question, the codebase path, and the product root, progress to the next stage.

## Stage 2: Read the Contract, the Proof, and the Code

1. Read the story list: `flint orbtest story list --root <product root>`. Read each story that can be a part of the answer: `flint orbtest story show <id> --root <product root>`.
2. Find the code of each story. Run `flint orbtest behaviour list --root <product root> --story <story-id> --json` for each story. Each entry of `cases` has `spec` (the spec id, which is not always the story id) and `file` (the spec file, relative to the product root). Read the `components` in the frontmatter of each spec file.
3. Read the code at those paths: enough to write each claim truly. Code is truth. When one part of the answer is in another codebase of the Flint, read it there, and name it with `@<Codebase name>/<path>`.
4. Read the proof: `flint orbtest coverage --root <product root> --story <story-id> --json` for each story. With no `--story`, the JSON is large (all stories); a text report goes to stderr. Use it only to select nodes. Never write a state, a count, or a case into the view.
5. Note each part of the answer that has no story.
6. Note the product words that the answer needs, and one short explanation of each for a person who does not read code.
7. Once you can answer the question in one to three sentences, progress to the next stage.

## Stage 3: Select the Shape and the Nodes

1. Run `flint orbh session set phase shaping`.
2. Select the shape with the table The Six Shapes of [[dev-init-orbc]], or use the shape that the person asked for.
3. Write an outline: the H1 name, the answer, the groups, and the nodes with titles, ids, kinds, and links. End the outline with one node of `kind: note` that names what the view leaves out.
4. Select, do not dump: five to fifteen nodes is a good size. When the answer needs more than 25 nodes, write the first view only, and propose the second view in the `summary`.
5. Select the name. Search the Mesh: `find Mesh -iname "(View) <Name>.md"` from the Flint root (the match ignores the case of the letters). When the name exists, add ` of <Product>`.
6. Once the outline answers the question, progress to the next stage.

## Stage 4: Write the Candidate

1. Run `flint orbh session set phase writing`.
2. Make the candidate id: `<view-slug>-<UTC yyyymmdd-hhmmss>` (`date -u +%Y%m%d-%H%M%S`).
3. Make two new UUIDs (`uuidgen | tr A-Z a-z`): one for `view_id` (the id of the view after the apply), and one for `id` (the id of the candidate file).
4. Write `Mesh/OrbCode/(OrbCode Project) <Product>/Candidates/<candidate-id>.md` with [[dev-tmp-orbc-view-v0.1]]: the two UUIDs in `id` and `view_id`, `base_hash: null`, `lifetime: "draft"`, `curation: "proposed"`, and `derived-from: ""`. The last section is the note of what the view leaves out.
5. Check the candidate against each quality rule of [[dev-init-orbc]]:
   - [ ] The answer after the H1 answers the question.
   - [ ] A person who does not read code can read each sentence. No function, file, package, or type of the code is in the prose.
   - [ ] Each product word is explained at its first use.
   - [ ] Each node has one idea, a short title, and prose before its block.
   - [ ] Each node that makes a claim has `code-refs` or `stories`. Each code-ref names a file or a small folder. Each gap is in the prose.
   - [ ] The last node is a `kind: note` that says what the view leaves out.
   - [ ] The view holds no proof state, no count, no case, no finding, and no `reviewed` anchor.
6. Once the candidate passes each rule, progress to the next stage.

## Stage 5: Verify the Candidate

1. Run `flint orbh session set phase checking`.
2. Run `flint orbcode check --candidate <candidate-id>`. Repair each error, and run it again until it exits 0.
3. Run `flint orbcode view --candidate <candidate-id>`. Read the proof state and the related cases of each node. When a node shows more than 100 related cases, name a file in place of its broad code-ref, and check again.
4. Run `flint orbcode diff <view_id> --candidate <candidate-id>`. It must say `is a new view with <n> node(s)` and `an apply now writes the view`. When it says `an apply now is a conflict`, the name is taken: write the candidate again with another H1 title and a new candidate id, discard the first candidate, and verify again.
5. When `flint orbcode` is not a command of the CLI, check by reading: each heading has a unique id, each link names an id of the view, each block parses as YAML, each `code-refs` path exists, and each story id and criterion address exists. Say in the `summary` that the command was not available.
6. When an error stays and you cannot repair it, discard your candidate and return a failure (rule 7 of [[dev-hinit-orbc]]).
7. Once the check exits 0 and the diff has no conflict, progress to the next stage.

## Stage 6: Return the Result

1. Run `flint orbh session set phase returning`.
2. Write the `summary` in one to three short sentences: the shape, the number of nodes, the reading that you selected, and the most important gap. The note of the view names the other gaps. Use no `'` character.
3. Do not apply and do not discard the candidate.
4. End the turn with the result, and nothing else. `view_id` is the `view_id` of the candidate, not its `id`:

   ```bash
   flint orbh session return --finish '{"schema":"orbcode-result/1","view_id":"<view_id>","candidate_id":"<candidate-id>","base_hash":null,"summary":"<summary>"}'
   ```

# Output

- One candidate in `Candidates/`, with a new `view_id`, its own `id`, and `base_hash: null`
- One `orbcode-result/1` JSON value as the result of the turn
