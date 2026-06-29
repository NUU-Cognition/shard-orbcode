---
id: 0c1adcbc-6d8f-474c-baf4-1a3d053e4ab3
tags:
  - "#f/metadata"
  - "#f/type"
---

# System

The root of an OrbCode Map — a major architectural boundary or bounded context. Systems answer "What are the major parts and boundaries?" Every codebase has 1–3. A System owns Modules and/or Features.

## Properties

| Property | Value |
|----------|-------|
| Tag | `#orbc/system` |
| Layer | Map (core spine) |
| Naming | `(OrbCode Project) [Name] . (System) [Name].md` |
| Location | `Mesh/OrbCode/(OrbCode Project) [Name]/Map/` |
| Parent | System (or root) |
| References | System, Module, Feature, Data |

## Lifecycle

```
draft → active → deprecated
    active → stale → active
```

All transitions are manual — committed by the human in the plate.

## Templates

- [[tmp-orbc-system-v0.2]] — System map artifact
