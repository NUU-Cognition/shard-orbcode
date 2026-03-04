This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Review Implementation

Independent agent review of a completed OrbCode Task. Checks code quality, test coverage, and Map artifact accuracy.

# Input

- An `(OrbCode Task)` in `review` status

# Actions

## Stage 1: Read Context

1. Read the task and all linked Map artifacts
2. Read the relevant code files (from `code-refs`)
3. Read the test files
4. Understand what was intended vs what was built

## Stage 2: Check Code

1. Do the tests pass? Run the test suite.
2. Does the code match what the Map artifacts describe?
3. Are there obvious issues (missing error handling, edge cases, security)?
4. Are there unnecessary changes outside the task scope?

## Stage 3: Check Map Accuracy

1. For each affected Map artifact:
   - Does the description match what the code actually does?
   - Are `code-refs` pointing to the right files?
   - Is `mode` set to `live`?
   - Are mermaid diagrams / conceptual descriptions accurate?
2. Are there Map artifacts that should have been updated but weren't?

## Stage 4: Report

Create a review summary:

**If issues found:**
1. List each issue clearly
2. Categorize: blocking (must fix) vs suggestion (nice to have)
3. Set task status back to `in-progress` if blocking issues exist
4. Log findings in the task log

**If approved:**
1. Confirm code + Map alignment
2. Set task status to `done` (or keep at `review` if human submission is needed)
3. If human review is needed, proceed to create a Submission using [[tmp-orbc-submission-v0.1]]

# Output

- Review summary with findings
- Task either moved back to `in-progress` (issues) or forward to `done`/submission
