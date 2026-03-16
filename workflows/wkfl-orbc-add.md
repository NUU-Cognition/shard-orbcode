This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Add Artifact

Create a new Map artifact after adding a feature, system, data structure, or other capability to the codebase.

# Input

- **What was added**: Description of the new capability
- **Project**: Which OrbCode project this belongs to
- (Optional) **Artifact type**: Feature, System, Data, Process, API, etc.

# Actions

## Stage 1: Understand the Addition

1. Read the new code or capability
2. Determine the right artifact type:
   - New capability → `(Feature)`
   - New bounded context or subsystem → `(System)`
   - New data structure or schema → `(Data)`
   - New multi-step flow → `(Process)`
   - New external interface → `(API)`
3. Identify which existing artifacts it connects to (Systems, Data, other Features)

## Stage 2: Create Artifact

1. Use the appropriate template (`tmp-orbc-feature`, `tmp-orbc-system`, etc.)
2. Name with dot notation: `(OrbCode Project) [Name] . (Type) [Artifact Name].md`
3. Place in the project's `Map/` folder (or appropriate subfolder)
4. Fill in:
   - Description, inputs/outputs, high-level logic
   - Mermaid diagrams where helpful
   - `code-refs` pointing to actual files
   - `artifact-refs` linking to related artifacts
   - `mode: live`
5. If the addition has tests, create a Test derivative:
   - `(OrbCode Project) [Name] . (Feature) [X] . (Test) [Type].md`
   - Place in `Verification/`

## Stage 3: Update Connections

1. Does the parent System artifact need updating to mention this new Feature?
2. Does the Overview need updating to show the new piece?
3. Are there Data artifacts that this new capability uses?
4. Update connected artifacts as needed

# Output

- New Map artifact created with dot notation naming
- Connected artifacts updated
- Artifact placed in correct project subfolder

# Notes

- If you're adding multiple related artifacts at once, batch them — create all, then do connections.
- For sub-features, use derivative naming: `... . (Feature) X . (Sub) Part.md`
