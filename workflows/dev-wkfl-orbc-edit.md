---
description: "Edit and create OrbCode artifacts — the general workflow for evolving the map against code and flagging drift"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

Run `flint shard start-dev orbc` if you haven't already.

# Workflow: OrbCode Edit

The general workflow for working on an existing OrbCode project — create new artifacts, update existing ones against code, plan changes as `draft`, and flag drift to keep the map honest. OrbCode is human-guided: **the agent proposes, the human disposes (in the plate).**

# Input

- **Project**: the OrbCode project to work on
- **Intent**: what to do — add artifacts, update after a code change, plan a change as `draft`, or audit for drift

# Actions

## Stage 1: Orient

1. `flint shard orbc tree "(OrbCode Project) [Name]"` to see the current structure.
2. Read the relevant Map artifacts and Context docs.
3. Resolve the codebase (`flint resolve codebase <Name>` from the project's `[[rf-cb-*]]` marker) and read the relevant code — **code is truth.**
4. Decide the **unit of work**: which artifacts to create or update. Keep it small.

## Stage 2: Propose (human checkpoint)

Present a plan before writing:
- **Create**: type, name, parent, why (for each new artifact).
- **Update**: which artifact, what changed, and the suggested status (e.g. flag `stale` where code drifted).
- **Draft-ahead** (planning a change): the `draft` artifacts you'd add to describe intended work.

Ask the user to confirm. Once confirmed, progress to Stage 3.

## Stage 3: Apply

1. **Create** new artifacts via [[dev-sk-orbc-add_artifact]].
2. **Update** existing artifacts: refresh description, diagrams, and `code-refs`. Keep the plate contract intact — exact filename `(Type)`, valid `status` enum, wikilink `artifact-refs` (type-valid, one direction), whitelisted `parent`.
3. **Drift**: if an artifact no longer matches its `code-refs`, suggest `stale`. Do **not** set `verified`/`active` yourself.
4. Keep diffs small and high-confidence — one artifact done well beats ten done fast.

## Stage 4: Review

1. Summarise what changed.
2. List the **status transitions you propose** the human commit in the plate (promotions, `stale` flags).
3. Note any follow-ups (artifacts that still need attention, code that looked drifted).

# Output

- Created/updated artifacts, all consistent with the plate contract
- A list of proposed status transitions for the human to commit in the plate
