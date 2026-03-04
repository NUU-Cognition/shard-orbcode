# (Process) [Name]

/* A flow or workflow that orchestrates multiple features. */
/* Processes answer: "How does it flow?" */
/* Only create for complex multi-step operations — simple CRUD doesn't need this. */
/* The mermaid diagram IS the documentation — prose supplements it. */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/process"
mode: [live|planned|altered]
status: [draft|active|deprecated]
code-refs:
  - path/to/flow.ts
  - (continue)
artifact-refs:
  - "[[(Feature) Step Feature]]"
  - "[[(Data) Data Involved]]"
  - "[[(API) API Involved]]"
  - (continue)
template: "[[tmp-orbc-process-v0.1]]"
---

# (Process) [Name]

[Description: what this process accomplishes and when it runs]

## Flow

/* The main diagram — this IS the documentation */

~~~mermaid
flowchart TD
    A[Start: trigger] --> B[Step 1]
    B --> C{Decision?}
    C -->|Yes| D[Path A]
    C -->|No| E[Path B]
    D --> F[End: outcome]
    E --> F
~~~

/* Choose diagram type:
   - flowchart TD: sequences and decisions
   - stateDiagram-v2: state machines
   - sequenceDiagram: interactions between actors/services
*/

## Trigger

- **Event:** [What starts this — user action, API call, schedule, event]
- **Input:** [Data provided at start]

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
- The mermaid diagram is the core — keep it clear and readable
- `mode: live` = current flow. `planned` = proposed flow. `altered` = flow changes incoming.
- References flow toward what the process uses (Features, Data, APIs)
