# 1.0.1

- The dependency on the Flint shard accepts any version (`"@nuucognition/flint": ""`), so the shard works with Flint 0.3.x and with Flint 0.4.0 (NUU Flint Task 1129).

# 1.0.0

- The view model replaces the one complete map: a view answers one question of a person, is not exhaustive, and is not mutually exclusive.
- The type View (format `orbcode-view/1`), its template `tmp-orbc-view-v0.1` with a complete example, and its type file.
- The Project template `tmp-orbc-project-v0.3`: the field `product-root` and the folders `Views/` and `Candidates/`.
- The workflows `view` and `reshape`, each with a headless twin that returns `orbcode-result/1`, and the headless init `hinit-orbc`.
- The candidate and the conditional apply, the review anchor of each node, and the findings, computed by `flint orbcode`.
- The ids: a candidate and a history file have their own `id`, and `view_id` names the view. An apply keeps the replaced form in `History/` (the newest 5 of each view); `flint orbcode history` and `restore` undo a change. An apply sets an accepted view back to `proposed`. `flint orbcode set` and `remove` are the decisions of a person (ADR-005).
- A code-ref of another codebase of the Flint: `@<Codebase name>/<path>`. A node of the kind `note` has no proof state, and a good view ends with a note of what it leaves out.
- The workflows verify their own candidate with `check --candidate`, `view --candidate`, and `diff`. The quality rules name the words of the person and the explanation of each product word.
- The skill `check_after_task`: at the end of a product task, check the views that name the changed files, and review each node or change the view through a candidate.
- The migration 0.7.3 → 1.0.0: each 0.7 project gets one view of the shape `tree`.
- Removed: the scripts `tree` and `validate` (they did not run), the workflows `init_project` and `edit`, the skill `add_artifact`, and the knowledge files of Vitest and pytest.
- Legacy: the type files and the templates of System, Module, Feature, and Data stay, so a 0.7 project stays readable.

# 0.1.0

- Initial shard scaffold
