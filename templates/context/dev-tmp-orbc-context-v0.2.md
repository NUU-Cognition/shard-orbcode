# Context

/* General project knowledge — scope, domain concepts, conventions, and key files. */
/* This is an untyped Context document — no (Type) prefix in the filename. */
/* Lives in the project's Context/ folder. */

# Filename: Context/(OrbCode Project) [Name] . Context.md

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/context"
status: [active|stale]
template: "[[dev-tmp-orbc-context-v0.2]]"
orbh-sessions:
  - "[[agent-session-uuid]]"
authors:
  - "[[@author]]"
---

# Context

[1-2 sentence summary of what this project is and what it does at a high level]

## Scope

**What this covers:**
- [Major area 1]
- [Major area 2]
- (continue)

**What this does NOT cover:**
- [Out-of-scope area 1 — and where to find it instead]
- (continue)

## Key Concepts

/* Domain terms that someone new to this project needs to understand */

| Term | Definition |
|------|------------|
| [Term] | [Definition] |
| (continue) | |

## Conventions

/* Project-specific rules, patterns, or decisions that aren't obvious from the code */

- [Convention 1]
- [Convention 2]
- (continue)

## Important Files

/* Key files that are good starting points for understanding the project */

| File | Purpose |
|------|---------|
| `[path/to/file]` | [What it does and why it matters] |
| (continue) | |

## Related

- [[(OrbCode Project) [Name] . Architecture]] — directory structure and logical architecture
- [[(OrbCode Project) [Name] . Tech Stack]] — technologies and dependencies
- [[(OrbCode Project) [Name] . Relationships]] — inter-project connections
- (continue)
```

## Notes

- This is the "start here" document for a project — general knowledge that orients a reader
- Keep it focused on concepts and conventions, not implementation details
- Status: `active` = current. `stale` = out of date with code.
