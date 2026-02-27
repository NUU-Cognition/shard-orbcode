# (Test Log) [Name]

/* Record of a test run with results and findings. */
/* Test Log answers: "What did we test and what did we find?" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/test-log"
status: [in-progress|passed|failed|blocked]
date: [YYYY-MM-DD]
test-type: [unit|integration|e2e|manual|performance|security]
artifact-refs:
  - "[[(Feature) Tested Feature]]"
  - (continue)
template: tmp-orbc-test-log
---

# (Test Log) [Name]

[One sentence: what was tested and outcome]

## Summary

| Metric | Value |
|--------|-------|
| Date | [YYYY-MM-DD] |
| Duration | [time] |
| Total Tests | [N] |
| Passed | [N] |
| Failed | [N] |
| Skipped | [N] |
| Coverage | [X%] |

**Result:** [PASSED|FAILED|BLOCKED]

## Environment

| Property | Value |
|----------|-------|
| OS | [operating system] |
| Node | [version] |
| Package Version | [version] |
| Commit | [hash] |

## Test Suites

### [Suite Name]

| Test | Status | Duration | Notes |
|------|--------|----------|-------|
| [test name] | [pass/fail/skip] | [time] | [notes] |
| (continue) | | | |

(continue with more suites)

## Failures

### [Failed Test Name]

**Expected:** [what should happen]

**Actual:** [what happened]

**Error:**
```
[error message/stack trace]
```

**Analysis:** [why it failed, if known]

**Action:** [what to do about it]

(continue for each failure)

## Findings

/* Observations beyond pass/fail */

- [Performance observation]
- [Flaky test identified]
- [Coverage gap found]
- (continue)

## Recommendations

- [ ] [Action item from this test run]
- (continue)

## Raw Output

<details>
<summary>Full test output</summary>

```
[paste full output here]
```

</details>

## Related

- [[(Feature) Tested Feature]] — what was tested
- [[(Test Log) Previous Run]] — compare with previous
```

## Notes

- One Test Log per significant test run
- Include raw output for traceability
- Link failures to follow-up tasks
- Use for release evidence and debugging
