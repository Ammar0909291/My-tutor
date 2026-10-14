# Tutor Max — clicking TTS turned formatted lessons into raw Markdown / LaTeX (2026-10-14)

Reported with screenshots: before Play a lesson card showed formatted prose and mathematics; after Play the same card
showed `**predicate**`, `\forall`, `\exists`, `\[...\]` and `\(...\)` as literal characters.

## Root cause (confirmed in code, then reproduced in real Chromium)

`LessonScreen` drew each tutor message with a status fork:

```tsx
narration.status === 'IDLE'
  ? <MessageContent text={displayText} isUser={false} />            // Markdown + KaTeX
  : <NarratedText segments={narration.segments} … />               // plain word tokens
```

`useNarrationPlayback` leaves IDLE the instant Play is pressed (LOADING → PLAYING → PAUSED → COMPLETED / ERROR), and
`NarratedText` draws `segment.renderedWords` — whitespace-split words of the speech segmenter's slices of the RAW message
source. It has no Markdown and no KaTeX, so the whole non-IDLE lifecycle showed raw syntax (and lost paragraph, list and
display-equation structure). The two branches are different component types, so the swap also remounted the message.

Checked and ruled out: the TTS pipeline did NOT overwrite the display source (`cleanTextForTTS` and the segmenter work on
a copy inside the hook; `handleSpeak` / `handleStopSpeech` never touch the message list), no escaping/serialization
happened on Play, and Read More / Collapse already used the same renderer — the fork was the whole defect.

## Fix

- `src/components/learn/MessageContent.tsx`: `MessageContent` and its Markdown/KaTeX helpers moved here verbatim from
  LessonScreen (so the view and the tests share one implementation), plus `TutorMessageText({ displayText })` — the
  message body, which takes the display text and NOTHING else (no narration status, segments or word index), so TTS state
  cannot reach it.
- LessonScreen: the fork is gone; the body is `<TutorMessageText displayText={displayText} />` in every status. The
  narration hook is still fed `narrationSourceText` (the complete original message) and builds the speech text itself.
  Read More / Collapse is the learner's own choice; playing neither expands nor collapses it.
- `NarratedText` is no longer mounted by the lesson screen (header note added). The hook, engines, controls and the
  `voicePlayback` contract are unchanged.

## Trade-off (owner decision if the old behaviour is wanted)

The in-message word-by-word highlight and the "reveal the collapsed remainder as narration reaches it" behaviour belonged
to the `NarratedText` view and are gone with it: while playing, the learner sees the same formatted message, the bubble's
speaking border, and the progress control. A highlight that survives formatting (Markdown/KaTeX) would need a design of
its own — mapping a spoken sentence onto rendered DOM — and was deliberately not improvised here.

## Tests

`ttsMarkdownLatexBrowser.test.ts` (real Chromium, the real hook, browser-speech engine, controls and renderer with a
controllable speechSynthesis; includes a NEGATIVE CONTROL that mounts the pre-fix composition and shows the defect),
`ttsDisplaySourceSeparation.test.ts` (display vs speech source, LessonScreen wiring), and two restated pins in
`narrationLessonWiring.test.ts` (they used to assert the buggy fork).
