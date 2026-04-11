# (UI) [Name]

/* A user-facing surface — page, view, panel, dialog, CLI command, REST endpoint, GraphQL endpoint. */
/* UIs answer: "What does the user see or invoke?" */
/* Covers both visual (pages, panels) and programmatic (REST, CLI) surfaces. */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/ui"
status: [draft|untested|stale|verified]
code-refs:
  - path/to/component.tsx
  - (continue)
artifact-refs:
  /* UIs reference UIs only (hierarchy) — see Reference Model */
  - "[[(UI) Sub View]]"
  - (continue)
tasks:
  - "[[(Task) NNN Task Name]]"
  - (continue)
template: "[[tmp-orbc-ui-v0.2]]"
---

# (UI) [Name]

[Description: what this surface presents to the user and when they see it]

## Layout

/* Describe the visual structure — sections, panels, key elements. */
/* For programmatic surfaces (REST, CLI), describe the interface shape instead. */

| Region | Content |
|--------|---------|
| [Header/Sidebar/Main/etc.] | [What's shown] |
| (continue) | |

## States

| State | When | What Changes |
|-------|------|-------------|
| [Default] | [Initial load] | [Description] |
| [Loading] | [Data fetching] | [Description] |
| [Empty] | [No data] | [Description] |
| [Error] | [Failure] | [Description] |
| (continue) | | |

## Interactions

| Action | Element | Result |
|--------|---------|--------|
| [Click/Type/Drag/Call/etc.] | [Button/Input/Endpoint/etc.] | [What happens] |
| (continue) | | |

## Data

- **Source:** [API call, store, props, etc.]
- **Shape:** [Key fields the UI consumes]
- **Refresh:** [How/when data updates — polling, SSE, manual]

```

## Notes

- One UI = one user-facing surface (not one React component)
- Covers visual surfaces (pages, panels, dialogs) AND programmatic surfaces (REST endpoints, CLI commands, GraphQL)
- Naming convention: `(UI) Dashboard Page`, `(UI) REST API`, `(UI) CLI Surface`
- Status lifecycle: `draft` -> `untested` -> `verified` (all transitions are manual)
- UIs form a hierarchy — a page UI references panel/section sub-UIs. But UIs never reference Features, Systems, or Data.
- Features and Systems reference UIs via artifact-refs — use backlinks to find them.
