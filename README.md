# OrbCode

OrbCode gives a person **views** of a software product. A view answers one question of a person, such as "show me the flow of the onboarding", in words that a person who does not read code can read. Each node of a view links to the code and to the stories of Orbtest. The command `flint orbcode` shows the proof of each node and tells when a view is no longer true.

**Version:** 1.0.0 | **Shorthand:** `orbc` | **Depends:** `@nuucognition/flint`

## The View Model

| Rule | Meaning |
|------|---------|
| Not exhaustive | A view holds only what answers its question. |
| Not mutually exclusive | The same code and the same story can be in many views. |
| Free shape | `flow`, `streams`, `layers`, `tree`, `table`, or `free` |
| Made in a conversation | A person asks, an agent writes a candidate, the person asks for a change. |
| Low cost | A view is one file. The code and the stories are the truth. |
| Honest | Each node that makes a claim links to code or to stories. |

**Two layers.** The static map (`Map/`, one file for each part: System, Module, Feature, Data) is the main drawing of a product. A process is a view of the shape `flow` or `streams` on top of it: each step names its part with the field `part`, and `flint orbcode parts` lists the parts.

**A writer writes meaning, a command computes facts.** A view stores titles, prose, groups, links, and references. `flint orbcode` (a part of the Flint CLI) computes the proof, the related cases, and the findings.

## Structure

```
Shards/(Source Remote) OrbCode/
├── shard.yaml                  # Manifest (types: View; the static map: System, Module, Feature, Data)
├── dev-init-orbc.md            # The view model, the view format, the commands, the quality rules
├── dev-hinit-orbc.md           # The rules of a headless session and the result orbcode-result/1
├── install/                    # Type files: View, and System, Module, Feature, Data of the static map
├── knowledge/                  # decisions (ADRs), orbcraft
├── migrations/                 # 0.7.3 → 1.0.0: a 0.7 map becomes a view of the shape tree
├── workflows/                  # view, reshape, and their headless twins
├── skills/                     # check_after_task: the views after a product task
└── templates/
    ├── dev-tmp-orbc-view-v0.1.md   # The View, with one complete example
    ├── containers/             # Project v0.3 (legacy: v0.2)
    ├── context/                # Legacy (0.7)
    ├── map/                    # The static map (the form of 0.7): System, Module, Feature, Data
    └── notes/                  # Legacy (0.7)
```

**Output in the Mesh:**

```
Mesh/OrbCode/
└── (OrbCode Project) <Product>/
    ├── (OrbCode Project) <Product>.md   # codebase: [[rf-cb-*]], product-root
    ├── Map/                             # the static map: one file for each part (the main drawing)
    ├── Views/                           # (View) <Name>.md
    ├── Candidates/                      # <candidate-id>.md, waits for the apply
    └── History/                         # the newest 5 replaced forms of each view (flint orbcode only)
```

## Usage

1. Run `flint shard start orbc` (headless: `flint shard hstart orbc`) and read the init file.
2. Make a view with the workflow `view`: give the product and the question.
3. Change a view with the workflow `reshape`: give the view and the change in words.
4. Read a view with its proof: `flint orbcode view <view>`. Check the views: `flint orbcode check`.
5. The OrbCode plate of Steel opens on the static map, shows a process on the map, starts the headless workflows, and applies the candidate when the person agrees.
6. A person keeps or accepts a view with `flint orbcode set`, undoes a change with `flint orbcode history` and `restore`, and removes a draft with `flint orbcode remove`.
7. At the end of a product task, the skill `check_after_task` runs `flint orbcode check --paths <changed files>` and keeps each kept view true.

A 0.7 project stays readable. The migration `mig-orbc-0.7.3-to-1.0.0` gives it one view of the shape `tree`.
