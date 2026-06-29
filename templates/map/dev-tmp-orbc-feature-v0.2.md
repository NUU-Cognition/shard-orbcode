# (Feature) [Name]

/* A discrete capability the system provides. The workhorse of the Map. */
/* Features answer: "What single capability exists?" */
/* Make this RICH and CONCEPTUAL — a human should understand the capability without reading code. */
/*
  FRONTMATTER CONTRACT:
  - All wikilinks FULLY QUALIFIED: (OrbCode Project) <Project> . (Type) <Name>
  - parent: exactly ONE wikilink — a Module (most common), a System, or another Feature. Never a list.
  - status (actionable): draft | untested | stale | verified
  - curation: proposed | accepted
  - artifact-refs: Feature, Data only
  - task-refs: implementation Tasks (optional)
  - spec-refs: Specifications shard artifacts (optional)
  - code-refs grammar: "path/", "path/file.ext", "path/file.ext#symbol"
  Generate VALID YAML — replace the placeholder VALUES, keep the shapes.
*/

```markdown
---
id: "GENERATE-UUID4"
tags:
  - "#orbc/feature"
status: "untested"
curation: "proposed"
parent: "[[(OrbCode Project) PROJECT . (Module) Auth]]"
code-refs:
  - "src/auth/login.ts"
  - "src/auth/login.ts#login"
artifact-refs:
  - "[[(OrbCode Project) PROJECT . (Data) Session]]"
task-refs: []
spec-refs: []
template: "[[dev-tmp-orbc-feature-v0.2]]"
orbh-sessions:
  - "[[AGENT-SESSION-UUID]]"
authors:
  - "[[@author]]"
---

# (Feature) [Name]

[Description: what capability this provides and why it matters. Write for a human who doesn't read code.]

## How It Works

~~~mermaid
stateDiagram-v2
    [*] --> Initial
    Initial --> Next: trigger
    Next --> Final: trigger
    Final --> [*]
~~~

[Prose explanation — inputs, processing, outputs. Conceptual, not implementation-level. Delete the diagram if the feature is simple.]

## Behavior

**Inputs:**
- `[field]` ([required|optional]): [type, constraints]

**Outputs:**
- [What's returned or produced]

## Rules & Constraints

- [The non-obvious rules that govern this feature's behavior]

## Edge Cases

| Condition | Behavior |
|-----------|----------|
| [Invalid input] | [Error or handling] |
```

## Notes

- One feature = one capability (not one file).
- `parent` is a single owning Module, System, or Feature. Features reference sub-Features and Data via `artifact-refs` — never Systems or Modules upward.
- Status lifecycle: `draft` -> `untested` -> `verified` (+ `stale`). All transitions are committed by the human in the plate; `curation: proposed` until accepted.
- Link implementation work via `task-refs`. When the Testing layer returns, Tests should reference Features (not the other way around) — use backlinks to find them.
