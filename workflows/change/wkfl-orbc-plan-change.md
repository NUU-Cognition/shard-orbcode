This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

**Required shards:** This workflow uses the Increments (`inc`) and Projects (`proj`) shards.

# Workflow: Plan Change

Take a natural language change request and produce an Increment with Tasks spanning all affected layers — Map, Code, and Verification. This is **top-down holistic planning**: start from what you want to change, figure out what layers are affected, and produce a phased plan.

**No UoW required** — this workflow produces a plan. It does not modify governed layers directly. Executing the plan's tasks will require a UoW.

# Input

- **Project name**: Name of the OrbCode project
- **Change request**: Natural language description of what should change (e.g., "Add caching to the query layer", "Split the auth module into OAuth and session management", "Add pagination to all list endpoints")
- (Optional) **Increment name**: Name for the resulting increment (auto-generated if not provided)
- (Optional) **Constraints**: Any boundaries (e.g., "don't touch the API surface", "must stay backwards-compatible")

# When to Use

- You have a change request that spans multiple layers
- You want to plan everything up front before opening a UoW
- The change is complex enough to benefit from phased execution
- You want to see the full scope before committing to work

# When NOT to Use

- Simple, single-layer changes — just use Change Semantic or Change Verification directly
- Already have Map artifacts describing the change — use **Plan Implementation** instead (bottom-up from existing artifacts)
- Refactoring without meaning change — use **Refactor** workflow

> **Key distinction from Plan Implementation:** Plan Change starts from a change request (top-down — "I want X to change") and designs what Map/Code/Verification artifacts need to change. Plan Implementation starts from existing Map artifacts (bottom-up — "these planned artifacts need implementing") and creates tasks to implement them.

# Actions

## Stage 1: Analyze Change Request

Understand what the change request implies across all layers.

1. **Read project state**: Project index, relevant Map artifacts, Context
2. **Identify affected artifacts**:
   - Which Map artifacts describe the area being changed?
   - Which code files are involved? (via `code-refs`)
   - Which tests cover this area? (via Tests/)
3. **Classify the change**:
   - **Additive** — new capability, new artifacts needed
   - **Modifying** — existing artifacts change behavior
   - **Structural** — reorganization with meaning changes
   - **Mixed** — combination of above

**Output:**
```markdown
## Change Analysis

**Request:** [restated clearly]
**Classification:** [additive / modifying / structural / mixed]

**Affected Map artifacts:**
- [artifact]: [what changes]

**Affected code:**
- [file]: [what changes]

**Affected tests:**
- [test]: [what changes]

**New artifacts needed:**
- [type] [name]: [purpose]
```

---

## Stage 2: Design Cross-Layer Plan

Design the complete change across all three governed layers.

**For each layer, determine:**

### Map Layer Changes
- New artifacts to create (Feature, Data, API, etc.)
- Existing artifacts to update (behavior, edge cases, status)
- Artifacts to deprecate or remove
- Reference updates (`artifact-refs`, `code-refs`)

### Code Layer Changes
- New files to create
- Existing files to modify
- Files to delete
- Dependencies to add/update

### Verification Layer Changes
- New tests to write
- Existing tests to update
- Test infrastructure changes (Fixtures, Environments, Runners)
- Test Architecture updates

**Present the cross-layer plan:**
```markdown
## Cross-Layer Plan

### Map Changes
| Action | Artifact | Details |
|--------|----------|---------|
| Create | (Feature) X | [description] |
| Update | (Feature) Y | [what changes] |

### Code Changes
| Action | File | Details |
|--------|------|---------|
| Create | src/x.ts | [description] |
| Modify | src/y.ts | [what changes] |

### Verification Changes
| Action | Artifact/File | Details |
|--------|---------------|---------|
| Create | (Test) X . (Unit) Core | [description] |
| Update | (Test) Y . (Unit) Core | [what changes] |
```

---

## Stage 3: Create Increment

Use the Increments shard to create a tracking increment.

**Load:** `@init-inc.md`

**Use:** `@sk-inc-create.md`

Create increment with:
- **Name:** From input or auto-generated from change request
- **Goal:** Implement [change request summary]
- **Scope:** Cross-layer change spanning Map, Code, and Verification

---

## Stage 4: Create Tasks (Phased)

Create tasks in execution order. **Phase ordering is critical** — Map artifacts must be updated before code is written, and code must exist before tests verify it.

**Load:** `@init-proj.md`

**Use:** `@wkfl-proj-create_task.md` for each task

### Phase 1: Map (Semantic Layer)
Tasks for creating/updating Map artifacts. These define what the code should do.

```markdown
## Task: [Create/Update] (Feature) [Name]
**Phase:** 1 — Map
**References:** [existing artifacts, context]
**Acceptance:** Map artifact accurately describes intended behavior
```

### Phase 2: Verification (Test Specs)
Tasks for creating/updating test specifications and infrastructure. Tests describe how to verify the code.

```markdown
## Task: [Create/Update] (Test) [Name]
**Phase:** 2 — Verification
**References:** Map artifact from Phase 1, Test Runner, Fixtures
**Acceptance:** Test spec describes all cases from Map artifact
```

### Phase 3: Code (Implementation)
Tasks for writing the actual code. Code implements what Map describes and passes what Tests verify.

```markdown
## Task: Implement [Name]
**Phase:** 3 — Code
**References:** Map artifact, Test spec
**Acceptance:** Code passes tests, matches Map description
```

---

## Stage 5: Order and Link

Establish execution order and cross-references.

1. **Within phases**: Order by dependency (Data before Features, core before dependent)
2. **Across phases**: Phase 1 → Phase 2 → Phase 3 (but parallel work within phases is fine)
3. **Link everything**:
   - Increment → all Tasks
   - Tasks → Map artifacts they reference
   - Tasks → Context artifacts for background
   - Phase 3 tasks → Phase 2 tasks (code implements what tests describe)

---

## Stage 6: Summary

**Report to user:**

```markdown
## Plan Change Complete

**Change:** [change request]
**Increment:** [[(Increment) [Name]]]

**Tasks:** [total count]
- Phase 1 (Map): [count] tasks
- Phase 2 (Verification): [count] tasks
- Phase 3 (Code): [count] tasks

**Execution sequence:**
1. Open a UoW
2. Execute Phase 1 tasks (Change Semantic workflow)
3. Execute Phase 2 tasks (Change Verification workflow)
4. Execute Phase 3 tasks (implement code, run tests)
5. Run Internal Sync (gate context)
6. Close UoW

**Next step:** Review the plan, then open a UoW to begin execution.
```

# Output

- New Increment tracking the change
- Phased Tasks (Map → Verification → Code)
- Clear execution order
- Everything linked

# Notes

- This workflow plans but does NOT execute — no governed layers are modified
- Executing the plan requires opening a UoW and using Change Semantic, Change Verification, and code implementation workflows
- The phase order (Map → Verification → Code) supports TDD: describe intent, specify tests, then implement
- For simple changes affecting only one layer, skip this workflow and use the appropriate Change workflow directly
- If the change request is ambiguous, ask the human for clarification before designing the plan
- Constraints from the input should be reflected in task acceptance criteria
