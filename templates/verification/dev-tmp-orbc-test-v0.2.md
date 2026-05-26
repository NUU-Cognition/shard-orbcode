# [Artifact Type] [Artifact Name] . (Test) [Test Description]

/* A test that verifies a Map artifact's behavior. */
/* Tests answer: "Does the code match the semantic description?" */

/*
NAMING CONVENTION:
- Format: [Artifact Type] [Original Artifact] . (Test Type) [Description].md
- Examples:
  - (Feature) Document Parsing . (Unit) Parse frontmatter.md
  - (System) Mesh Core . (Integration) Full pipeline.md
  - (Data) MeshDocument . (Unit) Validation.md

TEST TYPES:
- (Unit) - Single function/method isolation
- (Integration) - Multiple components together
*/

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/test"
  - "#orbc/test/[unit|integration]"
status: [draft|pass|fail|stale|deprecated]
parent:
  /* Optional — the sole hierarchy signal. Omit (or leave empty) for a Test not grouped into a Suite.
     A Test's parent, if any, MUST be a Test Suite.
     A single wikilink, e.g. "[[(Test Suite) Owning Suite]]". */
code-refs:
  - path/to/test/file.test.ts
  - (continue)
artifact-refs:
  /* Free-form "related to" links — used for graph edges, NOT hierarchy.
     Hierarchy (Test → Test Suite) is set via the `parent:` field above.
     Tests reference the Feature(s) they verify — see Reference Model */
  - "[[(Feature) Artifact Being Tested]]"
  - (continue)
  /* Tests reference their testing environment */
  - "[[(OrbCode Project) [Name] . (Environment) [Testing Environment]]]"
template: "[[dev-tmp-orbc-test-v0.2]]"
---

[Description: what aspect of the artifact this test verifies]

## Verifies

**Artifact:** [[(Feature Being Tested)]]

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
- Each test must reference its testing environment — the `(Environment)` doc describes runtime, tooling, and config needed to execute
- `status` reflects actual test state in code
- Edge cases should map to the artifact's Edge Cases section
- Status: `draft` = planned. `pass` = passing. `fail` = failing. `stale` = out of date. `deprecated` = no longer relevant.
