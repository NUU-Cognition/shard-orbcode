---
id: 39298b3a-d42f-47c6-b6a2-b1d2e58b95d4
tags:
  - "#f/metadata"
  - "#f/type"
---

# Module

A cohesive implementation area that groups related Features behind a stable internal interface — often a package, folder, namespace, or service component. Modules sit between System and Feature and answer "What cohesive area groups these capabilities?" A Module is System-like in responsibility, but **not** a bounded architectural seam. Optional: small projects can go System → Feature directly.

> Heuristic: a folder/package is *evidence* for a Module, not proof — the unit is the responsibility/interface. If it's a bounded context / architectural seam, it's a System.

## Properties

| Property | Value |
|----------|-------|
| Tag | `#orbc/module` |
| Layer | Map (core spine) |
| Naming | `(OrbCode Project) [Name] . (Module) [Name].md` |
| Location | `Mesh/OrbCode/(OrbCode Project) [Name]/Map/` |
| Parent | System |
| References | Module, Feature, Data |

## Lifecycle

```
draft → active → deprecated
    active → stale → active
```

All transitions are manual — committed by the human in the plate.

## Templates

- [[tmp-orbc-module-v0.2]] — Module map artifact
