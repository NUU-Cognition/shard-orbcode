This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Update Context

Refresh the Context layer of an OrbCode project. Context documents are free-form (untyped) except for Environment artifacts which are typed and appear on the map.

# Input

- **Project name**: Name of the OrbCode project to update
- (Optional) **Scope**: Limit to specific areas (e.g., "just architecture" or "environments")
- (Optional) **Trigger**: What changed (tech stack update, new dependency, boundary shift, etc.)

# When to Use

- Tech stack or directory structure changed significantly
- Project boundaries or responsibilities changed
- New project added to workspace (relationships need updating)
- Dependencies added or removed
- Test boundaries shifted between projects
- After a significant refactor
- Context feels stale or doesn't match reality

# Actions

## Stage 1: Audit Current Context

Read the existing Context layer to understand what exists and what's stale.

1. **Read project index**: `(OrbCode Project) Name.md`
2. **Read workspace index**: `(OrbCode Workspace) Name.md` (if in a workspace)
3. **Scan Context/ folder**: List all documents (both free-form and typed Environments)
4. **Check freshness**:
   - Do architecture notes match current tech stack?
   - Do relationship notes reflect actual project dependencies?
   - Are Environment artifacts current with CI/deployment config?
   - Are directory structures current?

**Output a brief audit:**
```markdown
## Context Audit: [Project Name]

**Existing documents:**
- Architecture notes: [exists/missing] — [fresh/stale]
- Relationship notes: [exists/missing] — [fresh/stale]
- (Environment) Dev: [exists/missing] — [fresh/stale]
- (Environment) CI: [exists/missing] — [fresh/stale]

**Trigger:** [What changed]

**Stale items:** [List specific things that need updating]
```

---

## Stage 2: Plan Updates

Propose specific changes based on the audit.

| Document | Action | What Changed |
|----------|--------|-------------|
| Architecture notes | [update/create/skip] | [Tech stack, directory, patterns changed] |
| Relationship notes | [update/create/skip] | [Dependencies, boundaries, consumers changed] |
| (Environment) Dev | [update/create/skip] | [Setup steps, config changed] |
| (Environment) CI | [update/create/skip] | [CI config, runners changed] |

**Cross-project impact:**

If relationships changed, identify other projects that may need their context updated too.

**Ask the user:**
> "Here's what I'd update. Should I proceed?"

Wait for approval before proceeding.

---

## Stage 3: Execute Updates

Apply approved changes.

1. **Free-form docs** — update in place. No template needed. Write what's useful.
2. **Environment artifacts** — use `tmp-orbc-environment-v0.2` if creating new ones. Update in place if refreshing.
3. **Update project index** if new documents were created.

**Cross-project updates (if approved):**
- Update relationship notes on affected sibling projects
- Don't touch other projects' documents unless specifically asked

---

## Stage 4: Verify

1. **Check Environment `code-refs`**: Every path points to an existing file
2. **Check project index**: All context documents are listed
3. **Cross-reference with workspace**: Project list is current

# Output

- Updated Context layer reflecting current project state
- Environment artifacts current with infrastructure
- Project index updated with any new context documents

# Notes

- Context documents are free-form — write what's useful, don't force structure
- Environment is the only typed Context artifact (appears on the map)
- For new projects, the Map Codebase workflow creates initial context — this workflow is for ongoing maintenance
