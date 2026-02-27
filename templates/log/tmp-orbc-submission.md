# (Submission) NNN [Description]

/* Human-verifiable proof that a UoW or first stabilisation works as intended. */
/* Submission answers: "Can the human verify this works?" */
/* Bridges agent-legible verification (tests, Internal Sync) with human-legible verification (do this, see this). */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/submission"
status: [submitted|approved]
submission-number: [NNN]
date-submitted: [YYYY-MM-DD]
date-approved: [YYYY-MM-DD]
uow-ref: "[[(UoW) NNN Goal]]"
artifact-refs:
  - "[[(Feature) Affected Feature]]"
  - (continue)
template: tmp-orbc-submission
---

# (Submission) NNN [Description]

## Summary

[One paragraph: what was changed and why the human should care. Written for a human who hasn't been following the agent's work.]

## Verification Steps

/* Each step is a concrete action the human can perform to verify the change works. */
/* Format: Do [action] → Expect [observable result] → Where [location/context] */

### Step 1: [Short Name]

**Do:** [Concrete action — run a command, open a file, click a button, navigate to a URL]

**Expect:** [Observable result — what the human should see, hear, or measure]

**Where:** [File path, URL, terminal, UI location]

### Step 2: [Short Name]

**Do:** [action]

**Expect:** [result]

**Where:** [location]

(continue — add as many steps as needed for thorough verification)

## Edge Cases

/* Unusual scenarios the human should also check, if applicable. */

- [ ] [Edge case description] — **Do:** [action] → **Expect:** [result]
- (continue, or remove section if none)

## Evidence

/* Pointers to supporting evidence — not the evidence itself. Git is the record. */

- **Commit(s):** [hash(es) or range]
- **Test results:** [summary — e.g., "14 passed, 0 failed" or link to Test Log]
- **Internal Sync:** [PASS/not yet run]

## Open Questions

/* Anything the human should be aware of or decide on. */

- [question or concern, or "None"]

## Related

- [[(UoW) NNN Goal]] — the unit of work this submission verifies
- [[(OrbCode Project) Project Name]] — project context
- (continue)
```

## Notes

- Submission is a Log artifact — created per UoW closure or first stabilisation
- Status flow: `submitted` → `approved`. Only `approved` allows UoW closure or stabilisation
- The human reviews verification steps and either approves or requests changes
- If the human requests changes, the agent updates the submission and re-submits
- Verification steps should be concrete and repeatable — "do this → see this"
- When verification requires running code, place helper scripts in `submissions/NNN-description/` in the repo
- Evidence section points to git and test output — it does not duplicate them
- One Submission per UoW closure. For first stabilisation, one Submission for the stabilise workflow
