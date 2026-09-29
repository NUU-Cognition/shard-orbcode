---
description: "Make a view of a product from the question of a person: read the stories, the proof, and the code, select a shape, write a candidate, check it, and apply it when the person agrees"
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

1. Say the question again in one sentence, in your words. When the question can have two meanings, ask the person one question to select the meaning. Ask no other question in this stage.
2. Find the Project: `Mesh/OrbCode/(OrbCode Project) <Product>/(OrbCode Project) <Product>.md`.
   - When the Project does not exist, make it with [[dev-tmp-orbc-project-v0.3]], and make the folders `Views/` and `Candidates/`. Find the codebase marker in `Mesh/Metadata/References/Codebases/` and the product root in the Products table of `Mesh/(System) Flint Init.md`. When no marker exists, ask the person to make one with `flint reference codebase fulfill <Name> <path>`.
   - When the Project has the 0.7 form (a raw path in `codebase`, or no `product-root`), tell the person and propose the migration [[dev-mig-orbc-0.7.3-to-1.0.0]]. Continue only with a codebase path that resolves.
3. Resolve the paths. The codebase path: `flint resolve codebase <name>`, where `<name>` is the frontmatter `name` of the marker. The product root: the codebase path joined with `product-root`.
4. Read the views that exist: `flint orbcode list --project "<Product>"`. When a view already answers the question, show it to the person and propose the workflow [[dev-wkfl-orbc-reshape]] in place of a new view.
5. Once you know the question, the codebase path, and the product root, progress to the next stage.

## Stage 2: Read the Contract, the Proof, and the Code

1. Find the stories that answer the question. Read the list: `flint orbtest story list --root <product root>`. Read each story that can be a part of the answer: `flint orbtest story show <id> --root <product root>`.
2. Find the code of each story. Run `flint orbtest behaviour list --root <product root> --json` to get the specs of each story. Read the `components` in the frontmatter of each spec: `<product root>/orbtest/behaviour/specs/<spec-id>.md`.
3. Read the code at those paths: enough code to write each claim truly, and no more. Code is truth. When a story and the code disagree, write what the code does, and say the difference to the person.
4. Read the proof: `flint orbtest coverage --root <product root> --json`. Use it only to select nodes and to tell the person what has proof. Never write a state, a count, or a case into the view.
5. Note each part of the answer that has no story. It becomes a node with prose that says the gap and no invented story id.
6. Once you can answer the question in one to three sentences, progress to the next stage.

## Stage 3: Select the Shape and the Nodes

1. Select the shape with the table The Six Shapes of [[dev-init-orbc]]. Use the shape that the person asked for, when the person asked for one.
2. Write an outline: the H1 name, the answer, the groups, and the nodes. For each node: a title, an id, its kind, and its one idea. Then add the links `next` and `uses`.
3. Apply the rule "select, do not dump": remove each node that does not help to answer the question. Five to fifteen nodes is a good size. When the answer needs more than 25 nodes, propose two views to the person.
4. Select the name. Search the Mesh for `(View) <Name>.md`. When the name exists, add ` of <Product>`.
5. Once the outline answers the question, progress to the next stage.

## Stage 4: Write the Candidate

1. Make the candidate id: `<view-slug>-<UTC yyyymmdd-hhmmss>` (`date -u +%Y%m%d-%H%M%S`).
2. Write `Mesh/OrbCode/(OrbCode Project) <Product>/Candidates/<candidate-id>.md` with [[dev-tmp-orbc-view-v0.1]]:
   - `id`: a new UUID v4. `base_hash: null`. `lifetime: "draft"`. `curation: "proposed"`. `derived-from: ""`.
   - The headings with ids, the prose, and one `node` block for each node.
3. Check the candidate against each quality rule of [[dev-init-orbc]]:
   - [ ] A person who does not read code can read each sentence. No function name or file name is in the prose.
   - [ ] Each node has one idea, a short title, and prose before its block.
   - [ ] Each node that makes a claim has `code-refs` or `stories`. Each gap is in the prose.
   - [ ] The answer after the H1 answers the question.
   - [ ] The view holds no proof state, no count, no case, no finding, and no `reviewed` anchor.
4. Once the candidate passes each rule, progress to the next stage.

## Stage 5: Check the Candidate

1. Run `flint orbcode check --candidate <candidate-id>`.
2. Repair each error (`format`, `code-ref-missing`, `story-missing`) in the candidate, and run the check again. Continue until the check exits 0.
3. Keep the warnings and the notes for the person. A `no-contract` note on a node with a gap is correct.
4. When `flint orbcode` is not a command of the CLI, check by reading: each heading has a unique id, each link names an id of the view, each block parses as YAML, each `code-refs` path exists in the codebase, and each story id and criterion address exists (`flint orbtest story show <id>`). Tell the person that the command was not available.
5. Once the check exits 0, or the check by reading finds no error, progress to the next stage.

## Stage 6: Show the Candidate and Apply It

1. Show the person:
   - the path of the candidate;
   - the name, the shape, and the answer;
   - the outline: each group and node with its title, and its proof state from Stage 2 (in the conversation only);
   - each gap and each warning.
2. Ask the person: apply, change, or discard.
   - **Apply**: run `flint orbcode apply <view-uuid> --candidate <candidate-id>`. Then run `flint orbcode check <view-uuid>` and `flint orbcode view <view-uuid>`, and show the proof of each node.
   - **Change**: write a new candidate with the same `id` and `base_hash: null` that makes the change, check it (Stage 5), and discard the old one with `flint orbcode discard --candidate <old-candidate-id>`. Then ask again.
   - **Discard**: run `flint orbcode discard --candidate <candidate-id>`.
3. When `flint orbcode apply` is not a command of the CLI, leave the candidate in `Candidates/` and tell the person. Do not move it by hand.
4. Once the person selected apply or discard, the workflow is done.

# Output

- One view in `Views/` (after the apply), or one candidate in `Candidates/` that waits for the person
- The proof of each node, shown to the person, and each gap named
