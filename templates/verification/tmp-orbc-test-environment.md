# (Test Environment) [Name]

/* Code and configuration that sets up the test environment. */
/* Test Environments answer: "What infrastructure do tests need?" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/test-environment"
  - "#orbc/verification"
status: [active|deprecated]
code-refs:
  - path/to/setup/file.ts
  - (continue)
template: tmp-orbc-test-environment
---

[Description: what test environment this sets up and why]

## Setup

**Prerequisites:**
- [External dependency required]
- (continue)

**Setup Code:** `path/to/setup.ts`

**What it does:**
1. [First setup step - e.g., starts database]
2. [Second setup step - e.g., seeds data]
3. (continue)

## Teardown

**Teardown Code:** `path/to/teardown.ts`

**What it does:**
1. [First cleanup step]
2. (continue)

## Configuration

| Variable | Value | Purpose |
|----------|-------|---------|
| `[ENV_VAR]` | `[value]` | [What it configures] |
| (continue) | | |

## Services

/* External services this environment requires */

| Service | Setup | Notes |
|---------|-------|-------|
| [Database/API/etc] | [How started] | [Port, credentials, etc] |
| (continue) | | |

```

## Notes

- Environments should be idempotent (safe to run multiple times)
- Document all external dependencies explicitly
- Keep setup/teardown symmetric
