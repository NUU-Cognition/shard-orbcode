# (UoW) NNN [Description]

/* Unit of Work — tracks a stability transition from stable → unstable → stable. */
/* UoW answers: "What changed across layers to reach the current state?" */
/* Once a project is stable, every change that affects Map, Code, or Verification opens a UoW. Context-only changes are free. */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/uow"
status: [open|closed]
number: [NNN]
date-opened: [YYYY-MM-DD]
date-closed: [YYYY-MM-DD]
artifact-refs:
  - "[[(System) Affected System]]"
  - "[[(Feature) Affected Feature]]"
  - (continue)
template: tmp-orbc-uow
---

# (UoW) NNN [Description]

## Goal

[Why was stability broken? What is this unit of work trying to achieve?]

## Semantic Changes

Map artifacts created, updated, or removed in this UoW.

- [ ] [[(Feature) New or Updated Feature]] — [created|updated|removed] — [brief reason]
- [ ] (continue)

## Code Changes

Codebase files modified or created in this UoW.

- [ ] `path/to/file.ts` — [created|modified|deleted] — [brief reason]
- [ ] (continue)

## Verification Changes

Tests and fixtures added, updated, or removed in this UoW.

- [ ] [[(Feature) X . (Test) Unit]] — [created|updated|removed] — [brief reason]
- [ ] `path/to/test.ts` — [created|modified|deleted] — [brief reason]
- [ ] (continue)

## Inferred Work

/* Derived from semantic changes: what code and tests still need doing before layers agree. */
/* Remove items as they're completed. When empty, UoW is ready to close. */

**Code needed:**
- [ ] [What implementation work remains based on Map changes]
- [ ] (continue)

**Tests needed:**
- [ ] [What verification work remains based on Map and Code changes]
- [ ] (continue)

## Closing Check

/* Internal Sync confirms all three layers match before this UoW can close. */

- [ ] All Semantic Changes completed (checklists above)
- [ ] All Code Changes completed
- [ ] All Verification Changes completed
- [ ] Inferred Work section is empty (all items done or moved to next UoW)
- [ ] Internal Sync confirms Map ↔ Code ↔ Verification alignment
- [ ] (Submission) created with human-verifiable steps
- [ ] (Submission) approved by human
- [ ] Project `stability` set back to `stable`
- [ ] Project `uow` field removed

## Related

- [[(OrbCode Project) Project Name]] — project this UoW belongs to
- [[(UoW) Previous UoW]] — prior unit of work (if any)
- (continue)
```

## Notes

- UoW is a Log artifact — temporal, numbered sequentially per project
- The `initial` phase is pre-governance — no UoW exists during setup. The Stabilize workflow transitions `initial → stable`. UoW 001 is the first change after stabilization.
- Context-layer changes (Context, Architecture, Environment, Relationships) do NOT require a UoW
- `status: open` means the project is unstable; `status: closed` means stability was restored
- Inferred Work is the key section — it tracks what remains before layers agree
- Close via Internal Sync workflow — it verifies layer alignment before allowing closure
- If a UoW grows too large, close it at a reasonable boundary and open a new one
