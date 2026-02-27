# (Test Architecture) [Project Name]

/* Per-project overview of verification capability, gaps, and growth plan. */
/* Test Architecture answers:
   1) "What can we verify today?"
   2) "What are we adding next?"
   3) "How will integration testing work?" */

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
  - "[[(Test Environment) Env Name]]"
  - "[[(Fixture) Fixture Name]]"
  - (continue)
template: tmp-orbc-test-architecture
---

[Description: how verification works in this project, current state, and planned evolution]

## Current Verification Capability

/* What is true today. Be explicit and evidence-based. */

### Coverage Snapshot

| Test Type | Status | Runner | Environment | Primary Artifacts | Notes |
|-----------|--------|--------|-------------|-------------------|-------|
| [Unit] | [active|partial|planned] | [[(Test Runner) Name]] | [[(Test Environment) Name or N/A]] | [[(Feature) ...]] | [Current capability summary] |
| [Integration] | [active|partial|planned] | [[(Test Runner) Name]] | [[(Test Environment) Name]] | [[(System) ...]] | [Current capability summary] |
| [Contract|E2E|Performance] | [active|partial|planned] | [[(Test Runner) Name]] | [[(Test Environment) Name]] | [[(API|Process) ...]] | [Current capability summary] |
| (continue) | | | | | |

### What Works Today

- [Capability currently validated in code]
- [Capability currently validated in code]
- (continue)

### Known Gaps and Limits

- [Coverage gap not yet verified]
- [Infrastructure or tooling limit]
- [Flakiness, runtime, or data limitation]
- (continue)

## Integration Strategy

/* Focus on how multiple components are verified together. */

### Integration Scope

| Scope | Boundary | Why It Matters | Primary Risks |
|-------|----------|----------------|---------------|
| [Adapter <-> Component] | [[(System) A]] + [[(System) B]] | [Critical behavior] | [Mismatch / data contract drift] |
| [Component <-> External Runtime] | [[(System) ...]] + [external dependency] | [Critical behavior] | [Environment / auth / latency risk] |
| [End-to-End Flow] | [[(Process) ...]] | [Critical behavior] | [Cross-layer regression] |
| (continue) | | | |

### Planned Integration Suites

| Suite | Type | Runner | Environment | Fixtures | Exit Criteria |
|-------|------|--------|-------------|----------|---------------|
| [(System) X . (Integration) Happy Path] | Integration | [[(Test Runner) Name]] | [[(Test Environment) Name]] | [[(Fixture) Name]] | [Passes in CI and local] |
| [(Process) Y . (Integration) Failure Modes] | Integration | [[(Test Runner) Name]] | [[(Test Environment) Name]] | [[(Fixture) Name]] | [All key failure paths asserted] |
| (continue) | | | | | |

### Integration Execution Flow

1. [Provision integration environment]
2. [Load/seed fixtures]
3. [Run contract tests first]
4. [Run integration suites]
5. [Collect logs and test evidence]
6. [Triage failures by boundary]

### Integration Failure Triage

| Failure Signal | Suspected Layer | First Check | Escalation |
|----------------|-----------------|-------------|------------|
| [Contract mismatch] | [API/adapter] | [specific command/log] | [who/what to escalate to] |
| [Timeout/flaky env] | [test environment] | [specific command/log] | [fallback action] |
| [Data shape error] | [fixture/schema] | [specific command/log] | [fix owner] |
| (continue) | | | |

## Planned Verification Expansion

/* Concrete plan for "doing more" over time. */

### Next Increment

- [ ] [Verification task planned next]
- [ ] [Verification task planned next]
- (continue)

### Mid-Term

- [ ] [Broader coverage objective]
- [ ] [Infrastructure or tooling objective]
- (continue)

### Backlog Map

| Planned Test Artifact | Depends On | Owner | Target Increment |
|-----------------------|------------|-------|------------------|
| [[(Feature|System|Process) ... . (Integration) ...]] | [[(Test Environment) ...]] | [team/agent] | [[(Increment) X.Y.0 ...]] |
| (continue) | | | |

## Running Everything

| Command | What It Runs | Expected Duration | When to Use |
|---------|---------------|-------------------|-------------|
| `[command]` | [All tests] | [time] | [Before merge] |
| `[command]` | [Unit tests] | [time] | [Fast local iteration] |
| `[command]` | [Integration tests] | [time] | [After unit pass / pre-release] |
| (continue) | | | |

## Evidence and Reporting

- [Where test logs are recorded, e.g., [[(Test Log) ...]]]
- [What counts as release-quality verification evidence]
- [How failed runs generate follow-up tasks]
- (continue)

```

## Notes

- One `(Test Architecture)` artifact per project in `Tests/`
- Keep "Current Capability" and "Planned Expansion" separate
- Integration strategy should be explicit about boundaries and environments
- Update this artifact whenever new test suites or environments are added
