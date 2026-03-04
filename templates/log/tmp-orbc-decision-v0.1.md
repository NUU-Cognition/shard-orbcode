# (Decision) [Title]

/* Architecture Decision Record (ADR). Captures why we chose this approach. */
/* Decision answers: "Why did we make this choice?" */
/* Decisions are immutable once accepted — supersede, don't edit. */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/decision"
status: [proposed|accepted|deprecated|superseded]
date: [YYYY-MM-DD]
deciders:
  - [Role or name]
  - (continue)
supersedes: "[[(Decision) Previous Decision]]"
artifact-refs:
  - "[[(System) Affected System]]"
  - "[[(Feature) Affected Feature]]"
  - (continue)
template: "[[tmp-orbc-decision-v0.1]]"
---

# (Decision) [Title]

## Status

**[Proposed|Accepted|Deprecated|Superseded]** — [Date]

/* If superseded: Superseded by [[(Decision) New Decision]] */

## Context

[What situation prompted this decision? What forces are at play?]

**Factors:**
- [Factor influencing the decision]
- (continue)

## Decision

**[One sentence summary of what was decided]**

[Detailed explanation of the decision and how it works]

## Consequences

**Positive:**
- [Benefit from this decision]
- (continue)

**Negative:**
- [Drawback or cost]
- (continue)

**Neutral:**
- [Side effect that's neither good nor bad]
- (continue)

## Alternatives Considered

### [Alternative 1]

[Brief description]

- ✅ [Pro]
- ❌ [Con]

**Rejected:** [Why not chosen]

### [Alternative 2]

(continue pattern)

## Related

- [[(System) Affected System]] — [how affected]
- [[(Decision) Related Decision]] — [relationship]
- (continue)
```

## Notes

- Optional artifact type — use for significant decisions
- Once accepted, decisions are immutable
- To change direction, create a new Decision with `supersedes` pointing to this one. No `superseded-by` needed — use backlinks.
- Focus on "why" not "what" — Map artifacts cover "what"
- Link to affected Systems/Features/Data
