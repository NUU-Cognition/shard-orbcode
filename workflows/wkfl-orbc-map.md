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

Create the approved artifacts using dot notation naming.

1. **Create project folder**: `Mesh/OrbCode/(OrbCode Project) [Project Name]/`
2. **Create layer folders**: `Context/`, `Map/`, `Verification/`, `Notes/` (start flat — add subfolders within Map/ later as complexity warrants)
3. **Create Context artifacts**:
   - `(OrbCode Project) [Name] . (Context).md` — scope, key concepts, conventions
   - `(OrbCode Project) [Name] . (Architecture).md` — tech stack, directory structure
   - `(OrbCode Project) [Name] . (Environment) [Env].md` — setup, run commands
   - `(OrbCode Project) [Name] . (Relationships).md` — if in a workspace
4. **Create Map artifacts** for each approved item:
   - Use the appropriate template (`tmp-orbc-system`, `tmp-orbc-feature`, etc.)
   - Use dot notation: `(OrbCode Project) [Name] . (Type) [Artifact Name].md`
   - Fill in based on codebase understanding from Stage 1
   - Include accurate `code-refs` pointing to real files
   - Link related artifacts via `artifact-refs`
   - Set `mode: live` for all artifacts (mapping existing code)
5. **Create Verification artifacts** (if application project-type):
   - `(OrbCode Project) [Name] . (Test Architecture).md`
   - Fixture and Test artifacts as appropriate
6. **Create project index**: `(OrbCode Project) [Name].md` using `tmp-orbc-project`, with overview and links to all artifacts
7. **Create Overview**: `(OrbCode Project) [Name] . (Overview).md` — visual entry point with mermaid diagrams

**For each artifact, include:**
- Accurate frontmatter with real code paths
- Meaningful content (not just placeholders)
- Cross-references to related artifacts
- Mermaid diagrams where appropriate

# Output

- `Mesh/OrbCode/(OrbCode Project) [Project Name]/` folder structure with Context/, Map/, Verification/ subfolders
- All approved artifacts created with dot notation naming
- Project index file linking everything
- Artifacts ready for use

# Notes

- This workflow is for **existing codebases** (post-MVP)
- Maps will evolve — this is the starting point, not the final state
- When in doubt about resolution, ask the human
