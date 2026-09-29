---
required-reading:
  - "[[dev-init-orbc]]"
  - "[[dev-tmp-orbc-view-v0.1]]"
---

# OrbCode (Headless)

`flint shard hstart orbc` loads this file in a headless Orbh session. Read [[dev-init-orbc]] first. Its model, its view format, its quality rules, and its commands apply with no change. This file gives only what is different when no person is in the session.

## Who Starts a Headless Workflow

Steel starts a headless workflow as an Orbh session (`POST /orbh/sessions`). The prompt names one workflow and gives its inputs:

| Workflow | Inputs |
|----------|--------|
| [[dev-hwkfl-orbc-view]] | The product, and the question of the person |
| [[dev-hwkfl-orbc-reshape]] | The view (its UUID or its name), and the change that the person asks for, in words |

A person or another agent can start the same workflows with `flint orbh request`.

A headless product task uses the skill [[dev-sk-orbc-check_after_task]] at its end: follow its section "Headless Use".

## The Rules of a Headless Session

1. **Write one candidate.** Write the result as one candidate file in `Candidates/`. Never write a file in `Views/` or in `History/`.
2. **Never apply, and never discard the candidate that you return.** Steel or the person reads the candidate, sees the difference, and applies or discards it. Never touch a candidate of another session. Never run `flint orbcode set`, `remove`, or `review` in a view or reshape workflow: they are the decisions of a person.
3. **Ask no question.** When the question or the request is not clear, select the reading that best helps the person, and write that reading in the `summary`.
4. **Verify your candidate before the result.** The person sees your candidate only through Steel, so verify it with the three commands that write nothing:
   - `flint orbcode check --candidate <candidate-id>`: repair each error until it exits 0. A warning or a note can stay; name it in the `summary` when it matters to the person.
   - `flint orbcode view --candidate <candidate-id>`: read the proof state and the related cases of each node. Make a code-ref narrower when a node has more than 100 related cases.
   - `flint orbcode diff <view_id> --candidate <candidate-id>`: it must say `an apply now writes the view`. For a new view, a conflict means that the name is taken: give the view another H1 title. For a reshape, the added, the removed, the moved, and the changed nodes must be the nodes of your node map.
5. **Show progress.** Set the phase at the start of each stage: `flint orbh session set phase <phase>`. The phases are `reading`, `shaping`, `writing`, `checking`, and `returning`.
6. **Return the result, and nothing else.** The last action of the turn is:

   ```bash
   flint orbh session return --finish '<json>'
   ```

   The payload is one line of JSON of the schema `orbcode-result/1`, with no other text:

   ```json
   {"schema":"orbcode-result/1","view_id":"<uuid>","candidate_id":"<candidate-id>","base_hash":"<sha256 hex or null>","summary":"<one or two sentences for the person>"}
   ```

   - `view_id` is the `view_id` in the frontmatter of the candidate: the UUID of the view. It is not the `id` of the candidate file.
   - `candidate_id` is the file stem of the candidate.
   - `base_hash` is the `base_hash` of the candidate: a text for a reshape, `null` for a new view.
   - `summary` tells the person what the candidate shows, in Simplified Technical English. Write it with no `'` character and no line break, so that the shell quote stays correct.

7. **Return a failure in the same schema.** When you cannot write a valid candidate (the product has no Project and no codebase marker, the view does not exist, or an error of the check stays), return `candidate_id: null`. Set `view_id` to the UUID of the view, or `null` for a new view. Set `base_hash` to `null`. The `summary` starts with `No candidate:` and gives the reason and the one thing that the person can do. When this session wrote a candidate that has an error, remove it first with `flint orbcode discard --candidate <candidate-id>`: this is the one discard that a headless session does.
