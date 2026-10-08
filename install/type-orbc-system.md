---
id: 0c1adcbc-6d8f-474c-baf4-1a3d053e4ab3
tags:
  - "#f/metadata"
  - "#f/type"
---

# System

The root of an OrbCode Map — a major architectural boundary or bounded context. Systems answer "What are the major parts and boundaries?" Every codebase has 1–3. A System owns Modules and/or Features.

## Steel type

The type of a part of a program in Steel (Task 1235): its fields, its capabilities, its connections, and its look.

```type
format: steel-type/1
id: system
name: System
plural: Systems
description: "A large part of the product that a person can name, such as the command line or the server."
fields: {}
capabilities: [covers-files, covers-boundary, container]
connections: {next: [], uses: [], depends-on: [], owner: [], informs: [], blocks: []}
look: { hue: water, icon: server, layer: structure }
```

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
