# (API) [Name]

/* An external interface — REST, GraphQL, CLI, SDK. */
/* APIs answer: "What can callers invoke?" */
/* Only for external interfaces, not internal function calls */

```markdown
---
id: [generate-uuid4]
tags:
  - "#orbc/api"
status: [draft|active|deprecated]
version: "[1.0]"
code-refs:
  - path/to/routes.ts
  - path/to/controller.ts
  - (continue)
artifact-refs:
  - "[[(Data) Schema]]"
  - (continue)
template: tmp-orbc-api
---

[One sentence: what this API exposes and who uses it]

## Overview

| Property | Value |
|----------|-------|
| Base | `[/api/v1/resource]` |
| Auth | [Bearer|API Key|None] |
| Format | [JSON] |

## Endpoints

/* Group by resource or operation */

### [Resource/Action]

~~~
[METHOD] [/path/:param]
~~~

**Request:**
~~~json
{
  "[field]": "[type]"
}
~~~

**Response:** `[2xx]`
~~~json
{
  "[field]": "[value]"
}
~~~

**Errors:**
- `[4xx]` — [When this happens]
- (continue)

/* Repeat for each endpoint */

---

## Errors

/* Standard error format — keep consistent */

~~~json
{
  "error": {
    "code": "[CODE]",
    "message": "[Human readable]"
  }
}
~~~

| Code | Status | Meaning |
|------|--------|---------|
| `[CODE]` | [4xx] | [Description] |
| (continue) | | |
```

## Notes

- Version field tracks API version, not doc version
- Error format should be consistent across endpoints
- References flow toward Data (schemas) — not back to parent System or handler Feature
- Group endpoints logically (by resource or action)
