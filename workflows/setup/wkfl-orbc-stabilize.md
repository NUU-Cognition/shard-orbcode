This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Stabilize

Final setup step that transitions a project from `initial` to `stable` for the first time. Reviews all three governed layers — Map, Code, and Verification — confirms they agree, and establishes the stability baseline. No UoW is involved — everything before the first stable state is pre-governance setup. The UoW protocol begins after this.

# Input

- **Project name**: Name of the OrbCode project to stabilize

# When to Use

- After completing setup (greenfield, map, or both + setup-tests)
- Project stability is `initial` — has never been stable before
- All three layers exist and are believed to be in agreement
- You want to establish the first stable baseline

# When NOT to Use

- Project is already `stable` or `unstable` — use `wkfl-orbc-uow` (action: close) instead
- Setup is incomplete (no Map artifacts, no tests) — finish setup first
- You want to add new artifacts or write new code — do that first, then stabilize

# Actions

## Stage 1: Verify Readiness

Confirm the project has enough substance to be called stable.

1. **Read the project index**: Find `(OrbCode Project) [Name].md`
2. **Check Context layer**: At minimum, Context and Architecture artifacts must exist
3. **Check Map layer**: At least one System and one Feature must exist with `status: implemented` or `partial`
4. **Check Verification layer**: Test Runner must exist. At least one Test artifact should exist or test files must be present in the codebase
5. **Check codebase**: The project's codebase must exist and contain code that the Map describes

**If any check fails:**
```markdown
## Not Ready to Stabilize

**Missing prerequisites:**
- [ ] [What's missing]

**Recommendation:** Complete setup first, then re-run stabilize.
- Missing Map? → Run `wkfl-orbc-greenfield` or `wkfl-orbc-map`
- Missing Tests? → Run `wkfl-orbc-setup-tests`
- Map artifacts still `planned`? → Implement first, then stabilize
```

**Stop here if prerequisites aren't met.** Do not force stability on an incomplete project.

---

## Stage 2: Review Map Layer

Read every Map artifact and verify it reflects reality.

For each Map artifact:
1. **Read the artifact fully** — does it make sense? Is the description accurate?
2. **Check `code-refs`** — do all referenced files exist? Do they contain what the artifact describes?
3. **Check `status`** — does it match reality?
   - Code exists and works → `implemented`
   - Code exists but incomplete → `partial`
   - No code yet → `planned`
4. **Check `artifact-refs`** — do referenced artifacts exist? Are the relationships correct?

**Output:**
```markdown
## Map Layer Review

**Artifacts reviewed:** [count]

| Artifact | Status | Code-Refs Valid | Notes |
|----------|--------|-----------------|-------|
| (System) X | implemented | yes | [any issues] |
| (Feature) Y | partial | 1 broken | [detail] |
```

---

## Stage 3: Review Verification Layer

Run tests and check that the Verification layer reflects what's actually tested.

1. **Run the tests**: Execute the test command from the Test Runner artifact
2. **Record results**: How many pass, fail, skip?
3. **Check Test artifacts** against Map: Do Tests reference valid Map artifacts?
4. **Check coverage**: Which Map artifacts have tests? Which don't?

**Output:**
```markdown
## Verification Layer Review

**Test results:** [X passed, Y failed, Z skipped]
**Test command:** [what was run]

**Coverage:**
| Map Artifact | Has Test | Test Passes |
|-------------|----------|-------------|
| (Feature) Y | yes | yes |
| (Feature) Z | no | — |
```

---

## Stage 4: Review Code Layer

Verify the codebase is fully accounted for by the Map.

1. **Scan the codebase**: Are there significant files not covered by any Map artifact?
2. **Check for dead references**: Files that Map says are there but aren't
3. **Brief sanity check**: Does the code do what the Map says it does?

**Output:**
```markdown
## Code Layer Review

**Unmapped significant files:** [count]
- [file]: [what it does]

**Dead references:** [count]
- [artifact]: references [missing file]
```

---

## Stage 5: Assess Alignment and Fix

Combine findings from Stages 2–4 into an alignment assessment.

```markdown
## Alignment Assessment

**Map ↔ Code:** [aligned / minor drift / significant drift]
**Map ↔ Verification:** [aligned / minor drift / significant drift]
**Code ↔ Verification:** [aligned / minor drift / significant drift]

**Overall:** [ready to stabilize / fixes needed]
```

**Decision gate:**

- **If aligned or minor drift only**: Fix minor issues in place. Proceed to Stage 6.
- **If significant drift**: Report findings to user. Ask whether to fix now or abort stabilization. Do not force stability over significant drift.

**What can be fixed in place:**
- Broken `code-refs` → update to correct paths
- Broken `artifact-refs` → update to correct names
- Status mismatches → update to match reality
- Stale Test Architecture → update

**What blocks stabilization (go back to setup):**
- Missing Map artifacts → `wkfl-orbc-map` or `wkfl-orbc-greenfield`
- Missing tests → `wkfl-orbc-setup-tests`
- Large sections of unmapped code → `wkfl-orbc-map`
- Fundamental architecture mismatch → revisit Context layer

---

## Stage 6: Submission

Create a `(Submission)` for the human to verify the initial baseline before governance begins.

1. **Create Submission**: Use `@tmp-orbc-submission.md` template.
   - Set `status: submitted`
   - Set `submission-number: 000` (pre-governance submission)
   - Fill Summary with what was set up and why
   - Fill Verification Steps with concrete checks the human can perform to confirm the baseline:
     - Run the test suite → expect all tests pass
     - Check key Map artifacts → expect they describe what the code does
     - Run the application/library → expect basic functionality works
   - Leave `uow-ref` empty (no UoW for first stabilisation)
2. **Present to human**: The human reviews and either:
   - **Approves** — set Submission `status: approved`, `date-approved` to today. Proceed to Stage 7.
   - **Requests changes** — fix issues, update Submission, re-present.

**The first stabilisation requires human approval.** Do not proceed to Stage 7 without an approved Submission.

---

## Stage 7: Stabilize

Set the project to stable. This is the moment governance begins.

1. **Update project frontmatter**:
   - Set `stability: stable`
2. **Verify project index**: Ensure all artifacts are linked and up to date

> From this point forward, all changes to Map, Code, or Verification layers must follow the UoW protocol. The setup phase is over.

---

## Stage 8: Report

Present the stabilization summary to the user.

```markdown
## Project Stabilized

**Project:** (OrbCode Project) [Name]
**Stability:** initial → stable
**Date:** [today]

**Layers at stabilization:**
- **Map:** [count] artifacts ([count] implemented, [count] partial)
- **Code:** [summary of codebase state]
- **Verification:** [X tests passing, Y coverage]

**Fixes applied during stabilization:**
- [list of any ref/status fixes, or "none needed"]

**The project is now governed by the stability model.**
To make changes, open a UoW first — use `wkfl-orbc-uow` (action: open).
```

# Output

- Project `stability: stable` in frontmatter
- All layer alignment verified and minor drift fixed
- Summary report delivered to user

# Notes

- This workflow is idempotent for the readiness check — safe to run Stage 1 to see if a project is ready even if you don't proceed
- No UoW is created or closed — the `initial` phase is pre-governance. UoW 001 will be the first change after stabilization
- A project with all `status: planned` artifacts is NOT ready to stabilize — at least some code must exist
- If tests fail but the Map accurately describes the failure state, the project can still be stable — stability is about layer agreement, not test passage
- After stabilization, all future changes follow the UoW protocol — no more free-form edits to governed layers
- If the project was set up via greenfield with all `planned` artifacts, implementation must happen before stabilization
