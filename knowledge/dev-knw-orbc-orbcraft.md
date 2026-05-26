# Knowledge: OrbCraft Visualization

OrbCraft is the visual agent presence system for the OrbCode Map Plate. It renders animated orbs on the graph canvas — each orb represents an active agent session orbiting the artifacts it's working on.

## What the User Sees

When an agent session is active and has focus artifacts, the map displays:

- **Orbiting circle** — a coloured, glowing dot that continuously traces a path around the focused artifacts
- **Path outline** — a dashed SVG line showing the orbit route; becomes solid when the session is being followed
- **Floating panel** — a bottom-left overlay listing all active OrbCraft sessions with their titles and follow controls
- **Node highlights** — when following a session, the orbited artifact cards get a highlight ring

### Single vs Multi-Artifact Orbits

- **Single artifact**: The orb traces the rounded rectangle outline of the card — it follows the card's border with padding, not a circle
- **Multiple artifacts**: The orb traces a convex hull that wraps all focused cards — like a rubber band stretched around the group

### Follow Mode

Users can click a session row in the floating panel (or click the orb itself) to toggle follow mode. When following:
- The viewport automatically pans to keep the orb centered
- The orbit path outline becomes fully visible (solid line)
- Each orbited artifact card gets a highlight ring

## Focus Artifact Model

Each session's orbit is built from two sources that merge together:

### 1. Metadata Presets (set at launch)

The OrbCode Map Plate sets the `orbcraft-artifacts` field in session metadata when launching an agent. This is a comma-separated string of artifact UUIDs. The plate determines these from the user's selection or detail panel context.

### 2. Runtime Additions (set mid-session)

Agents update the `orbcraft-focus` interface key during their session:

```bash
flint orbh session <session-id> set orbcraft-focus "<comma-separated artifact UUIDs>"
```

The effective orbit set is: **metadata presets + runtime additions**. Both sources are polled every 3 seconds and merged. New artifacts trigger an orbit path recalculation.

### When to Update Focus

Agents should update `orbcraft-focus` when:
- They create a new artifact — add its UUID so the orb moves to it on the map
- Their work shifts to a different set of artifacts
- They want to signal to the user which artifacts they're currently examining

## Technical Details

- Orbs animate at 120 pixels/second along the computed path
- Path padding is 12px from card edges with 20px corner radius
- Each session gets a unique colour from a rotating palette (water, earth, fire, sun, air, teal, rose)
- Path recalculates on layout changes (collapse/expand, drag)
- Collapsed nodes resolve to their nearest visible ancestor
- Node dimensions are measured from the DOM for accurate centering
