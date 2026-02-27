# (Release) [Version]

/* Changelog and release notes for a specific version. */
/* Release answers: "What changed in this version?" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/release"
status: [draft|released|deprecated]
version: "[X.Y.Z]"
date: [YYYY-MM-DD]
artifact-refs:
  - "[[(Feature) New Feature]]"
  - (continue)
template: tmp-orbc-release
---

# (Release) [Version]

[One sentence summary of this release]

## Highlights

/* Key changes users should know about */

- [Major change or feature]
- (continue)

## Changes

### Added

- [New feature or capability]
- (continue)

### Changed

- [Modified behavior]
- (continue)

### Fixed

- [Bug fix]
- (continue)

### Deprecated

- [Feature being phased out]
- (continue)

### Removed

- [Feature removed]
- (continue)

### Security

- [Security-related changes]
- (continue)

## Breaking Changes

/* Changes that require user action */

### [Breaking Change Title]

**What changed:** [Description]

**Migration:** [Steps to update]

(continue)

## Contributors

- [Name/handle] — [contribution area]
- (continue)

## Related

- [[(Release) Previous Version]] — previous release
- (continue)
```

## Notes

- Follow [Keep a Changelog](https://keepachangelog.com/) format
- One Release per version
- References flow toward Features changed — not back to Release Prep (Prep already refs Release)
- Breaking Changes section is critical for major versions
