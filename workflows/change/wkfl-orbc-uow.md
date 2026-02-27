This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: UoW Management

Open, log in, and close Units of Work. This is the stability lifecycle — every change to Map, Code, or Verification layers passes through a UoW.

# Input

- **Project name**: Name of the OrbCode project
- **Action**: `open`, `log`, `close`, or `retroactive`
- (For `open`) **Goal**: Why stability is being broken — what this UoW will achieve
- (For `log`) **Changes**: What changed (semantic, code, verification)
- (For `close`) No additional input — Internal Sync determines if closure is possible
- (For `retroactive`) **Goal**: What the already-completed work achieved. Optionally, a commit range or description of what changed.

# When to Use

- **Open**: Before any work that modifies Map, Code, or Verification layers. If a UoW isn't already open, open one.
- **Log**: During any ongoing workflow — record changes as they happen.
- **Close**: After work is done and you want to restore stability.
- **Retroactive**: Work already happened without a UoW. Capture it after the fact — either into a new UoW or an existing open one.

> **Cross-cutting rule:** Every ongoing workflow that touches governed layers (Map, Code, Verification) MUST ensure a UoW is open before proceeding. If the project is `stable`, open a UoW first. If one is already `unstable`, log in the existing UoW. This is not optional.

# Actions

## Action: Open

Create a new UoW and transition the project to `unstable`.

**Precondition:** Project is `stable`.

1. **Determine UoW number**: Read Log/ folder, find the highest existing UoW number, increment by 1. First UoW is `001`.
2. **Create UoW artifact**: Use `@tmp-orbc-uow.md` template.
   - Set `status: open`, `number: NNN`
   - Set `date-opened` to today
   - Fill in Goal section from the provided goal
   - Add `artifact-refs` to Map artifacts you expect to affect
3. **Update project frontmatter**:
   - Set `stability: unstable`
   - Add `uow: "[[(UoW) NNN Goal]]"` field
4. **Report**: Confirm UoW opened, project is now unstable.

```markdown
## UoW Opened

**UoW:** (UoW) NNN [Goal]
**Project stability:** unstable
**Expected scope:** [What layers and artifacts will be affected]
```

---

## Action: Log

Record changes in the open UoW. Call this during or after any work.

**Precondition:** A UoW is open (`stability: unstable`).

1. **Read the open UoW**: Follow the project's `uow` field to find it.
2. **Update checklists**: Add entries to the appropriate sections:
   - **Semantic Changes** — Map artifacts created/updated/removed
   - **Code Changes** — codebase files modified/created/deleted
   - **Verification Changes** — test artifacts and test files changed
3. **Update Inferred Work**: Based on what changed, infer what remains:
   - New Map artifact with `status: planned`? → Code needed, tests needed
   - Code changed without Map update? → Map update needed
   - Tests changed without code? → Verify alignment
4. **Check completed items**: Mark checklist items as done (`[x]`) as work completes.

---

## Action: Retroactive

Capture work that already happened without a UoW. Opens a new UoW or backfills into an existing one, then reconstructs the change record from what actually changed.

**Precondition:** Work has been done that modified Map, Code, or Verification layers without being tracked in a UoW.

1. **Determine target UoW**:
   - **If project is `stable`** → Open a new UoW (same as Action: Open). Set the goal to describe the already-completed work.
   - **If project is `unstable`** → Use the existing open UoW. The untracked work will be backfilled into it.
2. **Scan for changes**: Reconstruct what happened by examining:
   - **Git history** — `git diff` or `git log` since last known stable state / last UoW log entry. Identify modified, created, and deleted files.
   - **Map artifacts** — scan for new, modified, or removed artifacts in Map/, Tests/, Log/ since the UoW opened (or since last stable).
   - **Codebase files** — identify code changes that correspond to Map artifacts.
3. **Populate UoW checklists**: Add entries to the appropriate sections based on what the scan found:
   - **Semantic Changes** — Map artifacts created/updated/removed
   - **Code Changes** — codebase files modified/created/deleted
   - **Verification Changes** — test artifacts and test files changed
4. **Mark completed items**: Since the work is already done, mark items as `[x]` where the change is complete.
5. **Assess Inferred Work**: Based on the reconstructed changes, determine if anything is still missing:
   - Code exists without Map coverage? → Map update may be needed
   - Map artifact added without tests? → Tests may be needed
   - Tests reference code that changed? → Verify they still pass
6. **Report**: Present the reconstructed UoW to the user for review.

```markdown
## Retroactive UoW

**UoW:** (UoW) NNN [Goal]
**Mode:** [new UoW opened / backfilled into existing]

**Reconstructed changes:**
- Semantic: [count] artifacts [created/updated/removed]
- Code: [count] files [modified/created/deleted]
- Verification: [count] changes

**Inferred Work remaining:**
- [list, or "none — ready to close"]

**Review:** Please confirm the reconstructed record is accurate before proceeding.
```

**After retroactive capture**, normal flow resumes — use `log` to add anything the scan missed, or `close` when ready.

---

## Action: Close

Attempt to close the UoW and restore stability.

**Precondition:** A UoW is open. Work is believed to be complete.

1. **Run Internal Sync**: Audit Map ↔ Code ↔ Verification alignment for the project.
2. **Evaluate Inferred Work**: Is the section empty? All items done or explicitly deferred?
3. **Create Submission**: Use `@tmp-orbc-submission.md` template.
   - Set `status: submitted`, `submission-number` matching the UoW number
   - Fill in Summary, Verification Steps, Edge Cases, Evidence
   - Verification Steps must be concrete: "do this → see this → where"
   - Set `uow-ref` to the current UoW
4. **Present to human**: The human reviews the Submission and either:
   - **Approves** — set Submission `status: approved`, `date-approved` to today
   - **Requests changes** — agent updates the Submission and re-presents
5. **Decision gate**:
   - **If layers agree AND Inferred Work is clear AND Submission approved**: Proceed to close.
   - **If drift remains or Submission not approved**: Report what's outstanding. UoW stays open. Fix remaining items or defer to a new UoW.
6. **Close the UoW**:
   - Set UoW `status: closed`
   - Set `date-closed` to today
   - Mark all Closing Check items as `[x]`
7. **Update project frontmatter**:
   - Set `stability: stable`
   - Remove `uow` field
8. **Report**: Confirm stability restored.

```markdown
## UoW Closed

**UoW:** (UoW) NNN [Goal]
**Project stability:** stable
**Summary:** [Brief summary of what changed across layers]
```

**If deferring remaining work:**
- Close the current UoW at a reasonable boundary
- Immediately open a new UoW for the deferred items
- Move unfinished Inferred Work to the new UoW

# Output

- **Open**: New UoW artifact in Log/, project `stability: unstable`
- **Log**: Updated UoW checklists reflecting current state of work
- **Retroactive**: UoW opened or backfilled with reconstructed change record, ready for normal flow
- **Close**: UoW closed, project `stability: stable`

# Notes

- UoWs are numbered sequentially per project — never reuse numbers
- The `initial` phase is pre-governance — no UoW exists during setup. The Stabilize workflow (`wkfl-orbc-stabilize`) transitions `initial → stable`. UoW 001 is the first change after stabilization.
- Context-layer changes (Context, Architecture, Environment, Relationships) do NOT require a UoW — they are free
- If a UoW grows unwieldy, close it at a boundary and open a new one — don't let UoWs become unbounded
- Every ongoing workflow should call `log` after making changes — this is the record of what happened
- Internal Sync + Submission approval is the gate — you cannot close a UoW without both confirming layer alignment and human approval
