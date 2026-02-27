This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Enrichment

Pull deeper context into the semantic layer from external sources. Deepens existing artifacts rather than creating new structure. This is about making what exists richer, not expanding what exists.

**No UoW required** — enrichment deepens the Context and Map layers without changing their structure or meaning. No new artifacts are created, no statuses change.

# Input

- **Project name**: Name of the OrbCode project to enrich
- **Source**: Where to pull from — `codebase` (deeper read of implementation), `sibling-project` (another OrbCode project), `docs` (external documentation), or `all`
- (Optional) **Scope**: Limit to specific artifacts or areas

# When to Use

- Artifacts feel thin — behavior descriptions lack detail
- Edge case tables are incomplete
- `code-refs` are sparse — artifacts don't point to enough of the relevant code
- Context artifacts are missing domain knowledge
- A sibling project has relevant knowledge not yet captured
- External docs have useful details not reflected in artifacts

# When NOT to Use

- Creating new Map artifacts — use **Change Semantic** workflow (requires UoW)
- Restructuring existing artifacts — use **Refactor** workflow
- Updating `status` fields — use **Change Semantic** or **Internal Sync**
- Updating Relationships — use **Update Context** or **Cross-Project Sync**

> **Key distinction:** Enrichment DEEPENS existing artifacts. It does not CREATE new ones or CHANGE their meaning. If a gap reveals that a new Feature or System is needed, flag it — don't create it here.

# Actions

## Stage 1: Identify Gaps

Read existing artifacts and identify where depth is lacking.

1. **Read project index** and Map artifacts in scope
2. **Check each artifact for:**
   - Thin behavior description (one-liner instead of detailed spec)
   - Empty or minimal edge case table
   - Missing or sparse `code-refs`
   - Vague descriptions that wouldn't help an agent implement
3. **Check Context artifacts for:**
   - Missing domain concepts
   - Outdated tech stack information
   - Incomplete conventions section
4. **Prioritize gaps**: Most impactful first (artifacts agents will use soon)

**Output:**
```markdown
## Enrichment Gaps: [Project Name]

**Source:** [codebase / sibling-project / docs / all]

| Artifact | Gap | Priority |
|----------|-----|----------|
| (Feature) X | Thin behavior, no edge cases | High |
| (Context) Y | Missing key concept Z | Medium |
| (System) W | Only 2 code-refs, codebase has 8 relevant files | Low |
```

---

## Stage 2: Pull from Source

Gather information from the specified source.

### Source: `codebase`
1. Follow existing `code-refs` deeper — read the actual implementation files
2. Look for error handling, edge cases, validation logic not captured in artifacts
3. Look for patterns, conventions, and internal documentation (code comments, README)
4. Find additional files related to artifacts that aren't yet in `code-refs`

### Source: `sibling-project`
1. Read the sibling project's Context and Map artifacts
2. Identify shared concepts, patterns, and domain knowledge
3. Note integration points, shared types, and contracts
4. Pull relevant details that would help understand this project

### Source: `docs`
1. Read Docs/ files for relevant external references
2. Fetch external documentation for key technologies
3. Extract API constraints, best practices, configuration details
4. Note version-specific behaviors or deprecations

### Source: `all`
Run all three sources in sequence: codebase → sibling-project → docs.

**Output:**
```markdown
## Gathered Context

### From [source]:
| For Artifact | New Information |
|-------------|-----------------|
| (Feature) X | [specific details found] |
| (Context) Y | [domain knowledge found] |
```

---

## Stage 3: Propose Enrichments

Present what would be added to which artifacts. Enrichment is additive to existing content — it doesn't rewrite or restructure.

```markdown
## Proposed Enrichments

### (Feature) X
**Current behavior section:** [brief summary of what's there]
**Would add:**
- Edge case: [condition] → [behavior]
- Edge case: [condition] → [behavior]
- Code-ref: [additional file path]
- Behavior detail: [specific detail from implementation]

### (Context) Y
**Would add to Key Concepts:**
- [Term]: [definition from source]

### (System) W
**Would add code-refs:**
- [file 1]
- [file 2]
```

**Ask the user:**
> "Here's what I'd enrich. Should I proceed? Anything to skip or add?"

Wait for approval.

---

## Stage 4: Apply

Update artifact bodies with approved enrichments.

**For each enrichment:**
- Add edge cases to the edge case table
- Expand behavior descriptions with new detail
- Add `code-refs` entries
- Add key concepts to Context
- Preserve existing content — enrichment is additive

**Do NOT:**
- Change artifact meaning or purpose
- Create new artifacts
- Change `status` fields
- Restructure or rename anything
- Remove existing content

**Report to user:**
```markdown
## Enrichment Complete

**Artifacts enriched:** [count]
- (Feature) X: +[N] edge cases, +[N] code-refs, expanded behavior
- (Context) Y: +[N] key concepts
- (System) W: +[N] code-refs

**Structural gaps flagged:** [count, or "None"]
- [artifact area]: [gap that needs Change Semantic to address]
```

# Output

- Enriched Map artifacts with deeper behavior descriptions and edge cases
- Updated Context artifacts with additional domain knowledge
- Additional `code-refs` on artifacts that were sparsely linked
- Flagged structural gaps (for future Change Semantic work)

# Notes

- Enrichment is the lowest-risk workflow — it only adds depth, never changes structure
- No UoW needed because enrichment doesn't alter what artifacts say, just how thoroughly they say it
- If enrichment reveals that a new Feature or System is needed, flag it for Change Semantic — don't create it here
- For `sibling-project` source, you don't need OrbCode on the sibling — you can read its codebase directly
- Docs/ files are created/updated as part of enrichment when external references are found
- Run enrichment after major implementation milestones to keep the semantic layer useful
