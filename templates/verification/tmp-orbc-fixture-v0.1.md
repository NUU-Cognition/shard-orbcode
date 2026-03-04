# (Fixture) [Name]

/* Test data, mock objects, and setup state for verification. */
/* Fixtures answer: "What data do tests need?" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/fixture"
  - "#orbc/verification"
status: [active|deprecated]
code-refs:
  - path/to/fixtures/file.ts
  - (continue)
artifact-refs:
  - "[[(Data) Related Data Structure]]"
  - (continue)
template: "[[tmp-orbc-fixture-v0.1]]"
---

[Description: what test scenarios this fixture supports]

## Fixtures

### [Fixture Name]

**Purpose:** [What test scenario this enables]

**Location:** `path/to/fixture/file.ts`

**Data:**
- `[field]`: [value or description]
- (continue)

### (continue)

## Factory Functions

/* Optional: if fixtures are generated programmatically */

| Function | Returns | Usage |
|----------|---------|-------|
| `create[Entity]()` | [Type] | [When to use] |
| (continue) | | |

## Notes

- Keep fixtures minimal - only what tests need
- Document why each fixture exists, not just what
- Group related fixtures together
```

## Notes

- One fixture file can contain multiple related fixtures
- Reference the (Data) artifacts these fixtures instantiate
- Fixtures are shared across test types (unit, integration)
