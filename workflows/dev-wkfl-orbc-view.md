---
description: "Make a view of a product from the question of a person: read the stories, the proof, and the code, select a shape, write a candidate, verify it, and apply it when the person agrees"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start orbc` if you haven't already.

# Workflow: View

Make one new view of a product that answers one question of a person. The result is a candidate that the person reads, and a view when the person agrees. The rules of the view file and the quality rules are in [[dev-init-orbc]].

# Input

- The product (for example `Flint`), or its Project `(OrbCode Project) <Product>`
- The question of the person (for example "Show me the flow of the onboarding")
- (Optional) A shape or a name that the person asks for

# Actions

## Stage 1: Understand the Question

1. Say the question again in one sentence, in your words. Search the story list and the commands of the product for each main word of the question: two commands can fit one question (for example two commands that move notes). When the question can have two meanings, ask the person one question to select the meaning. Ask no other question in this stage.
2. Find the Project: `Mesh/OrbCode/(OrbCode Project) <Product>/(OrbCode Project) <Product>.md`.
   - When the Project does not exist, make it with [[dev-tmp-orbc-project-v0.3]], and make the folders `Views/` and `Candidates/`. Find the codebase marker in `Mesh/Metadata/References/Codebases/` and the product root in the Products table of `Mesh/(System) Flint Init.md`.
   - When no codebase marker exists, ask the person to add the reference: `flint reference codebase "<Name>" <path>`, then `flint sync`. When the marker exists but its path is not known on this machine, ask the person to run `flint fulfill codebase "<Name>" <path>`.
   - When the Project has the 0.7 form (a raw path in `codebase`, or no `product-root`), tell the person and propose the migration [[dev-mig-orbc-0.7.3-to-1.0.0]]. Continue only with a codebase path that resolves.
3. Resolve the paths. The codebase path: the first line of `flint resolve codebase <name>`, where `<name>` is the frontmatter `name` of the marker. The product root: the codebase path joined with `product-root`.
4. Read the views that exist: `flint orbcode list --project "<Product>"`. When a view already answers the question (its question has the same meaning, or its nodes hold your answer), show it to the person and propose the workflow [[dev-wkfl-orbc-reshape]] in place of a new view. A view on a related question is not an answer: name it in the note of what your view leaves out.
5. Once you know the question, the codebase path, and the product root, progress to the next stage.

## Stage 2: Read the Contract, the Proof, and the Code

1. Find the stories that answer the question. Read the list: `flint orbtest story list --root <product root>`. Read each story that can be a part of the answer: `flint orbtest story show <id> --root <product root>`.
2. Find the code of each story. Run `flint orbtest behaviour list --root <product root> --story <story-id> --json` for each story. Each entry of `cases` has `spec` (the spec id, which is not always the story id) and `file` (the spec file, relative to the product root). Read the `components` in the frontmatter of each spec file.
3. Read the code at those paths: enough code to write each claim truly, and no more. Code is truth. When a story and the code disagree, write what the code does, and say the difference to the person. When one part of the answer is in another codebase of the Flint, read it there, and name it with `@<Codebase name>/<path>`.
4. Read the proof: `flint orbtest coverage --root <product root> --story <story-id> --json` for each story. With no `--story`, the JSON is large (all stories); a text report goes to stderr. Use it only to select nodes and to tell the person what has proof. Never write a state, a count, or a case into the view.
5. Note each part of the answer that has no story. It becomes a node with prose that says the gap and no invented story id.
6. Note the product words that the answer needs ("Flint", "shard", "lock"), and one short explanation of each for a person who does not read code.
7. Once you can answer the question in one to three sentences, progress to the next stage.

## Stage 3: Select the Shape and the Nodes

1. Select the shape with the table The Six Shapes of [[dev-init-orbc]]. Use the shape that the person asked for, when the person asked for one.
2. Write an outline: the H1 name, the answer, the groups, and the nodes. For each node: a title, an id, its kind, and its one idea. Then add the links `next` and `uses`. End the outline with one node of `kind: note` that names what the view leaves out.
3. Apply the rule "select, do not dump": remove each node that does not help to answer the question. Five to fifteen nodes is a good size. When the answer needs more than 25 nodes, propose two views to the person.
4. Select the name. Search the Mesh: `find Mesh -iname "(View) <Name>.md"` from the Flint root (the match ignores the case of the letters). When the name exists, add ` of <Product>`.
5. Once the outline answers the question, progress to the next stage.

## Stage 4: Write the Candidate

1. Make the candidate id: `<view-slug>-<UTC yyyymmdd-hhmmss>` (`date -u +%Y%m%d-%H%M%S`).
2. Make two new UUIDs (`uuidgen | tr A-Z a-z`): one for `view_id` (the id of the view after the apply), and one for `id` (the id of the candidate file).
3. Write `Mesh/OrbCode/(OrbCode Project) <Product>/Candidates/<candidate-id>.md` with [[dev-tmp-orbc-view-v0.1]]:
   - `id` and `view_id`: the two new UUIDs. `base_hash: null`. `lifetime: "draft"`. `curation: "proposed"`. `derived-from: ""`.
   - The headings with ids, the prose, and one `node` block for each node. The last section is the note of what the view leaves out.
4. Check the candidate against each quality rule of [[dev-init-orbc]]:
   - [ ] The answer after the H1 answers the question.
   - [ ] A person who does not read code can read each sentence. No function, file, package, or type of the code is in the prose.
   - [ ] Each product word is explained at its first use.
   - [ ] Each node has one idea, a short title, and prose before its block.
   - [ ] Each node that makes a claim has `code-refs` or `stories`. Each code-ref names a file or a small folder. Each gap is in the prose.
   - [ ] The last node is a `kind: note` that says what the view leaves out.
   - [ ] The view holds no proof state, no count, no case, no finding, and no `reviewed` anchor.
5. Once the candidate passes each rule, progress to the next stage.

## Stage 5: Verify the Candidate

1. Run `flint orbcode check --candidate <candidate-id>`. Repair each error (`format`, `code-ref-missing`, `story-missing`) in the candidate, and run the check again. Continue until the check exits 0.
2. Run `flint orbcode view --candidate <candidate-id>`. Read the proof state and the related cases of each node. When a node shows more than 100 related cases, its code-ref is too broad: name a file, and check again.
3. Run `flint orbcode diff <view_id> --candidate <candidate-id>`. It must say `is a new view with <n> node(s)` and `an apply now writes the view`. When it says `an apply now is a conflict`, the name is taken: change the H1 title and the candidate id, and verify again.
4. Keep the warnings and the notes for the person. A `no-contract` note on a node with a gap is correct.
5. When `flint orbcode` is not a command of the CLI, check by reading: each heading has a unique id, each link names an id of the view, each block parses as YAML, each `code-refs` path exists in its codebase, and each story id and criterion address exists (`flint orbtest story show <id>`). Tell the person that the command was not available.
6. Once the check exits 0 and the diff has no conflict, progress to the next stage.

## Stage 6: Show the Candidate and Apply It

1. Show the person:
   - the path of the candidate;
   - the name, the shape, and the answer;
   - the outline: each group and node with its title, and its proof state from `flint orbcode view --candidate` (in the conversation only);
   - each gap and each warning.
2. Ask the person: apply, change, or discard.
   - **Apply**: run `flint orbcode apply <view_id> --candidate <candidate-id>`. Then run `flint orbcode check <view_id>` and `flint orbcode view <view_id>`, and show the proof of each node. Tell the person that the view is a `draft` and `proposed`: the person can keep it with `flint orbcode set <view_id> --lifetime kept` and accept it with `flint orbcode set <view_id> --curation accepted`.
   - **Change**: write a new candidate with the same `view_id`, a new `id`, and `base_hash: null` that makes the change. Verify it (Stage 5), and discard the old one with `flint orbcode discard --candidate <old-candidate-id>`. Then ask again.
   - **Discard**: run `flint orbcode discard --candidate <candidate-id>`.
3. When `flint orbcode apply` is not a command of the CLI, leave the candidate in `Candidates/` and tell the person. Do not move it by hand.
4. Once the person selected apply or discard, the workflow is done.

# Output

- One view in `Views/` (after the apply), or one candidate in `Candidates/` that waits for the person
- The proof of each node, shown to the person, and each gap named
