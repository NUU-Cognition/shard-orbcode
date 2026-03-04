# (Architecture) [Name]

/* Technical structure of the system — stack, layout, and conceptual design. */
/* Architecture answers: "What is this built with and how is it organized?" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/architecture"
status: [draft|active|deprecated]
template: "[[tmp-orbc-architecture-v0.1]]"
---

# (Architecture) [Name]

[Description: what aspect of architecture this covers]

---

## Tech Stack

/* What technologies power this system */

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Language | [TypeScript/Python/etc] | [version] | [Why this language] |
| Runtime | [Node/Deno/Browser/etc] | [version] | [Target environment] |
| Framework | [React/Express/etc] | [version] | [What it provides] |
| Database | [Postgres/SQLite/etc] | [version] | [Data storage] |
| (continue) | | | |

**Key Dependencies:**

| Package | Purpose | Notes |
|---------|---------|-------|
| [package] | [What it provides] | [Constraints, gotchas] |
| (continue) | | |

---

## Directory Structure

/* How the codebase is organized */

```
[root]/
├── [folder]/           — [purpose]
│   ├── [subfolder]/    — [purpose]
│   └── [file.ts]       — [purpose]
├── [folder]/           — [purpose]
└── (continue)
```

**Key Paths:**

| Path | Purpose |
|------|---------|
| `[path/to/entry]` | [Main entry point] |
| `[path/to/config]` | [Configuration] |
| `[path/to/types]` | [Type definitions] |
| (continue) | |

---

## Logical Architecture

/* Conceptual diagram showing how major components relate */

~~~mermaid
graph TD
    subgraph [Layer Name]
        A[Component A] --> B[Component B]
        B --> C[Component C]
    end

    subgraph [Another Layer]
        D[Component D] --> E[Component E]
    end

    C --> D
~~~

/* Or use flowchart, C4, or other diagram style as appropriate */

**Component Responsibilities:**

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| [Component A] | [What it does] | [Other components] |
| (continue) | | |

---

## Patterns

/* Key architectural patterns in use */

### [Pattern Name]

**What:** [Brief description of the pattern]

**Where:** [Where this appears in the codebase]

**Why:** [Rationale for using this pattern]

(continue with more patterns as needed)

---

## Constraints

/* Technical rules and limitations */

- [Constraint]: [Why it exists]
- (continue)

---

## Related

- [[(Context) Overview]] — domain knowledge
- [[(Environment) Development]] — runtime setup
- [[(Decision) Key Decision]] — why this architecture
- (continue)
```

## Notes

- Three main sections: **Stack** (what), **Directory** (where), **Logical** (how)
- Logical Architecture diagram is the most important — shows conceptual flow
- Use mermaid for diagrams (renders in Obsidian and GitHub)
- Keep tech stack versioned for reproducibility
