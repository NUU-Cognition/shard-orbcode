# (Context) [Name]

/* General project knowledge that agents need to operate effectively. */
/* Context answers: "What is this project and what concepts matter?" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/context"
status: [draft|active|deprecated]
template: tmp-orbc-context
---

# (Context) [Name]

[Description: what this project/workspace is and its purpose]

## Scope

**What this covers:**
- [Domain or area this context applies to]
- (continue)

**What this does NOT cover:**
- [Out of scope topics] (→ see [other context])
- (continue)

## Key Concepts

/* Glossary of domain terms agents need to know */

| Term | Definition |
|------|------------|
| [Term] | [What it means in this project] |
| (continue) | |

## Conventions

/* Project-specific patterns and rules */

- [Naming convention, coding pattern, or rule]
- (continue)

## Important Files

/* Key entry points agents should know about */

| File | Purpose |
|------|---------|
| `path/to/file` | [Why it matters] |
| (continue) | |

## Related

- [[(Context) Related Context]] — [relationship]
- [[(Architecture) Tech Stack]] — technical details
- (continue)
```

## Notes

- Create one Context per logical domain or bounded area
- Focus on what agents need to understand to work effectively
- Key Concepts section is critical — domain language matters
- Keep it concise — link to other artifacts for detail
