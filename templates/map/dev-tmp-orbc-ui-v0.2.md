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
parent:
  /* Always rendered. Leave empty for a root UI (e.g. a top-level page).
     A UI's parents MUST all be other UIs.
     Scalar (single parent) or list (multiple parents) both accepted:
       parent: "[[(UI) Parent Page]]"
       parent:
         - "[[(UI) Parent Page]]"
         - "[[(UI) Shared Panel]]"
     The first-listed parent drives the sidebar tree. */
code-refs:
  - path/to/component.tsx
  - (continue)
artifact-refs:
  /* Free-form "related to" links — used for graph edges, NOT hierarchy.
     Hierarchy is determined exclusively by the `parent:` field above.
     UIs reference UIs only — see Reference Model */
  - "[[(UI) Sub View]]"
  - (continue)
tasks:
  - "[[(Task) NNN Task Name]]"
  - (continue)
template: "[[dev-tmp-orbc-ui-v0.2]]"
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
- UIs form a hierarchy via the `parent:` field — a sub-UI sets `parent: [[(UI) Page]]`. UIs never reference Features, Systems, or Data.
- Features and Systems reference UIs via artifact-refs — use backlinks to find them.
