> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

This workflow belongs to the OrbCode shard. Ensure you have @init-orbc.md in context before continuing.

# Workflow: Flesh Scaffold

Take a scaffold OrbCode artifact (filename ends with ` (Scaffold).md`) and fill it in with real content, then rename the file and migrate every wikilink that referenced the old name.

# Input

- **Scaffold artifact path**: The `Mesh/OrbCode/...` path to the scaffold file, typically passed in by the plate via the `{{ artifactPath }}` prompt variable.
- **Artifact type**: `System | Feature | UI | Test Suite | Test | Data | Dependency | Consumer | Environment | E2E`.
- **Parent artifact path** (optional): Path to the scaffold's parent, useful for context.
- **User notes** (optional): Any extra instructions the user passed in the launch dialog.

# Actions

## Stage 1: Read Context

1. Read the scaffold file (`artifactPath`) — note its frontmatter (id, tags, status, parent).
2. If a parent path is provided, read it. Read the parent's parent if available, up to a root system.
3. Read the project's `Context/Overview.md`, `Context/Context.md`, and `Context/Architecture.md`.
4. For code-heavy types (System, Feature, UI, Data), skim the implementation code that this artifact is likely to describe. Use the parent's `code-refs` as a starting point.

## Stage 2: Fill In Content

1. Identify the correct template for the type:
   - `dev-tmp-orbc-system-v0.2` for System
   - `dev-tmp-orbc-feature-v0.2` for Feature
   - `dev-tmp-orbc-ui-v0.2` for UI
   - `dev-tmp-orbc-test_suite-v0.2` for Test Suite
   - `dev-tmp-orbc-test-v0.2` for Test (in `templates/verification/`)
   - `dev-tmp-orbc-data-v0.2` for Data
   - etc.
2. Write the full artifact body per the template — Architecture/Boundaries/Key Concepts/Components/Interfaces for systems; How It Works/Behavior/Rules/Edge Cases for features; etc.
3. Preserve frontmatter fields set during scaffold creation:
   - **Keep** `id`, `parent`, `tags`
   - **Update** `status` from `draft` to the appropriate starting status if the content is complete (e.g. `active` for systems with accurate implementation, `untested` for features implemented but not yet verified)
   - **Add** `code-refs`, `artifact-refs`, `authors`, `orbh-sessions` as appropriate

## Stage 3: Rename the File (Drop the Scaffold Suffix)

The scaffold filename pattern:
```
(OrbCode Project) <Project> . (<Type>) <Name> (Scaffold).md
```

The target filename:
```
(OrbCode Project) <Project> . (<Type>) <Name>.md
```

Rename using `mv` via Bash. Keep the path identical — do not move folders.

```bash
OLD_PATH="Mesh/OrbCode/(OrbCode Project) X/Map/(OrbCode Project) X . (Feature) Name (Scaffold).md"
NEW_PATH="Mesh/OrbCode/(OrbCode Project) X/Map/(OrbCode Project) X . (Feature) Name.md"
mv "$OLD_PATH" "$NEW_PATH"
```

## Stage 4: Migrate Wikilinks

Every file under `Mesh/` that contained `[[<old-name>]]` must be rewritten to `[[<new-name>]]`. The old and new names are the filenames without `.md`.

Scope: **only** `Mesh/**/*.md`. Do not touch `Shards/`, `.git/`, `Exports/`, `Archive/`, or any folder outside `Mesh/`.

Procedure:
1. Compute `OLD_NAME` and `NEW_NAME` (filenames without `.md`).
2. Find all markdown files under `Mesh/` that contain the old wikilink:
   ```bash
   grep -rln "\[\[$OLD_NAME\]\]" Mesh/
   ```
3. For each match, use your Edit tool to replace the wikilink. Process files one at a time so each edit is auditable.
4. Also update any `parent: "[[<old-name>]]"` frontmatter entries on child artifacts (these are wikilinks too — they get matched by the grep in step 2).

Do NOT use a blind `sed -i` — the Edit tool gives you a change log and protects against false positives (e.g. if the old name happens to be a prefix of a longer name).

## Stage 5: Report

Report back with:
- New filename (confirmed renamed)
- Number of wikilinks updated
- Any files skipped (and why)
- Any follow-up the user should know about (e.g. broken links that pointed to the scaffold but can't be cleanly migrated)

# Output

- Filled-in artifact at the new name
- All `[[<old>]]` wikilinks migrated to `[[<new>]]` under `Mesh/`
- `(Scaffold)` suffix removed from the filename

# Notes

- The artifact's UUID (`id` frontmatter) **does not change** across the rename. Wikilinks are name-based, not UUID-based, so they need migration.
- If the scaffold had children (other scaffolds with `parent:` pointing at it), those children's `parent:` wikilinks also need migration — they'll be caught by the Stage 4 grep.
- If the user's `additionalContext` says "skip rename" or "keep the scaffold marker", honor that and stop after Stage 2.
