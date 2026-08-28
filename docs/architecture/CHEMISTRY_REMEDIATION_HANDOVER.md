# Chemistry Remediation Card Campaign — Handover

**Written 2026-08-27, for a different Claude session/account to pick up.**
This document is self-contained: read it, run the commands it names, and you
should be able to start batch 1 without needing anything from the session
that wrote it.

## What this is

The physics remediation-card campaign (2026-08-27, same day) took physics
from 22 human-reviewed remediation cards to all 238 physics concepts fully
carded, promoted, and live-tested on the real product. Chemistry is at the
same starting point physics was: 13 cards, all `DRAFT`/`AI_AUTHORED`, 0
`ACTIVE`. This document hands over the same approach for chemistry.

**Do this for chemistry only.** Do not touch physics (frozen at 238/238,
238 ACTIVE), do not touch any other subject.

## What a remediation card is, and why it exists

`src/lib/teaching/remediationCards.ts` — read its own header comment first,
it is the authoritative spec. Short version: when a learner says "I don't
understand" in a lesson, the tutor normally generates a fresh explanation
from an LLM every time, and that explanation can be wrong while looking
perfectly fluent and well-structured. A remediation card removes the author
from that loop for the concepts it covers: a small, plain, pre-written
account of the concept — a canonical idea, a concrete everyday anchor, a
plain explanation, a named anti-analogy (the wrong picture a learner is
likely to reach for, and why it fails), and a one-line comprehension check.

Cards are looked up by `findRemediationCard(conceptId)` and served
deterministically (`provider: 'memory'`, zero LLM calls) when a learner asks
for remediation on a concept that has one — but **only if the card is
`ACTIVE` and `authorKind` is `AI_AUTHORED_REVIEWED` or `HUMAN_CURATOR`**.
Every card you author is `DRAFT`/`AI_AUTHORED` and **completely unreachable
by any learner** until promoted. This is enforced in code and pinned by
test — read the file's own "PROMOTION CONTRACT" section before touching
`status` or `authorKind` on anything.

## Current chemistry state (verify this yourself — don't trust the number
without re-running the command)

```
npx tsx -e "
import { REMEDIATION_CARDS, cardCoverage } from './src/lib/teaching/remediationCards'
const chem = REMEDIATION_CARDS.filter(c => c.subject === 'chemistry')
console.log('chemistry cards:', chem.length, '/ 186 KG concepts')
console.log(chem.map(c=>c.conceptId).join('\n'))
console.log(cardCoverage())
"
```

As of this handover: **13 / 186** chemistry cards exist, all `DRAFT`. One of
the 13, `chem.sol.vapour-pressure`, is deliberately frozen and must NOT be
touched or promoted — it sits behind an unresolved curriculum conflict
between two Educational Brain accounts of the surface-occupancy mechanism.
Leave it exactly as it is; don't rewrite it, don't promote it, don't count
it as done.

Chemistry's 26 domains and their sizes (from `docs/chemistry/kg/graph.json`):

```
chem.found 8    chem.atomic 10   chem.period 7   chem.bond 11   chem.state 6
chem.sol 6      chem.thermo 9    chem.equil 11   chem.redox 5   chem.elect 9
chem.kinet 7    chem.solid 6     chem.surface 5  chem.coord 7   chem.sblock 4
chem.pblock 7   chem.dblock 5    chem.org 12     chem.hyd 7     chem.hal 7
chem.alc 6      chem.carb 7      chem.nitro 5    chem.bio 6     chem.poly 5
chem.env 4      chem.anal 4
```

**Every one of the 186 chemistry KG concepts already has an Educational
Brain entry** (`educational-brain/concepts/chemistry/*.md`, 186 files —
verify with `ls educational-brain/concepts/chemistry/ | wc -l`). This is
better starting material than physics had: physics's EB coverage was
partial and had to be checked domain by domain. For chemistry you can
assume every concept has an EB file; some will carry an explicit
`**Anti-analogy**:` note and some will not, same as physics.

## Infrastructure already built for you, and already fixed

Everything below is generic across subjects — none of it is physics-specific,
and chemistry inherits all of it for free. **You should not need to touch
any of these files**, only use them.

- `scripts/remediation/needCards.mjs` — lists uncovered concepts in a domain
  with their EB anti-analogy note, if one exists:
  ```
  node scripts/remediation/needCards.mjs chemistry chem.found
  ```
- `scripts/remediation/liveRemediationProbe.ts` — the adversarial live
  harness (confusion → acknowledgement → confusion again) that found five
  of the six defects during the physics campaign:
  ```
  QA_EMAIL=... QA_PASSWORD=... SUBJECT=chemistry SLUG=chem.found.mole-concept \
    npx tsx scripts/remediation/liveRemediationProbe.ts
  ```
- `scripts/remediation/liveStudentSession.ts` — the natural-learner harness
  (ordinary acknowledgements, genuine follow-ups, real MCQ guesses) that
  found the sixth defect the adversarial probe never triggered:
  ```
  QA_EMAIL=... QA_PASSWORD=... SUBJECT=chemistry SLUG=chem.found.mole-concept \
    TURNS=5 npx tsx scripts/remediation/liveStudentSession.ts
  ```
  Both scripts default `SUBJECT` to physics if you omit it — always pass
  `SUBJECT=chemistry` explicitly.

**Six real defects were found and fixed today, in the shared engine every
card of every subject goes through** (`remediationOutputContract.ts`,
`teachingContent.ts`, `scaffoldHeadings.ts`, and the card-hold logic in
`route.ts`). Chemistry cards benefit from every one of these automatically —
you are not starting from the state physics started in this morning, you are
starting from the state physics ended in tonight:

1. An attached MCQ used to exempt a turn from every output check, not just
   the ones a question can legitimately confuse — a learner received raw
   LaTeX because a question happened to be attached to the same turn.
2. The model printed the "teach in this order" prompt instruction as literal
   section headings (`### 2. Real-life situation`) instead of following the
   order silently.
3. A hedge ("I think you're saying...") let a pure reflection with zero
   teaching content pass the "did this turn teach anything" check.
4. The learner's *second* consecutive "I still don't understand" had the
   weakest enforcement of the whole path — the card wasn't even passed to
   the output floor on that turn.
5. The notation-bound regex covered the Greek letter mu and nothing else
   Greek — `γ`, `θ`, `Ω`, `√` all walked straight through.
6. The scaffold-label stripper's regex required a separator character
   between the closing `**` and the text; `**Label:**` (colon *inside* the
   bold) matched nothing.

Read `git log --oneline e8fc6f2..98ed538` for the full commit sequence and
each commit message for the full diagnosis — they're written to be read
later by exactly a session like this one.

## The method, step by step (repeat per domain, or per batch within a big
domain)

This is the loop that took physics from 122 to 238 cards across 13 batches
in one day, refined through the run — follow it as written, it already has
the mistakes designed out.

1. **Verify the previous batch's gates passed** before starting a new one.
   Never begin authoring while `git status` is dirty or the last commit's
   tsc/vitest/build haven't been confirmed green. If you're resuming this
   campaign after a break, check `git log --oneline -5` and
   `npx vitest run` before doing anything else.

2. **List what's uncovered**:
   ```
   node scripts/remediation/needCards.mjs chemistry <domain>
   ```
   A domain with more than ~10 concepts is worth splitting into two batches
   (physics did this repeatedly — `part 1` / `part 2`) rather than authoring
   fifteen cards in one pass and risking fatigue-driven shortcuts.

3. **Author each card**, grounded in what the tool printed:
   - `canonicalIdea` — the concept in one sentence, for a reviewer.
   - `concreteAnchor` — a real, ordinary, checkable thing (a kitchen scene,
     a everyday object, a phenomenon anyone has seen) — never invented
     jargon dressed as an anchor.
   - `plainExplanation` — the actual teaching. **Never open with a question
     or a bare imperative.** `cutBackToTeaching` strips both, and if the
     card opens that way the whole card can render as `question-only` and
     teach nothing. Notation-free — no formulas, no chemical notation
     beyond ordinary element names in prose (checked by
     `notationBeyondCard`, and it now catches Greek letters and √ too, so
     don't try to sneak an equilibrium constant expression past it).
   - `antiAnalogy` — if the EB entry has a `**Anti-analogy**:` note, **quote
     it**, don't invent a fresh one. If the tool printed no `ANTI:` line for
     a concept, author one from the misconception a real learner would
     actually reach for — never leave it generic ("students sometimes get
     confused").
   - `microCheck` — one short comprehension question, not an assessment
     item. Never an MCQ.
   - Spread `...DRAFTED` at the end — every new card is DRAFT/AI_AUTHORED
     until a human (not you) promotes it. Do not use
     `OWNER_PROMOTED_PHYSICS` or `OWNER_PROMOTED_PHYSICS_TESTING` — those
     are physics-specific and chemistry has no equivalent yet; that
     decision belongs to whoever asks you to promote chemistry, later,
     explicitly, the same way physics promotion was a separate explicit
     instruction from the owner.

4. **Insert the cards** before the array's closing `]` in
   `src/lib/teaching/remediationCards.ts`, and **update the pinned counts**
   in `src/tests/remediationCard.test.ts` (`REMEDIATION_CARDS.length`,
   the `subject === 'chemistry'` count, `cardCoverage().total`,
   `cardCoverage().draft`). Grep the file for the current numbers first —
   don't guess them.

5. **Validate the batch** with a throwaway test before committing anything
   permanent — write it, run it, delete it. Check per card:
   - `getKGNode(conceptId)` resolves (the id is real and spelled right).
   - `checkRemediationOutput({ text, remediationTurn: true, heldCardText:
     text, previousAssistantText: '' }).violation` is `null` — **note it
     returns an object `{violation, reason}`, not `null` directly**; this
     tripped up an earlier physics batch.
   - `turnTaughtSomething(text)` is `true`.
   - `notationBeyondCard(text, '')` is `false`.
   - No duplicate `conceptId` anywhere in the whole corpus.
   - The card's `plainExplanation` doesn't open with a question (`?` at the
     end of the first sentence) or read as a bare imperative.
   Fix and re-check any failures before moving on — every batch in physics
   that shipped without doing this caught a rewrite later; the batches that
   validated first shipped clean the first time.

6. **Gate, then commit, then push**:
   ```
   rm -f src/tests/__v.test.ts   # or whatever you named the throwaway
   npx tsc --noEmit
   NODE_OPTIONS=--max-old-space-size=3072 npx vitest run
   npm run build
   git add -A && git commit -m "..." && git push -u origin main
   ```
   All three gates green, in that order, before every commit. If any gate
   fails, fix it before authoring anything new — don't stack a second batch
   on top of a red one.

7. **Never promote anything.** Chemistry cards stay `DRAFT` through the
   whole authoring campaign. Promotion (making cards `ACTIVE` +
   `AI_AUTHORED_REVIEWED`) is a separate, explicit, later decision — for
   physics it was a distinct instruction from the owner ("complete the
   physics... for end user testing"), given only after all 238 concepts
   were authored. Do not promote chemistry cards on your own initiative,
   partially or fully, no matter how confident the batch looks.

8. **Stop condition**: all 186 concepts carded (185, once
   `chem.sol.vapour-pressure` is excluded from the "needs a new card" count
   since it already exists and is frozen), or a verified blocker you can't
   resolve. Report back with: cards authored this session, running total,
   git commit hashes, and whether every gate passed.

## If you're asked to test/promote chemistry (a later, separate task)

This is NOT part of the authoring campaign above — don't do it unless
explicitly asked, the same way physics promotion was asked for separately
after authoring finished. If and when it is asked for:

1. Re-read `src/lib/teaching/remediationCards.ts`'s promotion contract
   section and the physics precedent: `git show e8fc6f2` is the commit that
   promoted all 216 remaining physics cards as a batch for testing, with an
   explicit `OWNER_PROMOTED_PHYSICS_TESTING` provenance constant that states
   plainly the cards were authorised as a batch, not read card-by-card by a
   human. If chemistry gets the same treatment, follow that shape — a
   distinct constant, an honest provenance string, never silently reusing
   the physics one.
2. Update the two `OWNER_PROMOTED` allow-lists in
   `src/tests/remediationCard.test.ts` (they're a subject predicate now,
   `id.startsWith('phys.')` — you'll need the chemistry equivalent, or to
   widen the predicate, whichever the actual instruction calls for).
3. Test live with both harnesses across several chemistry domains before
   declaring it done — that is exactly how the six physics defects were
   found, and there is no reason to expect chemistry's corpus is defect-free
   just because the shared engine has been hardened. Expect to find at least
   one new thing; physics did, seven domains in.
4. `chem.sol.vapour-pressure` is excluded from any promotion — leave it
   `DRAFT` regardless of what else gets promoted.

## Files you will touch

- `src/lib/teaching/remediationCards.ts` — append cards here.
- `src/tests/remediationCard.test.ts` — update pinned counts here.

## Files you should read but almost certainly not need to touch

- `src/lib/teaching/remediationOutputContract.ts` — the output floor. Already
  hardened today; only touch it if you find a SEVENTH real defect through
  live testing, with the same evidence bar every fix above met (a captured
  production turn, not a hypothetical).
- `src/lib/teaching/teachingContent.ts` — "did this turn teach anything".
  Same bar.
- `src/lib/teaching/scaffoldHeadings.ts` — strips printed stage labels. Same
  bar.
- `src/app/api/learn/chat/route.ts` / `src/app/api/learn/lesson-init/route.ts`
  — where cards are looked up, held, and enforced. Same bar, and be
  especially careful here — this is a large route handler shared by every
  subject; a change for chemistry that isn't scoped correctly can silently
  affect physics.

## Standing constraints (apply to this task the same as every other)

- Real account for any live testing: `suaibamr@gmail.com` /
  password on request from the owner — do not hardcode or log it anywhere
  outside environment variables passed to the harness scripts. Do not create
  new QA accounts.
- Work only on `main`. No force-push, no rebase, no PR unless explicitly
  asked.
- Do not expose credentials, API keys, tokens, or secrets in logs, commits,
  reports, or chat.
- Do not reset or corrupt real learner data.
- If a test cannot be cleanly measured, report UNMEASURED — don't manufacture
  a PASS by changing the learner, harness, provider configuration, budget, or
  threshold to get one.
- Every turn's closing message: one fenced code block, git info included
  (branch, commit hashes, push status, `git status`), even for a non-coding
  turn.
