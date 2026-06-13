import type { BoardSubjectCatalog } from './educationTypes'

/**
 * UP Board Hindi — Grades 5–12.
 *
 * Sprint DF: Shared core only — Grammar (व्याकरण), Writing (लेखन),
 * Vocabulary (शब्द भंडार) and Reading Comprehension (पठन).
 *
 * Literature (Manjari/Sahityik Hindi prose and poetry) is intentionally
 * excluded. Board-specific literature belongs to a future sprint.
 *
 * Chapter titles use the "[Section]" prefix convention so groupChaptersByUnit()
 * can group them correctly in the navigator.
 *
 * All kgNodeIds reference existing nodes in hindiKnowledgeGraph.ts.
 * Grammar/writing KG nodes are identical to CBSE — this is by design.
 */
export const UP_HINDI_CATALOG: BoardSubjectCatalog = {
  boardId: 'up_board',
  subjectSlug: 'hindi',
  subjectName: 'Hindi',
  grades: [
    // ── Grade 5 ─────────────────────────────────────────────────────────────
    {
      grade: 5,
      chapters: [
        { id: 'up.hin.5.ch1',  order: 1,  title: '[व्याकरण] वर्ण-विचार: स्वर, व्यंजन और मात्राएँ',  kgNodeIds: ['hindi.vyakaran.varn_vichar'] },
        { id: 'up.hin.5.ch2',  order: 2,  title: '[व्याकरण] संज्ञा और उसके भेद',                     kgNodeIds: ['hindi.vyakaran.sangya'] },
        { id: 'up.hin.5.ch3',  order: 3,  title: '[व्याकरण] सर्वनाम',                                 kgNodeIds: ['hindi.vyakaran.sarvanam'] },
        { id: 'up.hin.5.ch4',  order: 4,  title: '[व्याकरण] क्रिया और काल — परिचय',                  kgNodeIds: ['hindi.vyakaran.kriya', 'hindi.vyakaran.kaal'] },
        { id: 'up.hin.5.ch5',  order: 5,  title: '[व्याकरण] लिंग और वचन',                             kgNodeIds: ['hindi.vyakaran.ling_vachan'] },
        { id: 'up.hin.5.ch6',  order: 6,  title: '[शब्द भंडार] पर्यायवाची और विलोम शब्द',            kgNodeIds: ['hindi.shabdavali.paryayvachi_vilom'] },
        { id: 'up.hin.5.ch7',  order: 7,  title: '[पठन] अपठित गद्यांश — बोध प्रश्न',                 kgNodeIds: ['hindi.padhna.apathit_gadyansh'] },
        { id: 'up.hin.5.ch8',  order: 8,  title: '[लेखन] अनुच्छेद और चित्र वर्णन',                   kgNodeIds: ['hindi.lekhan.anuchhed', 'hindi.lekhan.chitra_varnan'] },
        { id: 'up.hin.5.ch9',  order: 9,  title: '[लेखन] संवाद और शुभकामना संदेश',                   kgNodeIds: ['hindi.lekhan.samvaad'] },
      ],
    },
    // ── Grade 6 ─────────────────────────────────────────────────────────────
    {
      grade: 6,
      chapters: [
        { id: 'up.hin.6.ch1',  order: 1,  title: '[व्याकरण] संज्ञा के भेद (विस्तार)',                kgNodeIds: ['hindi.vyakaran.sangya'] },
        { id: 'up.hin.6.ch2',  order: 2,  title: '[व्याकरण] सर्वनाम और विशेषण',                     kgNodeIds: ['hindi.vyakaran.sarvanam', 'hindi.vyakaran.visheshan'] },
        { id: 'up.hin.6.ch3',  order: 3,  title: '[व्याकरण] क्रिया और तीनों काल',                   kgNodeIds: ['hindi.vyakaran.kriya', 'hindi.vyakaran.kaal'] },
        { id: 'up.hin.6.ch4',  order: 4,  title: '[व्याकरण] लिंग, वचन और विराम-चिह्न',              kgNodeIds: ['hindi.vyakaran.ling_vachan'] },
        { id: 'up.hin.6.ch5',  order: 5,  title: '[व्याकरण] अव्यय — परिचय',                         kgNodeIds: ['hindi.vyakaran.avyay'] },
        { id: 'up.hin.6.ch6',  order: 6,  title: '[शब्द भंडार] तत्सम और तद्भव शब्द',               kgNodeIds: ['hindi.shabdavali.tatsam_tadbhav'] },
        { id: 'up.hin.6.ch7',  order: 7,  title: '[शब्द भंडार] देशज और विदेशी शब्द',               kgNodeIds: ['hindi.shabdavali.deshaj_videshi'] },
        { id: 'up.hin.6.ch8',  order: 8,  title: '[पठन] अपठित गद्यांश',                              kgNodeIds: ['hindi.padhna.apathit_gadyansh', 'hindi.padhna.bodh_prashna'] },
        { id: 'up.hin.6.ch9',  order: 9,  title: '[लेखन] अनुच्छेद लेखन',                             kgNodeIds: ['hindi.lekhan.anuchhed'] },
        { id: 'up.hin.6.ch10', order: 10, title: '[लेखन] अनौपचारिक पत्र',                            kgNodeIds: ['hindi.lekhan.patra_anoupcharik'] },
      ],
    },
    // ── Grade 7 ─────────────────────────────────────────────────────────────
    {
      grade: 7,
      chapters: [
        { id: 'up.hin.7.ch1',  order: 1,  title: '[व्याकरण] उपसर्ग और प्रत्यय',                      kgNodeIds: ['hindi.vyakaran.upsarg_pratyay'] },
        { id: 'up.hin.7.ch2',  order: 2,  title: '[व्याकरण] संधि — परिचय',                           kgNodeIds: ['hindi.vyakaran.sandhi'] },
        { id: 'up.hin.7.ch3',  order: 3,  title: '[व्याकरण] समास — परिचय',                           kgNodeIds: ['hindi.vyakaran.samaas'] },
        { id: 'up.hin.7.ch4',  order: 4,  title: '[व्याकरण] कारक — विभक्तियाँ',                      kgNodeIds: ['hindi.vyakaran.kaarak'] },
        { id: 'up.hin.7.ch5',  order: 5,  title: '[व्याकरण] मुहावरे और लोकोक्तियाँ',                 kgNodeIds: ['hindi.vyakaran.muhavare_lokoktiyaan'] },
        { id: 'up.hin.7.ch6',  order: 6,  title: '[शब्द भंडार] अनेकार्थी शब्द',                     kgNodeIds: ['hindi.shabdavali.anekarthi'] },
        { id: 'up.hin.7.ch7',  order: 7,  title: '[पठन] अपठित गद्यांश और पद्यांश',                   kgNodeIds: ['hindi.padhna.apathit_gadyansh', 'hindi.padhna.bodh_prashna'] },
        { id: 'up.hin.7.ch8',  order: 8,  title: '[लेखन] निबंध लेखन — परिचय',                        kgNodeIds: ['hindi.lekhan.nibandh'] },
        { id: 'up.hin.7.ch9',  order: 9,  title: '[लेखन] संवाद लेखन',                                kgNodeIds: ['hindi.lekhan.samvaad'] },
      ],
    },
    // ── Grade 8 ─────────────────────────────────────────────────────────────
    {
      grade: 8,
      chapters: [
        { id: 'up.hin.8.ch1',  order: 1,  title: '[व्याकरण] संधि — स्वर, व्यंजन और विसर्ग',         kgNodeIds: ['hindi.vyakaran.sandhi'] },
        { id: 'up.hin.8.ch2',  order: 2,  title: '[व्याकरण] समास — भेद और विग्रह',                  kgNodeIds: ['hindi.vyakaran.samaas'] },
        { id: 'up.hin.8.ch3',  order: 3,  title: '[व्याकरण] वाक्य-भेद — रचना और अर्थ के आधार पर',  kgNodeIds: ['hindi.vyakaran.vakya_bhed'] },
        { id: 'up.hin.8.ch4',  order: 4,  title: '[व्याकरण] अव्यय — भेद और प्रयोग',                 kgNodeIds: ['hindi.vyakaran.avyay'] },
        { id: 'up.hin.8.ch5',  order: 5,  title: '[शब्द भंडार] शब्द-निर्माण',                       kgNodeIds: ['hindi.shabdavali.shabd_nirman'] },
        { id: 'up.hin.8.ch6',  order: 6,  title: '[पठन] अपठित गद्यांश',                              kgNodeIds: ['hindi.padhna.apathit_gadyansh', 'hindi.padhna.bodh_prashna'] },
        { id: 'up.hin.8.ch7',  order: 7,  title: '[लेखन] औपचारिक पत्र',                              kgNodeIds: ['hindi.lekhan.patra_oupcharik'] },
        { id: 'up.hin.8.ch8',  order: 8,  title: '[लेखन] विज्ञापन लेखन',                             kgNodeIds: ['hindi.lekhan.vigyapan'] },
        { id: 'up.hin.8.ch9',  order: 9,  title: '[लेखन] सूचना लेखन',                                kgNodeIds: ['hindi.lekhan.suchna'] },
      ],
    },
    // ── Grade 9 ─────────────────────────────────────────────────────────────
    {
      grade: 9,
      chapters: [
        { id: 'up.hin.9.ch1',  order: 1,  title: '[व्याकरण] रस — परिचय और भेद',                     kgNodeIds: ['hindi.vyakaran.ras'] },
        { id: 'up.hin.9.ch2',  order: 2,  title: '[व्याकरण] अलंकार — परिचय',                        kgNodeIds: ['hindi.vyakaran.alankar'] },
        { id: 'up.hin.9.ch3',  order: 3,  title: '[व्याकरण] छंद — मात्रिक छंद',                     kgNodeIds: ['hindi.vyakaran.chhand'] },
        { id: 'up.hin.9.ch4',  order: 4,  title: '[व्याकरण] वाक्य-शुद्धि और अशुद्धि-संशोधन',       kgNodeIds: ['hindi.vyakaran.vakya_shuddhi'] },
        { id: 'up.hin.9.ch5',  order: 5,  title: '[व्याकरण] कारक (उन्नत) और वाच्य',                 kgNodeIds: ['hindi.vyakaran.kaarak', 'hindi.vyakaran.vakya_bhed'] },
        { id: 'up.hin.9.ch6',  order: 6,  title: '[शब्द भंडार] मुहावरे-लोकोक्ति का संदर्भ-प्रयोग', kgNodeIds: ['hindi.shabdavali.muhavare_prayog'] },
        { id: 'up.hin.9.ch7',  order: 7,  title: '[पठन] अपठित गद्यांश और पद्यांश',                   kgNodeIds: ['hindi.padhna.apathit_gadyansh', 'hindi.padhna.apathit_padyansh'] },
        { id: 'up.hin.9.ch8',  order: 8,  title: '[लेखन] निबंध लेखन (विस्तार)',                      kgNodeIds: ['hindi.lekhan.nibandh'] },
        { id: 'up.hin.9.ch9',  order: 9,  title: '[लेखन] प्रतिवेदन / रिपोर्ट लेखन',                 kgNodeIds: ['hindi.lekhan.report'] },
        { id: 'up.hin.9.ch10', order: 10, title: '[लेखन] लघु कथा लेखन',                              kgNodeIds: ['hindi.lekhan.laghu_katha'] },
      ],
    },
    // ── Grade 10 ────────────────────────────────────────────────────────────
    {
      grade: 10,
      chapters: [
        { id: 'up.hin.10.ch1',  order: 1,  title: '[व्याकरण] संधि (उन्नत)',                           kgNodeIds: ['hindi.vyakaran.sandhi'] },
        { id: 'up.hin.10.ch2',  order: 2,  title: '[व्याकरण] समास (उन्नत)',                           kgNodeIds: ['hindi.vyakaran.samaas'] },
        { id: 'up.hin.10.ch3',  order: 3,  title: '[व्याकरण] अलंकार (शब्दालंकार और अर्थालंकार)',     kgNodeIds: ['hindi.vyakaran.alankar'] },
        { id: 'up.hin.10.ch4',  order: 4,  title: '[व्याकरण] रस (विस्तार)',                           kgNodeIds: ['hindi.vyakaran.ras'] },
        { id: 'up.hin.10.ch5',  order: 5,  title: '[व्याकरण] वाक्य-शुद्धि (उन्नत)',                  kgNodeIds: ['hindi.vyakaran.vakya_shuddhi'] },
        { id: 'up.hin.10.ch6',  order: 6,  title: '[शब्द भंडार] अनेकार्थी और पर्यायवाची-विलोम (उन्नत)', kgNodeIds: ['hindi.shabdavali.anekarthi', 'hindi.shabdavali.paryayvachi_vilom'] },
        { id: 'up.hin.10.ch7',  order: 7,  title: '[पठन] अपठित गद्यांश और पद्यांश',                   kgNodeIds: ['hindi.padhna.apathit_gadyansh', 'hindi.padhna.apathit_padyansh'] },
        { id: 'up.hin.10.ch8',  order: 8,  title: '[लेखन] निबंध लेखन (उन्नत)',                        kgNodeIds: ['hindi.lekhan.nibandh'] },
        { id: 'up.hin.10.ch9',  order: 9,  title: '[लेखन] विज्ञापन और सूचना (उन्नत)',                 kgNodeIds: ['hindi.lekhan.vigyapan', 'hindi.lekhan.suchna'] },
        { id: 'up.hin.10.ch10', order: 10, title: '[लेखन] व्यावसायिक और औपचारिक पत्र',               kgNodeIds: ['hindi.lekhan.patra_oupcharik'] },
      ],
    },
    // ── Grade 11 ────────────────────────────────────────────────────────────
    {
      grade: 11,
      chapters: [
        { id: 'up.hin.11.ch1',  order: 1,  title: '[व्याकरण] अलंकार — संपूर्ण अध्ययन',              kgNodeIds: ['hindi.vyakaran.alankar'] },
        { id: 'up.hin.11.ch2',  order: 2,  title: '[व्याकरण] रस — संपूर्ण अध्ययन',                  kgNodeIds: ['hindi.vyakaran.ras'] },
        { id: 'up.hin.11.ch3',  order: 3,  title: '[व्याकरण] छंद — मात्रिक और वार्णिक',             kgNodeIds: ['hindi.vyakaran.chhand'] },
        { id: 'up.hin.11.ch4',  order: 4,  title: '[व्याकरण] शब्द-शक्ति — अभिधा, लक्षणा, व्यंजना', kgNodeIds: ['hindi.vyakaran.shabd_shakti'] },
        { id: 'up.hin.11.ch5',  order: 5,  title: '[व्याकरण] संधि-समास — पुनरावृत्ति और उन्नत',    kgNodeIds: ['hindi.vyakaran.sandhi', 'hindi.vyakaran.samaas'] },
        { id: 'up.hin.11.ch6',  order: 6,  title: '[शब्द भंडार] उन्नत शब्द-भंडार',                  kgNodeIds: ['hindi.shabdavali.shabd_nirman', 'hindi.shabdavali.anekarthi'] },
        { id: 'up.hin.11.ch7',  order: 7,  title: '[पठन] अपठित गद्यांश और पद्यांश (उन्नत)',          kgNodeIds: ['hindi.padhna.apathit_gadyansh', 'hindi.padhna.apathit_padyansh', 'hindi.padhna.bodh_prashna'] },
        { id: 'up.hin.11.ch8',  order: 8,  title: '[लेखन] प्रबंध निबंध',                             kgNodeIds: ['hindi.lekhan.prabandh_nibandh'] },
        { id: 'up.hin.11.ch9',  order: 9,  title: '[लेखन] आलेख / फ़ीचर लेखन',                       kgNodeIds: ['hindi.lekhan.aalekh'] },
        { id: 'up.hin.11.ch10', order: 10, title: '[लेखन] साक्षात्कार लेखन',                         kgNodeIds: ['hindi.lekhan.report'] },
        { id: 'up.hin.11.ch11', order: 11, title: '[लेखन] संपादक को पत्र',                           kgNodeIds: ['hindi.lekhan.sampadak_patra'] },
      ],
    },
    // ── Grade 12 ────────────────────────────────────────────────────────────
    {
      grade: 12,
      chapters: [
        { id: 'up.hin.12.ch1',  order: 1,  title: '[व्याकरण] रस-अलंकार-छंद — संपूर्ण पुनरावृत्ति',  kgNodeIds: ['hindi.vyakaran.ras', 'hindi.vyakaran.alankar', 'hindi.vyakaran.chhand'] },
        { id: 'up.hin.12.ch2',  order: 2,  title: '[व्याकरण] वाक्य-शुद्धि (उन्नत)',                  kgNodeIds: ['hindi.vyakaran.vakya_shuddhi'] },
        { id: 'up.hin.12.ch3',  order: 3,  title: '[व्याकरण] संधि-समास (उन्नत)',                     kgNodeIds: ['hindi.vyakaran.sandhi', 'hindi.vyakaran.samaas'] },
        { id: 'up.hin.12.ch4',  order: 4,  title: '[व्याकरण] शब्द-शक्ति (उन्नत)',                   kgNodeIds: ['hindi.vyakaran.shabd_shakti'] },
        { id: 'up.hin.12.ch5',  order: 5,  title: '[शब्द भंडार] व्यावहारिक शब्द-भंडार',             kgNodeIds: ['hindi.shabdavali.paryayvachi_vilom', 'hindi.shabdavali.anekarthi', 'hindi.shabdavali.muhavare_prayog'] },
        { id: 'up.hin.12.ch6',  order: 6,  title: '[पठन] अपठित गद्यांश और पद्यांश (उन्नत)',          kgNodeIds: ['hindi.padhna.apathit_gadyansh', 'hindi.padhna.apathit_padyansh', 'hindi.padhna.bodh_prashna'] },
        { id: 'up.hin.12.ch7',  order: 7,  title: '[लेखन] प्रबंध निबंध (उन्नत)',                     kgNodeIds: ['hindi.lekhan.prabandh_nibandh'] },
        { id: 'up.hin.12.ch8',  order: 8,  title: '[लेखन] व्यावहारिक लेखन',                          kgNodeIds: ['hindi.lekhan.aalekh', 'hindi.lekhan.suchna', 'hindi.lekhan.report'] },
        { id: 'up.hin.12.ch9',  order: 9,  title: '[लेखन] संपादक को पत्र (उन्नत)',                   kgNodeIds: ['hindi.lekhan.sampadak_patra'] },
      ],
    },
  ],
}

export function getUPHindiChapters(grade: number) {
  return UP_HINDI_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getUPHindiChapter(grade: number, chapterId: string) {
  return getUPHindiChapters(grade).find((c) => c.id === chapterId) ?? null
}
