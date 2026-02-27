This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Change Verification

Modify the Verification layer of an OrbCode project — create tests, create fixtures, restructure test suites, update test environments, realign tests with Map artifacts.

**Requires UoW** — follows the UoW Protocol.

# Input

- **Project name**: Name of the OrbCode project
- **Action**: What to do — `create-tests`, `create-fixture`, `restructure`, or `update`
- (For `create-tests`) **Map artifact**: The artifact to test
- (For `create-fixture`) **Name**: What the fixture represents, plus related `(Data)` artifacts
- (For `restructure`) **Instructions**: What to reorganize
- (For `update`) **Scope**: Which test artifacts to update

# When to Use

- New Map artifact needs tests
- Multiple tests need shared fixture data
- Test suites need reorganization (orphaned tests, coverage gaps, structural changes)
- Test environments changed
- Tests are out of sync with Map artifacts

# When NOT to Use

- First-time test infrastructure setup — use **Setup Tests** workflow (one-time, in setup/)
- Modifying Map artifacts — use **Change Semantic** workflow
- Reorganizing Map without meaning change — use **Refactor** workflow

# Prerequisites

- Test infrastructure set up (`wkfl-orbc-setup-tests` completed)
- Test Runner exists in project

# Actions

## Stage 1: Ensure UoW Open

Follow the UoW Protocol:

1. **Check project stability**: Read `stability` field from project index
2. **If `stable`**: Open a new UoW (`wkfl-orbc-uow`, action: `open`) with goal describing the verification changes
3. **If `unstable`**: Use the existing UoW — read it via the project's `uow` field

---

## Stage 2: Audit Verification State

Understand what exists before making changes.

1. **Read Test Architecture**: `(Test Architecture) [Project].md` for overall test structure
2. **List existing tests**: Scan Tests/ folder for `(Test)`, `(Fixture)`, `(Test Runner)`, `(Test Environment)` artifacts
3. **Check alignment**: Do existing tests still reference valid Map artifacts?
4. **Identify the gap**: What's missing or needs changing based on the action?

**Output:**
```markdown
## Verification Audit

**Existing Infrastructure:**
- Test Runner: [name]
- Test Environment: [name or "none"]
- Fixtures: [count] — [list]
- Tests: [count] — [list]

**Action:** [create-tests / create-fixture / restructure / update]
**Scope:** [What specifically needs to change]
**Gaps:** [Missing tests, orphaned artifacts, stale refs]
```

---

## Stage 3: Propose Changes

Design verification changes based on the action.

### For `create-tests`:

Read the Map artifact and design test cases:

1. **Read the artifact**: Load the Map artifact (Feature, API, Data, etc.)
2. **Extract testable behaviors**: From Behavior section, Edge Cases table
3. **Read code**: Follow `code-refs` to understand implementation
4. **Design test cases**:

| Test Case | Given | When | Then | Priority |
|-----------|-------|------|------|----------|
| [Name] | [Setup] | [Action] | [Expected] | [High/Medium/Low] |

### For `create-fixture`:

1. **Read related Data artifacts**: Understand data shape, constraints, relationships
2. **Design fixture types**: Static instances, factory functions, builders
3. **Plan variations**: Valid, minimal, invalid, edge cases

### For `restructure`:

1. **Map current structure**: Which tests where, which fixtures shared
2. **Propose new structure**: Merges, splits, moves, deletions
3. **Identify orphaned tests**: Tests referencing deleted/changed Map artifacts

### For `update`:

1. **Identify stale artifacts**: Tests with broken `artifact-refs` or `code-refs`
2. **Propose updates**: Fix refs, update test case descriptions, realign with Map

**Present to user for approval before proceeding.**

---

## Stage 4: Execute

### Creating Tests

1. **Create semantic artifact**: Use `@tmp-orbc-test.md`
   - Name: `[Map Artifact Name] . (Unit) [Description].md`
   - Set `artifact-refs` to the Map artifact being tested
   - Set `fixture-refs` to any fixtures needed
   - Set `test-runner` to the project's Test Runner
   - Include test cases from Stage 3

2. **Write test code** in codebase:
   - Follow project conventions (co-located or separate)
   - Use Given/When/Then structure
   - Import from fixtures where available

3. **Run tests**: Verify they pass (or fail as expected for TDD)

### Creating Fixtures

1. **Create semantic artifact**: Use `@tmp-orbc-fixture.md`
   - Name: `(Fixture) [Name].md`
   - Link to related `(Data)` artifacts
   - Document each fixture and its purpose

2. **Write fixture code** in codebase:
   - Static fixtures for common instances
   - Factory functions for variations
   - Follow language conventions (TypeScript or Python)

3. **Verify**: Import and use in a simple test

### Restructuring

1. **Execute in order**: Deletes/removals first, then moves, then creates
2. **Update all `artifact-refs`**: Tests pointing to restructured artifacts
3. **Update Test Architecture**: Reflect new structure
4. **Run full test suite**: Confirm nothing broke

### Updating

1. **Fix broken refs**: Update `artifact-refs` and `code-refs`
2. **Update test case descriptions**: Match current Map artifact behavior
3. **Run affected tests**: Confirm still passing

---

## Stage 5: Log in UoW

Record all changes in the open UoW (`wkfl-orbc-uow`, action: `log`):

- **Verification Changes**: List every Test/Fixture/Runner/Environment created/updated/removed
- **Semantic Changes**: Note if Map updates are needed (Inferred Work)
- **Code Changes**: List test/fixture code files created/modified

---

## Stage 6: Run Tests

Final verification:

1. **Run full test suite**: Not just the new/changed tests
2. **Read the output**: Don't assume, verify
3. **Report results**:

```markdown
## Verification Changes Complete

**Action:** [create-tests / create-fixture / restructure / update]

**Created:**
- [List of new artifacts and code files]

**Updated:**
- [List of updated artifacts]

**Removed:**
- [List of removed artifacts]

**Test Results:**
- Total: [count]
- Passing: [count]
- Failing: [count] — [details if any]

**UoW:** [UoW name] — changes logged
**Next Steps:** [More tests needed? Ready to close UoW?]
```

# Output

- New/updated Verification artifacts (Tests, Fixtures, Runners, Environments)
- Test code in codebase
- UoW updated with verification changes logged
- All tests running

# Notes

- One `(Test)` artifact can contain multiple test cases for one Map artifact
- For large artifacts, consider multiple `(Test)` files by behavior area
- If tests fail because code doesn't exist yet, that's fine (TDD)
- Test references Map artifact (one direction) — don't add test-refs to the Map artifact
- Fixtures are independent — create them before or after tests
- Factory functions are preferred over static fixtures for flexibility
- Always run the full suite after changes, not just affected tests
