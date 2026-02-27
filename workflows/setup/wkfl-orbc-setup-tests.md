This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Setup Tests

One-time setup of test infrastructure for an OrbCode project. Creates Test Runner, Test Environment, and folder structure. References Knowledge docs for language-specific setup.

# Input

- **Project name**: Name of existing `(OrbCode Project)`
- **Language**: `typescript` or `python`
- (Optional) **Test framework**: Override default (Vitest for TS, pytest for Python)

# When to Use

- First time setting up tests for a project
- Switching test frameworks
- Project has Map artifacts but no Tests/ folder yet

# Actions

## Stage 1: Check Prerequisites

1. **Verify project exists**: Find `(OrbCode Project) [Name]/` folder
2. **Check for existing tests**: If Tests/ exists, confirm user wants to reconfigure
3. **Load knowledge**: Read appropriate knowledge doc
   - TypeScript: `@knw-orbc-vitest.md`
   - Python: `@knw-orbc-pytest.md`

---

## Stage 2: Analyze Project

Understand what needs testing.

1. **List Map artifacts**: Scan Map/ folder
2. **Identify testable items**:
   - Features → unit tests
   - APIs → integration tests
   - Data → validation tests
   - Processes → flow tests
3. **Check codebase**: Verify test framework isn't already configured

**Output:**
```markdown
## Project Analysis

**Map Artifacts:** [count]
- [list of Features, APIs, Data, etc.]

**Codebase Check:**
- Test config exists: [yes/no]
- Test folder exists: [yes/no]
- Dependencies installed: [yes/no]

**Recommended Setup:**
- Framework: [Vitest/pytest]
- Test location: [co-located/separate]
```

---

## Stage 3: Create Test Infrastructure

### 3a. Create Semantic Artifacts

Create in `(OrbCode Project) [Name]/Tests/`:

1. **Test Runner** — Use `@tmp-orbc-test-runner.md`
   - Name: `(Test Runner) Unit Tests.md`
   - Reference the knowledge doc
   - Include commands for this specific project

2. **Test Environment** (if needed) — Use `@tmp-orbc-test-environment.md`
   - Name: `(Test Environment) [Name].md`
   - Only if project needs DB/services/special setup

### 3b. Setup Codebase (with user permission)

**For TypeScript (Vitest):**
```bash
# Install dependencies
npm install -D vitest @vitest/coverage-v8

# Create config (if not exists)
# Create vitest.config.ts
```

**For Python (pytest):**
```bash
# Install dependencies
pip install pytest pytest-cov pytest-asyncio
# or: uv add --dev pytest pytest-cov pytest-asyncio

# Create config in pyproject.toml (if not exists)
```

**Ask user before running install commands.**

### 3c. Create Folder Structure

In codebase:
```
tests/
├── fixtures/       # Test data
├── unit/           # Unit tests
└── integration/    # Integration tests (if needed)
```

---

## Stage 4: Verify Setup

1. **Run test command**: Execute the test runner to verify setup works
2. **Check for errors**: Resolve any configuration issues
3. **Update project index**: Add Tests/ section

**Report to user:**
```markdown
## Setup Complete

**Created:**
- (Test Runner) Unit Tests.md
- (Test Environment) [if created]

**Codebase:**
- Installed: [dependencies]
- Config: [file created/updated]
- Folders: tests/fixtures/, tests/unit/

**Verify:** Run `[test command]` to confirm setup works.

**Next:** Use `wkfl-orbc-change-verification` (action: create-tests) to add tests for Map artifacts.
```

# Output

- `Tests/` folder in OrbCode project with Test Runner
- Test framework configured in codebase
- Ready to create actual tests

# Notes

- This is one-time setup — run once per project
- User must approve codebase changes (dependency installs)
- If tests already exist, this workflow helps formalize them in OrbCode
