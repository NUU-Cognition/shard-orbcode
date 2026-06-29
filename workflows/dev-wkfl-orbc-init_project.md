---
description: "Initialise an OrbCode project — resolve the codebase, gather context, and seed the anchor artifacts with human approval"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start-dev orbc` if you haven't already.

# Workflow: Init Project

Stand up a new OrbCode project for a codebase: create the project index, gather context, and seed a small set of anchor Map artifacts. OrbCode is human-guided — **seed, don't sweep.**

# Input

- **Codebase**: the codebase to map, as a `[[rf-cb-*]]` reference marker (or a name to fulfil one)
- **Project name**
- (Optional) **Focus areas**

# Actions

## Stage 1: Resolve & Explore

1. **Resolve the codebase.** The project's `codebase` field will be `[[rf-cb-<name>]]`. Resolve it to a path: `flint resolve codebase <Name>`. If no marker exists yet, ask the user to fulfil one: `flint reference codebase fulfill <Name> <path>`.
2. **Explore** the codebase: structure, entry points, dependencies, key files, candidate package/folder groupings (Modules), core data shapes.
3. **Output a brief summary**: tech stack, folder organisation, candidate Systems / Modules / Features / Data.

Once you have a mental model, progress to Stage 2.

## Stage 2: Propose the Seed (human checkpoint)

1. Propose a small **anchor set** on the core spine (System → Module → Feature → Data). Resolution is about **relevance, not a number** — seed and let the human grow it.
2. Present a table:

```markdown
## Proposed Anchor Artifacts

| Type | Name | Parent | Why |
|------|------|--------|-----|
| System | [Name] | — | [boundary] |
| Module | [Name] | [System] | [grouping] |
| Feature | [Name] | [Module] | [capability] |
| Data | [Name] | — | [core entity] |

**Not mapping (intentionally):** [what you're leaving out and why]
```

3. **Ask:** "Does this resolution feel right? More detail anywhere? Less? Anything to add or remove?"

Wait for approval. Iterate. Once approved, progress to Stage 3.

## Stage 3: Create Project & Seed

1. Create `Mesh/OrbCode/(OrbCode Project) [Name]/` with `Context/`, `Map/`, `Notes/` subfolders.
2. Create the **project index** with `dev-tmp-orbc-project-v0.2` — set `codebase: "[[rf-cb-<name>]]"` and `project-type` (`application` or `cognitive`).
3. Create the **Overview** (and any other Context docs that earn a place) using the context templates.
4. Create each approved Map artifact via [[dev-sk-orbc-add_artifact]] — one per artifact, with real `code-refs` and whitelisted `parent`.
5. Wire `artifact-refs` (type-valid, one direction). Leave status as proposed — the human commits in the plate.

Present the seeded project for review.

# Output

- A new OrbCode project: index + Context + seeded anchor artifacts
- Codebase wired as a `[[rf-cb-*]]` reference marker; every artifact carries real `code-refs`
- A seeded map the human can grow and curate in the plate
