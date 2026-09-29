---
description: "The Project file of a product: the codebase marker, the Orbtest product root, and the folders Views and Candidates"
---

# Filename: Mesh/OrbCode/(OrbCode Project) [Product]/(OrbCode Project) [Product].md

/*
  One Project for each product. It is the anchor of the views of the product.
  Also make the two empty folders Views/ and Candidates/ beside the Project file.
  Do not make History/: flint orbcode makes it at the first apply, and only flint orbcode writes there.

  FRONTMATTER CONTRACT. Write boringly valid YAML: replace the VALUES, keep the shapes.
  - codebase: REQUIRED. A wikilink to a codebase reference marker in Mesh/Metadata/References/Codebases/,
    for example "[[rf-cb-flint]]". NEVER a raw path. The frontmatter name of the marker is the codebase name:
    flint resolve codebase <name> gives the path. Each code-refs path of a view is relative to it.
    When no marker exists, ask the person to add the reference: flint reference codebase "<Name>" <path>,
    then flint sync (the sync writes the marker). When the marker exists but its path is not known on this
    machine: flint fulfill codebase "<Name>" <path>.
  - product-root: the Orbtest product root (the folder that holds orbtest/), relative to the codebase.
    "." when it is the codebase root. Omit the field when the product has no orbtest/ folder.
    The Products table of the Orbtest section of Mesh/(System) Flint Init.md gives the product roots.
  - project-type: application (code that runs) | cognitive (Markdown as code: shards, prompt programs).
  - status: active | archived.
  Do not list the views in this file: flint orbcode list --project "<Product>" computes the list.
*/

```markdown
---
id: "GENERATE-UUID4"
tags:
  - "#orbc/project"
status: "active"
project-type: "application"
codebase: "[[rf-cb-SLUG]]"
product-root: "."
template: "[[dev-tmp-orbc-project-v0.3]]"
orbh-sessions:
  - "[[AGENT-SESSION-UUID]]"
authors:
  - "[[@author]]"
---

# (OrbCode Project) [Product]

[What the product does and for whom, in one to three sentences, for a person who does not read code.]

## Views

Run `flint orbcode list --project "[Product]"` for the views of this product and their state.

## Adaptations

/* Optional. Omit the section when the project follows the rules of the shard.
   Say each rule of this project that differs, and why. An agent reads this section before it writes a view. */

- [A rule of this project that differs, and why]
```

## Notes

- One Project for each product. Two views of one product share the Project.
- A 0.7 Project ([[dev-tmp-orbc-project-v0.2]]) has a `Map/` folder. The migration [[dev-mig-orbc-0.7.3-to-1.0.0]] gives it this form.
