This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Map Codebase

Create a semantic map of an existing codebase. Explores the code, proposes artifacts at the right resolution, and creates them with human approval.

# Input

- **Codebase path**: Path to the codebase root (or current directory if already there)
- **Project name**: Name for the OrbCode project
- (Optional) **Focus areas**: Specific systems or features to prioritize

# Actions

## Stage 1: Explore Codebase

Understand the codebase structure, patterns, and architecture.

1. **Scan structure**: List directories, identify key folders (src/, lib/, api/, etc.)
2. **Identify entry points**: Find main files, routers, CLI entry points
3. **Map dependencies**: Check package.json, imports, module boundaries
4. **Read key files**: Focus on:
   - Configuration files (how it's built/run)
   - Type definitions (core data shapes)
   - API routes (external interfaces)
   - Main business logic files
5. **Note patterns**: Framework used, architectural style, naming conventions

**Output a brief summary:**
- Tech stack
- Folder organization
- Major subsystems identified
- Core data entities spotted
- External interfaces found

Once you have a mental model of the codebase, progress to Stage 2.

---

## Stage 2: Propose Artifacts

This is the critical stage. Propose Map artifacts at the right resolution.

**The Resolution Problem:**
- Too granular → hundreds of artifacts, maintenance nightmare, no one reads them
- Too abstract → artifacts don't help agents understand the code
- Right resolution → 5-20 artifacts that answer real questions

**Guidelines:**
- Start with **1-3 Systems** (bounded contexts, major subsystems)
- Add **Features** for key capabilities (not every function, just important ones)
- Add **Processes** only for complex multi-step flows
- Add **Data** for core entities (not every type, just important ones)
- Add **API** for external interfaces

**Propose to the user:**

Present a table of proposed artifacts:

```markdown
## Proposed Map Artifacts

| Type | Name | Why |
|------|------|-----|
| System | [Name] | [What boundary this captures] |
| Feature | [Name] | [What capability this documents] |
| ... | ... | ... |

**Not mapping (too granular):**
- [Things you're intentionally leaving out and why]

**Questions:**
- [Any decisions you need human input on]
```

**Ask the user:**
> "Does this resolution feel right? Should I go more detailed in any area? Less detailed? Any artifacts to add or remove?"

Wait for user feedback. Iterate on the proposal if needed.

Once the user approves the artifact set, progress to Stage 3.

---

## Stage 3: Create Artifacts

Create the approved Map artifacts.

1. **Create project folder**: `Mesh/OrbCode/(OrbCode Project) [Project Name]/`
2. **Create layer folders**: `Context/`, `Map/`, `Docs/`, `Log/`, `Tests/` (start flat — add subfolders within layers later as complexity warrants grouping)
3. **For each approved artifact:**
   - Use the appropriate template (@tmp-orbc-system.md, @tmp-orbc-feature.md, etc.)
   - Fill in based on codebase understanding from Stage 1
   - Include accurate `code-refs` pointing to real files
   - Link related artifacts via `artifact-refs`
4. **Create Context artifacts**:
   - `(Context)` — scope, key concepts, conventions (`@tmp-orbc-context.md`)
   - `(Architecture)` — tech stack, directory structure, logical architecture (`@tmp-orbc-architecture.md`)
   - `(Environment)` — setup, run commands, config (`@tmp-orbc-environment.md`)
   - `(Relationships)` — if in a workspace, how this project relates to others (`@tmp-orbc-relationships.md`)
5. **Create project index**: `(Project) [Name].md` with overview and links to all artifacts

**For each artifact, include:**
- Accurate frontmatter with real code paths
- Meaningful content (not just placeholders)
- Cross-references to related artifacts

# Output

- `Mesh/OrbCode/[Project Name]/` folder structure
- All approved Map artifacts created
- Project index file linking everything
- Artifacts ready for agent use in development

# Notes

- This workflow is for **existing codebases** (brownfield)
- For new projects, design artifacts first, then implement
- Maps will evolve — this is the starting point, not the final state
- When in doubt about resolution, ask the human
- After mapping, run `wkfl-orbc-setup-tests` then `wkfl-orbc-stabilize` to establish the first stable baseline. The UoW protocol begins after stabilization.
