import type { BoardSubjectCatalog } from './educationTypes'

/**
 * CBSE Hindi — Grades 5–12.
 *
 * Sprint DF: Shared core — Grammar (व्याकरण), Writing (लेखन),
 *   Vocabulary (शब्द भंडार) and Reading Comprehension (पठन).
 *
 * Sprint DG: CBSE Hindi literature chapters added —
 *   Grade 5  : रिमझिम (गद्य + पद्य)
 *   Grade 6  : वसंत भाग–1 + बाल रामकथा
 *   Grade 7  : वसंत भाग–2 + बाल महाभारत कथा
 *   Grade 8  : वसंत भाग–3 + भारत की खोज
 *   Grade 9  : क्षितिज भाग–1 (गद्य + पद्य) + कृतिका भाग–1
 *   Grade 10 : क्षितिज भाग–2 (गद्य + पद्य) + कृतिका भाग–2
 *   Grade 11 : आरोह भाग–1 (गद्य + पद्य) + वितान भाग–1
 *   Grade 12 : आरोह भाग–2 (गद्य + पद्य) + वितान भाग–2
 *
 * Chapter "[Section]" prefixes enable groupChaptersByUnit() grouping.
 * All kgNodeIds reference nodes in hindiKnowledgeGraph.ts.
 */
export const CBSE_HINDI_CATALOG: BoardSubjectCatalog = {
  boardId: 'cbse',
  subjectSlug: 'hindi',
  subjectName: 'Hindi',
  grades: [

    // ── Grade 5 ─────────────────────────────────────────────────────────────
    {
      grade: 5,
      chapters: [
        // ── व्याकरण + लेखन (Sprint DF) ──
        { id: 'cbse.hin.5.ch1',  order: 1,  title: '[व्याकरण] वर्ण-विचार: स्वर, व्यंजन और मात्राएँ',  kgNodeIds: ['hindi.vyakaran.varn_vichar'] },
        { id: 'cbse.hin.5.ch2',  order: 2,  title: '[व्याकरण] संज्ञा और उसके भेद',                     kgNodeIds: ['hindi.vyakaran.sangya'] },
        { id: 'cbse.hin.5.ch3',  order: 3,  title: '[व्याकरण] सर्वनाम',                                 kgNodeIds: ['hindi.vyakaran.sarvanam'] },
        { id: 'cbse.hin.5.ch4',  order: 4,  title: '[व्याकरण] क्रिया और काल — परिचय',                  kgNodeIds: ['hindi.vyakaran.kriya', 'hindi.vyakaran.kaal'] },
        { id: 'cbse.hin.5.ch5',  order: 5,  title: '[व्याकरण] लिंग और वचन',                             kgNodeIds: ['hindi.vyakaran.ling_vachan'] },
        { id: 'cbse.hin.5.ch6',  order: 6,  title: '[शब्द भंडार] पर्यायवाची और विलोम शब्द',            kgNodeIds: ['hindi.shabdavali.paryayvachi_vilom'] },
        { id: 'cbse.hin.5.ch7',  order: 7,  title: '[पठन] अपठित गद्यांश — बोध प्रश्न',                 kgNodeIds: ['hindi.padhna.apathit_gadyansh'] },
        { id: 'cbse.hin.5.ch8',  order: 8,  title: '[लेखन] अनुच्छेद और चित्र वर्णन',                   kgNodeIds: ['hindi.lekhan.anuchhed', 'hindi.lekhan.chitra_varnan'] },
        { id: 'cbse.hin.5.ch9',  order: 9,  title: '[लेखन] संवाद और शुभकामना संदेश',                   kgNodeIds: ['hindi.lekhan.samvaad'] },
        // ── रिमझिम — गद्य (Sprint DG) ──
        { id: 'cbse.hin.5.ch10', order: 10, title: '[रिमझिम] राख की रस्सी (कहानी)',                     kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.5.ch11', order: 11, title: '[रिमझिम] फ़सलों के त्योहार (लेख)',                  kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.5.ch12', order: 12, title: '[रिमझिम] नन्हा फनकार (कहानी)',                      kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'cbse.hin.5.ch13', order: 13, title: '[रिमझिम] डाकिए की कहानी, कँवरसिंह की ज़ुबानी',     kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'cbse.hin.5.ch14', order: 14, title: '[रिमझिम] वे दिन भी क्या दिन थे (कहानी)',            kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.5.ch15', order: 15, title: '[रिमझिम] चुनौती हिमालय की (यात्रा-वृत्तांत)',       kgNodeIds: ['hindi.gadya.yatra_sansmaran', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
        // ── रिमझिम — पद्य (Sprint DG) ──
        { id: 'cbse.hin.5.ch16', order: 16, title: '[रिमझिम] खिलौनेवाला (कविता)',                       kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.hin.5.ch17', order: 17, title: '[रिमझिम] एक माँ की बेबसी (कविता)',                  kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.hin.5.ch18', order: 18, title: '[रिमझिम] बाघ आया उस रात (कविता)',                   kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
      ],
    },

    // ── Grade 6 ─────────────────────────────────────────────────────────────
    {
      grade: 6,
      chapters: [
        // ── व्याकरण + लेखन (Sprint DF) ──
        { id: 'cbse.hin.6.ch1',  order: 1,  title: '[व्याकरण] संज्ञा के भेद (विस्तार)',                kgNodeIds: ['hindi.vyakaran.sangya'] },
        { id: 'cbse.hin.6.ch2',  order: 2,  title: '[व्याकरण] सर्वनाम और विशेषण',                     kgNodeIds: ['hindi.vyakaran.sarvanam', 'hindi.vyakaran.visheshan'] },
        { id: 'cbse.hin.6.ch3',  order: 3,  title: '[व्याकरण] क्रिया और तीनों काल',                   kgNodeIds: ['hindi.vyakaran.kriya', 'hindi.vyakaran.kaal'] },
        { id: 'cbse.hin.6.ch4',  order: 4,  title: '[व्याकरण] लिंग, वचन और विराम-चिह्न',              kgNodeIds: ['hindi.vyakaran.ling_vachan'] },
        { id: 'cbse.hin.6.ch5',  order: 5,  title: '[व्याकरण] अव्यय — परिचय',                         kgNodeIds: ['hindi.vyakaran.avyay'] },
        { id: 'cbse.hin.6.ch6',  order: 6,  title: '[शब्द भंडार] तत्सम और तद्भव शब्द',               kgNodeIds: ['hindi.shabdavali.tatsam_tadbhav'] },
        { id: 'cbse.hin.6.ch7',  order: 7,  title: '[शब्द भंडार] देशज और विदेशी शब्द',               kgNodeIds: ['hindi.shabdavali.deshaj_videshi'] },
        { id: 'cbse.hin.6.ch8',  order: 8,  title: '[पठन] अपठित गद्यांश (कक्षा 6)',                    kgNodeIds: ['hindi.padhna.apathit_gadyansh', 'hindi.padhna.bodh_prashna'] },
        { id: 'cbse.hin.6.ch9',  order: 9,  title: '[लेखन] अनुच्छेद लेखन',                             kgNodeIds: ['hindi.lekhan.anuchhed'] },
        { id: 'cbse.hin.6.ch10', order: 10, title: '[लेखन] अनौपचारिक पत्र',                            kgNodeIds: ['hindi.lekhan.patra_anoupcharik'] },
        // ── वसंत भाग–1 — गद्य (Sprint DG) ──
        { id: 'cbse.hin.6.ch11', order: 11, title: '[वसंत] बचपन — कृष्णा सोबती (संस्मरण)',             kgNodeIds: ['hindi.gadya.yatra_sansmaran', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.6.ch12', order: 12, title: '[वसंत] नादान दोस्त — प्रेमचंद (कहानी)',            kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'cbse.hin.6.ch13', order: 13, title: '[वसंत] अक्षरों का महत्त्व — गुणाकर मुले (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.6.ch14', order: 14, title: '[वसंत] पार नज़र के — जयंत विष्णु नार्लीकर (कहानी)', kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.6.ch15', order: 15, title: '[वसंत] ऐसे–ऐसे — विष्णु प्रभाकर (नाटक)',          kgNodeIds: ['hindi.gadya.natak_ekaanki', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'cbse.hin.6.ch16', order: 16, title: '[वसंत] टिकट–अलबम — सुंदर रामस्वामी (कहानी)',       kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'cbse.hin.6.ch17', order: 17, title: '[वसंत] जो देखकर भी नहीं देखते — हेलन केलर (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.6.ch18', order: 18, title: '[वसंत] संसार पुस्तक है — जवाहरलाल नेहरू (पत्र)',   kgNodeIds: ['hindi.gadya.reportaj_patra', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'cbse.hin.6.ch19', order: 19, title: '[वसंत] लोकगीत — भगवतशरण उपाध्याय (निबंध) और साँस–साँस में बाँस (लेख)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        // ── वसंत भाग–1 — पद्य (Sprint DG) ──
        { id: 'cbse.hin.6.ch20', order: 20, title: '[वसंत] वह चिड़िया जो — केदारनाथ अग्रवाल / चाँद से थोड़ी सी गप्पें — शमशेर (कविताएँ)', kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.hin.6.ch21', order: 21, title: '[वसंत] साथी हाथ बढ़ाना — साहिर लुधियानवी / झाँसी की रानी — सुभद्राकुमारी चौहान (कविताएँ)', kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.hin.6.ch22', order: 22, title: '[वसंत] मैं सबसे छोटी होऊँ — सुमित्रानंदन पंत / वन के मार्ग में — तुलसीदास (कविताएँ)', kgNodeIds: ['hindi.padya.chhayavad', 'hindi.kavya_bodh.bhav_saundarya'] },
        // ── बाल रामकथा — पूरक पाठ (Sprint DG) ──
        { id: 'cbse.hin.6.ch23', order: 23, title: '[बाल रामकथा] अवधपुरी में राम और गुरुकुल में राम (पाठ 1–3)', kgNodeIds: ['hindi.gadya.purak_path', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.6.ch24', order: 24, title: '[बाल रामकथा] जनकपुर में राम — स्वयंवर और विवाह (पाठ 4–6)', kgNodeIds: ['hindi.gadya.purak_path', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'cbse.hin.6.ch25', order: 25, title: '[बाल रामकथा] दो वरदान और वनवास (पाठ 7–9)',                kgNodeIds: ['hindi.gadya.purak_path', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.6.ch26', order: 26, title: '[बाल रामकथा] सीता की खोज, हनुमान और लंका-दहन (पाठ 10–12)', kgNodeIds: ['hindi.gadya.purak_path', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'cbse.hin.6.ch27', order: 27, title: '[बाल रामकथा] राम-रावण युद्ध और अयोध्या में राम (पाठ 13–15)', kgNodeIds: ['hindi.gadya.purak_path', 'hindi.sahitya_vishleshan.vishay_vastu'] },
      ],
    },

    // ── Grade 7 ─────────────────────────────────────────────────────────────
    {
      grade: 7,
      chapters: [
        // ── व्याकरण + लेखन (Sprint DF) ──
        { id: 'cbse.hin.7.ch1',  order: 1,  title: '[व्याकरण] उपसर्ग और प्रत्यय',                      kgNodeIds: ['hindi.vyakaran.upsarg_pratyay'] },
        { id: 'cbse.hin.7.ch2',  order: 2,  title: '[व्याकरण] संधि — परिचय',                           kgNodeIds: ['hindi.vyakaran.sandhi'] },
        { id: 'cbse.hin.7.ch3',  order: 3,  title: '[व्याकरण] समास — परिचय',                           kgNodeIds: ['hindi.vyakaran.samaas'] },
        { id: 'cbse.hin.7.ch4',  order: 4,  title: '[व्याकरण] कारक — विभक्तियाँ',                      kgNodeIds: ['hindi.vyakaran.kaarak'] },
        { id: 'cbse.hin.7.ch5',  order: 5,  title: '[व्याकरण] मुहावरे और लोकोक्तियाँ',                 kgNodeIds: ['hindi.vyakaran.muhavare_lokoktiyaan'] },
        { id: 'cbse.hin.7.ch6',  order: 6,  title: '[शब्द भंडार] अनेकार्थी शब्द',                     kgNodeIds: ['hindi.shabdavali.anekarthi'] },
        { id: 'cbse.hin.7.ch7',  order: 7,  title: '[पठन] अपठित गद्यांश और पद्यांश (कक्षा 7)',          kgNodeIds: ['hindi.padhna.apathit_gadyansh', 'hindi.padhna.bodh_prashna'] },
        { id: 'cbse.hin.7.ch8',  order: 8,  title: '[लेखन] निबंध लेखन — परिचय',                        kgNodeIds: ['hindi.lekhan.nibandh'] },
        { id: 'cbse.hin.7.ch9',  order: 9,  title: '[लेखन] संवाद लेखन',                                kgNodeIds: ['hindi.lekhan.samvaad'] },
        // ── वसंत भाग–2 — गद्य (Sprint DG) ──
        { id: 'cbse.hin.7.ch10', order: 10, title: '[वसंत] दादी माँ — शिवप्रसाद सिंह (कहानी)',         kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'cbse.hin.7.ch11', order: 11, title: '[वसंत] हिमालय की बेटियाँ — नागार्जुन (निबंध)',     kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'cbse.hin.7.ch12', order: 12, title: '[वसंत] मिठाईवाला — भगवतीप्रसाद वाजपेयी (कहानी)',  kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'cbse.hin.7.ch13', order: 13, title: '[वसंत] पापा खो गए — विजय तेंडुलकर (नाटक)',         kgNodeIds: ['hindi.gadya.natak_ekaanki', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.7.ch14', order: 14, title: '[वसंत] चिड़िया की बच्ची — जैनेंद्र कुमार (कहानी)', kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.7.ch15', order: 15, title: '[वसंत] नीलकंठ — महादेवी वर्मा (संस्मरण)',           kgNodeIds: ['hindi.gadya.yatra_sansmaran', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'cbse.hin.7.ch16', order: 16, title: '[वसंत] भोजन एवं खानपान की बदलती तसवीर — प्रयाग शुक्ल (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'cbse.hin.7.ch17', order: 17, title: '[वसंत] वीर कुँवर सिंह — विष्णुशरण दुबे (जीवनी)',   kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.patra_chitran'] },
        // ── वसंत भाग–2 — पद्य (Sprint DG) ──
        { id: 'cbse.hin.7.ch18', order: 18, title: '[वसंत] हम पंछी उन्मुक्त गगन के — शिवमंगल सिंह सुमन / कठपुतली — भवानीप्रसाद मिश्र (कविताएँ)', kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.hin.7.ch19', order: 19, title: '[वसंत] रहीम के दोहे / एक तिनका — हरिऔध / विप्लव-गायन — नवीन (कविताएँ)', kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.hin.7.ch20', order: 20, title: '[वसंत] शाम — एक किसान — सर्वेश्वरदयाल / भोर और बरखा — मीराबाई (कविताएँ)', kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.bhav_saundarya'] },
        // ── बाल महाभारत कथा — पूरक पाठ (Sprint DG) ──
        { id: 'cbse.hin.7.ch21', order: 21, title: '[बाल महाभारत] पांडु, कुंती और कौरवों का जन्म (पाठ 1–4)', kgNodeIds: ['hindi.gadya.purak_path', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'cbse.hin.7.ch22', order: 22, title: '[बाल महाभारत] लाक्षागृह और पांडवों का वनवास (पाठ 5–8)', kgNodeIds: ['hindi.gadya.purak_path', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.7.ch23', order: 23, title: '[बाल महाभारत] द्रौपदी-स्वयंवर से कुरुक्षेत्र-युद्ध तक (पाठ 9–15)', kgNodeIds: ['hindi.gadya.purak_path', 'hindi.sahitya_vishleshan.vishay_vastu'] },
      ],
    },

    // ── Grade 8 ─────────────────────────────────────────────────────────────
    {
      grade: 8,
      chapters: [
        // ── व्याकरण + लेखन (Sprint DF) ──
        { id: 'cbse.hin.8.ch1',  order: 1,  title: '[व्याकरण] संधि — स्वर, व्यंजन और विसर्ग',         kgNodeIds: ['hindi.vyakaran.sandhi'] },
        { id: 'cbse.hin.8.ch2',  order: 2,  title: '[व्याकरण] समास — भेद और विग्रह',                  kgNodeIds: ['hindi.vyakaran.samaas'] },
        { id: 'cbse.hin.8.ch3',  order: 3,  title: '[व्याकरण] वाक्य-भेद — रचना और अर्थ के आधार पर',  kgNodeIds: ['hindi.vyakaran.vakya_bhed'] },
        { id: 'cbse.hin.8.ch4',  order: 4,  title: '[व्याकरण] अव्यय — भेद और प्रयोग',                 kgNodeIds: ['hindi.vyakaran.avyay'] },
        { id: 'cbse.hin.8.ch5',  order: 5,  title: '[शब्द भंडार] शब्द-निर्माण',                       kgNodeIds: ['hindi.shabdavali.shabd_nirman'] },
        { id: 'cbse.hin.8.ch6',  order: 6,  title: '[पठन] अपठित गद्यांश (कक्षा 8)',                    kgNodeIds: ['hindi.padhna.apathit_gadyansh', 'hindi.padhna.bodh_prashna'] },
        { id: 'cbse.hin.8.ch7',  order: 7,  title: '[लेखन] औपचारिक पत्र',                              kgNodeIds: ['hindi.lekhan.patra_oupcharik'] },
        { id: 'cbse.hin.8.ch8',  order: 8,  title: '[लेखन] विज्ञापन लेखन',                             kgNodeIds: ['hindi.lekhan.vigyapan'] },
        { id: 'cbse.hin.8.ch9',  order: 9,  title: '[लेखन] सूचना लेखन',                                kgNodeIds: ['hindi.lekhan.suchna'] },
        // ── वसंत भाग–3 — गद्य (Sprint DG) ──
        { id: 'cbse.hin.8.ch10', order: 10, title: '[वसंत] लाख की चूड़ियाँ — कामतानाथ (कहानी)',        kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'cbse.hin.8.ch11', order: 11, title: '[वसंत] बस की यात्रा — हरिशंकर परसाई (यात्रा-वृत्तांत)', kgNodeIds: ['hindi.gadya.yatra_sansmaran', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'cbse.hin.8.ch12', order: 12, title: '[वसंत] चिट्ठियों की अनूठी दुनिया — अरविंद कुमार सिंह (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.8.ch13', order: 13, title: '[वसंत] क्या निराश हुआ जाए — हजारीप्रसाद द्विवेदी (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.8.ch14', order: 14, title: '[वसंत] कामचोर — इस्मत चुगताई (कहानी)',             kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'cbse.hin.8.ch15', order: 15, title: '[वसंत] अकबरी लोटा — अन्नपूर्णानंद वर्मा (कहानी)', kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'cbse.hin.8.ch16', order: 16, title: '[वसंत] जहाँ पहिया है — पी. साईनाथ (रिपोर्ताज)',    kgNodeIds: ['hindi.gadya.reportaj_patra', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'cbse.hin.8.ch17', order: 17, title: '[वसंत] बाज और साँप — मैक्सिम गोर्की (कहानी)',       kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        // ── वसंत भाग–3 — पद्य (Sprint DG) ──
        { id: 'cbse.hin.8.ch18', order: 18, title: '[वसंत] ध्वनि — सूर्यकांत त्रिपाठी निराला / दीवानों की हस्ती — भगवतीचरण वर्मा (कविताएँ)', kgNodeIds: ['hindi.padya.chhayavad', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.hin.8.ch19', order: 19, title: '[वसंत] कबीर की साखियाँ / सुदामा चरित — नरोत्तमदास / सूरदास के पद (कविताएँ)', kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.hin.8.ch20', order: 20, title: '[वसंत] भगवान के डाकिए — दिनकर / यह सबसे कठिन समय नहीं — जया जादवानी (कविताएँ)', kgNodeIds: ['hindi.padya.pragativad_prayogvad', 'hindi.kavya_bodh.bhav_saundarya'] },
        // ── भारत की खोज — पूरक पाठ (Sprint DG) ──
        { id: 'cbse.hin.8.ch21', order: 21, title: '[भारत की खोज] अहमदनगर का किला — नेहरू (पाठ 1–2)',  kgNodeIds: ['hindi.gadya.purak_path', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.8.ch22', order: 22, title: '[भारत की खोज] सिंधु घाटी से गुप्तकाल — भारत का इतिहास (पाठ 3–5)', kgNodeIds: ['hindi.gadya.purak_path', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'cbse.hin.8.ch23', order: 23, title: '[भारत की खोज] मध्यकाल और आधुनिक भारत (पाठ 6–8)', kgNodeIds: ['hindi.gadya.purak_path', 'hindi.sahitya_vishleshan.samaj_darshan'] },
      ],
    },

    // ── Grade 9 ─────────────────────────────────────────────────────────────
    {
      grade: 9,
      chapters: [
        // ── व्याकरण + लेखन (Sprint DF) ──
        { id: 'cbse.hin.9.ch1',  order: 1,  title: '[व्याकरण] रस — परिचय और भेद',                     kgNodeIds: ['hindi.vyakaran.ras'] },
        { id: 'cbse.hin.9.ch2',  order: 2,  title: '[व्याकरण] अलंकार — परिचय',                        kgNodeIds: ['hindi.vyakaran.alankar'] },
        { id: 'cbse.hin.9.ch3',  order: 3,  title: '[व्याकरण] छंद — मात्रिक छंद',                     kgNodeIds: ['hindi.vyakaran.chhand'] },
        { id: 'cbse.hin.9.ch4',  order: 4,  title: '[व्याकरण] वाक्य-शुद्धि और अशुद्धि-संशोधन',       kgNodeIds: ['hindi.vyakaran.vakya_shuddhi'] },
        { id: 'cbse.hin.9.ch5',  order: 5,  title: '[व्याकरण] कारक (उन्नत) और वाच्य',                 kgNodeIds: ['hindi.vyakaran.kaarak', 'hindi.vyakaran.vakya_bhed'] },
        { id: 'cbse.hin.9.ch6',  order: 6,  title: '[शब्द भंडार] मुहावरे-लोकोक्ति का संदर्भ-प्रयोग', kgNodeIds: ['hindi.shabdavali.muhavare_prayog'] },
        { id: 'cbse.hin.9.ch7',  order: 7,  title: '[पठन] अपठित गद्यांश और पद्यांश (कक्षा 9)',          kgNodeIds: ['hindi.padhna.apathit_gadyansh', 'hindi.padhna.apathit_padyansh'] },
        { id: 'cbse.hin.9.ch8',  order: 8,  title: '[लेखन] निबंध लेखन (विस्तार)',                      kgNodeIds: ['hindi.lekhan.nibandh'] },
        { id: 'cbse.hin.9.ch9',  order: 9,  title: '[लेखन] प्रतिवेदन / रिपोर्ट लेखन',                 kgNodeIds: ['hindi.lekhan.report'] },
        { id: 'cbse.hin.9.ch10', order: 10, title: '[लेखन] लघु कथा लेखन',                              kgNodeIds: ['hindi.lekhan.laghu_katha'] },
        // ── क्षितिज भाग–1 — गद्य (Sprint DG) ──
        { id: 'cbse.hin.9.ch11', order: 11, title: '[क्षितिज] दो बैलों की कथा — प्रेमचंद (कहानी)',      kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.patra_chitran', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.9.ch12', order: 12, title: '[क्षितिज] ल्हासा की ओर — राहुल सांकृत्यायन (यात्रा-वृत्तांत)', kgNodeIds: ['hindi.gadya.yatra_sansmaran', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'cbse.hin.9.ch13', order: 13, title: '[क्षितिज] उपभोक्तावाद की संस्कृति — श्यामाचरण दुबे (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'cbse.hin.9.ch14', order: 14, title: '[क्षितिज] साँवले सपनों की याद — जाबिर हुसेन (संस्मरण)', kgNodeIds: ['hindi.gadya.yatra_sansmaran', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.9.ch15', order: 15, title: '[क्षितिज] नाना साहब की पुत्री देवी मैना को भस्म कर दिया गया — चपला देवी (गद्यांश)', kgNodeIds: ['hindi.gadya.reportaj_patra', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'cbse.hin.9.ch16', order: 16, title: '[क्षितिज] प्रेमचंद के फटे जूते — हरिशंकर परसाई (व्यंग्य)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'cbse.hin.9.ch17', order: 17, title: '[क्षितिज] मेरे बचपन के दिन — महादेवी वर्मा (संस्मरण)', kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'cbse.hin.9.ch18', order: 18, title: '[क्षितिज] एक कुत्ता और एक मैना — हजारीप्रसाद द्विवेदी (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        // ── क्षितिज भाग–1 — पद्य (Sprint DG) ──
        { id: 'cbse.hin.9.ch19', order: 19, title: '[क्षितिज] साखियाँ एवं सबद — कबीर / वाखें — ललद्यद / सवैये — रसखान (पद्य)', kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.bhav_saundarya', 'hindi.kavya_bodh.shilpa_saundarya'] },
        { id: 'cbse.hin.9.ch20', order: 20, title: '[क्षितिज] कैदी और कोकिला — माखनलाल चतुर्वेदी / ग्राम श्री — सुमित्रानंदन पंत (कविताएँ)', kgNodeIds: ['hindi.padya.chhayavad', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.hin.9.ch21', order: 21, title: '[क्षितिज] चाँद से थोड़ी सी गप्पें — शमशेर / मेघ आए — सर्वेश्वरदयाल / बच्चे काम पर जा रहे हैं — राजेश जोशी (कविताएँ)', kgNodeIds: ['hindi.padya.samakaleen', 'hindi.kavya_bodh.bhav_saundarya'] },
        // ── कृतिका भाग–1 — पूरक पाठ (Sprint DG) ──
        { id: 'cbse.hin.9.ch22', order: 22, title: '[कृतिका] इस जल प्रलय में — फणीश्वरनाथ रेणु / माटी वाली — विद्यासागर नौटियाल', kgNodeIds: ['hindi.gadya.purak_path', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.9.ch23', order: 23, title: '[कृतिका] मेरे संग की औरतें — मृदुला गर्ग / रीढ़ की हड्डी — जगदीश चंद्र माथुर (एकांकी)', kgNodeIds: ['hindi.gadya.purak_path', 'hindi.gadya.natak_ekaanki', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'cbse.hin.9.ch24', order: 24, title: '[कृतिका] किस तरह आखिरकार मैं हिंदी में आया — शमशेर बहादुर सिंह', kgNodeIds: ['hindi.gadya.purak_path', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        // ── लेखक परिचय ──
        { id: 'cbse.hin.9.ch25', order: 25, title: '[लेखक परिचय] क्षितिज के लेखकों और कवियों का परिचय', kgNodeIds: ['hindi.kavya_bodh.lekhak_kavi_parichay'] },
      ],
    },

    // ── Grade 10 ────────────────────────────────────────────────────────────
    {
      grade: 10,
      chapters: [
        // ── व्याकरण + लेखन (Sprint DF) ──
        { id: 'cbse.hin.10.ch1',  order: 1,  title: '[व्याकरण] संधि (उन्नत)',                           kgNodeIds: ['hindi.vyakaran.sandhi'] },
        { id: 'cbse.hin.10.ch2',  order: 2,  title: '[व्याकरण] समास (उन्नत)',                           kgNodeIds: ['hindi.vyakaran.samaas'] },
        { id: 'cbse.hin.10.ch3',  order: 3,  title: '[व्याकरण] अलंकार (शब्दालंकार और अर्थालंकार)',     kgNodeIds: ['hindi.vyakaran.alankar'] },
        { id: 'cbse.hin.10.ch4',  order: 4,  title: '[व्याकरण] रस (विस्तार)',                           kgNodeIds: ['hindi.vyakaran.ras'] },
        { id: 'cbse.hin.10.ch5',  order: 5,  title: '[व्याकरण] वाक्य-शुद्धि — परीक्षा-स्तरीय',          kgNodeIds: ['hindi.vyakaran.vakya_shuddhi'] },
        { id: 'cbse.hin.10.ch6',  order: 6,  title: '[शब्द भंडार] अनेकार्थी और पर्यायवाची-विलोम (उन्नत)', kgNodeIds: ['hindi.shabdavali.anekarthi', 'hindi.shabdavali.paryayvachi_vilom'] },
        { id: 'cbse.hin.10.ch7',  order: 7,  title: '[पठन] अपठित गद्यांश और पद्यांश (कक्षा 10)',         kgNodeIds: ['hindi.padhna.apathit_gadyansh', 'hindi.padhna.apathit_padyansh'] },
        { id: 'cbse.hin.10.ch8',  order: 8,  title: '[लेखन] निबंध लेखन (उन्नत)',                        kgNodeIds: ['hindi.lekhan.nibandh'] },
        { id: 'cbse.hin.10.ch9',  order: 9,  title: '[लेखन] विज्ञापन और सूचना (उन्नत)',                 kgNodeIds: ['hindi.lekhan.vigyapan', 'hindi.lekhan.suchna'] },
        { id: 'cbse.hin.10.ch10', order: 10, title: '[लेखन] व्यावसायिक और औपचारिक पत्र',               kgNodeIds: ['hindi.lekhan.patra_oupcharik'] },
        // ── क्षितिज भाग–2 — गद्य (Sprint DG) ──
        { id: 'cbse.hin.10.ch11', order: 11, title: '[क्षितिज] नेताजी का चश्मा — स्वयं प्रकाश (कहानी)', kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.vishay_vastu', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'cbse.hin.10.ch12', order: 12, title: '[क्षितिज] बालगोबिन भगत — रामवृक्ष बेनीपुरी (संस्मरण)', kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'cbse.hin.10.ch13', order: 13, title: '[क्षितिज] लखनवी अंदाज़ — यशपाल (कहानी)',            kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'cbse.hin.10.ch14', order: 14, title: '[क्षितिज] स्त्री शिक्षा के विरोधी कुतर्कों का खंडन — महावीर प्रसाद द्विवेदी (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'cbse.hin.10.ch15', order: 15, title: '[क्षितिज] नौबतखाने में इबादत — यतींद्र मिश्र (जीवनी)', kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.10.ch16', order: 16, title: '[क्षितिज] संस्कृति — भदंत आनंद कौसल्यायन (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.10.ch17', order: 17, title: '[क्षितिज] तताँरा-वामीरो कथा — लीलाधर मंडलोई (कहानी)', kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.vishay_vastu', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'cbse.hin.10.ch18', order: 18, title: '[क्षितिज] पतझड़ में टूटी पत्तियाँ — रवींद्र केलेकर (दो लघुकथाएँ)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.10.ch19', order: 19, title: '[क्षितिज] अब कहाँ दूसरे के दुख से दुखी होने वाले — निदा फ़ाज़ली (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'cbse.hin.10.ch20', order: 20, title: '[क्षितिज] कारतूस — हबीब तनवीर (एकांकी)',              kgNodeIds: ['hindi.gadya.natak_ekaanki', 'hindi.sahitya_vishleshan.patra_chitran'] },
        // ── क्षितिज भाग–2 — पद्य (Sprint DG) ──
        { id: 'cbse.hin.10.ch21', order: 21, title: '[क्षितिज] सूरदास के पद / राम-लक्ष्मण-परशुराम संवाद — तुलसीदास (पद्य)', kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.bhav_saundarya', 'hindi.kavya_bodh.shilpa_saundarya'] },
        { id: 'cbse.hin.10.ch22', order: 22, title: '[क्षितिज] देव के सवैये / आत्मकथ्य — जयशंकर प्रसाद (पद्य)', kgNodeIds: ['hindi.padya.ritikaal', 'hindi.padya.chhayavad', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.hin.10.ch23', order: 23, title: '[क्षितिज] उत्साह और अट नहीं रही — सूर्यकांत त्रिपाठी निराला (पद्य)', kgNodeIds: ['hindi.padya.chhayavad', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.hin.10.ch24', order: 24, title: '[क्षितिज] यह दंतुरित मुसकान / फसल — नागार्जुन / छाया मत छूना — गिरिजाकुमार माथुर (पद्य)', kgNodeIds: ['hindi.padya.pragativad_prayogvad', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.hin.10.ch25', order: 25, title: '[क्षितिज] कन्यादान — ऋतुराज / संगतकार — मंगलेश डबराल (पद्य)',      kgNodeIds: ['hindi.padya.samakaleen', 'hindi.kavya_bodh.bhav_saundarya'] },
        // ── कृतिका भाग–2 — पूरक पाठ (Sprint DG) ──
        { id: 'cbse.hin.10.ch26', order: 26, title: '[कृतिका] माता का अँचल — शिवपूजन सहाय / जॉर्ज पंचम की नाक — कमलेश्वर', kgNodeIds: ['hindi.gadya.purak_path', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.10.ch27', order: 27, title: '[कृतिका] साना-साना हाथ जोड़ि — मधु कांकरिया (यात्रा-वृत्तांत)', kgNodeIds: ['hindi.gadya.purak_path', 'hindi.gadya.yatra_sansmaran', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'cbse.hin.10.ch28', order: 28, title: '[कृतिका] मैं क्यों लिखता हूँ — अज्ञेय',                            kgNodeIds: ['hindi.gadya.purak_path', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        // ── लेखक परिचय ──
        { id: 'cbse.hin.10.ch29', order: 29, title: '[लेखक परिचय] क्षितिज-2 के लेखकों और कवियों का परिचय', kgNodeIds: ['hindi.kavya_bodh.lekhak_kavi_parichay'] },
      ],
    },

    // ── Grade 11 ────────────────────────────────────────────────────────────
    {
      grade: 11,
      chapters: [
        // ── व्याकरण + लेखन (Sprint DF) ──
        { id: 'cbse.hin.11.ch1',  order: 1,  title: '[व्याकरण] अलंकार — संपूर्ण अध्ययन',              kgNodeIds: ['hindi.vyakaran.alankar'] },
        { id: 'cbse.hin.11.ch2',  order: 2,  title: '[व्याकरण] रस — संपूर्ण अध्ययन',                  kgNodeIds: ['hindi.vyakaran.ras'] },
        { id: 'cbse.hin.11.ch3',  order: 3,  title: '[व्याकरण] छंद — मात्रिक और वार्णिक',             kgNodeIds: ['hindi.vyakaran.chhand'] },
        { id: 'cbse.hin.11.ch4',  order: 4,  title: '[व्याकरण] शब्द-शक्ति — अभिधा, लक्षणा, व्यंजना', kgNodeIds: ['hindi.vyakaran.shabd_shakti'] },
        { id: 'cbse.hin.11.ch5',  order: 5,  title: '[व्याकरण] संधि-समास — पुनरावृत्ति और उन्नत',    kgNodeIds: ['hindi.vyakaran.sandhi', 'hindi.vyakaran.samaas'] },
        { id: 'cbse.hin.11.ch6',  order: 6,  title: '[शब्द भंडार] उन्नत शब्द-भंडार',                  kgNodeIds: ['hindi.shabdavali.shabd_nirman', 'hindi.shabdavali.anekarthi'] },
        { id: 'cbse.hin.11.ch7',  order: 7,  title: '[पठन] अपठित गद्यांश और पद्यांश — वरिष्ठ स्तर',    kgNodeIds: ['hindi.padhna.apathit_gadyansh', 'hindi.padhna.apathit_padyansh', 'hindi.padhna.bodh_prashna'] },
        { id: 'cbse.hin.11.ch8',  order: 8,  title: '[लेखन] प्रबंध निबंध',                             kgNodeIds: ['hindi.lekhan.prabandh_nibandh'] },
        { id: 'cbse.hin.11.ch9',  order: 9,  title: '[लेखन] आलेख / फ़ीचर लेखन',                       kgNodeIds: ['hindi.lekhan.aalekh'] },
        { id: 'cbse.hin.11.ch10', order: 10, title: '[लेखन] साक्षात्कार लेखन',                         kgNodeIds: ['hindi.lekhan.report'] },
        { id: 'cbse.hin.11.ch11', order: 11, title: '[लेखन] संपादक को पत्र',                           kgNodeIds: ['hindi.lekhan.sampadak_patra'] },
        // ── आरोह भाग–1 — गद्य (Sprint DG) ──
        { id: 'cbse.hin.11.ch12', order: 12, title: '[आरोह] नमक का दारोगा — प्रेमचंद (कहानी)',         kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.patra_chitran', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.11.ch13', order: 13, title: '[आरोह] मियाँ नसीरुद्दीन — कृष्णा सोबती (रेखाचित्र)', kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'cbse.hin.11.ch14', order: 14, title: '[आरोह] अपू के साथ ढाई साल — सत्यजित राय (संस्मरण)', kgNodeIds: ['hindi.gadya.yatra_sansmaran', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'cbse.hin.11.ch15', order: 15, title: '[आरोह] विदाई संभाषण — बालमुकुंद गुप्त / गलता लोहा — शेखर जोशी (गद्य)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.gadya.kahani', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'cbse.hin.11.ch16', order: 16, title: '[आरोह] स्पीति में बारिश — कृष्णनाथ (यात्रा-वृत्तांत)', kgNodeIds: ['hindi.gadya.yatra_sansmaran', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.11.ch17', order: 17, title: '[आरोह] जामुन का पेड़ — कृष्ण चंदर / भारत माता — जवाहरलाल नेहरू (गद्य)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'cbse.hin.11.ch18', order: 18, title: '[आरोह] रजनी — मन्नू भंडारी (कहानी)',                  kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.patra_chitran', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.11.ch19', order: 19, title: '[आरोह] आत्मा का ताप — सैयद हैदर रज़ा (संस्मरण)',     kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        // ── आरोह भाग–1 — पद्य (Sprint DG) ──
        { id: 'cbse.hin.11.ch20', order: 20, title: '[आरोह] कबीर के पद — हम तो एक एक करि जाना / संतों देखत जग बौराना (पद्य)', kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.bhav_saundarya', 'hindi.kavya_bodh.shilpa_saundarya'] },
        { id: 'cbse.hin.11.ch21', order: 21, title: '[आरोह] मीराबाई के पद — मेरे तो गिरिधर गोपाल (पद्य)', kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.hin.11.ch22', order: 22, title: '[आरोह] पथिक — रामनरेश त्रिपाठी / वे आँखें — सुमित्रानंदन पंत / घर की याद — भवानीप्रसाद मिश्र (पद्य)', kgNodeIds: ['hindi.padya.chhayavad', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.hin.11.ch23', order: 23, title: '[आरोह] चंपा काले काले अच्छर नहीं चीन्हती — त्रिलोचन (पद्य)', kgNodeIds: ['hindi.padya.pragativad_prayogvad', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.hin.11.ch24', order: 24, title: '[आरोह] गजल — दुष्यंत कुमार / सबसे खतरनाक — पाश / आओ मिलकर बचाएँ — निर्मला पुतुल (पद्य)', kgNodeIds: ['hindi.padya.samakaleen', 'hindi.kavya_bodh.bhav_saundarya'] },
        // ── वितान भाग–1 — पूरक पाठ (Sprint DG) ──
        { id: 'cbse.hin.11.ch25', order: 25, title: '[वितान] भारतीय गायिकाओं में बेजोड़: लता मंगेशकर — कुमार गंधर्व', kgNodeIds: ['hindi.gadya.purak_path', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.11.ch26', order: 26, title: '[वितान] राजस्थान की रजत बूँदें — अनुपम मिश्र',       kgNodeIds: ['hindi.gadya.purak_path', 'hindi.gadya.reportaj_patra', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'cbse.hin.11.ch27', order: 27, title: '[वितान] आलो-आँधारि — बेबी हालदार (आत्मकथा-अंश)',    kgNodeIds: ['hindi.gadya.purak_path', 'hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        // ── लेखक-कवि परिचय ──
        { id: 'cbse.hin.11.ch28', order: 28, title: '[लेखक परिचय] आरोह-1 के लेखकों और कवियों का परिचय', kgNodeIds: ['hindi.kavya_bodh.lekhak_kavi_parichay'] },
      ],
    },

    // ── Grade 12 ────────────────────────────────────────────────────────────
    {
      grade: 12,
      chapters: [
        // ── व्याकरण + लेखन (Sprint DF) ──
        { id: 'cbse.hin.12.ch1',  order: 1,  title: '[व्याकरण] रस-अलंकार-छंद — संपूर्ण पुनरावृत्ति',  kgNodeIds: ['hindi.vyakaran.ras', 'hindi.vyakaran.alankar', 'hindi.vyakaran.chhand'] },
        { id: 'cbse.hin.12.ch2',  order: 2,  title: '[व्याकरण] वाक्य-शुद्धि — बोर्ड-परीक्षा स्तर',      kgNodeIds: ['hindi.vyakaran.vakya_shuddhi'] },
        { id: 'cbse.hin.12.ch3',  order: 3,  title: '[व्याकरण] संधि-समास (उन्नत)',                     kgNodeIds: ['hindi.vyakaran.sandhi', 'hindi.vyakaran.samaas'] },
        { id: 'cbse.hin.12.ch4',  order: 4,  title: '[व्याकरण] शब्द-शक्ति (उन्नत)',                   kgNodeIds: ['hindi.vyakaran.shabd_shakti'] },
        { id: 'cbse.hin.12.ch5',  order: 5,  title: '[शब्द भंडार] व्यावहारिक शब्द-भंडार',             kgNodeIds: ['hindi.shabdavali.paryayvachi_vilom', 'hindi.shabdavali.anekarthi', 'hindi.shabdavali.muhavare_prayog'] },
        { id: 'cbse.hin.12.ch6',  order: 6,  title: '[पठन] अपठित गद्यांश और पद्यांश — बोर्ड-परीक्षा',  kgNodeIds: ['hindi.padhna.apathit_gadyansh', 'hindi.padhna.apathit_padyansh', 'hindi.padhna.bodh_prashna'] },
        { id: 'cbse.hin.12.ch7',  order: 7,  title: '[लेखन] प्रबंध निबंध (उन्नत)',                     kgNodeIds: ['hindi.lekhan.prabandh_nibandh'] },
        { id: 'cbse.hin.12.ch8',  order: 8,  title: '[लेखन] व्यावहारिक लेखन',                          kgNodeIds: ['hindi.lekhan.aalekh', 'hindi.lekhan.suchna', 'hindi.lekhan.report'] },
        { id: 'cbse.hin.12.ch9',  order: 9,  title: '[लेखन] संपादक को पत्र (उन्नत)',                   kgNodeIds: ['hindi.lekhan.sampadak_patra'] },
        // ── आरोह भाग–2 — गद्य (Sprint DG) ──
        { id: 'cbse.hin.12.ch10', order: 10, title: '[आरोह] भक्तिन — महादेवी वर्मा (संस्मरण)',         kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.patra_chitran', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'cbse.hin.12.ch11', order: 11, title: '[आरोह] बाजार दर्शन — जैनेंद्र कुमार (निबंध)',     kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.12.ch12', order: 12, title: '[आरोह] काले मेघा पानी दे — धर्मवीर भारती (संस्मरण)', kgNodeIds: ['hindi.gadya.yatra_sansmaran', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.12.ch13', order: 13, title: '[आरोह] चार्ली चैप्लिन यानी हम सब — विष्णु खरे (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'cbse.hin.12.ch14', order: 14, title: '[आरोह] नमक — रज़िया सज्जाद ज़हीर (कहानी)',         kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.vishay_vastu', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        { id: 'cbse.hin.12.ch15', order: 15, title: '[आरोह] शिरीष के फूल — हजारीप्रसाद द्विवेदी (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.12.ch16', order: 16, title: '[आरोह] श्रम-विभाजन और जाति-प्रथा / मेरी कल्पना का आदर्श समाज — भीमराव अंबेडकर (निबंध)', kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        // ── आरोह भाग–2 — पद्य (Sprint DG) ──
        { id: 'cbse.hin.12.ch17', order: 17, title: '[आरोह] आत्मपरिचय, एक गीत — हरिवंशराय बच्चन (पद्य)', kgNodeIds: ['hindi.padya.samakaleen', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.hin.12.ch18', order: 18, title: '[आरोह] पतंग — आलोक धन्वा / कविता के बहाने / बात सीधी थी पर — कुँवर नारायण (पद्य)', kgNodeIds: ['hindi.padya.samakaleen', 'hindi.kavya_bodh.bhav_saundarya', 'hindi.kavya_bodh.shilpa_saundarya'] },
        { id: 'cbse.hin.12.ch19', order: 19, title: '[आरोह] कैमरे में बंद अपाहिज — रघुवीर सहाय / सहर्ष स्वीकारा है — गजानन माधव मुक्तिबोध (पद्य)', kgNodeIds: ['hindi.padya.samakaleen', 'hindi.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.hin.12.ch20', order: 20, title: '[आरोह] उषा — शमशेर बहादुर सिंह / बादल राग — सूर्यकांत त्रिपाठी निराला (पद्य)', kgNodeIds: ['hindi.padya.chhayavad', 'hindi.kavya_bodh.shilpa_saundarya'] },
        { id: 'cbse.hin.12.ch21', order: 21, title: '[आरोह] कवितावली / लक्ष्मण मूर्च्छा और राम का विलाप — तुलसीदास (पद्य)', kgNodeIds: ['hindi.padya.bhaktikaal', 'hindi.kavya_bodh.bhav_saundarya', 'hindi.kavya_bodh.shilpa_saundarya'] },
        { id: 'cbse.hin.12.ch22', order: 22, title: '[आरोह] रुबाइयाँ / गजल — फ़िराक़ गोरखपुरी / छोटा मेरा खेत / बगुलों के पंख — उमाशंकर जोशी (पद्य)', kgNodeIds: ['hindi.padya.samakaleen', 'hindi.kavya_bodh.bhav_saundarya'] },
        // ── वितान भाग–2 — पूरक पाठ (Sprint DG) ──
        { id: 'cbse.hin.12.ch23', order: 23, title: '[वितान] सिल्वर वेडिंग — मनोहर श्याम जोशी / जूझ — आनंद यादव', kgNodeIds: ['hindi.gadya.purak_path', 'hindi.sahitya_vishleshan.patra_chitran'] },
        { id: 'cbse.hin.12.ch24', order: 24, title: '[वितान] अतीत में दबे पाँव — ओम थानवी (यात्रा-वृत्तांत)', kgNodeIds: ['hindi.gadya.purak_path', 'hindi.gadya.yatra_sansmaran', 'hindi.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.hin.12.ch25', order: 25, title: '[वितान] डायरी के पत्ते — ऐनी फ्रैंक',               kgNodeIds: ['hindi.gadya.purak_path', 'hindi.gadya.reportaj_patra', 'hindi.sahitya_vishleshan.samaj_darshan'] },
        // ── लेखक-कवि परिचय ──
        { id: 'cbse.hin.12.ch26', order: 26, title: '[लेखक परिचय] आरोह-2 के लेखकों और कवियों का परिचय', kgNodeIds: ['hindi.kavya_bodh.lekhak_kavi_parichay'] },
      ],
    },

  ],
}

export function getCBSEHindiChapters(grade: number) {
  return CBSE_HINDI_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getCBSEHindiChapter(grade: number, chapterId: string) {
  return getCBSEHindiChapters(grade).find((c) => c.id === chapterId) ?? null
}
