/**
 * Visualization label localization.
 *
 * WHY THE LABELS WERE ENGLISH, AND WHY THE FIX BELONGS HERE.
 *
 * Process-flow specs are built server-side by visualConceptDetector.ts, which
 * is deliberately deterministic and language-neutral: it matches keywords in
 * the tutor's text and emits a fixed step list ('Solid', 'Melting', 'Liquid',
 * 'Evaporation', 'Gas'). Those strings are DATA — they are also the answer key
 * for the reorder interaction, and they key the mastery emitter's concept
 * label — so translating them at the detector would change engine state, not
 * just presentation, and would make the same spec mean different things in
 * different languages.
 *
 * So the spec stays English and canonical, and the RENDERER localizes at
 * display time. That is the ordinary split: model in one language, view in
 * the learner's.
 *
 * Scope is a closed domain vocabulary — the finite set of step names the
 * detector can emit, plus the flow titles. Not UI chrome (that stays in
 * i18n.ts), not curriculum concept names (those are keyed by curriculum id
 * in knowledgeGraph.ts). An unmapped label falls through unchanged, so adding
 * a new flow can never crash or blank a diagram.
 */

export type VisualLang = 'ru' | 'en' | 'hi'

const LABEL_I18N: Record<string, { ru: string; hi: string }> = {
  // ── States of matter / phase changes ─────────────────────────────────────
  'Solid':        { ru: 'Твёрдое тело',  hi: 'ठोस' },
  'Liquid':       { ru: 'Жидкость',      hi: 'द्रव' },
  'Gas':          { ru: 'Газ',           hi: 'गैस' },
  'Plasma':       { ru: 'Плазма',        hi: 'प्लाज़्मा' },
  'Melting':      { ru: 'Плавление',     hi: 'गलन' },
  'Freezing':     { ru: 'Замерзание',    hi: 'हिमीकरण' },
  'Evaporation':  { ru: 'Испарение',     hi: 'वाष्पीकरण' },
  'Condensation': { ru: 'Конденсация',   hi: 'संघनन' },
  'Sublimation':  { ru: 'Сублимация',    hi: 'ऊर्ध्वपातन' },
  'Deposition':   { ru: 'Десублимация',  hi: 'निक्षेपण' },

  // ── Chemical reaction ────────────────────────────────────────────────────
  'Reactants':         { ru: 'Реагенты',            hi: 'अभिकारक' },
  'Products':          { ru: 'Продукты',            hi: 'उत्पाद' },
  'Activation Energy': { ru: 'Энергия активации',   hi: 'सक्रियण ऊर्जा' },
  'Bond Breaking':     { ru: 'Разрыв связей',       hi: 'बंध का टूटना' },
  'Bond Formation':    { ru: 'Образование связей',  hi: 'बंध का बनना' },

  // ── Water cycle ──────────────────────────────────────────────────────────
  'Precipitation': { ru: 'Осадки',  hi: 'वर्षण' },
  'Collection':    { ru: 'Сбор',    hi: 'संग्रहण' },

  // ── Ecosystem energy flow ────────────────────────────────────────────────
  'Sun':         { ru: 'Солнце',       hi: 'सूर्य' },
  'Producers':   { ru: 'Продуценты',   hi: 'उत्पादक' },
  'Consumers':   { ru: 'Консументы',   hi: 'उपभोक्ता' },
  'Decomposers': { ru: 'Редуценты',    hi: 'अपघटक' },
  'Nutrients Returned to Soil': { ru: 'Питательные вещества возвращаются в почву', hi: 'पोषक तत्व मिट्टी में लौटते हैं' },

  // ── Rock cycle ───────────────────────────────────────────────────────────
  'Magma':                  { ru: 'Магма',                     hi: 'मैग्मा' },
  'Igneous Rock':           { ru: 'Магматическая порода',      hi: 'आग्नेय चट्टान' },
  'Weathering and Erosion': { ru: 'Выветривание и эрозия',     hi: 'अपक्षय और अपरदन' },
  'Sediment':               { ru: 'Осадок',                    hi: 'तलछट' },
  'Sedimentary Rock':       { ru: 'Осадочная порода',          hi: 'अवसादी चट्टान' },
  'Heat and Pressure':      { ru: 'Тепло и давление',          hi: 'ऊष्मा और दबाव' },
  'Metamorphic Rock':       { ru: 'Метаморфическая порода',    hi: 'कायांतरित चट्टान' },

  // ── Carbon cycle ─────────────────────────────────────────────────────────
  'Atmospheric CO2':                 { ru: 'CO₂ в атмосфере',                   hi: 'वायुमंडलीय CO₂' },
  'Absorbed by Plants (Photosynthesis)': { ru: 'Поглощение растениями (фотосинтез)', hi: 'पौधों द्वारा अवशोषण (प्रकाश संश्लेषण)' },
  'Respiration and Decomposition':   { ru: 'Дыхание и разложение',              hi: 'श्वसन और अपघटन' },
  'Combustion of Fossil Fuels':      { ru: 'Сжигание ископаемого топлива',      hi: 'जीवाश्म ईंधन का दहन' },
  'Released Back to Atmosphere':     { ru: 'Возврат в атмосферу',               hi: 'वायुमंडल में वापसी' },

  // ── Flow titles ──────────────────────────────────────────────────────────
  'Changes in States of Matter': { ru: 'Изменения агрегатных состояний',  hi: 'पदार्थ की अवस्थाओं में परिवर्तन' },
  'Chemical Reaction Process':   { ru: 'Ход химической реакции',          hi: 'रासायनिक अभिक्रिया की प्रक्रिया' },
  'Water Cycle':                 { ru: 'Круговорот воды',                 hi: 'जल चक्र' },
  'Rock Cycle':                  { ru: 'Круговорот горных пород',         hi: 'शैल चक्र' },
  'Carbon Cycle':                { ru: 'Круговорот углерода',             hi: 'कार्बन चक्र' },
  'Energy Flow in an Ecosystem': { ru: 'Поток энергии в экосистеме',      hi: 'पारिस्थितिकी तंत्र में ऊर्जा प्रवाह' },
}

/** Localize one visualization label. Unmapped labels pass through unchanged. */
export function localizeVisualLabel(label: string, lang: VisualLang): string {
  if (lang === 'en') return label
  const row = LABEL_I18N[label.trim()]
  if (!row) return label
  return (row as Record<string, string>)[lang] ?? label
}

/** Localize a list of labels (process-flow steps). */
export function localizeVisualLabels(labels: readonly string[], lang: VisualLang): string[] {
  return labels.map((l) => localizeVisualLabel(l, lang))
}
