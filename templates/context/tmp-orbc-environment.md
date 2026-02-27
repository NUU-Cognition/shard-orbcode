# (Environment) [Name]

/* Runtime and deployment configuration. Where and how the system runs. */
/* Environment answers: "How do I run/deploy this?" */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/environment"
status: [draft|active|deprecated]
template: tmp-orbc-environment
---

# (Environment) [Name]

[Description: what environment this covers — dev, staging, prod, etc.]

## Prerequisites

/* What needs to be installed/configured before running */

- [Requirement]: [How to install/configure]
- (continue)

## Setup

/* Steps to get the environment running */

1. [First step]
2. [Second step]
3. (continue)

## Configuration

/* Environment variables and config files */

| Variable | Purpose | Default | Required |
|----------|---------|---------|----------|
| `[VAR_NAME]` | [What it controls] | [default] | [yes/no] |
| (continue) | | | |

**Config Files:**
- `[path/to/config]` — [what it configures]
- (continue)

## Commands

/* Common commands for this environment */

| Command | Purpose |
|---------|---------|
| `[command]` | [What it does] |
| (continue) | |

## Infrastructure

/* For non-local environments */

| Component | Provider/Type | Notes |
|-----------|---------------|-------|
| [Database/Cache/Queue/etc] | [AWS RDS/Redis/etc] | [Connection info, constraints] |
| (continue) | | |

## Secrets

/* DO NOT include actual secrets — just document what's needed */

| Secret | Where Stored | Purpose |
|--------|--------------|---------|
| `[SECRET_NAME]` | [vault/env/etc] | [What it's for] |
| (continue) | | |

## Related

- [[(Architecture) Tech Stack]] — what technologies
- [[(Environment) Other Env]] — [relationship to other environments]
- (continue)
```

## Notes

- Create one per distinct environment (dev, staging, prod)
- Never include actual secrets — document what's needed, not values
- Commands section helps agents know what to run
- Infrastructure section for cloud/deployed environments
