# (Test Runner) [Name]

/* Instructions for executing tests. The agent's guide to running verification. */
/* Test Runners answer: "How do I run these tests?" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/test-runner"
  - "#orbc/verification"
status: [active|deprecated]
code-refs:
  - path/to/test/config.ts
  - (continue)
template: "[[tmp-orbc-test-runner-v0.1]]"
---

[Description: what tests this runner executes and when to use it]

## Quick Start

```bash
[single command to run all tests]
```

## Commands

| Command | Purpose |
|---------|---------|
| `[command]` | [Run all tests] |
| `[command --filter X]` | [Run specific tests] |
| `[command --watch]` | [Watch mode] |
| (continue) | |

## Prerequisites

/* What must be true before running */

- [ ] [Environment setup complete]
- [ ] [Dependencies installed]
- (continue)

## Test Locations

| Type | Path | Pattern |
|------|------|---------|
| [Unit] | `src/**/*.test.ts` | [Naming convention] |
| [Integration] | `tests/integration/` | [Naming convention] |
| (continue) | | |

## Flags & Options

| Flag | Effect |
|------|--------|
| `--verbose` | [What it does] |
| `--coverage` | [What it does] |
| (continue) | |

## Output

**Success:** [What success looks like]

**Failure:** [What to look for on failure]

```

## Notes

- Agent uses this to know exactly how to run tests
- Include all common flags and options
- Document expected output format
