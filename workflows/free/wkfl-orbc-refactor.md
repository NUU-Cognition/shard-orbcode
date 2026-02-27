This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Refactor

Reorganize the semantic layer of an existing OrbCode project. Merge, split, move, rename, or delete Map artifacts without changing their meaning. This is structural housekeeping — it changes how artifacts are organized, not what they say.

**No UoW required** — semantic refactoring doesn't break layer agreement because it doesn't change meaning.

# Input

- **Project/workspace name**: Name of project
- **Instructions**: What to reorganize (natural language)
- (Optional) **Scope**: Limit to specific artifacts or areas

# When to Use

- Resolution feels wrong (too granular or too abstract)
- Artifacts overlap and should be merged
- An artifact covers too much and should be split
- Artifacts are in the wrong location/parent
- Artifact names no longer fit
- Deprecated artifacts should be removed

# When NOT to Use

- Adding new capabilities or updating behavior — use **Change Semantic** workflow (requires UoW)
- Updating status fields (planned → implemented) — use **Change Semantic** workflow
- Reorganizing tests — use **Change Verification** workflow (requires UoW)
- Updating Context/Architecture/Environment — use **Update Context** workflow

> **Key distinction:** If a change alters the meaning of an artifact (what it describes, its behavior, its edge cases), that's a semantic change, not a refactor. Use Change Semantic instead.

# Actions

## Stage 1: Understand Current State

Read the existing semantic layer to understand what exists.

1. **Read project index**: `(OrbCode Project) Name.md` or `(OrbCode Workspace) Name.md`
2. **List all artifacts**: Scan Map/, Context/, Tests/, Log/ folders
3. **Check artifact health**:
   - Are `code-refs` still valid? (files exist)
   - Are `artifact-refs` still valid? (linked artifacts exist)
   - Do references flow in the correct direction? (see [[(Overview) Artifact Reference Model]])
4. **Identify staleness**: Note any artifacts that feel outdated

**Output a brief inventory:**
```markdown
## Current State

**Artifacts:** [count] total
- Context: [list]
- Map: [list]
- Tests: [list]

**Health Issues:**
- [Broken refs, stale content, misplaced artifacts]

**User Instructions:** [restate what they asked for]
```

---

## Stage 2: Plan Changes

Propose specific reorganization changes based on user instructions.

**Change Types (reorganization only):**

| Action | When | Example |
|--------|------|---------|
| **Split** | Artifact too large/covers too much | Split `(System) Monolith` into two |
| **Merge** | Artifacts overlap or are too granular | Merge 3 small Features into 1 |
| **Move** | Wrong location/parent | Move Feature from System A to B |
| **Delete** | No longer relevant | Remove deprecated Feature |
| **Rename** | Name no longer fits | Rename to match new reality |

**Propose to the user:**

```markdown
## Proposed Refactoring

| Action | Artifact | Details |
|--------|----------|---------|
| Merge | (Feature) A + B → C | [Why combining] |
| Split | (System) X → X1 + X2 | [Why splitting] |
| Move | (Feature) Y | [From where → to where] |
| Delete | (Data) Old | [Why removing] |
| Rename | (Feature) Z | [Old name → New name] |

**Test Impact:**
- [Tests that need ref updates]
- [Tests to remove (if Map artifact deleted)]

**Questions:**
- [Anything needing clarification]
```

**Ask the user:**
> "Does this refactor plan look right? Any changes to add or remove?"

Wait for approval before proceeding.

---

## Stage 3: Execute Changes

Apply approved changes systematically.

**Order of operations:**

1. **Deletes first** — Remove artifacts being deleted
2. **Renames** — Rename artifacts (update all refs to old name)
3. **Splits** — Create new artifacts from split, update original
4. **Merges** — Create merged artifact, delete sources
5. **Moves** — Update parent refs, move files if needed

**For each change:**
- Update the artifact content
- Update `artifact-refs` that point FROM this artifact (outbound only — don't chase backlinks)
- Update `code-refs` if code moved
- Log what changed (for user awareness)

---

## Stage 4: Verify Alignment

Ensure semantic layer is internally consistent.

1. **Check all refs**: Every `artifact-ref` points to existing artifact
2. **Check code-refs**: Every `code-refs` points to existing file
3. **Check test coverage**: Key Map artifacts have associated tests
4. **Update project index**: Reflect new structure

**Report to user:**
```markdown
## Refactor Complete

**Changes made:**
- Merged: [list]
- Split: [list]
- Moved: [list]
- Deleted: [list]
- Renamed: [list]

**Tests updated:** [count] (ref updates only)

**Remaining issues:** [any unresolved items]
```

# Output

- Reorganized semantic layer (same meaning, better structure)
- Test refs aligned with renamed/moved Map artifacts
- All internal refs valid
- Project index updated

# Notes

- This workflow is for **reorganization**, not meaning changes — use Change Semantic for adding/updating behavior
- No UoW needed — reorganization preserves layer agreement
- Small, frequent refactors beat large, infrequent ones
- When in doubt about whether a change alters meaning, ask the human
- The semantic layer should always reflect current reality
