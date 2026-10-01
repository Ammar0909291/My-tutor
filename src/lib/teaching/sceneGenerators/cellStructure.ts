/**
 * Cell/organelle structure scene generator — public module.
 *
 * No LLM parameter extraction: unlike cellDivision.ts (which must classify
 * "mitosis or meiosis" from text), every concept bound to this generator has
 * its own fixed, curated part list keyed by concept id in
 * conceptSceneParams.ts — there is nothing to extract. The pure half is
 * therefore the whole module; this file exists only to keep the same
 * pure/public split every generator in this directory follows.
 */
export * from './cellStructure.pure'
