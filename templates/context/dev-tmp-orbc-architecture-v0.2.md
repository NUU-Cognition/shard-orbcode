# Architecture

/* Directory structure, logical architecture, patterns, and constraints. */
/* This is an untyped Context document — no (Type) prefix in the filename. */
/* Lives in the project's Context/ folder. */
/* Tech stack and dependencies are in the separate Tech Stack document. */

# Filename: Context/(OrbCode Project) [Name] . Architecture.md

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/architecture"
status: [active|stale]
template: "[[dev-tmp-orbc-architecture-v0.2]]"
orbh-sessions:
  - "[[agent-session-uuid]]"
authors:
  - "[[@author]]"
---

# Architecture

[1-2 sentence summary of the project's technical architecture]

---

## Directory Structure

/* Show the key directories and files — not every file, just the important ones */

~~~
[project-root]/
├── [dir]/
│   ├── [file]              — [purpose]
│   └── [file]              — [purpose]
├── [dir]/
│   └── [file]              — [purpose]
└── [config-file]
~~~

**Key Paths:**

| Path | Purpose |
|------|---------|
| `[path]` | [Why this file matters] |
| (continue) | |

---

## Logical Architecture

/* Mermaid diagram showing how major components relate */

~~~mermaid
graph TD
    A[Component A] --> B[Component B]
    B --> C[Component C]
~~~

**Component Responsibilities:**

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| [Component] | [What it does] | [What it talks to] |
| (continue) | | |

---

## Patterns

/* Named patterns used in the codebase — What/Where/Why format */

### [Pattern Name]

**What:** [Brief description of the pattern]

**Where:** [File(s) or module(s) where it's used]

**Why:** [Why this pattern was chosen]

/* (continue with more patterns as needed) */

---

## Constraints

/* Technical limitations or architectural boundaries */

- [Constraint 1]
- [Constraint 2]
- (continue)

---

## Related

- [[(OrbCode Project) [Name] . Context]] — scope, concepts, conventions
- [[(OrbCode Project) [Name] . Tech Stack]] — technologies and dependencies
- (continue)
```

## Notes

- Focus on structure and patterns, not technology choices (those go in Tech Stack)
- Mermaid diagrams should show relationships, not exhaustive detail
- Patterns section is optional — omit if the project has no notable patterns
- Status: `active` = current. `stale` = out of date with code.
