# (Submission) [Description]

/* Human-verifiable package for completed work. */
/* Submission answers: "Can the human verify this works?" */
/* The human interacts with the end product — they do NOT read the code. */
/* Set up interactive verification: commands to run, pages to visit, features to try. */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/submission"
status: [submitted|approved|rejected]
date-submitted: [YYYY-MM-DD]
date-approved: [YYYY-MM-DD]
task-refs:
  - "[[(OrbCode Task) NNN Name]]"
  - (continue)
artifact-refs:
  - "[[(Feature) Affected Feature]]"
  - (continue)
template: "[[tmp-orbc-submission-v0.1]]"
---

# (Submission) [Description]

## Summary

[One paragraph: what was changed and why the human should care. Written for a human who hasn't been following the agent's work.]

## How to Verify

/* Each step is a concrete action the human can perform. */
/* The human interacts with the END PRODUCT, not the code. */

### Step 1: [Short Name]

**Do:** [Concrete action — run a command, visit a URL, try a feature, open a file]

**Expect:** [Observable result — what the human should see]

### Step 2: [Short Name]

**Do:** [action]

**Expect:** [result]

(continue — add as many steps as needed)

## Commands

/* Quick reference for commands the human might need */

| Command | What It Does |
|---------|-------------|
| `[command]` | [Description] |
| (continue) | |

## What Changed

/* Brief summary of changes — not a code review */

- [Change 1]
- [Change 2]
- (continue)

## Open Questions

/* Anything the human should be aware of or decide on */

- [question or concern, or "None"]

## Related

- [[(OrbCode Task) NNN Name]] — the task(s) this submission covers
- [[(OrbCode Project) Project Name]] — project context
- (continue)
```

## Notes

- Submissions are for HUMAN REVIEW of the end product
- The human does NOT read code — they interact with the result
- Set up whatever the human needs: test commands, URLs, sample data
- Can bundle multiple tasks into one submission
- Status: `submitted` → `approved` (human accepts) or `rejected` (needs more work)
