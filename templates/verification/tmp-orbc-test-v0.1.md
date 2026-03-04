# (Map) [Artifact Name] . (Test) [Test Description]

/* A test that verifies a Map artifact's behavior. */
/* Tests answer: "Does the code match the semantic description?" */

/*
NAMING CONVENTION:
- Format: (Map) [Original Artifact] . (Test Type) [Description].md
- Examples:
  - (Feature) Document Parsing . (Unit) Parse frontmatter.md
  - (System) Mesh Core . (Integration) Full pipeline.md
  - (Data) MeshDocument . (Unit) Validation.md
  - (Process) Task Lifecycle . (Integration) Complete flow.md

TEST TYPES:
- (Unit) - Single function/method isolation
- (Integration) - Multiple components together
*/

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/test"
  - "#orbc/verification"
  - "#orbc/test/[unit|integration]"
status: [passing|failing|skipped|planned]
code-refs:
  - path/to/test/file.test.ts
  - (continue)
artifact-refs:
  - "[[(Feature|System|Data|Process|API) Artifact Being Tested]]"
  - (continue)
fixture-refs:
  - "[[(Fixture) Required Fixtures]]"
  - (continue)
test-runner: "[[(Test Runner) Runner Name]]"
template: "[[tmp-orbc-test-v0.1]]"
---

[Description: what aspect of the artifact this test verifies]

## Verifies

**Artifact:** [[(Map Artifact Being Tested)]]

**Aspect:** [Which behavior/property from the artifact]

## Test Cases

### [Test Case Name]

**Given:** [Initial state/preconditions]

**When:** [Action taken]

**Then:** [Expected outcome]

**Code:** `path/to/test.ts:lineNumber`

### (continue)

## Edge Cases

| Scenario | Expected | Status |
|----------|----------|--------|
| [Edge case from artifact] | [Behavior] | [passing|failing] |
| (continue) | | |

```

## Notes

- Test name references the Map artifact it verifies
- `status` reflects actual test state in code
- Edge cases should map to the artifact's Edge Cases section
- Semantic layer references code layer, not vice versa
