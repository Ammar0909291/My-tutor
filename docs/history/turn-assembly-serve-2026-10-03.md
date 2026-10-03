# Turn assembly — serve rollout log (2026-10-03)

Running log of the Phase 3 serve rollout (`docs/architecture/TURN_ASSEMBLY_PHASE1_SPEC.md`
§11.13 onward, §12–§15). Numbers come from production runtime logs (`[assembled-turn]`,
`[assembled-attach]`) and read-only SQL against `ywakxiqbevfuxsiwewnw`. QA ran only on
disposable `qa-*@mytutor-qa.invalid` accounts, each deleted at the end of its run.

## Incident 1 — the attach assembler cut rhetorical questions (deploy `0c4cfa8`)

- **When:** first serve window, about 11:37–11:45 UTC. Exposure: learners on deploy `0c4cfa8`
  until `504579c` replaced it.
- **What:** `assembleAttachTurn` dropped every sentence containing `?` from the prose beside a
  card, including questions the prose answers itself. 2 of the 5 changed card turns (of 15)
  were damaged:
  - `chem.found.measurement`: "Pressure in pascals? That's kg/(m·s²). Energy in joules?
    kg·m²/s²." was served as "That's kg/(m·s²). kg·m²/s²."
  - `chem.found.pure-substances`: "A mixture? No fixed ratio — …" was served as "No fixed
    ratio — …"
  - `math.num.newtons-method`: a dropped bold question left its closing `**` ("at 0.**").
- **Why tests missed it:** the unit tests used only questions *to the learner*. Phase-0's
  hand-read of K2 (12/12 true) contained no self-answered rhetorical question, so the shape was
  unknown.
- **Fix (`504579c`):** drop only a question to the learner. That is one left hanging (nothing
  but more questions after it in its paragraph) or a confirm-back. A word-less fragment goes
  with the sentence before it. The four production texts are now unit tests (3 failed before
  the fix).
- **Not rolled back to shadow:** rolling back would also have stopped graded serve, which was
  clean (25/25). The fix was validated (full suite 847/847) and pushed instead. The rollback
  rule's triggers (served K1/K2 above live, 5xx, a completion disagreement) did not fire.
- **Log follow-up (`c0ad757`):** `[assembled-attach]` now logs the dropped sentences and the
  last 400 characters of the result. The first 500 characters hid the change in long replies,
  so window 2's changes could not be hand-read.

## Security note for the owner (not acted on)

The Vercel env var `OPENROUTER_API_KEY` (id `d8l59odeIQCEdNSj`) has a comment field that holds
what looks like a plaintext OpenRouter key (`sk-or-v1-2d42…`). Comments are not encrypted.
Recommended: rotate the key at OpenRouter, then clear the comment. Seen while reading the
`TURN_ASSEMBLY_MODE` entry on 2026-10-03.
