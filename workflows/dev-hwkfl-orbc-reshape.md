---
description: "Headless: change a view from a request in words, keep the id and the anchor of each node whose claim does not change, write a candidate, verify it, and return one orbcode-result/1 JSON value"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard hstart orbc` if you haven't already.

# Workflow: Reshape (Headless)

Change one view from a request in words, with no person in the session. The result is a candidate of the same view. Steel shows the difference to the person, and the person applies or discards it. The rules of the view file and the quality rules are in [[dev-init-orbc]]. The rules of a headless session are in [[dev-hinit-orbc]].

# Input

- The view: its UUID or its name
- The change that the person asks for, in words

# Actions

## Stage 1: Read the View and the Request

1. Run `flint orbh session set phase reading`.
2. Find the view file: `flint orbcode list` gives the name, the UUID, and the project of each view. The file is `Mesh/OrbCode/(OrbCode Project) <Product>/Views/(View) <Name>.md`. When the view does not exist, return a failure (rule 7 of [[dev-hinit-orbc]]).
3. Compute the base hash **before** you read the view: `shasum -a 256 "<view file>"`. Keep the first word.
4. Read the view: the frontmatter, the answer, each heading with its id, and each block. Read the Project file, and resolve the codebase path and the product root as in [[dev-hwkfl-orbc-view]].
5. Say the request again in one sentence. When it can have two meanings, select the meaning that best helps the person, and keep it for the `summary`.
6. When the request asks for a second view ("keep this one and make ..."), write a new view: a new `view_id`, a new `id`, `base_hash: null`, a new name, and `derived-from` with the wikilink of this view. Else change this view.
7. Once you know the request and the base hash, progress to the next stage.

## Stage 2: Plan the Change

1. Run `flint orbh session set phase shaping`.
2. Classify the request, and read what it needs:

   | Request | What to read | What changes |
   |---------|--------------|--------------|
   | A new shape ("split into streams") | Only the view | The headings, the groups, and the links. The claims stay. |
   | A filter ("only what has no proof") | `flint orbcode view <view-uuid> --json` for the proof of each node | Some nodes go. The claims of the others stay. |
   | A zoom ("more detail for the sync") | The stories, the specs, and the code of that part (Stage 2 of [[dev-hwkfl-orbc-view]]) | One node becomes a group with new nodes, or new nodes come in |
   | A comparison ("compare with Steel") | The stories and the code of the other product | New nodes of the other product, often the shape `table`. Name the code of the other product with `@<Codebase name>/<path>`. |
   | A change of words ("simpler words") | Only the view | The prose. Each node with new prose loses its `reviewed` anchor. |
   | A return ("go back to the form before") | `flint orbcode history <view-uuid>` | The whole view: an earlier form comes back. Go to step 5. |

3. Make a node map. For each node of the view, select one line:

   | Plan | Id | `reviewed` |
   |------|----|------------|
   | Keep: the same prose, the same fields, and the same references | Keep | Copy it unchanged |
   | Move: another place or another title; the prose, the fields, and the references do not change | Keep | Copy it unchanged |
   | Change: the prose, a field, or a reference changes | Keep | Remove it |
   | Remove: it does not help the new answer | Gone. Never give it to another node. | Gone |
   | New: a node that the view did not have | A new id | None |

4. Keep the quality rules. When the change makes more than 25 nodes, write the view with the most important part only, and propose a split in the `summary`. Keep the last note of what the view leaves out, and change its prose when the view now leaves out other parts.
5. **For a return:** select the newest form of `flint orbcode history <view-uuid>`, unless the request names another form. Run `flint orbcode restore <view-uuid> --from <history-id>`. It makes the candidate `restore-<history-id>` with the `base_hash` of the view now, and it changes no view. Go to Stage 4 with that candidate, and say in the `summary` which form comes back.
6. Once each node of the view has one line in the node map, progress to the next stage.

## Stage 3: Write the Candidate

1. Run `flint orbh session set phase writing`.
2. Make the candidate id: `<view-slug>-<UTC yyyymmdd-hhmmss>` (`date -u +%Y%m%d-%H%M%S`).
3. Write `Mesh/OrbCode/(OrbCode Project) <Product>/Candidates/<candidate-id>.md`, a complete view file with [[dev-tmp-orbc-view-v0.1]]:
   - `id`: a new UUID (`uuidgen | tr A-Z a-z`). `view_id`: the `id` of the view.
   - The same `project`, `lifetime`, and `derived-from` as the view. The `question` of the view, or the new question when the request changes it. The new `shape` when the shape changes.
   - `curation: "proposed"`, also when the view was `accepted`.
   - `base_hash`: the base hash of Stage 1.
   - The body from the node map, with the ids and the `reviewed` mappings as the map says.
4. Check the candidate against each quality rule of [[dev-init-orbc]] (the list of Stage 4 of [[dev-hwkfl-orbc-view]]).
5. Once the candidate passes each rule, progress to the next stage.

## Stage 4: Verify the Candidate

1. Run `flint orbh session set phase checking`.
2. Run `flint orbcode check --candidate <candidate-id>`. Repair each error, and run it again until it exits 0.
3. Run `flint orbcode view --candidate <candidate-id>`. Read the proof state and the related cases of each new or changed node. When a node shows more than 100 related cases, name a file in place of its broad code-ref, and check again.
4. Run `flint orbcode diff <view-uuid> --candidate <candidate-id>`. It must say `an apply now writes the view`. Compare the difference with the node map. Repair the candidate when a node moved or changed that the map keeps. When it says `an apply now is a conflict`, the view changed after Stage 1: discard your candidate and start again at Stage 1.
5. When `flint orbcode` is not a command of the CLI, check by reading (Stage 5 of [[dev-hwkfl-orbc-view]]), and say so in the `summary`.
6. When an error stays and you cannot repair it, discard your candidate and return a failure (rule 7 of [[dev-hinit-orbc]]).
7. Once the check exits 0 and the diff agrees with the node map, progress to the next stage.

## Stage 5: Return the Result

1. Run `flint orbh session set phase returning`.
2. Write the `summary` in one or two sentences: what changed (the shape, the added and the removed nodes), and each reading that you selected. When the view was `accepted`, say that the apply sets it back to `proposed`. Use no `'` character.
3. Do not apply and do not discard the candidate.
4. End the turn with the result, and nothing else. `view_id` is the `view_id` of the candidate, not its `id`:

   ```bash
   flint orbh session return --finish '{"schema":"orbcode-result/1","view_id":"<view_id>","candidate_id":"<candidate-id>","base_hash":"<base hash>","summary":"<summary>"}'
   ```

   For a second view (Stage 1, step 6), `base_hash` is `null`.

# Output

- One candidate in `Candidates/`, with the `view_id` of the view (or a new `view_id` for a second view), its own `id`, and its `base_hash`
- One `orbcode-result/1` JSON value as the result of the turn
