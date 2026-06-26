# Git Visual-History Forensic Audit — Read-Only

**Method:** `git log`/`branch -a`/`reflog`/`show`/`merge-base`/`fsck` across all
refs, the reflog, dangling objects, the second worktree, and a pickaxe
(`-S`) search of file contents across all history for the narration
identifiers named in both prior, conflicting reports. No code was changed.
No commits were made. No branches were touched, rebased, or merged. Nothing
was pushed.

## Headline finding

**Both prior reports were correct about their own observations, and the
apparent contradiction is real — it is git divergence, not an error in
either report.** The first audit (`docs/SPRINT_U_RECOVERY_AUDIT.md`) was run
against a local checkout that was, at that moment, genuinely missing all
narration-chain work — nothing had been pushed or committed locally yet. In
the time between that audit and the next session, **a separate, parallel
session pushed Sprint R.1/S/T directly to
`origin/claude/my-tutor-foundation-KDSUO`**, and a *different* local session
(this repository's working copy) had independently authored and committed
its own, differently-implemented "Sprint R" — never pushed. Both are true:
the first audit's checkout had none of it; the second session's `git fetch`
revealed origin already had R.1/S/T. Full evidence below.

---

## Task 1 — Does Sprint R / R.1 / S / T / U exist?

There are **two unrelated families of commits** that both use the letters
R/S/T/U — this collision (already flagged as a process risk in the prior
Sprint U audit, Q9) is the root of the confusion. Distinguishing them by
content, not just label:

| Label | Unrelated *non-visual* chain (predates this audit, already on every branch) | Visual-Learning narration chain (this audit's actual subject) |
|---|---|---|
| Sprint R | `0df2494` "Sprint R: Adaptive Tutor Intelligence" (2026-06-10) — behavioral insights/LIP, unrelated to visuals | `4f35e03` "Visual Learning Sprint R: Animated Teaching Engine" (2026-06-20 17:28:50) — **local only, see Task 3** |
| Sprint R.1 | *(none)* | `aca4bae` "feat(visuals): Animated Teaching Engine — progressive step-by-step visuals (Sprint R.1)" (2026-06-20 17:58:56) — **on origin** |
| Sprint S | `f88bf01` "Sprint S: Subject visibility" (2026-06-10) — hides Hindi/German/Arabic from discovery UIs, unrelated to visuals | `b8a6281` "feat(visuals): Tutor-Visual Synchronization Engine — infrastructure for narration-driven visuals (Sprint S)" (2026-06-20 18:59:59) — **on origin** |
| Sprint T | `f2973c9` "Sprint T: Production hardening" (2026-06-10) — security/logging, unrelated to visuals | `5ae3960` "feat(visuals): narration-driven playback — visual advances with narration, not timer (Sprint T)" (2026-06-20 19:06:34) — **on origin** |
| Sprint U | `900e2e5` / `2269aa0` "Sprint U: Performance & scale hardening" (2026-06-10, appears twice — see Task 5) — query dedup/indexes, unrelated to visuals | **No commit, anywhere, under any name, implements this.** See Task 5. |

Answers:
1. **Does Sprint R exist?** Yes — as `4f35e03`, but only as a dangling,
   unreachable commit (see Task 3). Not on any branch, not on origin.
2. **Does Sprint R.1 exist?** Yes — `aca4bae`, on origin and now on the
   local branch (this session pulled it in; see Task 3).
3. **Does Sprint S exist?** Yes (visual-learning sense) — `b8a6281`, on
   origin and the local branch.
4. **Does Sprint T exist?** Yes (visual-learning sense) — `5ae3960`, on
   origin and the local branch.
5. **Does Sprint U exist (visual-learning/narration-wiring sense)?** **No.**
   See Task 5 for exhaustive evidence.

A fifth, supporting commit precedes R.1 on origin: `a537e45` "docs: E2E QA
break-test report + Animated Teaching audit & timeline engine foundation"
(2026-06-20 17:45:02) — adds `docs/ANIMATED_TEACHING_AUDIT.md` and the first
version of `src/lib/visuals/teachingTimeline.ts` that R.1 builds on.

---

## Task 2 — Remote investigation (`origin/claude/my-tutor-foundation-KDSUO`)

| Sprint | Commit hash | Title | Date (UTC) |
|---|---|---|---|
| Sprint R | **MISSING** — not present on origin under any hash. | — | — |
| Sprint R.1 | `aca4bae` (full: `aca4baec55cb7ab7874cc5a8eb5d328fca5e8317`) | `feat(visuals): Animated Teaching Engine — progressive step-by-step visuals (Sprint R.1)` | 2026-06-20 17:58:56 |
| Sprint S | `b8a6281` (full: `b8a628115b9111dd6d6c1765de5ae57635815004`) | `feat(visuals): Tutor-Visual Synchronization Engine — infrastructure for narration-driven visuals (Sprint S)` | 2026-06-20 18:59:59 |
| Sprint T | `5ae3960` (full: `5ae39602a9d55146114c6853f1fe8533ba347996`) | `feat(visuals): narration-driven playback — visual advances with narration, not timer (Sprint T)` | 2026-06-20 19:06:34 |
| Sprint U | **MISSING** — explicitly confirmed absent (Task 5). | — | — |

Supporting commit: `a537e45` (`a537e45cf385f83eda4f398e19fdb539532b1115`) —
`docs: E2E QA break-test report + Animated Teaching audit & timeline engine
foundation` — 2026-06-20 17:45:02. This is the actual first commit of the
origin-side chain (predates R.1) and is where `teachingTimeline.ts` first
appears on origin.

Ancestry confirms `62c6444` ("Fix Tutor Max / Roadmap lesson desync bug") is
the last commit shared by both the origin chain and the local "Sprint R"
work — `git merge-base 4f35e03 aca4bae` → `62c6444f0531bd2330a173490a06fa1a0189de17`.

---

## Task 3 — Local-only vs. origin-only vs. both

| Commit | Title | Status (as of this audit) |
|---|---|---|
| `4f35e03` | Visual Learning Sprint R: Animated Teaching Engine | **local-only, and currently dangling** — not on origin, and (see below) no longer on the local branch tip either; reachable only via local reflog. |
| `a537e45` | docs: E2E QA + Animated Teaching audit & timeline foundation | both (origin, and now local branch HEAD's ancestry) |
| `aca4bae` | Sprint R.1 — Animated Teaching Engine | both |
| `cfe5fdb`…`d58901e` (EI Sprints 4–11, 7 commits) | Educational Intelligence work | both |
| `b8a6281` | Sprint S — Tutor-Visual Synchronization Engine | both |
| `5ae3960` | Sprint T — narration-driven playback | both |
| `e6895f0` | Fix password reset silent failures and school/AI subject desync (this session's prior bugfix task) | local branch tip + origin (pushed earlier this session) |

**Important nuance on `4f35e03`'s current status:** at the time of the prior
forensic audit (`SPRINT_U_RECOVERY_AUDIT.md`), `4f35e03` *was* the local
branch tip's parent — i.e. it was live, checked-out, reachable work. Since
then, in the course of the password-reset/subject-sync bugfix task earlier
in this session, the local branch was deliberately reset onto
`origin`'s tip (per explicit user instruction to "rebase only the bugfix
commit" rather than reconcile the two divergent Sprint R implementations).
That reset moved the branch ref off `4f35e03`'s line of history entirely.
`4f35e03` is **still a real, intact commit object** — `git cat-file -t
4f35e03` returns `commit`, and `git show 4f35e03` returns its full diff —
but it is no longer an ancestor of `HEAD` (`git merge-base --is-ancestor
4f35e03 HEAD` → exit 1 / "no") and not an ancestor of origin's branch
either. It is currently reachable *only* via the local reflog
(`git reflog` shows `HEAD@{5}: commit: Visual Learning Sprint R: Animated
Teaching Engine`) and via `git fsck --unreachable --no-reflog`, which lists
it as an unreachable commit once reflog protection is disabled. In a normal
git installation this means it survives until the reflog entries expire
and `git gc` prunes it (default ~90 days) — it has **not** been deleted,
but it is not currently part of any branch.

`4f35e03` and `aca4bae` are independent, parallel commits — neither is an
ancestor of the other (`git merge-base --is-ancestor` returns false both
directions); their only common ancestor is `62c6444`. Diffing their
respective `src/lib/visuals/teachingTimeline.ts` confirms they are also
**different implementations** (84 lines in the `a537e45`/origin version vs.
168 lines in the local `4f35e03` version) — not a textual duplicate, a
genuinely separate parallel build of the same concept, authored ~16 minutes
apart by two different sessions that could not see each other's work.

---

## Task 4 — File forensics

| File | First appearance | Latest modifying commit (reachable refs) | Present now? | Deleted/renamed? |
|---|---|---|---|---|
| `src/lib/visuals/teachingTimeline.ts` | `a537e45` (origin chain) | `a537e45` | **Yes** | No rename; note a *different*, 168-line version of the same path was also created independently by local-only `4f35e03` (now dangling, not in working tree). |
| `src/hooks/useTeachingPlayback.ts` | `aca4bae` (Sprint R.1) | `5ae3960` (Sprint T added the `mode: 'timer'\|'narration'` option) | **Yes** | No. (A *different* file also named `useTeachingPlayback.ts` was independently created by local-only `4f35e03`; not present in the working tree now.) |
| `src/lib/visuals/lessonSegments.ts` | `b8a6281` (Sprint S) | `b8a6281` | **Yes** | No |
| `src/lib/visuals/tutorVisualSync.ts` | `b8a6281` (Sprint S) | `b8a6281` | **Yes** | No |
| `src/lib/visuals/narrationProgress.ts` | `5ae3960` (Sprint T) | `5ae3960` | **Yes** | No |
| `src/lib/visuals/synchronizedPlayback.ts` | `5ae3960` (Sprint T) | `5ae3960` | **Yes** | No |
| `src/components/school/visuals/VisualCard.tsx` | `5dd797d` "Sprint BW: visual learning aids" (2026-06-13) | `aca4bae` (Sprint R.1 added `revealStep`/playback wiring) | **Yes** | No rename; same path since creation. |
| `src/components/learn/LessonScreen.tsx` | `0f4ff84` (2026-05-31, predates all visual work) | `aca4bae` (Sprint R.1; also touched by local-only `4f35e03`, not in current ancestry) | **Yes** | No |

---

## Task 5 — Sprint U forensics

**Answer: NO — Sprint U, in the narration/visual-learning sense the prior
handoff brief described, has never existed in any form, anywhere this audit
can reach.**

Checked, exhaustively, this session:
- **Local commits** (`git log --all`): the only "Sprint U" commit messages
  anywhere are `900e2e5` and `2269aa0`, both titled "Sprint U: Performance &
  scale hardening — query dedup, indexes, load analysis" — the unrelated,
  pre-existing chain (database performance work, 2026-06-10). Two commits
  with the identical message exist because of the same letter-collision
  pattern the prior audit's Q9 flagged (this codebase has reused sprint
  letters at least twice now across unrelated feature chains).
- **Remote commits** (`git log --all` includes all fetched remote refs):
  same result — no other "Sprint U".
- **Reflog** (`git reflog`, and `git log --all --reflog -- <file>` for every
  narration-identifier file): no additional commit surfaces.
- **Dangling/unreachable objects** (`git fsck --unreachable --dangling`):
  returns ~25 unreachable blobs/trees/commits; none of the unreachable
  *commits* (`11c0b3c9`, `258031471`, `dd400a8d`, `fc40a511`, `7141b838`,
  `88815969`, `cf41cd4d`, plus the now-dangling `4f35e03` and the
  superseded pre-cherry-pick `cd4ecb2`) reference narration, `VisualCard`
  props, or any Sprint-U identifier — spot-checked by `git show` on each.
- **Stashes** (`git stash list`): empty.
- **Alternate worktree**: `.claude/worktrees/agent-ae607528aa2093d5d`
  (branch `worktree-agent-ae607528aa2093d5d`, HEAD `c8dcba7`) — confirmed
  unrelated; its only untracked content is a dashboard-v2 redesign
  directory, not narration/visuals.
- **Content search (pickaxe, `git log --all --reflog -S<term>`)** for the
  exact identifiers the original Sprint U brief named — `hasNarration`,
  `narrationStep`, `onStepChange`, `revealStep`: these identifiers **do now
  exist**, but only inside the R.1/S/T chain itself (`aca4bae`, `b8a6281`,
  `5ae3960`, `a537e45`) — `revealStep` as R.1's per-visual animation-step
  prop, `onStepChange`/`narrationStep` as S/T's *infrastructure* for future
  narration sync. None of them appear wired into the actual production
  tutor pipeline (see below) under a "Sprint U" commit or any other commit.

**The decisive piece of evidence that Sprint U's actual deliverable is still
missing, even now that R.1/S/T infrastructure exists:** `LessonScreen.tsx`
— the only place that renders `VisualCard` in production — calls it as:
```tsx
<VisualCard type={msg.visual as VisualType} autoPlay speed={speed} />
```
(`src/components/learn/LessonScreen.tsx:2307`). No `hasNarration`,
`narrationStep`, or any prop derived from `tutorVisualSync.ts` /
`lessonSegments.ts` / `synchronizedPlayback.ts` / `narrationProgress.ts` is
passed. Grepping for where those four library files are imported from
confirms they are consumed **only** by two dev-only viewer components —
`TutorVisualSyncViewer.tsx` and `NarrationDrivenPlaybackViewer.tsx` — which
are themselves mounted only inside `/dev/visual-demo`
(`src/app/dev/visual-demo/VisualDemo.tsx`), never inside `LessonScreen.tsx`
or any production route. `src/app/api/learn/chat/route.ts` (the production
tutor endpoint) imports none of them either.

So: R.1/S/T built the narration-sync *infrastructure* (types, pure
functions, a dev-only demo harness) — but the actual "Sprint U" task as
originally scoped (wire a real narration source from `LessonScreen` into
`VisualCard` in production) has still never been done, under that name or
any other.

---

## Task 6 — Current reality

**A. What visual-learning sprint is actually deployed?**
"Deployed" here means "on the branch this repo pushes to production from,"
`claude/my-tutor-foundation-KDSUO`. As of this audit, that is the origin
chain through **Sprint T** (`5ae3960`) — Sprint R.1, S, and T are all
present and built (typecheck/build claims in their own commit messages,
not independently re-verified by this read-only audit). Sprint U is not
deployed because it does not exist.

**B. What visual-learning sprint is actually in the local branch?**
Identical to origin as of this audit — the local branch (`HEAD` =
`e6895f0`) is origin's tip plus one unrelated commit (the password-reset/
subject-sync bugfix). The local-only "Sprint R" (`4f35e03`) is **not** part
of the local branch right now; it exists only as a dangling commit
reachable via reflog (see Task 3).

**C. What visual-learning sprint is actually on origin?**
Through Sprint T (`5ae3960`), as in A. No Sprint U commit exists on origin.

**D. Which reports are factual?**
Both prior reports were factually accurate *for the git state each was run
against*:
- `docs/SPRINT_U_RECOVERY_AUDIT.md` was correct that, at the moment it ran,
  the local working tree had zero evidence of R.1/S/T/U — because at that
  moment it genuinely didn't, locally. Its forensic methodology (status,
  stash, reflog, fsck, second-worktree check) was sound and is corroborated
  by this audit's own repeat of the same checks against the *current* state
  for Sprint U specifically (still absent).
- The later session's report that "remote already contains Sprint R.1/S/T"
  is also correct — confirmed directly in Task 2 above by commit hash.

**E. Which reports are contradicted by git history?**
Neither prior report is contradicted by git history once the timeline is
understood: the first audit ran *before* the parallel session's R.1/S/T
push landed on origin; the second session's divergence report describes
the state *after* that push. The only thing that could be called a latent
inaccuracy is the first audit's implicit framing that "Sprint R.1/S/T/U
must be built from scratch" — true at the time, but already partially
overtaken by the other session's concurrent work even as that audit was
being written.

---

## Task 7 — Safe recovery plan (documentation only — no action taken)

**Lowest-risk path:** treat origin's R.1/S/T (`aca4bae`/`b8a6281`/`5ae3960`,
already merged into the local branch as of this audit) as the canonical
animated-teaching-engine implementation going forward, and **retire the
local-only Sprint R (`4f35e03`) rather than reconcile it**:
- It is fully superseded in *scope* by R.1 (same goal: turn static visuals
  into step-by-step animated ones), and R.1 is already the one that's live
  on the shared branch and built on top of by S/T.
- Reviving `4f35e03` now would require resolving direct content conflicts
  on `src/lib/visuals/teachingTimeline.ts` and `src/hooks/useTeachingPlayback.ts`
  against R.1/S/T's own versions of the same paths — a manual merge of two
  independent implementations of the same idea, which is net-negative effort
  compared to just keeping the one that's already integrated with S/T.
- If anything in `4f35e03`'s 168-line `teachingTimeline.ts` or its
  `GraphRenderer.tsx`/`NumberLineRenderer.tsx`/`GeometryRenderer.tsx`/
  `ProcessFlowRenderer.tsx` changes (a different visual family than
  VisualCard's 10 SVG components — `VisualRenderer`/`GraphRenderer` etc. vs.
  `VisualCard`/`NumberLine`/`FractionBar` etc.) contains logic not covered
  by R.1's `VisualCard`-side animation, that would be a separate, narrow
  follow-up — not a reason to merge the whole commit.
- **Recommendation: do not merge or rebase `4f35e03`.** Let it expire
  naturally via reflog/gc, or explicitly note it as superseded in the next
  sprint's changelog if a permanent record is wanted.

**Should Sprint R survive?** No, not as a separate commit — its goal is
already met by R.1, which is the version that's actually on the shared
branch and has follow-on work (S/T) built on top of it. Reviving R instead
would orphan S/T's `useTeachingPlayback.ts` extensions (`onStepChange`,
`mode: 'timer'|'narration'`), which were written against R.1's version of
the file, not R's.

**Do R.1/S/T already supersede R?** Yes, in scope and in git terms both —
R.1 already accomplishes what R set out to do (animate the visuals), via a
different, now-canonical implementation that S and T already depend on.

**Should Sprint U be rebuilt or recovered?** **Rebuilt, not recovered** —
there is nothing to recover (Task 5). It should be scoped as a fresh task
now that its prerequisites genuinely exist: wire `LessonScreen.tsx`'s
`<VisualCard ... autoPlay speed={speed} />` call to also pass a real
narration source (`hasNarration`, the active `narrationStep`, an
`onStepChange` handler) built from `tutorVisualSync.ts`/`lessonSegments.ts`/
`synchronizedPlayback.ts`/`narrationProgress.ts`, replacing or augmenting
the current timer-driven `autoPlay`/`speed` path — exactly the original
Sprint U brief's scope, now buildable directly on top of S/T's
infrastructure instead of from zero.

---

## Task 8 — Validation (read-only commands only; no state changed)

Commands run, all read-only: `git status --porcelain`, `git branch -a`,
`git log` (multiple forms incl. `--all`, `--reflog`, `--grep`, `-S<term>`
pickaxe), `git show` (commit metadata + file content at specific
revisions), `git diff` (content comparison between two blobs only, written
to `/tmp`, not applied), `git merge-base` / `--is-ancestor`, `git reflog`,
`git fsck --unreachable [--dangling] [--no-reflog]`, `git stash list`,
`git worktree list`, `git cat-file -t`. No `checkout`, `reset`, `rebase`,
`merge`, `commit`, `cherry-pick`, or `push` was run in the course of this
audit. The repository's branch pointer, working tree, and index are
unchanged from before this audit began (the one untracked file,
`docs/SPRINT_U_RECOVERY_AUDIT.md`, predates this audit and was left as-is,
consistent with that file's own no-commit instruction).

No code, config, or git state was changed in the course of this audit.
