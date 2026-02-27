This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Cross-Project Sync

Sync Relationships, Context, test boundaries, and general consistency across all projects in an OrbCode workspace. Ensures the workspace-level view is accurate and that inter-project references are valid.

**No UoW required** — operates on Relationships and Context (both Context layer), which are free to change without affecting stability.

# Input

- **Workspace name**: Name of the OrbCode workspace
- (Optional) **Trigger**: What changed (new project added, project removed, boundary shift, dependency change)
- (Optional) **Scope**: Limit to specific projects or sync types

# When to Use

- New project added to workspace
- Project removed or archived
- Project boundaries or responsibilities changed
- Dependencies between projects changed
- Test boundaries shifted (one project now tests what another used to)
- After significant refactoring that affects how projects relate
- Periodic health check on workspace consistency

# When NOT to Use

- Single-project sync — use **Internal Sync** workflow (within a project)
- Updating a single project's Context — use **Update Context** workflow
- Semantic layer changes — use **Change Semantic** workflow (requires UoW)

# Actions

## Stage 1: Audit Workspace

Build a complete picture of the workspace and its projects.

1. **Read workspace index**: `(OrbCode Workspace) Name.md`
2. **List all projects**: Read each project's index
3. **Read Relationships artifacts**: For each project that has one, read `(Relationships) Name.md`
4. **Build dependency graph**:
   - Project A depends on Project B
   - Project B is consumed by Project A
   - Test boundaries: Project A tests X, Project B tests Y
5. **Read workspace-level Context**: `(Context)`, `(Architecture)`, `(Environment)`

**Output:**
```markdown
## Workspace Audit: [Workspace Name]

**Projects:** [count]
| Project | Type | Has Relationships | Dependencies | Consumers |
|---------|------|-------------------|--------------|-----------|
| [name] | [product/verification/cognitive] | [yes/no] | [list] | [list] |

**Trigger:** [what changed, or "routine audit"]
```

---

## Stage 2: Detect Inconsistencies

Compare the dependency graph against actual artifacts and identify problems.

**Check for:**

1. **Broken references**: Relationships that name projects that don't exist
2. **Missing Relationships**: Projects with dependencies but no Relationships artifact
3. **Asymmetric relationships**: A depends on B, but B's Relationships doesn't mention A as consumer
4. **Test boundary gaps**: Functionality that no project tests
5. **Test boundary overlaps**: Same functionality tested by multiple projects (may be intentional)
6. **Stale Context**: Architecture/Environment that doesn't match current state
7. **Workspace index staleness**: Projects listed that don't exist, or projects that exist but aren't listed

**Output:**
```markdown
## Inconsistencies Detected

| Type | Project(s) | Issue | Severity |
|------|-----------|-------|----------|
| Broken ref | Project A | References deleted "Project X" | Critical |
| Missing | Project B | Has deps but no Relationships | Important |
| Asymmetric | A ↔ B | A depends on B, B doesn't list A as consumer | Important |
| Gap | — | [Feature X] not tested by any project | Notable |
| Stale | Project C | Architecture outdated | Info |
```

**Ask the user:**
> "Here are the inconsistencies. Which should I fix?"

---

## Stage 3: Propose Fixes

For each approved inconsistency, propose a specific fix.

```markdown
## Proposed Fixes

| # | Project | Fix | Details |
|---|---------|-----|---------|
| 1 | Project A | Update Relationships | Remove reference to deleted "Project X" |
| 2 | Project B | Create Relationships | Add dependencies: [list], consumers: [list] |
| 3 | Project B | Update Relationships | Add "Project A" to consumers |
| 4 | Workspace | Update index | Add Project D, remove Project X |
```

Wait for approval before proceeding.

---

## Stage 4: Execute Per-Project

For each affected project, apply the approved fixes.

**For Relationships updates:**
- Read current Relationships artifact (or create from template if missing)
- Update dependencies, consumers, test boundaries, contracts
- Ensure `artifact-refs` point to valid sibling project artifacts

**For Context/Architecture/Environment updates:**
- Delegate to **Update Context** workflow for that project
- Pass the specific scope and trigger

**For workspace-level changes:**
- Update workspace index with current project list
- Update workspace Context if project landscape changed

**Log each change:**
```markdown
## Applied: [Project Name]
- [what was updated and why]
```

---

## Stage 5: Update Workspace Index

Ensure the workspace index accurately reflects all projects.

1. **Project list**: All existing projects are listed, none missing
2. **Project types**: Correct (`product`, `verification`, `cognitive`)
3. **Project descriptions**: Still accurate
4. **Workspace-level context refs**: Point to valid Context artifacts

---

## Stage 6: Verify

Confirm that all fixes were applied correctly and the workspace is consistent.

1. **Re-read all Relationships**: Every cross-project reference resolves
2. **Check symmetry**: If A depends on B, B lists A as consumer (where expected)
3. **Check test boundaries**: No unintentional gaps
4. **Check workspace index**: Matches reality

**Report to user:**
```markdown
## Cross-Project Sync Complete

**Projects synced:** [count]
**Fixes applied:** [count]
- [list of changes per project]

**Workspace health:** [healthy / improving / issues remain]

**Remaining issues:** [any unresolved items, or "None"]
```

# Output

- Updated Relationships artifacts across affected projects
- Workspace index reflecting current project landscape
- Test boundaries verified
- All cross-project references valid

# Notes

- This workflow complements **Update Context** — Update Context handles a single project's Context layer, Cross-Project Sync handles inter-project consistency
- For new projects, the Greenfield workflow creates initial context — this workflow ensures it integrates with the existing workspace
- Asymmetric relationships are the most common issue — always check both sides
- Test boundary gaps are flagged but not fixed here — fixing them requires Change Verification (which needs a UoW)
- In large workspaces, scope the sync to affected projects rather than syncing everything
