/*
 * `isVisualResolverV2Enabled()` was removed here (M1).
 *
 * It was a MIGRATION flag whose own contract said it would be deleted "once V2
 * is validated in production, at which point the legacy pipelines and their own
 * capability flags are deleted with it". M1 deleted those pipelines, so the
 * switch had nothing left to switch TO: with the resolver as the only
 * authority, `VISUAL_RESOLVER_V2=0` would have meant "silently show no visuals
 * ever" rather than "roll back", which is a worse outcome than the incident it
 * was meant to mitigate. Rollback is now `git revert` of the M1 commit.
 */

/**
 * Runtime figure-generation eligibility — the ONE authority.
 *
 * ── WHAT THIS USED TO BE, AND WHY IT CHANGED ────────────────────────────────
 * A canary: a concept was eligible only if someone had typed its id into
 * VISUAL_AI_SCENE_ALLOWLIST. Correct while the only thing between a generated
 * figure and a learner was a schema check — a hand-typed list is the honest way
 * to bound a blast radius you cannot yet reason about.
 *
 * It is the wrong shape for a tutor. A learner raises a topic; the engine
 * either draws THAT topic or is useless for it. With thousands of topics
 * arriving, an enumeration means each one waits for a person to remember it,
 * which in practice means none of them are ever drawn.
 *
 * ── ELIGIBILITY IS NOW A RULE, AND IT IS STILL BOUNDED ──────────────────────
 * "Not a list" does NOT mean "unrestricted". Four independent conditions must
 * all hold, none of them per-topic:
 *
 *   1. OPERATIONAL      the kill switch is not thrown          (this file)
 *   2. NARROWING        the optional allowlist, if someone set
 *                       one to investigate something, admits it (this file)
 *   3. GROUNDING        the topic has enough authored text to
 *                       draw from and to be JUDGED against      (topicIdentity)
 *   4. BUDGET           this session and this day are within
 *                       their generation caps                   (generationBudget)
 *
 * Condition 3 is what makes this a rule rather than a licence: the engine may
 * draw a topic it can describe and declines one it cannot, identically for the
 * first topic and the ten-thousandth. Condition 4 replaces the allowlist's real
 * job — bounding how much can go wrong — with a quantity instead of an
 * enumeration, which is the only form of that bound that scales.
 *
 * And none of it is the last word: every figure still faces deterministic
 * validation and an independent critic, and any uncertainty anywhere yields NO
 * FIGURE. Eligibility decides what may be ATTEMPTED. It has never decided, and
 * still does not decide, what a learner sees.
 *
 * ── THE CONTROLS ────────────────────────────────────────────────────────────
 *   ENABLE_AI_SCENE_GENERATION   'false' | '0' | 'off' | 'no' disables
 *                                generation everywhere, at once, INCLUDING
 *                                figures already cached, because this is read
 *                                before the cache. THE KILL SWITCH.
 *   VISUAL_AI_SCENE_ALLOWLIST    OPTIONAL narrowing, for investigating a
 *                                specific set. Unset means "conditions 1, 3
 *                                and 4 decide" — never "anything goes", since
 *                                3 and 4 still have to hold.
 *
 * Curated registry and generator visuals never consult this — they are
 * unaffected by any value here.
 */
export function isRuntimeSceneGenerationAllowed(conceptId: string | null | undefined): boolean {
  if (!conceptId) return false
  if (isGenerationKilled()) return false
  const narrowing = runtimeSceneAllowlist()
  return narrowing.size === 0 || narrowing.has(conceptId.trim())
}

/**
 * The kill switch, read as an explicit DENIAL rather than a required consent.
 *
 * Spelled out as literals instead of `!== 'true'` so that a missing or
 * misspelled variable cannot silently switch the engine off for everyone — the
 * failure this file has already had once, in the other direction, when a
 * migration flag's absence would have meant "show no visuals ever".
 *
 * Throwing it is the emergency stop for GENERATION. It does not retract
 * figures a human has promoted to ACTIVE; those are reviewed content and are
 * withdrawn by DEPRECATING them, which is one statement and is deliberate.
 */
export function isGenerationKilled(): boolean {
  const raw = process.env.ENABLE_AI_SCENE_GENERATION?.trim().toLowerCase()
  return raw === 'false' || raw === '0' || raw === 'off' || raw === 'no'
}

/**
 * The optional narrowing set. Parsing lives here alone — never in the engine or
 * the route. Exact match after trimming; still deliberately NO wildcard or
 * prefix form, because a narrowing that widens by typo narrows nothing.
 */
export function runtimeSceneAllowlist(): ReadonlySet<string> {
  const raw = process.env.VISUAL_AI_SCENE_ALLOWLIST
  if (!raw || !raw.trim()) return EMPTY_ALLOWLIST
  const out = new Set<string>()
  for (const entry of raw.split(',')) {
    const id = entry.trim()
    if (id) out.add(id)
  }
  return out
}

const EMPTY_ALLOWLIST: ReadonlySet<string> = new Set()
