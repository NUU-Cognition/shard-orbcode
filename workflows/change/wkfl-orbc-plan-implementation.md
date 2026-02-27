This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

**Required shards:** This workflow uses the Increments (`inc`) and Projects (`proj`) shards.

# Workflow: Plan Implementation

Create an implementation plan as an Increment with Tasks that reference Map artifacts. Bridges semantic design to concrete implementation work.

# Input

- **Project name**: Name of the `(OrbCode Project)`
- **Scope**: Which Map artifacts to implement (or "all planned")
- **Increment name**: Name for this implementation phase
- (Optional) **Parent increment**: Link to parent stream if nested

# When to Use

- After greenfield workflow completes
- Ready to start implementing planned features
- Adding new features to existing project
- Planning a release or milestone

# Prerequisites

- OrbCode project exists with Map artifacts
- Map artifacts have `status: planned` or need updates
- Increments shard installed (`@init-inc.md`)
- Projects shard installed (`@init-proj.md`)

# Actions

## Stage 1: Analyze Scope

Understand what needs to be implemented.

### 1a. Read Project State

1. Read project index
2. List all Map artifacts with `status: planned`
3. Read Context artifacts for implementation context
4. Check existing tests

### 1b. Determine Implementation Scope

**If scope is "all planned":**
- Gather all artifacts with `status: planned`

**If scope is specific:**
- Identify named artifacts
- Include dependencies (Data required by Features, etc.)

**Output:**
```markdown
## Implementation Scope

**Artifacts to implement:**
| Type | Name | Dependencies |
|------|------|--------------|
| System | [Name] | — |
| Feature | [Name] | [Data X, API Y] |
| Data | [Name] | — |

**Context to reference:**
- [[(Context) ...]]
- [[(Architecture) ...]]
- [[(Environment) ...]]

**Test infrastructure:**
- [[(Test Runner) ...]]
```

---

## Stage 2: Create Increment

Use the Increments shard to create a new increment.

**Load:** `@init-inc.md`

**Use:** `@sk-inc-create.md`

Create increment with:
- **Name:** From input
- **Goal:** Implement [scope summary]
- **Artifacts:** List of Map artifacts in scope

```markdown
## Increment: [Name]

**Goal:** [What this increment achieves]

**Scope:**
- [ ] Implement (Feature) X
- [ ] Implement (Feature) Y
- [ ] Implement (Data) Z
- [ ] Write tests for all above
```

---

## Stage 3: Create Implementation Tasks

For each Map artifact in scope, create a Task using the Projects shard.

**Load:** `@init-proj.md`

**Use:** `@wkfl-proj-create_task.md` for each task

### Task Structure

**For each Feature:**
```markdown
## Task: Implement (Feature) [Name]

**References:**
- Map: [[(Feature) [Name]]]
- Context: [[(Architecture) ...]]
- Environment: [[(Environment) ...]]

**Acceptance Criteria:**
- [ ] Implementation matches Feature behavior spec
- [ ] All edge cases from Feature handled
- [ ] Unit tests pass (see test task)

**Code Location:** [from Architecture directory structure]
```

**For each Data:**
```markdown
## Task: Implement (Data) [Name]

**References:**
- Map: [[(Data) [Name]]]
- Context: [[(Architecture) ...]]

**Acceptance Criteria:**
- [ ] Type/class matches Data spec
- [ ] Validation rules implemented
- [ ] Used by dependent Features
```

**For each API:**
```markdown
## Task: Implement (API) [Name]

**References:**
- Map: [[(API) [Name]]]
- Context: [[(Environment) ...]]

**Acceptance Criteria:**
- [ ] Endpoints match API spec
- [ ] Auth/validation implemented
- [ ] Integration tests pass
```

### Test Tasks

**For each Feature/Data/API, also create:**
```markdown
## Task: Test (Feature) [Name]

**References:**
- Test Spec: [[(Feature) [Name] . (Unit) Core]]
- Test Runner: [[(Test Runner) Unit Tests]]
- Fixture: [[(Fixture) Core Fixtures]]

**Acceptance Criteria:**
- [ ] All test cases from spec implemented
- [ ] Edge cases covered
- [ ] Tests pass
```

---

## Stage 4: Order Tasks

Establish implementation order based on dependencies.

**Dependency rules:**
1. Data before Features (Features use Data)
2. Core Features before dependent Features
3. Implementation before Tests (or parallel for TDD)
4. System-level setup first

**Output task order:**
```markdown
## Implementation Order

### Phase 1: Foundation
1. [ ] Implement (Data) X
2. [ ] Implement (Data) Y

### Phase 2: Core Features
3. [ ] Implement (Feature) A
4. [ ] Test (Feature) A
5. [ ] Implement (Feature) B
6. [ ] Test (Feature) B

### Phase 3: Integration
7. [ ] Implement (API) Z
8. [ ] Test (API) Z
```

---

## Stage 5: Link Everything

Ensure all artifacts are properly linked.

1. **Increment → Tasks**: Increment lists all tasks
2. **Tasks → Map**: Each task references its Map artifact
3. **Tasks → Context**: Tasks reference relevant context
4. **Tasks → Tests**: Implementation tasks link to test tasks
5. **Map → Tasks**: Update Map artifacts with task refs (optional)

---

## Stage 6: Summary

**Report to user:**

```markdown
## Implementation Plan Complete

**Increment:** [[(Increment) [Name]]]

**Tasks Created:** [count]
- Implementation: [count]
- Testing: [count]

**Phases:**
1. Foundation: [count] tasks
2. Core Features: [count] tasks
3. Integration: [count] tasks

**Estimated scope:** [artifact count] artifacts

**Next Steps:**
1. Review task order and dependencies
2. Start with Phase 1 tasks
3. Follow TDD: write test spec → implement → verify
4. Update artifact status as you complete
```

# Output

- New Increment tracking implementation work
- Tasks for each Map artifact in scope
- Test tasks for each implementation task
- Clear implementation order
- Everything linked together

# Notes

- Tasks reference Map artifacts — single source of truth
- Update `status: planned → partial → implemented` as you go
- Tests are first-class — every implementation has a test task
- Re-run this workflow for additional increments
- Keep increments focused — better to have many small ones
