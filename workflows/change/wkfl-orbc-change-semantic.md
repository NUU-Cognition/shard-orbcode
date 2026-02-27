This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Change Semantic

Modify the Map layer of an OrbCode project — add new artifacts (Features, Systems, Data, APIs, Processes), update existing ones, or change their status. This is for changes that alter meaning, not just reorganization (use Refactor for that).

**Requires UoW** — follows the UoW Protocol.

# Input

- **Project name**: Name of the OrbCode project
- **Instructions**: What to change (natural language)
- (Optional) **Scope**: Limit to specific artifacts or areas

# When to Use

- New capability needs to be documented in the Map
- Existing Map artifact's behavior, edge cases, or status changed
- A new System boundary emerged
- Data shape evolved (new fields, changed constraints)
- API contract changed
- Feature behavior was redefined (not just reorganized)

# When NOT to Use

- Reorganizing without changing meaning (merge, split, move, rename, delete) — use **Refactor** workflow
- Modifying tests or fixtures — use **Change Verification** workflow
- Updating Context/Architecture/Environment — use **Update Context** workflow (free, no UoW)

# Actions

## Stage 1: Ensure UoW Open

Follow the UoW Protocol:

1. **Check project stability**: Read `stability` field from project index
2. **If `stable`**: Open a new UoW (`wkfl-orbc-uow`, action: `open`) with goal describing the semantic changes
3. **If `unstable`**: Use the existing UoW — read it via the project's `uow` field

---

## Stage 2: Understand Scope

Read the existing Map to understand what exists and what needs changing.

1. **Read project index**: `(OrbCode Project) Name.md`
2. **Read relevant Map artifacts**: Focus on the area being changed
3. **Read Context artifacts**: Architecture, Environment for implementation context
4. **Identify what's changing**: New artifacts? Updates to existing? Status transitions?

**Output:**
```markdown
## Change Scope

**Current State:**
- [Relevant existing artifacts and their current state]

**Requested Changes:**
- [Restate instructions in terms of specific Map operations]

**Impact:**
- [Which artifacts are affected, which are new]
```

---

## Stage 3: Propose Map Changes

Design specific changes following the resolution principle.

**Change Types:**

| Action | When | Example |
|--------|------|---------|
| **Create** | New capability/system/entity appeared | Add `(Feature) New Thing` |
| **Update** | Existing artifact's meaning changed | Update behavior, edge cases, status |
| **Status Change** | Implementation progress | `planned` → `partial` → `implemented` |

**Resolution check:** Will this push the project over 20 artifacts? If so, reconsider granularity.

**Propose to the user:**

```markdown
## Proposed Semantic Changes

| Action | Artifact | Details |
|--------|----------|---------|
| Create | (Feature) X | [Why needed, what it describes] |
| Update | (System) Y | [What changed in behavior/scope] |
| Status | (Data) Z | planned → implemented |

**Test Impact:**
- [New tests needed for new artifacts]
- [Existing tests that may need updating]

**Questions:**
- [Anything needing clarification]
```

**Ask the user:**
> "Do these semantic changes look right? Any changes to add or remove?"

Wait for approval before proceeding.

---

## Stage 4: Execute Changes

Apply approved changes.

**For new artifacts:**
1. Use the appropriate template (`tmp-orbc-feature`, `tmp-orbc-data`, etc.)
2. Set `status: planned` (unless documenting existing code)
3. Set `artifact-refs` following the reference model (unidirectional only)
4. Set `code-refs` if code already exists

**For updates:**
1. Read current artifact content
2. Apply changes — update behavior, edge cases, code-refs, status
3. Update outbound `artifact-refs` if relationships changed
4. Preserve what hasn't changed

**For status changes:**
1. Verify the status transition is accurate (code matches claimed status)
2. Update `status` field

**Order of operations:**
1. Creates first — establish new artifacts
2. Updates — modify existing artifacts (may reference new ones)
3. Status changes — update progress tracking

---

## Stage 5: Log in UoW

Record all changes in the open UoW (`wkfl-orbc-uow`, action: `log`):

- **Semantic Changes**: List every Map artifact created/updated/status-changed
- **Verification Changes**: Note if new tests are needed (Inferred Work)
- **Code Changes**: Note if implementation is needed (Inferred Work)

---

## Stage 6: Update Project Index

1. Add any new artifacts to the project index
2. Update artifact counts if tracked
3. Verify all `artifact-refs` from new artifacts resolve

**Report to user:**
```markdown
## Semantic Changes Complete

**Created:**
- [List of new artifacts]

**Updated:**
- [List of updated artifacts with summary of changes]

**Status Changes:**
- [List of status transitions]

**UoW:** [UoW name] — changes logged
**Next Steps:** [Tests needed? Implementation needed? Or ready to close UoW?]
```

# Output

- New/updated Map artifacts reflecting changed meaning
- UoW updated with semantic changes logged
- Project index updated
- Inferred Work in UoW identifies follow-up (tests, implementation)

# Notes

- This workflow is for **meaning changes**, not reorganization — use Refactor for merge/split/move/rename/delete without meaning change
- Follow the resolution principle — don't over-granularize
- New artifacts should have `artifact-refs` following the reference model
- Always log changes in the UoW — this is an invariant
- If changes reveal the need for verification changes, note in Inferred Work but use Change Verification workflow separately
