# (Feature) [Name]

/* A discrete capability the system provides. The workhorse of the Map. */
/* Features answer: "What can it do?" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/feature"
status: [planned|partial|implemented]
code-refs:
  - path/to/implementation.ts
  - (continue)
artifact-refs:
  - "[[(Data) Related Data]]"
  - "[[(API) Exposed Via]]"
  - (continue)
template: tmp-orbc-feature
---

[Description: what capability this provides]

## Behavior

**Inputs:**
- `[field]` ([required|optional]): [type, constraints]
- (continue)

**Outputs:**
- [What's returned or produced]
- (continue)

**Steps:**
1. [What happens first]
2. [What happens next]
3. (continue)

## Edge Cases

/* Only document non-obvious cases */

| Condition | Behavior |
|-----------|----------|
| [Invalid input] | [Error or handling] |
| [Empty/null] | [Behavior] |
| (continue) | |
 
```

## Notes

- One feature = one capability (not one file)
- `status: planned` means designed but not built
- Keep edge cases focused on non-obvious behavior
- References flow toward what the feature uses (Data, API) — not back to parent System
- No `test-refs` — Tests reference Features, not vice versa. Use backlinks to find tests.
