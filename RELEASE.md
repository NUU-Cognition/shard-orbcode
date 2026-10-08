# Deprecated (no release)

- OrbCode is now the ITE (NUU Flint Task 1241): a software product is a program of the template `software` of the ITE shard. This source is a shell: it has no skill, workflow, template, knowledge, migration, or type. A Flint that installs the published 1.1.1 keeps it.

# 1.0.2

- Two no-op script migrations (`1.0.0 → 1.0.1` and `1.0.1 → 1.0.2`) complete the migration chain from 1.0.0. Release 1.0.1 did not have them, so a Flint at 1.0.0 could not build it.

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

# 0.1.0

- Initial shard scaffold
