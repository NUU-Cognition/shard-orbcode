# 1.0.0

- The view model replaces the one complete map: a view answers one question of a person, is not exhaustive, and is not mutually exclusive.
- The type View (format `orbcode-view/1`), its template `tmp-orbc-view-v0.1` with a complete example, and its type file.
- The Project template `tmp-orbc-project-v0.3`: the field `product-root` and the folders `Views/` and `Candidates/`.
- The workflows `view` and `reshape`, each with a headless twin that returns `orbcode-result/1`, and the headless init `hinit-orbc`.
- The candidate and the conditional apply, the review anchor of each node, and the findings, computed by `flint orbcode`.
- The migration 0.7.3 → 1.0.0: each 0.7 project gets one view of the shape `tree`.
- Removed: the scripts `tree` and `validate` (they did not run), the workflows `init_project` and `edit`, the skill `add_artifact`, and the knowledge files of Vitest and pytest.
- Legacy: the type files and the templates of System, Module, Feature, and Data stay, so a 0.7 project stays readable.

# 0.1.0

- Initial shard scaffold
