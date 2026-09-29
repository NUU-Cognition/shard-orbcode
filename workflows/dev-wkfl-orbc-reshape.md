---
description: "Change a view in a conversation: read the view and the request, keep the id and the anchor of each node whose claim does not change, write a candidate, show the difference, and apply it when the person agrees"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start orbc` if you haven't already.

# Workflow: Reshape

Change the shape or the content of one view when the person asks for it in words. Examples: "split the flow into streams", "show only what has no proof", "one level more detail for the sync", "compare this with Steel". The result is a candidate of the same view, and the new view when the person agrees. The rules of the view file and the quality rules are in [[dev-init-orbc]].

# Input

- The view: its UUID or its name
- The change that the person asks for, in words

# Actions

## Stage 1: Read the View and the Request

1. Find the view file: `flint orbcode list` gives the name, the UUID, and the project of each view.
2. Compute the base hash **before** you read the view: `shasum -a 256 "<view file>"`. Keep the first word. It is the `base_hash` of the candidate.
3. Read the view: the frontmatter, the answer, each heading with its id, and each block. Read the Project file and resolve the codebase path and the product root (Stage 1 of [[dev-wkfl-orbc-view]]).
4. Look in `Candidates/` for a candidate with the same `id`. When one exists, tell the person: the new candidate does not replace it, and the person selects one.
5. Say the request again in one sentence, in your words. When the request can have two meanings, ask the person one question.
6. Ask the person one question when the request can mean "change this view" or "make a second view": for example "compare this with Steel". A second view keeps the first form. When the person wants both forms, write a new view in Stage 3 (a new `id`, `base_hash: null`, and `derived-from` with the wikilink of this view).
7. Once you know the request and the base hash, progress to the next stage.

## Stage 2: Plan the Change

1. Classify the request:

   | Request | What to read | What changes |
   |---------|--------------|--------------|
   | A new shape ("split into streams") | Only the view | The headings, the groups, and the links. The claims stay. |
   | A filter ("only what has no proof") | `flint orbcode view <view-uuid> --json` for the proof of each node | Some nodes go. The claims of the others stay. |
   | A zoom ("more detail for the sync") | The stories, the specs, and the code of that part (Stage 2 of [[dev-wkfl-orbc-view]]) | One node becomes a group with new nodes, or new nodes come in |
   | A comparison ("compare with Steel") | The stories and the code of the other product | New nodes of the other product, often the shape `table` |
   | A change of words ("simpler words") | Only the view | The prose. Each node with new prose loses its `reviewed` anchor. |

2. Make a node map. For each node of the view, select one line:

   | Plan | Id | `reviewed` |
   |------|----|------------|
   | Keep: the same prose, the same fields, and the same references | Keep | Copy it unchanged |
   | Move: another place or another title; the prose, the fields, and the references do not change | Keep | Copy it unchanged |
   | Change: the prose, a field, or a reference changes | Keep | Remove it |
   | Remove: it does not help the new answer | Gone. Never give it to another node. | Gone |
   | New: a node that the view did not have | A new id | None |

   The claim of a node is its prose and its fields that are not references. The anchor holds a hash of the claim and a hash of the references, so a change of one word is a change. The title and the place of a node are in no hash.
3. Keep the quality rules. A reshape does not make the view larger than the question needs. When the change makes more than 25 nodes, propose a split to the person.
4. Once each node of the view has one line in the node map, progress to the next stage.

## Stage 3: Write the Candidate

1. Make the candidate id: `<view-slug>-<UTC yyyymmdd-hhmmss>` (`date -u +%Y%m%d-%H%M%S`).
2. Write `Mesh/OrbCode/(OrbCode Project) <Product>/Candidates/<candidate-id>.md`, a complete view file with [[dev-tmp-orbc-view-v0.1]]:
   - The same `id`, `project`, `lifetime`, and `derived-from` as the view. The `question` of the view, or the new question when the request changes it.
   - The new `shape` when the shape changes.
   - `curation: "proposed"`, also when the view was `accepted`.
   - `base_hash`: the base hash of Stage 1.
   - The body from the node map: the ids and the `reviewed` mappings as the map says.
3. Check the candidate against each quality rule of [[dev-init-orbc]] (the list of Stage 4 of [[dev-wkfl-orbc-view]]).
4. Once the candidate passes each rule, progress to the next stage.

## Stage 4: Check the Candidate

1. Run `flint orbcode check --candidate <candidate-id>`. Repair each error, and run it again until it exits 0.
2. When `flint orbcode` is not a command of the CLI, check by reading (Stage 5 of [[dev-wkfl-orbc-view]]), and tell the person.
3. Once the check exits 0, progress to the next stage.

## Stage 5: Show the Difference and Apply It

1. Run `flint orbcode diff <view-uuid> --candidate <candidate-id>`. Show the person the added, the removed, the moved, and the changed nodes, with their titles. When the command is not available, show the node map of Stage 2.
2. Show the new outline and each warning.
3. Ask the person: apply, change, or discard.
   - **Apply**: run `flint orbcode apply <view-uuid> --candidate <candidate-id>`. When the apply gives a conflict, the view changed after Stage 1: tell the person, and go back to Stage 1 with the current view. After a good apply, run `flint orbcode view <view-uuid>` and show the proof of each node.
   - **Change**: write a new candidate from the same base (Stage 3), check it, and discard the old candidate with `flint orbcode discard --candidate <old-candidate-id>`. Then ask again.
   - **Discard**: run `flint orbcode discard --candidate <candidate-id>`. The view does not change.
4. When `flint orbcode apply` is not a command of the CLI, leave the candidate in `Candidates/` and tell the person. Do not replace the view by hand.
5. Once the person selected apply or discard, the workflow is done.

# Output

- The changed view (after the apply), or one candidate that waits for the person
- The same `id` for the view, and the same id and anchor for each node whose claim did not change
