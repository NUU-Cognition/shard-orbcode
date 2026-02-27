This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Update Context

Refresh the Context layer of an OrbCode project. Update Context, Architecture, Environment, and Relationships artifacts to reflect the current state of the project and its position in the workspace.

# Input

- **Project name**: Name of the OrbCode project to update
- (Optional) **Scope**: Limit to specific context types (e.g., "just Relationships" or "Architecture + Environment")
- (Optional) **Trigger**: What changed (new project added, tech stack update, boundary shift, etc.)

# When to Use

- New project added to workspace (Relationships need updating across projects)
- Project boundaries or responsibilities changed
- Tech stack or directory structure changed significantly
- Test boundaries shifted between projects
- Dependencies added or removed
- After a significant refactor that affects how projects relate
- Context feels stale or doesn't match reality

# Actions

## Stage 1: Audit Current Context

Read the existing Context layer to understand what exists and what's stale.

1. **Read project index**: `(OrbCode Project) Name.md`
2. **Read workspace index**: `(OrbCode Workspace) Name.md` (if in a workspace)
3. **List context artifacts**: Scan the project's `Context/` folder
4. **Check freshness**:
   - Do `code-refs` still point to existing files?
   - Does the tech stack match `package.json` / `pyproject.toml` / etc.?
   - Are directory structures current?
   - Do Relationships reflect actual project dependencies?
   - Are test boundaries accurate?

**Output a brief audit:**
```markdown
## Context Audit: [Project Name]

**Existing artifacts:**
- (Context): [exists/missing] — [fresh/stale]
- (Architecture): [exists/missing] — [fresh/stale]
- (Environment): [exists/missing] — [fresh/stale]
- (Relationships): [exists/missing] — [fresh/stale]

**Trigger:** [What changed]

**Stale items:** [List specific things that need updating]
```

---

## Stage 2: Plan Updates

Propose specific changes based on the audit.

**For each stale artifact, determine:**

| Artifact | Action | What Changed |
|----------|--------|-------------|
| (Context) | [update/create/skip] | [Key concepts changed, scope shifted, etc.] |
| (Architecture) | [update/create/skip] | [Tech stack, directory, patterns changed] |
| (Environment) | [update/create/skip] | [Setup steps, config, infra changed] |
| (Relationships) | [update/create/skip] | [Dependencies, boundaries, consumers changed] |

**Cross-project impact:**

If Relationships changed, identify other projects that may need their Relationships updated too:
```markdown
## Cross-Project Impact

| Project | Why It's Affected |
|---------|-------------------|
| [Project Name] | [New dependency on this project / boundary shifted / etc.] |
```

**Ask the user:**
> "Here's what I'd update. Should I proceed? Any other projects to include?"

Wait for approval before proceeding.

---

## Stage 3: Execute Updates

Apply approved changes.

**Order of operations:**

1. **Context first** — domain knowledge anchors everything else
2. **Architecture** — tech stack and structure inform relationships
3. **Environment** — runtime setup may affect test boundaries
4. **Relationships last** — depends on understanding the other context

**For each artifact:**
- If creating: use the appropriate template (`tmp-orbc-context`, `tmp-orbc-architecture`, `tmp-orbc-environment`, `tmp-orbc-relationships`)
- If updating: read current content, apply changes, preserve what's still accurate
- Update `code-refs` to point to current files
- Update `artifact-refs` on Relationships to reflect current dependencies
- Update project index if new context artifacts were created

**Cross-project updates (if approved):**
- Update Relationships on affected sibling projects
- Don't touch other projects' Context/Architecture/Environment unless specifically asked

---

## Stage 4: Verify

Ensure context layer is internally consistent.

1. **Check all `code-refs`**: Every path points to an existing file
2. **Check `artifact-refs`** on Relationships: Every referenced project exists
3. **Check project index**: All context artifacts are listed
4. **Cross-reference with workspace**: Project list is current, relationships are symmetric where expected

**Report to user:**
```markdown
## Context Update Complete

**Updated:**
- [List of artifacts updated with brief summary of changes]

**Created:**
- [List of new artifacts]

**Cross-project updates:**
- [List of sibling projects updated, or "None"]

**Remaining issues:** [Any unresolved items]
```

# Output

- Updated Context layer reflecting current project state
- Relationships artifact describing inter-project connections
- Project index updated with any new context artifacts
- Sibling project Relationships updated (if cross-project changes were approved)

# Notes

- This workflow complements `wkfl-orbc-refactor` — Refactor handles Map/Test evolution, Update Context handles Context layer evolution
- Relationships is the most change-sensitive context artifact — update it whenever the project landscape shifts
- For new projects, the Greenfield workflow (`wkfl-orbc-greenfield`) creates initial context — this workflow is for ongoing maintenance
- When updating Relationships across multiple projects, work from the changed project outward
