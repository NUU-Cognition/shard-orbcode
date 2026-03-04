# (OrbCode Task) NNN [Name]

/* Map-aware task for OrbCode projects. */
/* Knows which Map artifacts are affected so agents update them after implementation. */
/* Lives alongside Projects shard tasks — does not replace them. */
/* NNN is a 3-digit number. Get it with: flint helper type newnumber "OrbCode Task" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/task"
status: [draft|todo|in-progress|review|done|deprecated]
project: "[[(OrbCode Project) Project Name]]"
map-refs:
  - "[[(Feature) Affected Feature]]"
  - "[[(System) Affected System]]"
  - "[[(Data) Affected Data]]"
  - (continue)
priority: [empty|low|medium|high]
due: [ISO 8601]
completed: [ISO 8601]
[agent]-sessions:
template: "[[tmp-orbc-task-v0.1]]"
---

# Context

[What needs to change and why. Written for the implementing agent — give enough context to work autonomously.]

## Affected Map Artifacts

/* List each affected Map artifact and what changes */

| Artifact | Current Mode | Target Mode | What Changes |
|----------|-------------|-------------|--------------|
| [[(Feature) Name]] | [live|planned|altered] | [live|planned|altered] | [Brief description of change] |
| (continue) | | | |

# Task Description

[Detailed description of the implementation work]

# Requirements

- [ ] [Specific requirement]
- (continue)

# Definition of Done

- [ ] Code implemented and tests pass
- [ ] Map artifacts updated (mode → live, code-refs current, content accurate)
- [ ] All affected Map artifacts reviewed for accuracy
- (continue)

# Task Log

- YYYY-MM-DD: [Agent or human reports progress]
- (continue)
```

## Notes

- `map-refs` links to the Map artifacts this task will affect
- The "Affected Map Artifacts" table shows what changes are expected per artifact
- When implementing, update each artifact's mode and content as work completes
- Status lifecycle: `draft → todo → in-progress → review → done`
- `deprecated` is terminal — task is obsolete or superseded
