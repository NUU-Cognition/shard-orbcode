# (Release Prep) [Version]

/* Pre-release checklist and preparation work. */
/* Release Prep answers: "What needs to happen before we can release?" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/release-prep"
status: [in-progress|ready|released|abandoned]
version: "[X.Y.Z]"
target-date: [YYYY-MM-DD]
artifact-refs:
  - "[[(Release) Version X.Y.Z]]"
  - "[[(Test Log) Pre-release X.Y.Z]]"
  - (continue)
template: tmp-orbc-release-prep
---

# (Release Prep) [Version]

Preparation checklist for releasing version [X.Y.Z].

## Overview

**Target Date:** [YYYY-MM-DD]

**Release Type:** [major|minor|patch]

**Summary:** [What this release accomplishes]

## Checklist

### Code Ready

- [ ] All planned features merged
- [ ] All blocking bugs fixed
- [ ] No critical issues open
- [ ] Code review complete

### Testing

- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Manual testing complete
- [ ] Performance benchmarks acceptable
- [ ] [[(Test Log) Pre-release X.Y.Z]] documented

### Documentation

- [ ] API docs updated
- [ ] README updated
- [ ] Migration guide written (if breaking changes)
- [ ] Changelog drafted

### Infrastructure

- [ ] Version bumped in package.json
- [ ] Dependencies updated
- [ ] Build succeeds
- [ ] CI/CD pipeline green

### Communication

- [ ] Release notes drafted
- [ ] Stakeholders notified
- [ ] Announcement prepared

## Blockers

/* Issues that must be resolved before release */

| Issue | Status | Owner | Notes |
|-------|--------|-------|-------|
| [Issue description] | [open/resolved] | [who] | [details] |
| (continue) | | | |

## Rollback Plan

/* What to do if release goes wrong */

1. [Step to revert]
2. (continue)

## Sign-off

| Role | Name | Date | Approved |
|------|------|------|----------|
| [Dev Lead] | | | [ ] |
| [QA] | | | [ ] |
| (continue) | | | |

## Related

- [[(Release) Version]] — the release itself
- [[(Test Log) Pre-release]] — test results
- [[(Release Prep) Previous Version]] — previous prep
```

## Notes

- Create when starting release process
- Update checklist as items complete
- Link to Test Log for evidence
- Keep Blockers section current
