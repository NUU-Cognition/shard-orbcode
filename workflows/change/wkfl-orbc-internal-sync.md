This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Internal Sync

Audit alignment between the three governed layers — Map (semantic), Code, and Verification — within a single OrbCode project. Detects drift and fixes it. **This is the stability gate** — the only way to close a UoW.

Two contexts:
- **Gate** — Called during UoW close. Determines if layers agree well enough to restore stability.
- **Audit** — Standalone drift detection. Run anytime to check project health.

# Input

- **Project name**: Name of the OrbCode project
- **Context**: `gate` (during UoW close — mandatory) or `audit` (standalone drift check)
- (Optional) **Scope**: Limit to specific layer pair (`map-code`, `map-verification`, `code-verification`) or `all` (default)

# When to Use

- **Gate context**: When closing a UoW — this is mandatory. The UoW Management workflow delegates to Internal Sync before allowing closure.
- **Audit context**: Anytime you suspect drift. After a large refactor, after pulling upstream changes, or as periodic health check.

> **Critical rule:** A UoW cannot close without Internal Sync confirming layer alignment. This is not optional — it is the stability invariant.

# When NOT to Use

- Cross-project alignment — use **Cross-Project Sync** workflow
- Context layer updates — use **Update Context** workflow (Context is free, not governed)
- Semantic restructuring — use **Refactor** workflow

# Actions

## Stage 1: Audit Map ↔ Code

Check that every Map artifact's `code-refs` are valid and that all significant code is covered by Map artifacts.

1. **Read all Map artifacts** in the project (Systems, Features, Processes, Data, APIs)
2. **Check each `code-refs` path**:
   - Does the file exist?
   - Has the file moved? (Search for it by name)
   - Is the file empty or substantially changed?
3. **Scan the codebase** (using the project's `codebase` field):
   - Identify significant files with no Map artifact pointing to them
   - Flag unmapped code — it may be intentional or a gap
4. **Check `status` accuracy**:
   - `status: planned` but code exists → should be `implemented` or `partial`
   - `status: implemented` but code deleted → should be `deprecated` or removed
   - `status: partial` — is more done than captured?

**Output:**
```markdown
## Map ↔ Code Audit

**Broken code-refs:** [count]
- [artifact]: [broken path] → [suggested fix or "file not found"]

**Unmapped code:** [count]
- [file path]: [description / likely Map artifact]

**Status mismatches:** [count]
- [artifact]: status is [current] but should be [correct]
```

---

## Stage 2: Audit Map ↔ Verification

Check that Map artifacts have test coverage and that tests reference valid Map artifacts.

1. **List all Test artifacts** in Tests/ folder
2. **Check each Test's `artifact-refs`**:
   - Does the referenced Map artifact still exist?
   - Has it been renamed? (Search by partial name)
3. **Check Map artifact coverage**:
   - Which Map artifacts have associated Tests?
   - Which Map artifacts have NO tests? (Coverage gaps)
4. **Check Test Architecture**:
   - Does it reflect the current test structure?
   - Are Test Runners and Fixtures still accurate?

**Output:**
```markdown
## Map ↔ Verification Audit

**Orphaned tests:** [count] (reference deleted/renamed Map artifacts)
- [test]: references [missing artifact]

**Coverage gaps:** [count] (Map artifacts with no tests)
- [artifact]: no test coverage

**Test Architecture:** [current/stale]
```

---

## Stage 3: Audit Code ↔ Verification

Check that test files exist and test actual code.

1. **Check test `code-refs`**: Do test files still exist?
2. **Check for dead tests**: Tests that reference deleted code
3. **Check for untested code paths**: Significant code with no test coverage

**Output:**
```markdown
## Code ↔ Verification Audit

**Broken test code-refs:** [count]
- [test artifact]: [broken path]

**Dead tests:** [count] (test code that tests deleted functionality)
- [test file]: tests [deleted feature]

**Untested code:** [count]
- [code file]: no test coverage
```

---

## Stage 4: Report Drift

Combine findings into a prioritized drift report.

**Priority order:**
1. **Critical** — Broken refs (things that are just wrong)
2. **Important** — Status mismatches (semantic layer lies about reality)
3. **Notable** — Coverage gaps (things that should have tests but don't)
4. **Info** — Unmapped code, minor staleness

```markdown
## Drift Report: [Project Name]

**Context:** [gate / audit]
**Overall health:** [healthy / minor drift / significant drift]

### Critical
- [list]

### Important
- [list]

### Notable
- [list]

### Info
- [list]
```

**Ask the user** (audit context):
> "Here's the drift report. Which items should I fix now?"

**In gate context:** Proceed directly to fixes for Critical and Important items.

---

## Stage 5: Execute Fixes

Apply approved fixes. Internal Sync does NOT modify meaning — it only fixes references, statuses, and alignment.

**What Internal Sync CAN fix:**
- Update broken `code-refs` to correct paths
- Update broken `artifact-refs` to correct names
- Update `status` fields to match reality
- Update Test Architecture to reflect current structure
- Flag coverage gaps for future work

**What Internal Sync CANNOT fix (requires other workflows):**
- Add new Map artifacts (→ Change Semantic)
- Write new tests (→ Change Verification)
- Restructure Map artifacts (→ Refactor)
- Update Context layer (→ Update Context)

For each fix:
- Apply the change
- Log it in the open UoW (if gate context)

---

## Stage 6: UoW Gate Check

**Only in `gate` context.** Determines whether the UoW can close.

1. **Re-evaluate after fixes**: Are Critical and Important items resolved?
2. **Check Inferred Work**: Is the UoW's Inferred Work section empty or all done?
3. **Check Submission**: Is there a `(Submission)` for this UoW with `status: approved`?
4. **Decision:**

**If layers agree AND Inferred Work is clear AND Submission approved:**
```markdown
## Gate: PASS

All three layers are aligned. Submission approved by human. UoW can close.

**Resolved in this sync:**
- [list of fixes applied]

**Submission:** [[(Submission) NNN Description]] — approved

**Recommendation:** Close UoW, restore stability: stable
```

**If drift remains or Submission not approved:**
```markdown
## Gate: FAIL

[Layers are not yet aligned / Submission not yet approved]. UoW stays open.

**Remaining drift:**
- [list of unresolved items]

**Submission status:** [approved / submitted / not created]

**Options:**
1. Fix remaining items, then re-run Internal Sync
2. Create or update Submission for human approval
3. Defer remaining items to a new UoW and close this one at current boundary
```

# Output

- **Gate context**: Pass/fail decision for UoW closure, fixes applied, remaining drift listed
- **Audit context**: Drift report with prioritized findings, approved fixes applied

# Notes

- Internal Sync is the ONLY way to close a UoW — this is the stability invariant
- It does NOT modify meaning — only fixes refs, statuses, and alignment
- For cognitive projects (no executable code), skip Code ↔ Verification audit and focus on Map ↔ Code (markdown refs)
- When many `code-refs` are broken simultaneously, it usually means a large refactor happened — batch-update rather than one-by-one
- Coverage gaps are flagged, not fixed — creating new tests is Change Verification's job
- Run in audit mode periodically even when stable — drift prevention is cheaper than drift correction
