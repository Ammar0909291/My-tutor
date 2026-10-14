# Chemistry real-learner QA triage — "Modern Periodic Law and Table" (2026-10-14)

Source: a pasted student session (transcript + phone screenshot) of `chem.period.modern-periodic-law`, owner instruction "fix all". Each finding was checked against the code; nothing below is from production logs.

| # | Finding | Verdict | Action |
|---|---|---|---|
| F1 | Reply said the figure shows Na/Cl; the pasted figure was Mg vs Si | **NOT A DEFECT (very likely); now pinned by `periodicLawFigureDefault.test.ts`.** `resolveVisual` serves `chem.period.modern-periodic-law` the shared canonical instance `Periodic Trends: Na vs Cl` (verified 2026-10-14; `PARAMETRIC_SCENES.periodic_trends.defaults`). Mg/Si is one of the "Try changing values" choices, so it was set by hand before the paste. | none |
| F2 | The lesson figure appeared again on the iron wrong-answer reply (18:33) | **UNRESOLVED — needs the server's visual-decision log for that session.** `decideVisualNeed` returns `suppress` for a tapped quick-check answer, so what attached it (a held visual session? the Na/K re-ask card?) is not established. | none; do not change the visual authority blind |
| F3 | Na/K asked twice, iron re-asked right after its answer was shown, then "mastered" | **BY OWNER DECISION, not a bug.** The concept holds exactly 5 probes, all spent by 18:33. `recordMcqOutcome` treats a correct answer given in a phase that banks no credit (GUIDE) like a miss: ONE re-ask once the pool is dry (owner option (c)); a missed question gets its one re-ask (G2, 2026-09-24). Known limit, recorded in `mathematicsDepthArithAssets.ts`: a re-ask right after the answer was stated can be passed by recall. A fix would change mastery rules = G1/G2, owner only. | none; owner question below |
| F4 | Wrong-answer correction showed `[Ar]3d6 4s2` while the tutor wrote `3d⁶ 4s²` | **FIXED.** `authoredProseForLearner` (serve-time lowering of authored text) now superscripts a subshell occupancy (`superscriptOrbitalOccupancy`). Test `orbitalOccupancySuperscript.test.ts`. | code |
| F5 | Valency explained with mixed signed oxidation states; a list collapsed inline | **List collapse FIXED (display only):** `MessageContent` splits a bullet at a sentence-end + dash/bullet + capital (`splitCollapsedBullets`, test `collapsedBulletSplit.test.ts`). The valency wording itself is model text: no deterministic fix | code (list) / none (wording) |
| F6 | Dense unsolicited wall of text after "Got it" | model behaviour (an authored explanation served verbatim in a no-question turn) | none |
| F7 | Non-sequitur opener | model behaviour | none |
| F8 | Reply said the figure shows electronegativity values; it shows radii + a verdict line | model wording | none |
| F9 | Empty band under the figure's verdict lines | cosmetic; the figure passed the Chemistry render audit (990 PASS / 0 FAIL); a layout change would need a re-audit of every periodic-trends state | none |
| F10 | No periodic-table figure for a "read the long-form table" objective | content gap, not a defect; a new figure is an authoring task | owner decision |

Owner questions: (1) is a re-ask of a question whose answer the tutor just stated acceptable evidence of mastery when the concept holds only five probes (F3)? (2) should the periodic-table concepts get a real table figure (F10)? To root-cause F2 give the session id / timestamp so the visual-decision log can be read.
