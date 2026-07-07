import type { BoardSubjectCatalog } from './educationTypes'

/**
 * UP Board Sanskrit — Grades 6–12.
 *
 * Sprint DL: Architecture + Core — Grammar (व्याकरण), Sandhi (संधि),
 *   Samasa (समास), Shabda-roopa (शब्द-रूप), Dhaatu-roopa (धातु-रूप) and
 *   comprehension/translation (गद्य/पद्य). No literature/prose readers yet —
 *   board-specific textbook chapters are deferred to a future sprint.
 *
 * Shared core: chapter titles and kgNodeIds are identical to
 * cbseSanskritCatalog.ts by design — only the `id` prefix differs
 * (up.san.X.chN vs cbse.san.X.chN).
 *
 * Chapter "[Section]" prefixes enable groupChaptersByUnit() grouping.
 * All kgNodeIds reference existing nodes in sanskritKnowledgeGraph.ts.
 */
export const UP_SANSKRIT_CATALOG: BoardSubjectCatalog = {
  boardId: 'up_board',
  subjectSlug: 'sanskrit',
  subjectName: 'Sanskrit',
  grades: [

    // ── Grade 6 ─────────────────────────────────────────────────────────────
    {
      grade: 6,
      chapters: [
        { id: 'up.san.6.ch1', order: 1, title: '[वर्ण एवं शब्द] वर्ण विचार — स्वर, व्यंजन और उच्चारण',           kgNodeIds: ['sanskrit.vyakarana.varna_vichar'] },
        { id: 'up.san.6.ch2', order: 2, title: '[वर्ण एवं शब्द] शब्द भेद — सुबन्त, तिङन्त और अव्यय',             kgNodeIds: ['sanskrit.vyakarana.shabda_bhed'] },
        { id: 'up.san.6.ch3', order: 3, title: '[वर्ण एवं शब्द] लिंग और वचन का परिचय',                          kgNodeIds: ['sanskrit.vyakarana.linga', 'sanskrit.vyakarana.vachana'] },
        { id: 'up.san.6.ch4', order: 4, title: '[शब्द-रूप] परिचय एवं अकारांत पुंलिंग (राम-प्रकार)',             kgNodeIds: ['sanskrit.shabda_roopa.parichay', 'sanskrit.shabda_roopa.akaranta_pum'] },
        { id: 'up.san.6.ch5', order: 5, title: '[शब्द-रूप] अकारांत नपुंसकलिंग (फल) और आकारांत स्त्रीलिंग (लता)', kgNodeIds: ['sanskrit.shabda_roopa.akaranta_napunsak', 'sanskrit.shabda_roopa.akaranta_stri'] },
        { id: 'up.san.6.ch6', order: 6, title: '[धातु-रूप] परिचय एवं लट् लकार (वर्तमान काल)',                   kgNodeIds: ['sanskrit.dhaatu_roopa.parichay', 'sanskrit.dhaatu_roopa.lat_lakar'] },
        { id: 'up.san.6.ch7', order: 7, title: '[पठन] सूक्तियाँ एवं सुभाषितानि',                                kgNodeIds: ['sanskrit.padya.subhashitani'] },
        { id: 'up.san.6.ch8', order: 8, title: '[पठन] गद्यांश-आधारित शब्दार्थ एवं प्रश्नोत्तर',                 kgNodeIds: ['sanskrit.gadya.shabda_arth_prashna'] },
      ],
    },

    // ── Grade 7 ─────────────────────────────────────────────────────────────
    {
      grade: 7,
      chapters: [
        { id: 'up.san.7.ch1', order: 1, title: '[व्याकरण] कारक एवं विभक्ति — आठ कारकों का परिचय',     kgNodeIds: ['sanskrit.vyakarana.karak_vibhakti'] },
        { id: 'up.san.7.ch2', order: 2, title: '[व्याकरण] उपसर्ग — अर्थ-परिवर्तन और शब्द-निर्माण',    kgNodeIds: ['sanskrit.vyakarana.upasarga'] },
        { id: 'up.san.7.ch3', order: 3, title: '[संधि] परिचय एवं दीर्घ-गुण संधि',                       kgNodeIds: ['sanskrit.sandhi.parichay', 'sanskrit.sandhi.deergha', 'sanskrit.sandhi.guna'] },
        { id: 'up.san.7.ch4', order: 4, title: '[समास] परिचय एवं अव्ययीभाव समास',                       kgNodeIds: ['sanskrit.samasa.parichay', 'sanskrit.samasa.avyayibhava'] },
        { id: 'up.san.7.ch5', order: 5, title: '[शब्द-रूप] सर्वनाम शब्द-रूप: तद्, यद्, एतद्',          kgNodeIds: ['sanskrit.shabda_roopa.sarvanam_tad_yad_etad'] },
        { id: 'up.san.7.ch6', order: 6, title: '[धातु-रूप] लोट् लकार (आज्ञार्थ)',                       kgNodeIds: ['sanskrit.dhaatu_roopa.lot_lakar'] },
        { id: 'up.san.7.ch7', order: 7, title: '[धातु-रूप] प्रमुख धातुएँ: भू और अस् (होना)',            kgNodeIds: ['sanskrit.dhaatu_roopa.bhu_as'] },
        { id: 'up.san.7.ch8', order: 8, title: '[लेखन] अनुवाद: हिन्दी से संस्कृत — परिचय',              kgNodeIds: ['sanskrit.gadya.hindi_se_sanskrit'] },
      ],
    },

    // ── Grade 8 ─────────────────────────────────────────────────────────────
    {
      grade: 8,
      chapters: [
        { id: 'up.san.8.ch1', order: 1, title: '[संधि] स्वर संधि — यण् और अयादि संधि',                 kgNodeIds: ['sanskrit.sandhi.yan', 'sanskrit.sandhi.ayadi'] },
        { id: 'up.san.8.ch2', order: 2, title: '[संधि] व्यंजन संधि और विसर्ग संधि',                    kgNodeIds: ['sanskrit.sandhi.vyanjan', 'sanskrit.sandhi.visarga'] },
        { id: 'up.san.8.ch3', order: 3, title: '[समास] तत्पुरुष और कर्मधारय समास',                     kgNodeIds: ['sanskrit.samasa.tatpurusha', 'sanskrit.samasa.karmadharaya'] },
        { id: 'up.san.8.ch4', order: 4, title: '[समास] द्विगु, द्वंद्व और बहुव्रीहि समास',             kgNodeIds: ['sanskrit.samasa.dvigu', 'sanskrit.samasa.dvandva', 'sanskrit.samasa.bahuvrihi'] },
        { id: 'up.san.8.ch5', order: 5, title: '[शब्द-रूप] इकारांत और उकारांत शब्द (मुनि, गुरु)',      kgNodeIds: ['sanskrit.shabda_roopa.ikaranta_ukaranta'] },
        { id: 'up.san.8.ch6', order: 6, title: '[शब्द-रूप] सर्वनाम शब्द-रूप: अस्मद् और युष्मद्',       kgNodeIds: ['sanskrit.shabda_roopa.asmad_yushmad'] },
        { id: 'up.san.8.ch7', order: 7, title: '[धातु-रूप] लङ् लकार (भूत काल)',                         kgNodeIds: ['sanskrit.dhaatu_roopa.lang_lakar'] },
        { id: 'up.san.8.ch8', order: 8, title: '[धातु-रूप] प्रमुख धातुएँ: गम् और पठ्',                  kgNodeIds: ['sanskrit.dhaatu_roopa.gam_path'] },
        { id: 'up.san.8.ch9', order: 9, title: '[लेखन] अनुवाद: संस्कृत से हिन्दी',                       kgNodeIds: ['sanskrit.gadya.sanskrit_se_hindi'] },
      ],
    },

    // ── Grade 9 ─────────────────────────────────────────────────────────────
    {
      grade: 9,
      chapters: [
        { id: 'up.san.9.ch1', order: 1, title: '[व्याकरण] प्रत्यय — कृत् और तद्धित प्रत्यय का परिचय',  kgNodeIds: ['sanskrit.vyakarana.pratyaya'] },
        { id: 'up.san.9.ch2', order: 2, title: '[व्याकरण] छन्द परिचय — मात्रा, गण और प्रमुख छन्द',     kgNodeIds: ['sanskrit.vyakarana.chhanda_parichay'] },
        { id: 'up.san.9.ch3', order: 3, title: '[शब्द-रूप] सर्वनाम शब्द-रूप: किम् (प्रश्नवाचक)',       kgNodeIds: ['sanskrit.shabda_roopa.sarvanam_kim'] },
        { id: 'up.san.9.ch4', order: 4, title: '[धातु-रूप] लृट् लकार (भविष्य काल)',                     kgNodeIds: ['sanskrit.dhaatu_roopa.lrt_lakar'] },
        { id: 'up.san.9.ch5', order: 5, title: '[धातु-रूप] प्रमुख धातुएँ: कृ और वद्',                   kgNodeIds: ['sanskrit.dhaatu_roopa.kri_vad'] },
        { id: 'up.san.9.ch6', order: 6, title: '[पठन] अपठित गद्यांश अवबोधन',                            kgNodeIds: ['sanskrit.gadya.apathit_avbodh'] },
        { id: 'up.san.9.ch7', order: 7, title: '[पठन] अपठित पद्यांश अवबोधन',                            kgNodeIds: ['sanskrit.padya.apathit_padyansh'] },
        { id: 'up.san.9.ch8', order: 8, title: '[संधि-समास] संधि और समास — पुनरावृत्ति',                kgNodeIds: ['sanskrit.sandhi.parichay', 'sanskrit.samasa.parichay'] },
      ],
    },

    // ── Grade 10 ────────────────────────────────────────────────────────────
    {
      grade: 10,
      chapters: [
        { id: 'up.san.10.ch1', order: 1, title: '[व्याकरण] वाच्य — कर्तृवाच्य, कर्मवाच्य और भाववाच्य',  kgNodeIds: ['sanskrit.vyakarana.vachya'] },
        { id: 'up.san.10.ch2', order: 2, title: '[व्याकरण] वाक्य रचना एवं अनुवाद — हिन्दी-संस्कृत',     kgNodeIds: ['sanskrit.vyakarana.vakya_rachana_anuvad'] },
        { id: 'up.san.10.ch3', order: 3, title: '[धातु-रूप] विधिलिङ् लकार (चाहिए/उचित)',                kgNodeIds: ['sanskrit.dhaatu_roopa.vidhiling_lakar'] },
        { id: 'up.san.10.ch4', order: 4, title: '[लेखन] संवाद लेखन — सरल संस्कृत वार्तालाप',            kgNodeIds: ['sanskrit.gadya.samvad_lekhan'] },
        { id: 'up.san.10.ch5', order: 5, title: '[पठन] छन्दयुक्त पाठ — छन्द-बोध',                       kgNodeIds: ['sanskrit.padya.chhanda_yukt_path'] },
        { id: 'up.san.10.ch6', order: 6, title: '[पठन] श्लोक अर्थ-बोध एवं कण्ठस्थीकरण',                  kgNodeIds: ['sanskrit.padya.shlok_arth_bodh'] },
        { id: 'up.san.10.ch7', order: 7, title: '[संधि] संधि — सम्पूर्ण पुनरावृत्ति',                    kgNodeIds: ['sanskrit.sandhi.deergha', 'sanskrit.sandhi.guna', 'sanskrit.sandhi.yan', 'sanskrit.sandhi.ayadi', 'sanskrit.sandhi.vyanjan', 'sanskrit.sandhi.visarga'] },
        { id: 'up.san.10.ch8', order: 8, title: '[समास] समास — सम्पूर्ण पुनरावृत्ति',                    kgNodeIds: ['sanskrit.samasa.avyayibhava', 'sanskrit.samasa.tatpurusha', 'sanskrit.samasa.karmadharaya', 'sanskrit.samasa.dvigu', 'sanskrit.samasa.dvandva', 'sanskrit.samasa.bahuvrihi'] },
      ],
    },

    // ── Grade 11 ────────────────────────────────────────────────────────────
    {
      grade: 11,
      chapters: [
        { id: 'up.san.11.ch1', order: 1, title: '[शब्द-रूप] संज्ञा शब्द-रूप — सम्पूर्ण पुनरावृत्ति',     kgNodeIds: ['sanskrit.shabda_roopa.akaranta_pum', 'sanskrit.shabda_roopa.akaranta_napunsak', 'sanskrit.shabda_roopa.akaranta_stri', 'sanskrit.shabda_roopa.ikaranta_ukaranta'] },
        { id: 'up.san.11.ch2', order: 2, title: '[शब्द-रूप] सर्वनाम शब्द-रूप — सम्पूर्ण पुनरावृत्ति',    kgNodeIds: ['sanskrit.shabda_roopa.sarvanam_tad_yad_etad', 'sanskrit.shabda_roopa.sarvanam_kim', 'sanskrit.shabda_roopa.asmad_yushmad'] },
        { id: 'up.san.11.ch3', order: 3, title: '[धातु-रूप] सभी लकारों की पुनरावृत्ति',                  kgNodeIds: ['sanskrit.dhaatu_roopa.lat_lakar', 'sanskrit.dhaatu_roopa.lot_lakar', 'sanskrit.dhaatu_roopa.lang_lakar', 'sanskrit.dhaatu_roopa.lrt_lakar', 'sanskrit.dhaatu_roopa.vidhiling_lakar'] },
        { id: 'up.san.11.ch4', order: 4, title: '[व्याकरण] कारक, वाच्य एवं वाक्य रचना — उन्नत अभ्यास',   kgNodeIds: ['sanskrit.vyakarana.karak_vibhakti', 'sanskrit.vyakarana.vachya', 'sanskrit.vyakarana.vakya_rachana_anuvad'] },
        { id: 'up.san.11.ch5', order: 5, title: '[संधि-समास] व्यंजन-विसर्ग संधि और बहुव्रीहि — उन्नत',   kgNodeIds: ['sanskrit.sandhi.vyanjan', 'sanskrit.sandhi.visarga', 'sanskrit.samasa.bahuvrihi'] },
        { id: 'up.san.11.ch6', order: 6, title: '[लेखन] अनुवाद अभ्यास — हिन्दी-संस्कृत (उन्नत)',          kgNodeIds: ['sanskrit.gadya.hindi_se_sanskrit', 'sanskrit.gadya.sanskrit_se_hindi'] },
        { id: 'up.san.11.ch7', order: 7, title: '[पठन] अपठित गद्यांश एवं पद्यांश — वरिष्ठ स्तर',         kgNodeIds: ['sanskrit.gadya.apathit_avbodh', 'sanskrit.padya.apathit_padyansh'] },
      ],
    },

    // ── Grade 12 ────────────────────────────────────────────────────────────
    {
      grade: 12,
      chapters: [
        { id: 'up.san.12.ch1', order: 1, title: '[संधि] संधि — बोर्ड-परीक्षा स्तर पुनरावृत्ति',          kgNodeIds: ['sanskrit.sandhi.deergha', 'sanskrit.sandhi.guna', 'sanskrit.sandhi.yan', 'sanskrit.sandhi.ayadi'] },
        { id: 'up.san.12.ch2', order: 2, title: '[समास] समास — बोर्ड-परीक्षा स्तर पुनरावृत्ति',          kgNodeIds: ['sanskrit.samasa.tatpurusha', 'sanskrit.samasa.karmadharaya', 'sanskrit.samasa.dvigu', 'sanskrit.samasa.dvandva'] },
        { id: 'up.san.12.ch3', order: 3, title: '[शब्द-रूप] शब्द-रूप — बोर्ड-परीक्षा स्तर पुनरावृत्ति',  kgNodeIds: ['sanskrit.shabda_roopa.akaranta_napunsak', 'sanskrit.shabda_roopa.akaranta_stri', 'sanskrit.shabda_roopa.ikaranta_ukaranta', 'sanskrit.shabda_roopa.sarvanam_kim'] },
        { id: 'up.san.12.ch4', order: 4, title: '[धातु-रूप] धातु-रूप — बोर्ड-परीक्षा स्तर पुनरावृत्ति',  kgNodeIds: ['sanskrit.dhaatu_roopa.bhu_as', 'sanskrit.dhaatu_roopa.gam_path', 'sanskrit.dhaatu_roopa.kri_vad', 'sanskrit.dhaatu_roopa.vidhiling_lakar'] },
        { id: 'up.san.12.ch5', order: 5, title: '[व्याकरण] प्रत्यय, उपसर्ग एवं शब्द-निर्माण — पुनरावृत्ति', kgNodeIds: ['sanskrit.vyakarana.upasarga', 'sanskrit.vyakarana.pratyaya'] },
        { id: 'up.san.12.ch6', order: 6, title: '[लेखन] अनुवाद एवं संवाद लेखन — बोर्ड-परीक्षा स्तर',     kgNodeIds: ['sanskrit.gadya.hindi_se_sanskrit', 'sanskrit.gadya.sanskrit_se_hindi', 'sanskrit.gadya.samvad_lekhan'] },
        { id: 'up.san.12.ch7', order: 7, title: '[पठन] अपठित गद्यांश-पद्यांश एवं श्लोक — बोर्ड-परीक्षा स्तर', kgNodeIds: ['sanskrit.gadya.apathit_avbodh', 'sanskrit.gadya.shabda_arth_prashna', 'sanskrit.padya.apathit_padyansh', 'sanskrit.padya.shlok_arth_bodh'] },
      ],
    },

  ],
}

export function getUPSanskritChapters(grade: number) {
  return UP_SANSKRIT_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getUPSanskritChapter(grade: number, chapterId: string) {
  return getUPSanskritChapters(grade).find((c) => c.id === chapterId) ?? null
}
