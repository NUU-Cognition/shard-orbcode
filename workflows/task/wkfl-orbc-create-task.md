This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Create OrbCode Task

Create a Map-aware task from a change request.

# Input

- Description of the change needed
- (Optional) specific Map artifacts to affect

# Actions

## Stage 1: Identify Affected Map Artifacts

1. Read the project's Map/ folder to understand current state
2. Identify which Map artifacts will be affected by this change
3. For each affected artifact, determine:
   - Current mode (should be `live` for existing, or note if creating new)
   - What will change

## Stage 2: Create Task

1. Get the next task number with `flint helper type newnumber "OrbCode Task"`
2. Create the task using [[tmp-orbc-task-v0.1]] with:
   - `map-refs` linking to all affected Map artifacts
   - "Affected Map Artifacts" table filled in
   - Clear requirements and definition of done
   - Status: `draft`
3. Present the task to the human for review

## Stage 3: Human Review

1. Human reviews the task scope and affected artifacts
2. If approved, set status to `todo` (or `in-progress` if starting immediately)
3. If changes needed, update and re-present

# Output

- New `(OrbCode Task)` in the project's Tasks/ folder
- Ready for implementation via `wkfl-orbc-implement-task`
