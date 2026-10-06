# Migrations

Migration notes for orbcode. Latest version at top, separated by `---`.

## 1.0.1 → 1.0.2 and 1.0.0 → 1.0.1

`migrations/dev-mig-orbc-1.0.0-to-1.0.1.js` and `migrations/dev-mig-orbc-1.0.1-to-1.0.2.js` (script). No change to the Flint: they keep the chain complete. Each version changes only the shard manifest.

---

## 0.7.3 → 1.0.0

`migrations/dev-mig-orbc-0.7.3-to-1.0.0.md` (agent). Each 0.7 project gets the Project template v0.3 (`codebase` as a `[[rf-cb-*]]` marker, `product-root`), the folders `Views/` and `Candidates/`, and one view `(View) Map of <Project>` of the shape `tree`, made from its map. No 0.7 file moves, and no 0.7 file is deleted.
