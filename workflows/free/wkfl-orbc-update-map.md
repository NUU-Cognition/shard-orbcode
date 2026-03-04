This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Update Map

Sync Map artifacts to current code state. Use when code has changed and Map artifacts need to catch up.

# Input

- (Optional) specific Map artifacts to update
- (Optional) specific code changes to reflect

# Actions

## Stage 1: Assess Drift

1. Read all Map artifacts in the project
2. For each artifact, check `code-refs` against actual codebase:
   - Do the referenced files still exist?
   - Has the code changed significantly since the artifact was written?
3. Identify artifacts that are stale or inaccurate

## Stage 2: Update Artifacts

For each stale artifact:

1. Read the current code at the `code-refs` locations
2. Update the artifact content to reflect current reality:
   - Update descriptions and conceptual explanations
   - Update mermaid diagrams if structure changed
   - Update `code-refs` if files moved
   - Ensure `mode` is `live`
   - Update `status` as appropriate
3. If a Map artifact's subject no longer exists in code, mark it `deprecated`

## Stage 3: Check for Missing Coverage

1. Are there significant code areas with no Map artifact?
2. If so, note them but don't create new artifacts unless asked
3. Report gaps to the human

# Output

- Map artifacts synced to current code state
- Report of any gaps or deprecated artifacts
