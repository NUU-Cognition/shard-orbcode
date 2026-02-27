# (Process) [Name]

/* A flow or workflow that orchestrates multiple features. */
/* Processes answer: "How does it flow?" */
/* Only create for complex multi-step operations — simple CRUD doesn't need this */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/process"
status: [draft|active|deprecated]
code-refs:
  - path/to/flow.ts
  - (continue)
artifact-refs:
  - "[[(Feature) Step Feature]]"
  - "[[(Data) Data Involved]]"
  - "[[(API) API Involved]]"
  - (continue)
template: tmp-orbc-process
---

# (Process) [Name]

[Descripiton: what this process accomplishes]

## Trigger

- **Event:** [What starts this — user action, API call, schedule, event]
- **Input:** [Data provided at start]

## Flow

/* Use Mermaid for visual — flowchart TD for sequences, stateDiagram-v2 for state machines */

~~~mermaid
flowchart TD
    A[Start] --> B[Step 1]
    B --> C{Decision?}
    C -->|Yes| D[Path A]
    C -->|No| E[Path B]
    D --> F[End]
    E --> F
~~~

## Steps

| Step | What Happens | Uses |
|------|--------------|------|
| 1 | [Description] | [[(Feature) Name]] |
| 2 | [Description] | [Component] |
| (continue) | | |

## Outcome

- **Success:** [What's produced]
- **Failure:** [How errors are handled]

```

## Notes

- Only create for complex multi-step operations
- Mermaid diagrams are optional but helpful
- References flow toward what the process uses (Features, Data, APIs) — not back to parent System
- State machines use `stateDiagram-v2`
