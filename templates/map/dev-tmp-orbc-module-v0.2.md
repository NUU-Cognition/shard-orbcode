# (Module) [Name]

/* A cohesive implementation area that groups related Features behind a stable internal interface. */
/* Modules sit between System and Feature. They answer: "What cohesive area groups these capabilities?" */
/* A folder/package is EVIDENCE for a Module, not proof of one — the unit is the responsibility/interface. */
/*
  FRONTMATTER CONTRACT:
  - All wikilinks FULLY QUALIFIED: (OrbCode Project) <Project> . (Type) <Name>
  - parent: exactly ONE wikilink to a System. Never a list.
  - status (structural): draft | active | stale | deprecated
  - curation: proposed | accepted
  - artifact-refs: Module, Feature, Data only (never a System upward)
  - code-refs grammar: "path/", "path/file.ext", "path/file.ext#symbol"
  Generate VALID YAML — replace the placeholder VALUES, keep the shapes.
*/

```markdown
---
id: "GENERATE-UUID4"
tags:
  - "#orbc/module"
status: "active"
curation: "proposed"
parent: "[[(OrbCode Project) PROJECT . (System) Backend]]"
code-refs:
  - "src/auth/"
artifact-refs:
  - "[[(OrbCode Project) PROJECT . (Feature) Login]]"
  - "[[(OrbCode Project) PROJECT . (Data) Session]]"
spec-refs: []
template: "[[dev-tmp-orbc-module-v0.2]]"
orbh-sessions:
  - "[[AGENT-SESSION-UUID]]"
authors:
  - "[[@author]]"
---

# (Module) [Name]

[Description: what cohesive area this module covers, what interface it exposes, and what it hides. Write for a human.]

## Responsibility

**Owns:**
- [What capabilities live in this module]

**Interface:**
- [The public surface this module exposes to the rest of the system]

**Hides:**
- [Internal detail callers should not depend on]

## Structure

| Feature / Component | Purpose | Location |
|---------------------|---------|----------|
| [Name] | [What it does] | `path/to/code` |
```

## Notes

- A Module is System-like in responsibility, but **not** a bounded architectural seam — that distinction is what separates it from a System.
- Optional layer: small projects can go System → Feature directly. Introduce a Module when a System has enough Features that grouping aids navigation.
- `parent` is the single owning System. Modules reference sub-Modules, Features, and Data via `artifact-refs` — never Systems.
- A folder/package is evidence for a Module, not proof of one; the architectural unit is the responsibility + interface.
