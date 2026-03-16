This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Sync Map

Verify all Map artifacts are current with the codebase. Use as a periodic health check or before major work to ensure the Map is trustworthy.

# Input

- **Project**: Which OrbCode project to sync
- (Optional) **Scope**: Limit to specific layers or artifact types

# Actions

## Stage 1: Assess Drift

1. Read all Map artifacts in the project
2. For each artifact, check `code-refs` against actual codebase:
   - Do the referenced files still exist?
   - Has the code changed significantly since the artifact was written?
3. Categorise each artifact:
   - **Current** — accurately reflects the code
   - **Stale** — code has changed, artifact needs updating
   - **Orphaned** — code-refs point to files that no longer exist
   - **Missing** — significant code areas with no Map artifact

**Report to user:**
```markdown
## Sync Assessment: [Project Name]

| Artifact | Status | Notes |
|----------|--------|-------|
| ... . (Feature) X | Current | |
| ... . (Feature) Y | Stale | Logic changed in v2 |
| ... . (Data) Z | Orphaned | Schema file deleted |

**Missing coverage:**
- [Code area with no artifact]
```

---

## Stage 2: Fix Drift

For each stale artifact:
1. Read the current code at the `code-refs` locations
2. Update the artifact content to reflect current reality
3. Update mermaid diagrams if structure changed
4. Update `code-refs` if files moved
5. Keep `mode: live`

For each orphaned artifact:
1. Flag for human decision — remove or redirect?
2. If the capability was removed from code, the artifact should be removed
3. If the capability moved, update `code-refs`

---

## Stage 3: Report

```markdown
## Sync Complete: [Project Name]

**Updated:** [count] artifacts
- [List with brief summary of changes]

**Orphaned (needs human decision):** [count]
- [List with what happened]

**Missing (not mapped yet):** [count]
- [List of code areas without coverage]

**Current (no changes needed):** [count]
```

# Output

- All stale artifacts updated to match current code
- Orphaned artifacts flagged for human decision
- Missing coverage reported
- Map is trustworthy for ongoing work

# Notes

- Run this before starting a major development effort to ensure agents have accurate context.
- This is a **full scan**. For updating specific artifacts after known changes, use `wkfl-orbc-update`.
- Don't create new artifacts for missing coverage unless the human asks — just report the gaps.
