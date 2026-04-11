This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Map Codebase

Create a semantic map of an existing post-MVP codebase. Explores the code, proposes artifacts at the right resolution, and creates them with human approval.

# Input

- **Codebase path**: Path to the codebase root (or current directory if already there)
- **Project name**: Name for the OrbCode project
- (Optional) **Focus areas**: Specific systems or features to prioritise

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
- Folder organisation
- Major subsystems identified
- Core data entities spotted
- External interfaces found

Once you have a mental model of the codebase, progress to Stage 2.

---

## Stage 2: Propose Artifacts

This is the critical stage. Propose Map artifacts at the right resolution.

**The Resolution Problem:**
- Too granular → hundreds of artifacts, maintenance nightmare, no one reads them
- Too abstract → artifacts don't help anyone understand the code
- Right resolution → 5-20 artifacts that answer real questions

**Guidelines:**
- Start with **1-3 Systems** (bounded contexts, major subsystems)
- Add **Features** for key capabilities (not every function, just important ones)
- Add **Data** for core entities (not every type, just important ones)
- Add **UI** for user-facing surfaces (pages, views, CLI commands, REST endpoints)
- Add **Dependency** for external libraries or services consumed
- Add **Consumer** for external clients or integrations that depend on this project

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

Create the approved artifacts using dot notation naming.

1. **Create project folder**: `Mesh/OrbCode/(OrbCode Project) [Project Name]/`
2. **Create layer folders**: `Context/`, `Map/`, `Verification/`, `Notes/` (start flat — add subfolders within Map/ later as complexity warrants)
3. **Create Context documents** (namespaced with dot notation, no type parentheses):
   - `(OrbCode Project) [Name] . Context.md` — scope, concepts, conventions (uses `tmp-orbc-context-v0.2`)
   - `(OrbCode Project) [Name] . Architecture.md` — structure, patterns, constraints (uses `tmp-orbc-architecture-v0.2`)
   - `(OrbCode Project) [Name] . Tech Stack.md` — language, build, dependencies (uses `tmp-orbc-tech_stack-v0.2`)
   - `(OrbCode Project) [Name] . Relationships.md` — inter-project connections (uses `tmp-orbc-relationships-v0.2`)
   - `(OrbCode Project) [Name] . (Environment) [Env].md` — typed, uses `tmp-orbc-environment-v0.2`
4. **Create Map artifacts** for each approved item:
   - Use the appropriate template (`tmp-orbc-system`, `tmp-orbc-feature`, etc.)
   - Use dot notation: `(OrbCode Project) [Name] . (Type) [Artifact Name].md`
   - Fill in based on codebase understanding from Stage 1
   - Include accurate `code-refs` pointing to real files
   - Link related artifacts via `artifact-refs`
   - Set status to `active` for structural types, `untested` for features/UIs (mapping existing code)
5. **Create Testing artifacts** (if application project-type):
   - `(OrbCode Project) [Name] . (Test Suite) [Name].md` for test groupings
   - Test and E2E artifacts as appropriate
6. **Create project index**: `(OrbCode Project) [Name].md` using `tmp-orbc-project`, with links to all artifacts
7. **Create Overview**: `(OrbCode Project) [Name] . Overview.md` in `Context/` using `tmp-orbc-overview` — visual entry point with mermaid diagrams

**For each artifact, include:**
- Accurate frontmatter with real code paths
- Meaningful content (not just placeholders)
- Cross-references to related artifacts
- Mermaid diagrams where appropriate

# Output

- `Mesh/OrbCode/(OrbCode Project) [Project Name]/` folder structure with Context/, Map/, Testing/ subfolders
- All approved artifacts created with dot notation naming
- Project index file linking everything
- Artifacts ready for use

# Notes

- This workflow is for **existing codebases** (post-MVP)
- Maps will evolve — this is the starting point, not the final state
- When in doubt about resolution, ask the human
