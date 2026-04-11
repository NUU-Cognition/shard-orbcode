# (Feature) [Name]

/* A discrete capability the system provides. The workhorse of the Map. */
/* Features answer: "What can it do?" */
/* Make this RICH and CONCEPTUAL — a human should understand the capability without reading code. */
/* Use mermaid diagrams where they clarify: state machines, decision trees, data flow. */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/feature"
status: [draft|untested|stale|verified]
code-refs:
  - path/to/implementation.ts
  - (continue)
artifact-refs:
  /* Features reference Features, Data, UI, Dependency — see Reference Model */
  - "[[(Feature) Sub Feature]]"
  - "[[(Data) Related Data]]"
  - "[[(UI) Rendered In]]"
  - "[[(Dependency) Relies On]]"
  - (continue)
tasks:
  - "[[(Task) NNN Implementation Task]]"
  - (continue)
template: "[[tmp-orbc-feature-v0.2]]"
---

[Description: what capability this provides and why it matters. Write for a human who doesn't read code.]

## How It Works

/* Explain the capability conceptually. Use a mermaid diagram if it helps. */

~~~mermaid
stateDiagram-v2
    [*] --> [Initial State]
    [Initial State] --> [Next State]: [trigger]
    [Next State] --> [Final State]: [trigger]
    [Final State] --> [*]
~~~

/* Or use flowchart, sequence diagram, etc. — whatever best explains the capability. */
/* Delete the mermaid block if the feature is simple enough to explain in prose. */

[Prose explanation of how the feature works — inputs, processing, outputs. Be conceptual, not implementation-level.]

## Behavior

**Inputs:**
- `[field]` ([required|optional]): [type, constraints]
- (continue)

**Outputs:**
- [What's returned or produced]
- (continue)

## Rules & Constraints

/* The non-obvious rules that govern this feature's behavior */

- [Rule or constraint]
- (continue)

## Edge Cases

/* Only document non-obvious cases */

| Condition | Behavior |
|-----------|----------|
| [Invalid input] | [Error or handling] |
| [Empty/null] | [Behavior] |
| (continue) | |

```

## Notes

- One feature = one capability (not one file)
- Status lifecycle: `draft` -> `untested` -> `verified` (all transitions are manual)
- `draft` = planned, no code yet. `untested` = implemented but not verified. `stale` = out of date with code. `verified` = human confirmed.
- Features reference Features (hierarchy), Data, UI, and Dependency — never Systems. See Reference Model.
- No `test-refs` — Tests reference Features, not vice versa. Use backlinks to find tests.
