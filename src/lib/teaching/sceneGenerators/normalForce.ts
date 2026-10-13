/**
 * Normal force — the public name. The builder, its parameters and its validator are the PURE half
 * (`normalForce.pure.ts`): the client re-runs them when a learner moves a control, so nothing in them may reach the AI or
 * server graph. There is no LLM parameter extractor for this kind — it is bound to `phys.mech.normal-force` only through
 * `visualRegistry` and is never routed to from text.
 */
export * from './normalForce.pure'
