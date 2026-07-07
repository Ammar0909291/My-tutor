# Sprint U Recovery Audit — Forensic, Read-Only

**Method:** `git status`, `git log`/`reflog`/`fsck` across all refs and worktrees,
file-content greps for every identifier named in the handoff brief, and direct
reads of the two files claimed modified. No code was changed. No commits were
made. Nothing was pushed.

## Headline finding

**Sprint U (and the Sprint R.1/S/T chain it depends on) does not exist in this
repository, committed or uncommitted.** The working tree is byte-identical to
the last commit (`4f35e03`, this session's own Sprint R work) — `git status
--porcelain` is empty, there is no stash, and no other worktree or dangling
commit contains narration-related code. The "previous session's screenshot"
describes work that was never persisted anywhere this audit can reach; from
the repository's point of view it never happened.

---

## Q1 — Was Sprint U actually implemented?

**No.** Zero evidence in committed history, working tree, stash, reflog, or
any reachable/unreachable git object. See Q8 for the exhaustive search.

## Q2 — Which files contain unfinished Sprint U work?

**None.** `LessonScreen.tsx` and `VisualCard.tsx` (the two files the prior
session claimed to modify) are exactly as they were left by their last real
commits:
- `LessonScreen.tsx` — last touched by `4f35e03` (this session's Sprint R:
  added `autoPlay`/`speed` to the `VisualRenderer` call only — see Q3).
- `VisualCard.tsx` — last touched by `5dd797d` ("Sprint BW: visual learning
  aids", 2026-06-13), **a full week before this audit**. It still takes a
  single `type: VisualType` prop and nothing else (full file read, 82 lines).

No file in the repo contains `hasNarration`, `narrationMode`, `narrationStep`,
`narrationSource`, `onStepChange`, `revealStep`, or `synchronizedPlayback` —
confirmed by an unrestricted `grep -rn` across all `.ts`/`.tsx` files.

## Q3 — Is LessonScreen already passing narration information?

**No.** `LessonScreen.tsx` renders the Sprint-BW visual aid as:
```tsx
<VisualCard type={msg.visual as VisualType} />
```
(line ~2307) — a bare `type` prop, no narration/step/sync data of any kind.
Separately, this session's own Sprint R work added `autoPlay`/`speed` to the
*unrelated* `VisualRenderer` call a few lines below (line ~2316) — that is
fixed-duration timeline playback (see Q6), not narration-driven, and has
nothing to do with `VisualCard`.

## Q4 — Is VisualCard already capable of narration mode?

**No.** `VisualCard`'s full prop interface is:
```ts
interface VisualCardProps { type: VisualType }
```
It renders one of 10 static SVG components (`NumberLine`, `FractionBar`,
`PercentageGrid`, `CoordinatePlane`, `GeometryShapes`, `FoodChain`,
`WaterCycle`, `SolarSystem`, `ForceDiagram`, `CircuitDiagram` — confirmed
against `VisualType`'s 10-member union in `visualTypes.ts`) with no animation,
step, or playback prop on any of them. This is also the basis for the
handoff's "Sprint R.1 — all 10 production visuals animate step-by-step"
claim: that claim is **false as committed** — none of these 10 components,
nor `VisualCard` itself, contain any animation code, and no Sprint R.1 report
or commit exists anywhere in this repo (see Q8).

## Q5 — Is production currently using narration mode?

**No.** There is no narration mode to use. The only animated visual path in
production is the *other*, unrelated visual system (`VisualRenderer` /
`GraphRenderer` / `NumberLineRenderer` / `GeometryRenderer` /
`ProcessFlowRenderer`, driven by `VisualSpec`), wired up by this session's own
Sprint R work, and that is autoPlay+speed driven, not narration-driven.

## Q6 — Is playback still timer-driven?

**Yes, by construction, and not by accident.** Sprint R's `useTeachingPlayback`
hook (`src/hooks/useTeachingPlayback.ts`) advances via
`requestAnimationFrame` against a fixed `DEFAULT_STEP_DURATION_MS` per
timeline step, scaled only by the `speed` prop. It has no input from, or
awareness of, narration/TTS audio progress — there is nothing in the repo
("Sprint T") that would make it narration-driven instead. `setInterval`/
`setTimeout` elsewhere in `LessonScreen.tsx` are unrelated (an elapsed-time
display counter, an XP-celebration auto-dismiss, and a TTS "speak after a
short delay" call) — none of them drive visual playback.

## Q7 — What remains to complete Sprint U?

Effectively all of it, plus its stated dependency chain. To reach the brief's
desired production path (`Tutor Response → LessonScreen → Narration Source →
VisualCard → Narration Mode → Reveal Step → Animated Visual`), the following
would need to be designed and built from scratch — none of it currently
exists in any form:
1. **Sprint R.1** — give `VisualCard`'s 10 SVG components a step/reveal model
   (analogous to `teachingTimeline.ts`, but for `NumberLine`/`FractionBar`/
   etc., which today render their full final SVG in one synchronous pass).
2. **Sprint S** — a narration/visual sync model (`lessonSegments.ts`,
   `tutorVisualSync.ts`) that maps narration text/audio position to visual
   steps.
3. **Sprint T** — a narration-driven playback engine (`synchronizedPlayback.ts`,
   `narrationProgress.ts`) that replaces or augments the timer-driven
   `useTeachingPlayback` with one driven by actual narration progress.
4. **Sprint U itself** — wire a real narration source from `LessonScreen`
   into `VisualCard`, add `hasNarration` detection, and add narration-mode
   props to `VisualCard` and its 10 children.

This is a multi-sprint scope, not a small follow-up — there is no partial
foundation to build on inside `VisualCard`'s file family today.

## Q8 — Is there any uncommitted local work?

**No, exhaustively checked:**
- `git status --porcelain` (this checkout): empty.
- `git stash list`: empty.
- `git diff` / `git diff --cached`: empty.
- `git fsck --unreachable --dangling`: returns a number of dangling
  blobs/commits/trees, but spot-checking confirms these are leftovers from
  historical rebases/resets unrelated to narration (none reference
  `VisualCard`, `narration`, or any Sprint-U identifier — see below).
- A second git worktree exists at
  `.claude/worktrees/agent-ae607528aa2093d5d` (branch
  `worktree-agent-ae607528aa2093d5d`, HEAD `c8dcba7`, dated 2026-06-10). It is
  stale and unrelated: its only untracked content is
  `src/components/dashboard/v2/` (a dashboard redesign, not narration), and
  its HEAD commit is already an ancestor of the current branch's history.
- No `/tmp` artifacts referencing narration or Sprint U were found.

**Conclusion: the "previous session's" Sprint U edits, if they ever existed
as live file changes, were never committed, never stashed, and are not
present in this container's filesystem now.** A screenshot of an editor from
a session that hit a usage limit before any `git add`/`git commit` leaves
nothing behind for a fresh session to inherit — this is consistent with, and
fully explains, the current clean state.

## Q9 — Can Sprint U be recovered safely?

**There is nothing to recover.** "Recovery" implies retrieving lost work;
none exists in any retrievable form (no commit, stash, dangling object, or
other worktree contains it). The only honest path forward is to **build
Sprint U (and its R.1/S/T prerequisites) from scratch**, treating the prior
session's screenshot purely as a *design intent reference* (what the previous
session was trying to wire up), not as recoverable code.

One process note for the handoff's own framing: this repository's commit
history already contains an *unrelated* "Sprint S / Sprint T / Sprint U"
(2026-06-10: "Subject visibility", "Production hardening", "Performance &
scale hardening") from an earlier, different feature chain, and a prior
"Sprint recovery: restore lost sprints Q-U + stub missing modules from
permanently-lost commit" (also 2026-06-10) — i.e. this is not the first time
sprint-lettered work in this project has been lost before commit. The letter
names R/R.1/S/T/U for the narration chain collide with already-used letters
elsewhere in history; whoever picks the next sprint name should pick a
non-colliding one (or namespace it, e.g. "Visual Learning Sprint S") to avoid
ambiguity in `git log`.

## Q10 — What exact next steps are required?

This audit's instructions are to stop after the report — no implementation
decision is being made here. For the next session/task, the concrete options
are:
1. Re-author Sprint R.1 (per-visual step models for the 10 `VisualCard`
   components) as a clean new task, using `teachingTimeline.ts` /
   `useTeachingPlayback.ts` as the existing precedent to extend or parallel.
2. Re-author Sprint S (tutor↔visual sync) and Sprint T (narration-driven
   playback) as their own scoped tasks once R.1 exists, since Sprint U
   (wiring a narration source into `VisualCard`) has nothing to attach to
   until R.1/S/T exist.
3. Pick non-colliding sprint names/letters going forward, and **commit
   incrementally** (one commit per completed task within a sprint, not one
   commit saved for the very end) so a usage-limit interruption mid-sprint
   cannot silently erase the work again.

No code, config, or git state was changed in the course of this audit.
