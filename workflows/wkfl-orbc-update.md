This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Update Artifact

Update an existing Map artifact after code changes. Use when specific features, systems, or data structures have changed and their Map artifacts need to catch up.

# Input

- **Artifact(s) to update**: Which Map artifact(s) need updating
- (Optional) **What changed**: Description of the code changes to reflect

# Actions

## Stage 1: Read Current State

1. Read the Map artifact(s) to update
2. Read the code at the `code-refs` locations
3. Compare: does the artifact accurately describe the current code?
4. Identify what's drifted

## Stage 2: Update Artifact

For each artifact that needs updating:

1. Update descriptions and conceptual explanations to match current code
2. Update mermaid diagrams if structure changed
3. Update inputs/outputs if the interface changed
4. Update `code-refs` if files moved or were renamed
5. Update `artifact-refs` if connections to other artifacts changed
6. Keep `mode: live`
7. If a Map artifact's subject no longer exists in code, flag it for removal

## Stage 3: Check Connections

1. Did changes to this artifact affect connected artifacts?
   - If a Feature's data structures changed, does the linked Data artifact need updating?
   - If a System's boundaries shifted, do its child Features need updating?
   - If the API changed, does the API artifact reflect it?
2. Update connected artifacts if the changes cascade
3. Update the Overview if the system picture changed

# Output

- Map artifact(s) updated to reflect current code
- Connected artifacts updated if changes cascaded
- Report of what was changed

# Notes

- This is for **specific, known changes**. For a full health check across all artifacts, use `wkfl-orbc-sync`.
- Keep artifacts conceptual — update the human-readable understanding, not just the code-refs.
