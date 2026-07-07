import type { BoardSubjectCatalog } from './educationTypes'

/**
 * UP Board Hindi — Grades 5–12.
 *
 * Sprint DF: Shared core only — Grammar (व्याकरण), Writing (लेखन),
 * Vocabulary (शब्द भंडार) and Reading Comprehension (पठन).
 *
 * Sprint DI: UP Board literature added —
 *   Grade 5–8 : मंजरी (गद्य + पद्य)
 *   Grade 9–10: हिन्दी — गद्य खंड + पद्य खंड
 *   Grade 11–12: साहित्यिक हिंदी — गद्य गरिमा + काव्यांजलि + नाटक + खंडकाव्य + कहानी
 *
 * Chapter "[Section]" prefixes enable groupChaptersByUnit() grouping.
 * All kgNodeIds reference existing nodes in hindiKnowledgeGraph.ts.
 * Grammar/writing KG nodes are identical to CBSE — by design.
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
        // ── व्याकरण + लेखन (Sprint DF) ──
        { id: 'up.hin.5.ch1',  order: 1,  title: '[व्याकरण] वर्ण-विचार: स्वर, व्यंजन और मात्राएँ',  kgNodeIds: ['hindi.vyakaran.varn_vichar'] },
        { id: 'up.hin.5.ch2',  order: 2,  title: '[व्याकरण] संज्ञा और उसके भेद',                     kgNodeIds: ['hindi.vyakaran.sangya'] },
        { id: 'up.hin.5.ch3',  order: 3,  title: '[व्याकरण] सर्वनाम',                                 kgNodeIds: ['hindi.vyakaran.sarvanam'] },
        { id: 'up.hin.5.ch4',  order: 4,  title: '[व्याकरण] क्रिया और काल — परिचय',                  kgNodeIds: ['hindi.vyakaran.kriya', 'hindi.vyakaran.kaal'] },
        { id: 'up.hin.5.ch5',  order: 5,  title: '[व्याकरण] लिंग और वचन',                             kgNodeIds: ['hindi.vyakaran.ling_vachan'] },
        { id: 'up.hin.5.ch6',  order: 6,  title: '[शब्द भंडार] पर्यायवाची और विलोम शब्द',            kgNodeIds: ['hindi.shabdavali.paryayvachi_vilom'] },
        { id: 'up.hin.5.ch7',  order: 7,  title: '[पठन] अपठित गद्यांश — बोध प्रश्न',                 kgNodeIds: ['hindi.padhna.apathit_gadyansh'] },
        { id: 'up.hin.5.ch8',  order: 8,  title: '[लेखन] अनुच्छेद और चित्र वर्णन',                   kgNodeIds: ['hindi.lekhan.anuchhed', 'hindi.lekhan.chitra_varnan'] },
        { id: 'up.hin.5.ch9',  order: 9,  title: '[लेखन] संवाद और शुभकामना संदेश',                   kgNodeIds: ['hindi.lekhan.samvaad'] },
        // ── मंजरी — गद्य (Sprint DI) ──
        { id: 'up.hin.5.ch10', order: 10, title: '[मंजरी] हार की जीत — सुदर्शन (कहानी)',               kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'up.hin.5.ch11', order: 11, title: '[मंजरी] पंडित ईश्वरचंद्र विद्यासागर (जीवनी-परिचय)', kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.kavya_bodh.lekhak_kavi_parichay'] },
        { id: 'up.hin.5.ch12', order: 12, title: '[मंजरी] मेरा देश (निबंध)',                           kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'up.hin.5.ch13', order: 13, title: '[मंजरी] एकता में बल (नीति कथा)',                     kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        // ── मंजरी — पद्य (Sprint DI) ──
        { id: 'up.hin.5.ch14', order: 14, title: '[मंजरी] पुष्प की अभिलाषा — माखनलाल चतुर्वेदी (कविता)', kgNodeIds: ['hindi.padya.samakaleen', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.5.ch15', order: 15, title: '[मंजरी] बचपन और खेल (बाल कविताएँ)',                  kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.5.ch16', order: 16, title: '[मंजरी] ऋतु-परिवर्तन और प्रकृति (कविता-समूह)',        kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
      ],
    },
    // ── Grade 6 ─────────────────────────────────────────────────────────────
    {
      grade: 6,
      chapters: [
        // ── व्याकरण + लेखन (Sprint DF) ──
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
        // ── मंजरी — गद्य (Sprint DI) ──
        { id: 'up.hin.6.ch11', order: 11, title: '[मंजरी] बड़े भाई साहब — प्रेमचंद (कहानी)',          kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'up.hin.6.ch12', order: 12, title: '[मंजरी] प्रयागराज का कुंभ (यात्रा-वृत्तांत)',        kgNodeIds: ['hindi.gadya.yatra_sansmaran', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'up.hin.6.ch13', order: 13, title: '[मंजरी] महाराणा प्रताप (जीवनी)',                    kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'up.hin.6.ch14', order: 14, title: '[मंजरी] दान का फल (नीति कथा)',                      kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'up.hin.6.ch15', order: 15, title: '[मंजरी] प्रकृति और पर्यावरण (निबंध)',               kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        // ── मंजरी — पद्य (Sprint DI) ──
        { id: 'up.hin.6.ch16', order: 16, title: '[मंजरी] कबीर के दोहे (भक्ति-वाणी)',                kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.6.ch17', order: 17, title: '[मंजरी] मीराबाई के पद (भक्ति कविता)',               kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.6.ch18', order: 18, title: '[मंजरी] देश-प्रेम की कविताएँ (सामयिक)',             kgNodeIds: ['hindi.padya.samakaleen', 'hindi.kavya_bodh.bhav_saundarya'] },
      ],
    },
    // ── Grade 7 ─────────────────────────────────────────────────────────────
    {
      grade: 7,
      chapters: [
        // ── व्याकरण + लेखन (Sprint DF) ──
        { id: 'up.hin.7.ch1',  order: 1,  title: '[व्याकरण] उपसर्ग और प्रत्यय',                      kgNodeIds: ['hindi.vyakaran.upsarg_pratyay'] },
        { id: 'up.hin.7.ch2',  order: 2,  title: '[व्याकरण] संधि — परिचय',                           kgNodeIds: ['hindi.vyakaran.sandhi'] },
        { id: 'up.hin.7.ch3',  order: 3,  title: '[व्याकरण] समास — परिचय',                           kgNodeIds: ['hindi.vyakaran.samaas'] },
        { id: 'up.hin.7.ch4',  order: 4,  title: '[व्याकरण] कारक — विभक्तियाँ',                      kgNodeIds: ['hindi.vyakaran.kaarak'] },
        { id: 'up.hin.7.ch5',  order: 5,  title: '[व्याकरण] मुहावरे और लोकोक्तियाँ',                 kgNodeIds: ['hindi.vyakaran.muhavare_lokoktiyaan'] },
        { id: 'up.hin.7.ch6',  order: 6,  title: '[शब्द भंडार] अनेकार्थी शब्द',                     kgNodeIds: ['hindi.shabdavali.anekarthi'] },
        { id: 'up.hin.7.ch7',  order: 7,  title: '[पठन] अपठित गद्यांश और पद्यांश',                   kgNodeIds: ['hindi.padhna.apathit_gadyansh', 'hindi.padhna.bodh_prashna'] },
        { id: 'up.hin.7.ch8',  order: 8,  title: '[लेखन] निबंध लेखन — परिचय',                        kgNodeIds: ['hindi.lekhan.nibandh'] },
        { id: 'up.hin.7.ch9',  order: 9,  title: '[लेखन] संवाद लेखन',                                kgNodeIds: ['hindi.lekhan.samvaad'] },
        // ── मंजरी — गद्य (Sprint DI) ──
        { id: 'up.hin.7.ch10', order: 10, title: '[मंजरी] नमक का दारोगा — प्रेमचंद (कहानी)',          kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'up.hin.7.ch11', order: 11, title: '[मंजरी] बाज़ार दर्शन — जैनेंद्र कुमार (निबंध)',     kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'up.hin.7.ch12', order: 12, title: '[मंजरी] झाँसी की रानी लक्ष्मीबाई (जीवनी)',          kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'up.hin.7.ch13', order: 13, title: '[मंजरी] पंचतंत्र की नीति कथाएँ',                   kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        // ── मंजरी — पद्य (Sprint DI) ──
        { id: 'up.hin.7.ch14', order: 14, title: '[मंजरी] झाँसी की रानी — सुभद्राकुमारी चौहान (कविता)', kgNodeIds: ['hindi.padya.samakaleen', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.7.ch15', order: 15, title: '[मंजरी] तुलसीदास — रामचरितमानस के पद',              kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.7.ch16', order: 16, title: '[मंजरी] सुमित्रानंदन पंत — प्रकृति की कविताएँ',    kgNodeIds: ['hindi.padya.chhayavad', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.7.ch17', order: 17, title: '[मंजरी] रहीम के दोहे (नीति और भक्ति)',              kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.shilpa_saundarya'] },
      ],
    },
    // ── Grade 8 ─────────────────────────────────────────────────────────────
    {
      grade: 8,
      chapters: [
        // ── व्याकरण + लेखन (Sprint DF) ──
        { id: 'up.hin.8.ch1',  order: 1,  title: '[व्याकरण] संधि — स्वर, व्यंजन और विसर्ग',         kgNodeIds: ['hindi.vyakaran.sandhi'] },
        { id: 'up.hin.8.ch2',  order: 2,  title: '[व्याकरण] समास — भेद और विग्रह',                  kgNodeIds: ['hindi.vyakaran.samaas'] },
        { id: 'up.hin.8.ch3',  order: 3,  title: '[व्याकरण] वाक्य-भेद — रचना और अर्थ के आधार पर',  kgNodeIds: ['hindi.vyakaran.vakya_bhed'] },
        { id: 'up.hin.8.ch4',  order: 4,  title: '[व्याकरण] अव्यय — भेद और प्रयोग',                 kgNodeIds: ['hindi.vyakaran.avyay'] },
        { id: 'up.hin.8.ch5',  order: 5,  title: '[शब्द भंडार] शब्द-निर्माण',                       kgNodeIds: ['hindi.shabdavali.shabd_nirman'] },
        { id: 'up.hin.8.ch6',  order: 6,  title: '[पठन] अपठित गद्यांश',                              kgNodeIds: ['hindi.padhna.apathit_gadyansh', 'hindi.padhna.bodh_prashna'] },
        { id: 'up.hin.8.ch7',  order: 7,  title: '[लेखन] औपचारिक पत्र',                              kgNodeIds: ['hindi.lekhan.patra_oupcharik'] },
        { id: 'up.hin.8.ch8',  order: 8,  title: '[लेखन] विज्ञापन लेखन',                             kgNodeIds: ['hindi.lekhan.vigyapan'] },
        { id: 'up.hin.8.ch9',  order: 9,  title: '[लेखन] सूचना लेखन',                                kgNodeIds: ['hindi.lekhan.suchna'] },
        // ── मंजरी — गद्य (Sprint DI) ──
        { id: 'up.hin.8.ch10', order: 10, title: '[मंजरी] दो बैलों की कथा — प्रेमचंद (कहानी)',        kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'up.hin.8.ch11', order: 11, title: '[मंजरी] भारत माता — जवाहरलाल नेहरू (निबंध)',        kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'up.hin.8.ch12', order: 12, title: '[मंजरी] सुभाष चंद्र बोस (जीवनी)',                  kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'up.hin.8.ch13', order: 13, title: '[मंजरी] एकांकी — नाटक का एक दृश्य',               kgNodeIds: ['hindi.gadya.natak_ekaanki', 'hindi.sahitya_vishleshan.patra_chitran'] },
        // ── मंजरी — पद्य (Sprint DI) ──
        { id: 'up.hin.8.ch14', order: 14, title: '[मंजरी] सूरदास के पद (भक्तिकाल)',                   kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.8.ch15', order: 15, title: '[मंजरी] महादेवी वर्मा — रेखाचित्र और गीत',          kgNodeIds: ['hindi.padya.chhayavad', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.8.ch16', order: 16, title: '[मंजरी] रामधारी सिंह दिनकर — राष्ट्रीय कविताएँ',   kgNodeIds: ['hindi.padya.samakaleen', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.8.ch17', order: 17, title: '[मंजरी] कबीर और तुलसी — भक्ति की दो धाराएँ',       kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.shilpa_saundarya'] },
      ],
    },
    // ── Grade 9 ─────────────────────────────────────────────────────────────
    {
      grade: 9,
      chapters: [
        // ── व्याकरण + लेखन (Sprint DF) ──
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
        // ── गद्य खंड (Sprint DI) ──
        { id: 'up.hin.9.ch11', order: 11, title: '[गद्य] सेवा-मार्ग ही श्रेष्ठ है — महात्मा गाँधी (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'up.hin.9.ch12', order: 12, title: '[गद्य] पुस्तक वार्ता — अज्ञेय (ललित निबंध)',        kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'up.hin.9.ch13', order: 13, title: '[गद्य] गाँव की प्रकृति — फणीश्वर नाथ रेणु (रेखाचित्र)', kgNodeIds: ['hindi.gadya.yatra_sansmaran', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'up.hin.9.ch14', order: 14, title: '[गद्य] ईदगाह — प्रेमचंद (कहानी)',                  kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'up.hin.9.ch15', order: 15, title: '[गद्य] मेरी जीवन-यात्रा — हजारी प्रसाद द्विवेदी (संस्मरण)', kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'up.hin.9.ch16', order: 16, title: '[गद्य] एकांकी — ध्रुवस्वामिनी का अंश (जयशंकर प्रसाद)', kgNodeIds: ['hindi.gadya.natak_ekaanki', 'hindi.sahitya_vishleshan.patra_chitran'] },
        // ── पद्य खंड (Sprint DI) ──
        { id: 'up.hin.9.ch17', order: 17, title: '[पद्य] कबीर — निर्गुण भक्ति और साखियाँ',           kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.9.ch18', order: 18, title: '[पद्य] तुलसीदास — अवधी पद और विनय पत्रिका',        kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.shilpa_saundarya'] },
        { id: 'up.hin.9.ch19', order: 19, title: '[पद्य] सूरदास — भ्रमरगीत और बाल-लीला',             kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.9.ch20', order: 20, title: '[पद्य] मीराबाई — प्रेम और भक्ति के पद',             kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.9.ch21', order: 21, title: '[पद्य] महादेवी वर्मा — छायावादी कविताएँ',           kgNodeIds: ['hindi.padya.chhayavad', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.9.ch22', order: 22, title: '[पद्य] सुमित्रानंदन पंत — प्रकृति और सौंदर्य',      kgNodeIds: ['hindi.padya.chhayavad', 'hindi.kavya_bodh.bhav_saundarya'] },
      ],
    },
    // ── Grade 10 ────────────────────────────────────────────────────────────
    {
      grade: 10,
      chapters: [
        // ── व्याकरण + लेखन (Sprint DF) ──
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
        // ── गद्य खंड (Sprint DI) ──
        { id: 'up.hin.10.ch11', order: 11, title: '[गद्य] धर्म की आड़ — गणेशशंकर विद्यार्थी (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'up.hin.10.ch12', order: 12, title: '[गद्य] भक्तिन — महादेवी वर्मा (रेखाचित्र)',         kgNodeIds: ['hindi.gadya.yatra_sansmaran', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'up.hin.10.ch13', order: 13, title: '[गद्य] पूस की रात — प्रेमचंद (कहानी)',              kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'up.hin.10.ch14', order: 14, title: '[गद्य] अशोक के फूल — हजारी प्रसाद द्विवेदी (ललित निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'up.hin.10.ch15', order: 15, title: '[गद्य] मातृभूमि — जयशंकर प्रसाद (गद्य-काव्य)',     kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'up.hin.10.ch16', order: 16, title: '[गद्य] रिपोर्ताज — फणीश्वर नाथ रेणु (समाज-दर्शन)', kgNodeIds: ['hindi.gadya.reportaj_patra', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        // ── पद्य खंड (Sprint DI) ──
        { id: 'up.hin.10.ch17', order: 17, title: '[पद्य] बिहारी — रीतिकाल के दोहे',                  kgNodeIds: ['hindi.padya.ritikaal', 'hindi.kavya_bodh.shilpa_saundarya'] },
        { id: 'up.hin.10.ch18', order: 18, title: '[पद्य] देव — सवैया और कवित्त (रीतिकाल)',            kgNodeIds: ['hindi.padya.ritikaal', 'hindi.kavya_bodh.shilpa_saundarya'] },
        { id: 'up.hin.10.ch19', order: 19, title: '[पद्य] रामधारी सिंह दिनकर — कुरुक्षेत्र के अंश',  kgNodeIds: ['hindi.padya.samakaleen', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.10.ch20', order: 20, title: '[पद्य] सूर्यकांत त्रिपाठी निराला — राम की शक्तिपूजा (अंश)', kgNodeIds: ['hindi.padya.chhayavad', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.10.ch21', order: 21, title: '[पद्य] मैथिलीशरण गुप्त — भारत-भारती के अंश',       kgNodeIds: ['hindi.padya.samakaleen', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.10.ch22', order: 22, title: '[पद्य] नागार्जुन और केदारनाथ अग्रवाल — प्रगतिवादी कविताएँ', kgNodeIds: ['hindi.padya.pragativad_prayogvad', 'hindi.sahitya_vishleshan.samaj_darshan'] },
      ],
    },
    // ── Grade 11 ────────────────────────────────────────────────────────────
    {
      grade: 11,
      chapters: [
        // ── व्याकरण + लेखन (Sprint DF) ──
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
        // ── गद्य गरिमा (Sprint DI) ──
        { id: 'up.hin.11.ch12', order: 12, title: '[गद्य गरिमा] आत्मनिर्भरता — सरदार पूर्ण सिंह (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'up.hin.11.ch13', order: 13, title: '[गद्य गरिमा] अशोक के फूल — हजारी प्रसाद द्विवेदी (ललित निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'up.hin.11.ch14', order: 14, title: '[गद्य गरिमा] भाषा और बोली — श्यामसुंदर दास (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'up.hin.11.ch15', order: 15, title: '[गद्य गरिमा] मेरे बचपन के दिन — महादेवी वर्मा (संस्मरण)', kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'up.hin.11.ch16', order: 16, title: '[गद्य गरिमा] प्रेमघन की छाया-स्मृति — रामचंद्र शुक्ल (संस्मरण)', kgNodeIds: ['hindi.gadya.yatra_sansmaran', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'up.hin.11.ch17', order: 17, title: '[गद्य गरिमा] राष्ट्र का स्वरूप — जवाहरलाल नेहरू (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        // ── काव्यांजलि (Sprint DI) ──
        { id: 'up.hin.11.ch18', order: 18, title: '[काव्यांजलि] कबीर — ज्ञान और भक्ति की वाणी (साखियाँ एवं पद)', kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.11.ch19', order: 19, title: '[काव्यांजलि] सूरदास — विनय और भ्रमरगीत',          kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.shilpa_saundarya'] },
        { id: 'up.hin.11.ch20', order: 20, title: '[काव्यांजलि] तुलसीदास — कवितावली और विनय पत्रिका', kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.shilpa_saundarya'] },
        { id: 'up.hin.11.ch21', order: 21, title: '[काव्यांजलि] मैथिलीशरण गुप्त — भारत-भारती और पंचवटी', kgNodeIds: ['hindi.padya.samakaleen', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.11.ch22', order: 22, title: '[काव्यांजलि] जयशंकर प्रसाद — कामायनी के अंश',      kgNodeIds: ['hindi.padya.chhayavad', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.11.ch23', order: 23, title: '[काव्यांजलि] सुमित्रानंदन पंत और निराला — छायावादी काव्य', kgNodeIds: ['hindi.padya.chhayavad', 'hindi.kavya_bodh.bhav_saundarya'] },
        // ── नाटक (Sprint DI) ──
        { id: 'up.hin.11.ch24', order: 24, title: '[नाटक] अंधेर नगरी — भारतेंदु हरिश्चंद्र',         kgNodeIds: ['hindi.gadya.natak_ekaanki', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        // ── खंडकाव्य (Sprint DI) ──
        { id: 'up.hin.11.ch25', order: 25, title: '[खंडकाव्य] पंचवटी — मैथिलीशरण गुप्त',             kgNodeIds: ['hindi.padya.samakaleen', 'hindi.kavya_bodh.bhav_saundarya'] },
        // ── कहानी (Sprint DI) ──
        { id: 'up.hin.11.ch26', order: 26, title: '[कहानी] बड़े घर की बेटी और पूस की रात — प्रेमचंद', kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.samaj_darshan'] },
      ],
    },
    // ── Grade 12 ────────────────────────────────────────────────────────────
    {
      grade: 12,
      chapters: [
        // ── व्याकरण + लेखन (Sprint DF) ──
        { id: 'up.hin.12.ch1',  order: 1,  title: '[व्याकरण] रस-अलंकार-छंद — संपूर्ण पुनरावृत्ति',  kgNodeIds: ['hindi.vyakaran.ras', 'hindi.vyakaran.alankar', 'hindi.vyakaran.chhand'] },
        { id: 'up.hin.12.ch2',  order: 2,  title: '[व्याकरण] वाक्य-शुद्धि (उन्नत)',                  kgNodeIds: ['hindi.vyakaran.vakya_shuddhi'] },
        { id: 'up.hin.12.ch3',  order: 3,  title: '[व्याकरण] संधि-समास (उन्नत)',                     kgNodeIds: ['hindi.vyakaran.sandhi', 'hindi.vyakaran.samaas'] },
        { id: 'up.hin.12.ch4',  order: 4,  title: '[व्याकरण] शब्द-शक्ति (उन्नत)',                   kgNodeIds: ['hindi.vyakaran.shabd_shakti'] },
        { id: 'up.hin.12.ch5',  order: 5,  title: '[शब्द भंडार] व्यावहारिक शब्द-भंडार',             kgNodeIds: ['hindi.shabdavali.paryayvachi_vilom', 'hindi.shabdavali.anekarthi', 'hindi.shabdavali.muhavare_prayog'] },
        { id: 'up.hin.12.ch6',  order: 6,  title: '[पठन] अपठित गद्यांश और पद्यांश (उन्नत)',          kgNodeIds: ['hindi.padhna.apathit_gadyansh', 'hindi.padhna.apathit_padyansh', 'hindi.padhna.bodh_prashna'] },
        { id: 'up.hin.12.ch7',  order: 7,  title: '[लेखन] प्रबंध निबंध (उन्नत)',                     kgNodeIds: ['hindi.lekhan.prabandh_nibandh'] },
        { id: 'up.hin.12.ch8',  order: 8,  title: '[लेखन] व्यावहारिक लेखन',                          kgNodeIds: ['hindi.lekhan.aalekh', 'hindi.lekhan.suchna', 'hindi.lekhan.report'] },
        { id: 'up.hin.12.ch9',  order: 9,  title: '[लेखन] संपादक को पत्र (उन्नत)',                   kgNodeIds: ['hindi.lekhan.sampadak_patra'] },
        // ── गद्य गरिमा (Sprint DI) ──
        { id: 'up.hin.12.ch10', order: 10, title: '[गद्य गरिमा] राष्ट्र का स्वरूप — वासुदेव शरण अग्रवाल (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'up.hin.12.ch11', order: 11, title: '[गद्य गरिमा] क्या लिखूँ — पदुमलाल पुन्नालाल बख्शी (ललित निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'up.hin.12.ch12', order: 12, title: '[गद्य गरिमा] ज़िंदगी और जोंक — अमरकांत (कहानी)',  kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'up.hin.12.ch13', order: 13, title: '[गद्य गरिमा] धर्म और समाज — राहुल सांकृत्यायन (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'up.hin.12.ch14', order: 14, title: '[गद्य गरिमा] घर जोगन — महादेवी वर्मा (संस्मरण-रेखाचित्र)', kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'up.hin.12.ch15', order: 15, title: '[गद्य गरिमा] पत्रकारिता और लोकतंत्र (रपट-निबंध)', kgNodeIds: ['hindi.gadya.reportaj_patra', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        // ── काव्यांजलि (Sprint DI) ──
        { id: 'up.hin.12.ch16', order: 16, title: '[काव्यांजलि] केशवदास — रीतिकालीन सवैये और कवित्त', kgNodeIds: ['hindi.padya.ritikaal', 'hindi.kavya_bodh.shilpa_saundarya'] },
        { id: 'up.hin.12.ch17', order: 17, title: '[काव्यांजलि] बिहारी — सतसई के दोहे',               kgNodeIds: ['hindi.padya.ritikaal', 'hindi.kavya_bodh.shilpa_saundarya'] },
        { id: 'up.hin.12.ch18', order: 18, title: '[काव्यांजलि] महादेवी वर्मा — यामा से चयनित कविताएँ', kgNodeIds: ['hindi.padya.chhayavad', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.12.ch19', order: 19, title: '[काव्यांजलि] रामधारी सिंह दिनकर — रश्मिरथी के अंश', kgNodeIds: ['hindi.padya.samakaleen', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'up.hin.12.ch20', order: 20, title: '[काव्यांजलि] नागार्जुन और त्रिलोचन — प्रगतिवादी कविताएँ', kgNodeIds: ['hindi.padya.pragativad_prayogvad', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'up.hin.12.ch21', order: 21, title: '[काव्यांजलि] अज्ञेय और मुक्तिबोध — प्रयोगवाद और नई कविता', kgNodeIds: ['hindi.padya.pragativad_prayogvad', 'hindi.kavya_bodh.shilpa_saundarya'] },
        // ── नाटक (Sprint DI) ──
        { id: 'up.hin.12.ch22', order: 22, title: '[नाटक] स्कंदगुप्त — जयशंकर प्रसाद (अंश)',         kgNodeIds: ['hindi.gadya.natak_ekaanki', 'hindi.sahitya_vishleshan.patra_chitran'] },
        // ── खंडकाव्य (Sprint DI) ──
        { id: 'up.hin.12.ch23', order: 23, title: '[खंडकाव्य] श्रवणकुमार — लक्ष्मीनारायण मिश्र',     kgNodeIds: ['hindi.padya.samakaleen', 'hindi.kavya_bodh.bhav_saundarya'] },
        // ── कहानी (Sprint DI) ──
        { id: 'up.hin.12.ch24', order: 24, title: '[कहानी] उसने कहा था — चंद्रधर शर्मा गुलेरी और अन्य कहानियाँ', kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
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
