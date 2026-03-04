This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Implement OrbCode Task

Implement an OrbCode Task: write code, write tests, update Map artifacts.

# Input

- An `(OrbCode Task)` in `todo` or `in-progress` status

# Actions

## Stage 1: Understand Scope

1. Read the task and all linked Map artifacts (`map-refs`)
2. Read the project's `(Test Architecture)` to understand test infrastructure
3. Read relevant Context/ artifacts (Architecture, Environment)
4. Set task status to `in-progress`

## Stage 2: Implement

Follow TDD discipline:

1. **Write failing test first** — describe what should happen
2. **Run test (red)** — confirm it fails for the right reason
3. **Implement minimally** — just enough to pass
4. **Run test (green)** — confirm it passes
5. **Refactor** — clean up while staying green
6. **Commit** — small, focused commit

Repeat for each piece of functionality.

## Stage 3: Update Map Artifacts

For each artifact in the task's "Affected Map Artifacts" table:

1. Update `mode` to `live` (if was `planned` or `altered`)
2. Update `code-refs` to point to actual implementation files
3. Update content to reflect what was actually built (not just what was planned)
4. Strip any `[ALTERED]` labels
5. Update `status` as appropriate (`planned` → `implemented`, etc.)

## Stage 4: Verify

1. Run the full test suite — not just new tests
2. Read the output — don't assume, verify
3. Confirm all pass — no skipped, no flaky
4. Check that all `code-refs` point to real files
5. Update the task log with completion summary

## Stage 5: Move to Review

1. Set task status to `review`
2. Provide summary of what was implemented
3. Ready for `wkfl-orbc-review` (independent agent review) or human review

# Output

- Code implemented with passing tests
- Map artifacts updated to `live` with current code-refs
- Task in `review` status
