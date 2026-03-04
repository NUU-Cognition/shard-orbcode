# (Test Architecture) [Project Name]

/* Per-project overview of how testing works. */
/* Test Architecture answers:
   1) "What can we verify today?"
   2) "How do I run the tests?"
   3) "What's the testing strategy?" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/test-architecture"
  - "#orbc/verification"
status: [active|deprecated]
code-refs:
  - [path/to/test/config]
  - (continue)
artifact-refs:
  - "[[(Test Runner) Runner Name]]"
  - "[[(Fixture) Fixture Name]]"
  - (continue)
template: "[[tmp-orbc-test-architecture-v0.1]]"
---

[Description: how verification works in this project — what's tested, how tests run, what the strategy is]

## Current Coverage

/* What is true today. Be honest about gaps. */

### What's Tested

| Test Type | Runner | Primary Artifacts | Notes |
|-----------|--------|-------------------|-------|
| [Unit] | [[(Test Runner) Name]] | [[(Feature) ...]] | [Current capability summary] |
| [Integration] | [[(Test Runner) Name]] | [[(System) ...]] | [Current capability summary] |
| (continue) | | | |

### What Works Today

- [Capability currently validated in code]
- (continue)

### Known Gaps

- [Coverage gap not yet verified]
- [Infrastructure or tooling limit]
- (continue)

## Testing Strategy

/* How different parts of the codebase are verified */

### Unit Tests

- **What:** [What unit tests cover — individual functions, modules, etc.]
- **Where:** [Test file location pattern]
- **Fixtures:** [[(Fixture) Name]] (if applicable)

### Integration Tests

/* Optional — only if the project has integration tests */

- **What:** [What integration tests cover — component interactions, API flows]
- **Where:** [Test file location pattern]
- **Scope:** [Which systems/boundaries are tested together]

## Running Tests

| Command | What It Runs | When to Use |
|---------|-------------|-------------|
| `[command]` | [All tests] | [Before merge] |
| `[command]` | [Unit tests] | [Fast local iteration] |
| `[command]` | [Integration tests] | [After unit pass] |
| (continue) | | |

## Future Testing

/* Optional — what testing improvements are planned */

- [ ] [Next testing improvement]
- (continue)

```

## Notes

- One `(Test Architecture)` artifact per project in `Tests/`
- Keep it practical — focus on "how do I run tests" and "what's covered"
- Update this artifact whenever new test suites or fixtures are added
