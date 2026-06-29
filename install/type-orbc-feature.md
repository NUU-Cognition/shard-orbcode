---
id: f06e1568-fa1b-4338-91f3-e0b176fe0959
tags:
  - "#f/metadata"
  - "#f/type"
---

# Feature

A single capability the codebase provides — the workhorse of the Map. Features answer "What single capability exists?" Make them rich and conceptual: a human who doesn't read code should understand the capability. A Feature is one capability, not one file.

## Properties

| Property | Value |
|----------|-------|
| Tag | `#orbc/feature` |
| Layer | Map (core spine) |
| Naming | `(OrbCode Project) [Name] . (Feature) [Name].md` |
| Location | `Mesh/OrbCode/(OrbCode Project) [Name]/Map/` |
| Parent | Module \| System \| Feature |
| References | Feature, Data |

## Lifecycle

```
draft → untested → verified
    any state → stale → untested → verified
```

All transitions are manual — committed by the human in the plate.

## Templates

- [[tmp-orbc-feature-v0.2]] — Feature map artifact
