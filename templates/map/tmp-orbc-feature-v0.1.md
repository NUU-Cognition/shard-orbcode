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
mode: [live|planned|altered]
status: [draft|active|deprecated]
code-refs:
  - path/to/implementation.ts
  - (continue)
artifact-refs:
  - "[[(Data) Related Data]]"
  - "[[(API) Exposed Via]]"
  - (continue)
template: "[[tmp-orbc-feature-v0.1]]"
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
- `mode: live` = reflects current code. `planned` = doesn't exist yet. `altered` = changes incoming (use `[ALTERED]` labels).
- Status uses same vocabulary as other Map types: `draft|active|deprecated`
- Keep it conceptual and visual — mermaid diagrams, state machines, decision trees
- References flow toward what the feature uses (Data, API) — not back to parent System
- No `test-refs` — Tests reference Features, not vice versa. Use backlinks to find tests.
