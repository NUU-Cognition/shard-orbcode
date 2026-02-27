This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Greenfield Project

Bootstrap a new project from scratch through iterative design. Gathers context, designs the semantic layer, and sets up test infrastructure.

# Input

- **Project name**: Name for the new project
- **Codebase path**: Path to the codebase (may be empty/new)
- **Language**: `typescript` or `python`
- **Description**: Brief description of what the project does

# When to Use

- Starting a brand new project
- Existing codebase with no OrbCode setup
- Want to design before implementing (specification-driven)

# Actions

## Stage 1: Gather Context

Interview the user to understand the project deeply.

**Questions to ask:**

1. **Purpose**: What problem does this solve? Who is it for?
2. **Scope**: What's in scope vs out of scope?
3. **Tech stack**: Languages, frameworks, key dependencies?
4. **Architecture style**: Monolith, microservices, library, CLI?
5. **Key concepts**: What domain terms/concepts should I know?
6. **Existing constraints**: Any decisions already made?

**If codebase exists**, also explore:
- Scan directory structure
- Read package.json/pyproject.toml
- Identify existing patterns

**Output:**
```markdown
## Context Summary

**Purpose:** [What it does and why]
**Scope:** [In/out of scope]
**Tech Stack:** [Languages, frameworks]
**Architecture:** [Style and key decisions]
**Key Concepts:** [Domain glossary]
```

---

## Stage 2: Create Project Structure

Create the OrbCode project folder and Context artifacts.

### 2a. Create Project Folder

```
Mesh/OrbCode/(OrbCode Project) [Name]/
├── (OrbCode Project) [Name].md    # Index
├── Context/
├── Map/
├── Docs/
├── Log/
└── Tests/
```

Start with flat layer folders. Add subfolders later as the project grows and artifacts need grouping.

### 2b. Create Context Artifacts

Use templates to create:

1. **Context** — `@tmp-orbc-context.md`
   - Purpose and scope from Stage 1
   - Key concepts glossary
   - What's in/out of scope

2. **Architecture** — `@tmp-orbc-architecture.md`
   - Tech stack (from Stage 1)
   - Directory structure (planned or existing)
   - Logical architecture diagram

3. **Environment** — `@tmp-orbc-environment.md`
   - Development setup
   - How to run locally
   - Dependencies to install

4. **Relationships** (if in a workspace with other projects) — `@tmp-orbc-relationships.md`
   - Dependencies on other projects
   - What this project provides to consumers
   - Test boundaries — what this project tests vs delegates
   - Contracts and integration points

**Ask user to review Context artifacts before proceeding.**

---

## Stage 3: Design Initial Map

Design the semantic layer iteratively with the user.

### 3a. Propose System Boundaries

Start with the highest level:

```markdown
## Proposed Systems

| System | Purpose | Boundary |
|--------|---------|----------|
| [Name] | [What it does] | [What's inside vs outside] |
```

**Ask:** "Does this system decomposition make sense?"

### 3b. Propose Features

For each system, identify key capabilities:

```markdown
## Proposed Features

| System | Feature | Capability |
|--------|---------|------------|
| [System] | [Feature] | [What it enables] |
```

**Guidelines:**
- 3-7 features per system typically
- Features are capabilities, not files
- Ask: "What can this system DO?"

### 3c. Propose Data & API

Identify core data structures and external interfaces:

```markdown
## Proposed Data

| Name | Purpose | Key Fields |
|------|---------|------------|
| [Entity] | [What it represents] | [Important fields] |

## Proposed APIs (if any)

| Name | Type | Purpose |
|------|------|---------|
| [API] | REST/GraphQL/etc | [What it exposes] |
```

### 3d. Create Map Artifacts

Once user approves, create artifacts using templates:

- `@tmp-orbc-system.md` for each System
- `@tmp-orbc-feature.md` for each Feature
- `@tmp-orbc-data.md` for each Data entity
- `@tmp-orbc-api.md` for each API

**For greenfield, set `status: planned` on all artifacts.**

---

## Stage 4: Setup Tests

Run the setup-tests workflow to establish test infrastructure.

**Execute:** `@wkfl-orbc-setup-tests.md`

- Creates Test Runner
- Creates Test Environment
- Creates Fixture placeholder
- Sets up codebase (with user permission)

---

## Stage 5: Create Project Index

Update the project index file with links to all artifacts.

```markdown
# (OrbCode Project) [Name]

[Description from Stage 1]

## Context

- [[(Relationships) [Name]]] (if in workspace)
- [[(Context) [Name]]]
- [[(Architecture) [Name]]]
- [[(Environment) [Name]]]

## Map

### Systems
- [[(System) X]]

### Features
- [[(Feature) A]]
- [[(Feature) B]]

### Data
- [[(Data) Y]]

## Tests

- [[(Test Runner) Unit Tests]]
- [[(Fixture) Core Fixtures]]

## Status

All artifacts are `planned`. Ready for implementation planning.
```

---

## Stage 6: Summary & Next Steps

**Report to user:**

```markdown
## Greenfield Complete

**Created:**
- Context: [count] artifacts
- Map: [count] artifacts (all status: planned)
- Tests: Infrastructure ready

**Project Structure:**
[Tree view of created folders/files]

**Next Steps:**
1. Review all artifacts for accuracy
2. Implement planned features following TDD approach
3. Run `wkfl-orbc-stabilize` to establish the first stable baseline
4. Use `wkfl-orbc-plan-implementation` to plan further work (UoW protocol begins)
```

# Output

- Complete `(OrbCode Project)` folder with all artifacts
- Context layer documenting project knowledge
- Map layer with planned artifacts
- Test infrastructure ready
- Project index linking everything

# Notes

- This is iterative — each stage involves user feedback
- Don't rush to code — invest in good design
- `status: planned` means semantic design exists, code doesn't
- Map will evolve — this is the starting point
