# Tutor Max — multiple-choice questions in the main transcript (2026-10-13)

Owner request: every MCQ must be a visible message in the main Tutor Max conversation, directly BEFORE the learner's
answer, and stay there after answering and after a reload — it had been visible only in the floating Quick Check panel
and in the expandable "Tutor history" log.

## Root cause (traced before any code)

- A tutor turn that asks a multiple-choice question returns it in a SEPARATE field of the chat response (`mcq`:
  question + options; the answer key is stripped by `mcqForClient`). `LessonScreen` kept it in one state slot,
  `activeMcq`, and drew it only in the Quick Check panel. The tutor MESSAGE in the transcript held the prose alone.
- Tapping an option ran `setActiveMcq(null)`, pushed an entry to `mcqHistoryLog` (client-only, lost on reload) and sent
  the option text as an ordinary user message. The transcript therefore read `Tutor: prose` → `Learner: "Velocity"`;
  the question survived only in Tutor history.
- Persistence was NOT the gap. `appendMcqToHistoryText` already writes `\n\n<question>\nA) …\nB) …` onto the stored
  assistant row, so a reload returned the question — as undifferentiated trailing text (inside the "Read more" fold of a
  long reply), unlike the live session where it was missing. Live and reloaded views disagreed.

## Fix (one timeline, one persistence path)

- `src/lib/learn/mcqTranscript.ts` (pure): `validTranscriptMcq` (the existing 2–4 non-empty options rule, now shared),
  `splitStoredMcq` / `withRestoredMcq` (recover the question from the persisted block; fail-safe — anything that is not
  exactly the writer's shape, or would leave an empty prose, stays plain text).
- `ChatMsg.mcq` carries the question on the tutor message: live (attached when the turn lands) and restored (all three
  history-restore paths run `withRestoredMcq` before `applyRestoredVisuals`). One render path for both.
- `src/components/learn/InlineMcqCard.tsx`: read-only card (label, full question, A–D options in served order), theme
  tokens only, wraps at 390 px, rendered after the teaching canvas and outside the "Read more" fold.
- The Quick Check panel (the answering control) and Tutor history (the secondary log) are unchanged. No new column,
  endpoint, table or message system; no grading change; no new i18n key (`lc_quick_check_label`).
- Adjacent leak closed: `LessonScreen` is keyed by subject, not lesson, so `activeMcq` / `quickCheckWindow` /
  `mcqHistoryLog` outlived a lesson switch. `clearLessonMcqState()` now runs at the three places that empty the
  transcript for another lesson (advance, staged preview, `resetLessonContext`).

## Tests

`mcqTranscript.test.ts` (pure rules, driven through the real `appendMcqToHistoryText`), `inlineMcqTranscript.test.ts`
(card markup + LessonScreen wiring pins), `inlineMcqBrowser.test.ts` (real Chromium: 390/1280 × dark/light — card above
its answer, options in order, no horizontal overflow with a very long unbroken option, 4.5:1 text contrast, live ≡
reloaded transcript, older history, lesson isolation).

## Same-day follow-up: Quick Check panel centred and 1cm larger

Owner: "mcq box should appear in the center of the screen and bit bigger like 1cm". The Quick Check panel (the
answering control) used to sit low — `bottom: 88px`, 440px wide. Now `.quickCheckFloating` is `top: 50%` with the
matching `-50%` Y translate in the inline transform (the drag offset still layers on top), `width: min(calc(440px + 1cm),
calc(100% - 24px))` (1cm wider), and 0.5cm of extra padding top and bottom (1cm taller, `max-height` raised by 1cm and
capped to the window). "Centre of the screen" = centre of the Tutor Max window the panel is positioned in (its
`position: relative` container; same anchor as before, no portal). On a phone the width is already the full viewport minus
a gutter, so only the height grows. MINIMIZED keeps its old low place (88px / 78px above the composer) and compact padding
— a bar parked mid-screen would cover the chat that minimizing exists to uncover. `quickCheckDragWiring.test.ts`'s one
pinned transform string was restated for the new shape; `quickCheckCenteredSize.test.ts` measures centre and size in
real Chromium with the real stylesheet.

## Known limitations

- While a question is pending, the card and the Quick Check panel show the same question (the panel stays the answer
  control and, being centred, now sits over the transcript while it is open). Once answered, the card remains and the panel clears.
- Restore relies on the existing plain-text format. A stored tutor reply whose prose itself ends in a blank-line-separated
  question followed by lettered `A) …` lines would also render as a card (indistinguishable by shape).
- A question whose prose already contained it (`appendMcqToHistoryText` skips the append) stays as prose after reload;
  live, `dropDuplicatedMcqProse` leaves the card as the single copy. Both show the question once.
- The card is a record: after a reload the Quick Check panel is not re-offered for an old question (unchanged behaviour).
