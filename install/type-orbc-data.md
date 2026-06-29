---
id: 944ddd57-a81d-4f31-a663-e59b13bb5363
tags:
  - "#f/metadata"
  - "#f/type"
---

# Data

A core data structure, entity, or schema. Data answers "What shape is the core state?" Focus on semantics and invariants, not just field lists. Data's `parent` is its conceptual owner — a System, Module, Feature, or another Data (for sub-schemas) — so it collapses under its owner on the plate.

## Properties

| Property | Value |
|----------|-------|
| Tag | `#orbc/data` |
| Layer | Map (core spine) |
| Naming | `(OrbCode Project) [Name] . (Data) [Name].md` |
| Location | `Mesh/OrbCode/(OrbCode Project) [Name]/Map/` |
| Parent | System \| Module \| Feature \| Data |
| References | Data (hierarchy only) |

## Lifecycle

```
draft → active → deprecated
    active → stale → active
```

All transitions are manual — committed by the human in the plate.

## Templates

- [[tmp-orbc-data-v0.2]] — Data map artifact
