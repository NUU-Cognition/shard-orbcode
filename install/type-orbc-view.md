---
id: 969f9a50-837a-4c92-8a45-d0a1c559a079
tags:
  - "#f/metadata"
  - "#f/type"
---

# View

A View is one perspective on a software product, made for one question of a person, such as "show me the flow of the onboarding". It holds only what answers its question, in words that a person who does not read code can read. It is not exhaustive, and it is not mutually exclusive with other views. The same code and the same story can be in many views, in other shapes and with other names. Each node of a view is a heading with prose and a small block. The block links the node to code paths and to the stories of Orbtest. A command computes the proof and the findings of each node from these links, so the view stores meaning only. A View is different from a map artifact of OrbCode 0.7 (System, Module, Feature, Data). A map artifact is one file for one part of one complete hierarchy. A View is one file for one answer, and a person can reshape or discard it at no cost.

## Properties

| Property | Value |
|----------|-------|
| Tag | `#orbc/view` |
| Format | `orbcode-view/1` |
| Naming | `(View) <Name>.md` |
| Location | `Mesh/OrbCode/(OrbCode Project) <Product>/Views/` |
| Candidates | `Mesh/OrbCode/(OrbCode Project) <Product>/Candidates/<candidate-id>.md` |

## Lifecycle

```
candidate → (apply) → draft → (a person keeps it) → kept
```

`curation` is `proposed` after each change by an agent. Only a person sets `accepted`.

## Templates

- [[tmp-orbc-view-v0.1]] — View
