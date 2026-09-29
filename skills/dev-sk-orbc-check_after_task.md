---
description: "At the end of a product task: check the views that name the changed files, compare each review-due node with the code, review it or change the view through a candidate. An aid that never blocks a landing or a release."
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start orbc` (headless: `flint shard hstart orbc`) if you haven't already.

# Skill: Check After Task

A product task changes code. A view that names that code can then say a thing that is no longer true. This skill finds the views that name the changed files, and keeps each **kept** view true: the agent compares each node that needs a review with the code, and then reviews the node or changes the view through a candidate.

**The check is an aid.** It never blocks a landing, the review of a task, the close of a task, or a release. A finding that stays is a line in the result, not a stop.

# Input

- The product task: a `(Task)` with `git-repos` and `wip-commits`. Or the list of the files that the work changed, and the repository of each file.
- (Optional) The Orbtest stories that the work changed

# When to Run It

`flint orbcode check` reads the code in the codebase path of the Project: the first line of `flint resolve codebase <name>`. It does not read a worktree. Run this skill when the commits of the task are in that checkout.

- The task committed in the checkout of the codebase path: run the skill after the WIP commits, before the task goes to review.
- The task committed on a worktree branch: the check sees the change only after the landing. Run the skill after the landing. When the session that ends the task does not land, it writes the line `OrbCode: run sk-orbc-check_after_task after the landing` in its result, and the session that lands runs the skill.
- The Flint has no OrbCode project for the repository: `flint orbcode check` refuses with exit 2, or it prints `No view has a node whose code-refs match`. The skill is then done.

# Actions

1. **List the changed files.** For each repository of `git-repos`, resolve the codebase path: the first line of `flint resolve codebase <name>`. For each SHA of `wip-commits` of that repository, list its files: `git -C "<codebase path>" show --name-only --format= <sha>`. Remove the duplicates. When the task has no `wip-commits`, use the files that the work changed.
2. **Make each path absolute.** Join the codebase path of step 1 and each file. Give absolute paths: the command then matches each path only with the views of its own codebase. Never give the path of a worktree: it matches no view.
3. **Run the check.**

   ```bash
   flint orbcode check --paths <absolute path>... --json
   ```

   The output is one JSON line of the schema `orbcode-check/1`: each view with its `id`, its `view`, and its `findings`. Each finding has `code`, `level`, `node`, and `detail`. `flint orbcode list` gives the `lifetime` of each view. Exit 0: no error. Exit 1: a finding of the level error. Exit 2: a refusal; read the reason, and stop.
4. **Check the changed stories.** When the work changed a story file of Orbtest (`orbtest/stories/<area>.yaml`), run `flint orbcode check --project "<Product>" --json` with no `--paths`. Take each `review-due` finding whose `detail` names a changed story (`the story <id> changed after <commit>`). `--paths` does not find them, because a story is not a code-ref.
5. **Act on each finding that the work caused.** The check gives all the findings of each selected view, also the findings that were there before the work. Act only on a finding of a **kept** view that names a file or a story that the work changed: a `review-due` whose `detail` lists a changed file or a changed story (the detail shows at most 5 files, then `...`; with `...`, read the diff of step 6), or a `code-ref-missing` or `story-missing` whose `detail` names a changed path or a changed story. A draft is low cost: name its findings in the result, and do nothing more.

   | Finding on a kept view, caused by the work | Action |
   |--------------------------------------------|--------|
   | `review-due` | Compare the node with the code (step 6). Then review it (step 7) or change the view (step 8). |
   | `code-ref-missing` (error) | The work removed, moved, or renamed a file that the node names. Change the view (step 8) with the new path. |
   | `story-missing` (error) | The work removed a story or a criterion that the node names. Change the view (step 8). |
   | `anchor-unknown` | Git does not have the commit of the anchor, for example after a rewrite of the history. Compare the node with the code (step 6), then review it (step 7). |

   No action in this skill for `never-reviewed`, `no-contract`, a `format` warning, a `project` finding, or a finding that was there before the work. A node with no anchor gives no `review-due`, so the first review of a kept view is the work of the person who keeps it, not of a product task. Name the count of these findings in the result.

6. **Compare the node with the code.** Read the prose and the fields of the node in the view file. Read the diff of the code under its code-refs after the anchor: `git -C "<codebase path>" diff <reviewed.commit> -- <code-ref path>`. For a code-ref of another codebase (`@<Codebase name>/<path>`), use that codebase and its commit in `reviewed.commits`. Read each changed story with `flint orbtest story show <id> --root <product root>`. Answer one question: does the prose of the node still say what the code and the stories do? The claim is the prose, not the names in the code. A change of a function name or of the inner logic often keeps the claim true.
7. **The claim is still true: review the node.** Run `flint orbcode review <view-uuid> --node <id>...` with each node that you compared and found true. Do not review a node that you did not compare.
8. **The claim is not true: change the view through a candidate.** Follow the workflow reshape for the kept view, with the request "Make the nodes <ids> true to the code after <task>". In an interactive session, use [[dev-wkfl-orbc-reshape]]. In a headless session, use Stages 1 to 4 of [[dev-hwkfl-orbc-reshape]] (see Headless Use). Do not review a node that the candidate changes: the person applies the candidate, then the node gets its review.
9. **Record the result.** Add one line to the Task Log of the task: the views that the check selected, the nodes that you reviewed, the candidates that you wrote, and each finding that stays. Example: `OrbCode: 2 views checked; reviewed Onboarding#select-the-agent; candidate onboarding-20261002-101500 for Onboarding#check-the-tools; 1 draft with review-due (Architecture of Flint).`

# Headless Use

A headless product task follows the same actions, with these differences:

- Ask no question. When you cannot decide if a claim is still true, do not review the node. Name it in the result as `review-due, not decided`.
- For a view that is not true, write the candidate with Stages 1 to 4 of [[dev-hwkfl-orbc-reshape]]. Skip its Stage 5: do not return an `orbcode-result/1` value. The result of the turn is the result of the product task. Put the candidate id and the view in it.
- Never apply and never discard a candidate. Never run `flint orbcode set` or `flint orbcode remove`. `flint orbcode review` is allowed for a node that you compared and found true.
- Set the phase `orbcode-check` while the skill runs: `flint orbh session set phase orbcode-check`.

# Output

- The review anchors of each node that the agent compared and found true
- A candidate for each kept view that is no longer true, not applied
- One line in the Task Log of the task with the views, the reviews, the candidates, and the findings that stay
