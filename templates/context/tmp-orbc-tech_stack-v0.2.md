# Tech Stack

/* Technology choices, versions, and key dependencies. */
/* This is an untyped Context document — no (Type) prefix in the filename. */
/* Lives in the project's Context/ folder. */
/* Split from Architecture — stack choices here, structure and patterns there. */

# Filename: Context/(OrbCode Project) [Name] . Tech Stack.md

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/tech-stack"
status: [active|stale]
template: "[[tmp-orbc-tech_stack-v0.2]]"
orbh-sessions:
  - "[[agent-session-uuid]]"
authors:
  - "[[@author]]"
---

# Tech Stack

[1 sentence summary — e.g. "TypeScript Turborepo monorepo targeting Node >= 20"]

---

## Core Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Language | [TypeScript|Python|etc.] | [version] | [Why this language] |
| Runtime | [Node.js|Python|Bun|etc.] | [version] | [Runtime context] |
| Build | [tsup|vite|hatch|etc.] | [version] | [Build approach] |
| Test | [vitest|pytest|etc.] | [version] | [Testing framework] |
| (continue) | | | |

---

## Key Dependencies

/* External packages that shape how the project is built or behaves */

| Package | Purpose | Notes |
|---------|---------|-------|
| [package-name] | [What it provides] | [Version constraints, special usage, etc.] |
| (continue) | | |

---

## Build & Test

/* How to build and test this project */

~~~bash
[build-command]       # [what it does]
[test-command]        # [what it does]
[dev-command]         # [what it does]
~~~

/* Optional: build outputs, test configuration, CI notes */

---

## Related

- [[(OrbCode Project) [Name] . Architecture]] — directory structure and logical architecture
- [[(OrbCode Project) [Name] . Context]] — scope, concepts, conventions
- (continue)
```

## Notes

- Keep this factual — versions, packages, commands
- Update when dependencies are added/removed or versions change significantly
- Status: `active` = current. `stale` = out of date with code.
