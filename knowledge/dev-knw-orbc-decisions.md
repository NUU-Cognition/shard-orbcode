---
description: "Architecture Decision Records for the OrbCode information model (spine, Module, contract hardening)"
---

# OrbCode Decisions (ADRs)

Lightweight, append-only records of the architecturally-significant decisions about OrbCode's own information model. Each entry: context, decision, consequences. Newest first.

---

## ADR-003 — Harden the frontmatter/plate contract

**Context.** The v0.7 conceptual thesis outran its mechanical contract: templates allowed multi-parent, used short (non-namespaced) wikilinks, embedded `/* */` comments and `[a|b|c]` option-lists inside YAML, and agent-written statuses looked human-committed. The plate "silently degrades" on malformed input, so ambiguity is expensive.

**Decision.**
- **`parent` is singular** — exactly one owning wikilink, or `""` for a root. Secondary relations go in `artifact-refs`.
- **`Data.parent = System | Module | Feature | Data`** — Data now has a real place in the hierarchy and collapses under its owner (previously Data-only, which broke the stated spine).
- **Fully-qualified wikilinks in frontmatter** — `[[(OrbCode Project) Proj . (Type) Name]]`; short links are a contract error. Body prose may alias.
- **`curation: proposed | accepted`** — separates code-reality (`status`) from human acceptance. Agents write `proposed`; humans accept in the plate.
- **Reference fields split** — `artifact-refs` (Map types only), `spec-refs`, `task-refs`, `context-refs`.
- **`code-refs` grammar** — `path/`, `path/file.ext`, `path/file.ext#symbol`, optional temporary `:Lx-Ly`.
- **Boringly-valid template YAML** — placeholder values, no comments/option-lists inside frontmatter; explanatory comments live above the fenced block.
- **`orbc validate`** — a script that fails loudly where the plate degrades silently.
- **Plate scaling promoted to requirements** (collapse, semantic zoom, sticky layout, saved views, reduced-motion presence) since the size cap was removed.

**Consequences.** The contract is now enforceable by tooling, not just prose. The plate needs to read `curation` and the split ref fields. Existing deployed artifacts (none yet) would need a migration. Folded into 0.7.0 — no version bump.

---

## ADR-002 — Introduce the Module layer

**Context.** The jump from a 1–3 "System" to a flat list of Features gave no mid-level chunk, and large maps had no way to collapse to a legible size.

**Decision.** Add **Module** between System and Feature: *a cohesive implementation area that groups related Features behind a stable internal interface — often a package/folder/namespace/service component.* System-like in responsibility, but not a bounded architectural seam. A folder/package is evidence for a Module, not proof. Optional — small projects skip it. Precedented by C4 (System→Container→Component) and Backstage (System→Component).

**Consequences.** The plate needs a Module node type (icon, colour, Core-band placement, parent-whitelist). Module is the chunking level that makes "as big as it needs to be" navigable.

---

## ADR-001 — The hand-curated four-type spine

**Context.** Earlier OrbCode tried to model a whole city (12 types, four bands) before the roads were paved, and leaned toward auto-generated completeness — which produces hairballs, not understanding.

**Decision.** Reduce to a hand-curated core spine — **System → Module → Feature → Data** — with the invariants: hand-curated, code-is-truth, any-stage, navigable-by-structure, human-guided, drift-detected. Defer UI / Dependency / Consumer / Environment / Test Suite / Test / E2E (remove their templates) until each earns its keep. Codebase is referenced via a `[[rf-cb-*]]` marker, never a raw path. Capability surface: one skill (`add_artifact`) + two workflows (`init_project`, `edit`).

**Consequences.** A clean load-bearing spine; the plate is the payoff and the markdown is the data layer. Deferred types return by restoring a template, a Reference-Model row, and a Spatial-Model band.
