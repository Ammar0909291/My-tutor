import type { BoardSubjectCatalog } from './educationTypes'

/**
 * CBSE Sanskrit — Grades 6–12.
 *
 * Sprint DL: Architecture + Core — Grammar (व्याकरण), Sandhi (संधि),
 *   Samasa (समास), Shabda-roopa (शब्द-रूप), Dhaatu-roopa (धातु-रूप) and
 *   comprehension/translation (गद्य/पद्य).
 *
 * Sprint DM: CBSE-specific literature readers — Ruchira (Grades 6–8),
 *   Shemushi (Grades 9–10) and Bhaswati (Grades 11–12). These chapters
 *   are CBSE-only and are NOT mirrored to upSanskritCatalog.ts.
 *
 * Shared core (grammar chapters only): chapter titles and kgNodeIds are
 * identical to upSanskritCatalog.ts by design — only the `id` prefix
 * differs (cbse.san.X.chN vs up.san.X.chN).
 *
 * Chapter "[Section]" prefixes enable groupChaptersByUnit() grouping.
 * All kgNodeIds reference nodes in sanskritKnowledgeGraph.ts.
 */
export const CBSE_SANSKRIT_CATALOG: BoardSubjectCatalog = {
  boardId: 'cbse',
  subjectSlug: 'sanskrit',
  subjectName: 'Sanskrit',
  grades: [

    // ── Grade 6 ─────────────────────────────────────────────────────────────
    {
      grade: 6,
      chapters: [
        { id: 'cbse.san.6.ch1', order: 1, title: '[वर्ण एवं शब्द] वर्ण विचार — स्वर, व्यंजन और उच्चारण',           kgNodeIds: ['sanskrit.vyakarana.varna_vichar'] },
        { id: 'cbse.san.6.ch2', order: 2, title: '[वर्ण एवं शब्द] शब्द भेद — सुबन्त, तिङन्त और अव्यय',             kgNodeIds: ['sanskrit.vyakarana.shabda_bhed'] },
        { id: 'cbse.san.6.ch3', order: 3, title: '[वर्ण एवं शब्द] लिंग और वचन का परिचय',                          kgNodeIds: ['sanskrit.vyakarana.linga', 'sanskrit.vyakarana.vachana'] },
        { id: 'cbse.san.6.ch4', order: 4, title: '[शब्द-रूप] परिचय एवं अकारांत पुंलिंग (राम-प्रकार)',             kgNodeIds: ['sanskrit.shabda_roopa.parichay', 'sanskrit.shabda_roopa.akaranta_pum'] },
        { id: 'cbse.san.6.ch5', order: 5, title: '[शब्द-रूप] अकारांत नपुंसकलिंग (फल) और आकारांत स्त्रीलिंग (लता)', kgNodeIds: ['sanskrit.shabda_roopa.akaranta_napunsak', 'sanskrit.shabda_roopa.akaranta_stri'] },
        { id: 'cbse.san.6.ch6', order: 6, title: '[धातु-रूप] परिचय एवं लट् लकार (वर्तमान काल)',                   kgNodeIds: ['sanskrit.dhaatu_roopa.parichay', 'sanskrit.dhaatu_roopa.lat_lakar'] },
        { id: 'cbse.san.6.ch7', order: 7, title: '[पठन] सूक्तियाँ एवं सुभाषितानि',                                kgNodeIds: ['sanskrit.padya.subhashitani'] },
        { id: 'cbse.san.6.ch8', order: 8, title: '[पठन] गद्यांश-आधारित शब्दार्थ एवं प्रश्नोत्तर',                 kgNodeIds: ['sanskrit.gadya.shabda_arth_prashna'] },
        // ── [रुचिरा] गद्य-पद्य-सुभाषित अंश (Sprint DM) ──
        { id: 'cbse.san.6.ch9',  order: 9,  title: '[रुचिरा] विद्यालयः (गद्य)',          kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.6.ch10', order: 10, title: '[रुचिरा] वृक्षाः (गद्य)',            kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.6.ch11', order: 11, title: '[रुचिरा] समुद्रतटः (गद्य)',          kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.6.ch12', order: 12, title: '[रुचिरा] बकस्य प्रतीकारः (गद्य-कथा)', kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.6.ch13', order: 13, title: '[रुचिरा] सूक्तिस्तबकः (सुभाषित)',    kgNodeIds: ['sanskrit.padya.subhashitani', 'sanskrit.kavya_bodh.shlok_vyakhya'] },
        { id: 'cbse.san.6.ch14', order: 14, title: '[रुचिरा] क्रीडास्पर्धा (गद्य)',       kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.6.ch15', order: 15, title: '[रुचिरा] कृषिकाः कर्मवीराः (गद्य)',  kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.6.ch16', order: 16, title: '[रुचिरा] पुष्पोत्सवः (गद्य)',        kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.6.ch17', order: 17, title: '[रुचिरा] दशमः त्वम् असि (पद्य)',     kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.san.6.ch18', order: 18, title: '[रुचिरा] विमानयानं रचयाम (गद्य)',    kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.6.ch19', order: 19, title: '[रुचिरा] अहह आः च (पद्य)',           kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.san.6.ch20', order: 20, title: '[रुचिरा] मातुलचन्द्र (गद्य)',        kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran'] },
      ],
    },

    // ── Grade 7 ─────────────────────────────────────────────────────────────
    {
      grade: 7,
      chapters: [
        { id: 'cbse.san.7.ch1', order: 1, title: '[व्याकरण] कारक एवं विभक्ति — आठ कारकों का परिचय',     kgNodeIds: ['sanskrit.vyakarana.karak_vibhakti'] },
        { id: 'cbse.san.7.ch2', order: 2, title: '[व्याकरण] उपसर्ग — अर्थ-परिवर्तन और शब्द-निर्माण',    kgNodeIds: ['sanskrit.vyakarana.upasarga'] },
        { id: 'cbse.san.7.ch3', order: 3, title: '[संधि] परिचय एवं दीर्घ-गुण संधि',                       kgNodeIds: ['sanskrit.sandhi.parichay', 'sanskrit.sandhi.deergha', 'sanskrit.sandhi.guna'] },
        { id: 'cbse.san.7.ch4', order: 4, title: '[समास] परिचय एवं अव्ययीभाव समास',                       kgNodeIds: ['sanskrit.samasa.parichay', 'sanskrit.samasa.avyayibhava'] },
        { id: 'cbse.san.7.ch5', order: 5, title: '[शब्द-रूप] सर्वनाम शब्द-रूप: तद्, यद्, एतद्',          kgNodeIds: ['sanskrit.shabda_roopa.sarvanam_tad_yad_etad'] },
        { id: 'cbse.san.7.ch6', order: 6, title: '[धातु-रूप] लोट् लकार (आज्ञार्थ)',                       kgNodeIds: ['sanskrit.dhaatu_roopa.lot_lakar'] },
        { id: 'cbse.san.7.ch7', order: 7, title: '[धातु-रूप] प्रमुख धातुएँ: भू और अस् (होना)',            kgNodeIds: ['sanskrit.dhaatu_roopa.bhu_as'] },
        { id: 'cbse.san.7.ch8', order: 8, title: '[लेखन] अनुवाद: हिन्दी से संस्कृत — परिचय',              kgNodeIds: ['sanskrit.gadya.hindi_se_sanskrit'] },
        // ── [रुचिरा] गद्य-पद्य-सुभाषित अंश (Sprint DM) ──
        { id: 'cbse.san.7.ch9',  order: 9,  title: '[रुचिरा] सुभाषितानि (सुभाषित)',                kgNodeIds: ['sanskrit.padya.subhashitani', 'sanskrit.kavya_bodh.shlok_vyakhya'] },
        { id: 'cbse.san.7.ch10', order: 10, title: '[रुचिरा] दुर्बुद्धिः विनश्यति (गद्य-नीतिकथा)', kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.7.ch11', order: 11, title: '[रुचिरा] स्वावलम्बनम् (गद्य-निबन्ध)',          kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.7.ch12', order: 12, title: '[रुचिरा] हास्यबालकविसम्मेलनम् (पद्य)',         kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.san.7.ch13', order: 13, title: '[रुचिरा] पण्डिता रमाबाई (गद्य-जीवनी)',         kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.kavya_bodh.lekhak_kavi_parichay'] },
        { id: 'cbse.san.7.ch14', order: 14, title: '[रुचिरा] सदाचारः (गद्य-नीति)',                 kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.7.ch15', order: 15, title: '[रुचिरा] संकल्पः सिद्धिदायकः (गद्य)',          kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.7.ch16', order: 16, title: '[रुचिरा] त्रिवर्णः ध्वजः (गद्य)',               kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.7.ch17', order: 17, title: '[रुचिरा] अहमपि विद्यालयं गमिष्यामि (पद्य)',     kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.san.7.ch18', order: 18, title: '[रुचिरा] विश्वबन्धुत्वम् (गद्य)',               kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.7.ch19', order: 19, title: '[रुचिरा] समवायो हि दुर्जयः (गद्य-नीति)',        kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.7.ch20', order: 20, title: '[रुचिरा] विद्याधनम् (सुभाषित)',                 kgNodeIds: ['sanskrit.padya.subhashitani', 'sanskrit.kavya_bodh.shlok_vyakhya'] },
        { id: 'cbse.san.7.ch21', order: 21, title: '[रुचिरा] अमृतं संस्कृतम् (गद्य)',               kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.7.ch22', order: 22, title: '[रुचिरा] अनारिकायाः जिज्ञासा (गद्य-कथा)',       kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.7.ch23', order: 23, title: '[रुचिरा] लालनगीतम् (पद्य)',                     kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.bhav_saundarya'] },
      ],
    },

    // ── Grade 8 ─────────────────────────────────────────────────────────────
    {
      grade: 8,
      chapters: [
        { id: 'cbse.san.8.ch1', order: 1, title: '[संधि] स्वर संधि — यण् और अयादि संधि',                 kgNodeIds: ['sanskrit.sandhi.yan', 'sanskrit.sandhi.ayadi'] },
        { id: 'cbse.san.8.ch2', order: 2, title: '[संधि] व्यंजन संधि और विसर्ग संधि',                    kgNodeIds: ['sanskrit.sandhi.vyanjan', 'sanskrit.sandhi.visarga'] },
        { id: 'cbse.san.8.ch3', order: 3, title: '[समास] तत्पुरुष और कर्मधारय समास',                     kgNodeIds: ['sanskrit.samasa.tatpurusha', 'sanskrit.samasa.karmadharaya'] },
        { id: 'cbse.san.8.ch4', order: 4, title: '[समास] द्विगु, द्वंद्व और बहुव्रीहि समास',             kgNodeIds: ['sanskrit.samasa.dvigu', 'sanskrit.samasa.dvandva', 'sanskrit.samasa.bahuvrihi'] },
        { id: 'cbse.san.8.ch5', order: 5, title: '[शब्द-रूप] इकारांत और उकारांत शब्द (मुनि, गुरु)',      kgNodeIds: ['sanskrit.shabda_roopa.ikaranta_ukaranta'] },
        { id: 'cbse.san.8.ch6', order: 6, title: '[शब्द-रूप] सर्वनाम शब्द-रूप: अस्मद् और युष्मद्',       kgNodeIds: ['sanskrit.shabda_roopa.asmad_yushmad'] },
        { id: 'cbse.san.8.ch7', order: 7, title: '[धातु-रूप] लङ् लकार (भूत काल)',                         kgNodeIds: ['sanskrit.dhaatu_roopa.lang_lakar'] },
        { id: 'cbse.san.8.ch8', order: 8, title: '[धातु-रूप] प्रमुख धातुएँ: गम् और पठ्',                  kgNodeIds: ['sanskrit.dhaatu_roopa.gam_path'] },
        { id: 'cbse.san.8.ch9', order: 9, title: '[लेखन] अनुवाद: संस्कृत से हिन्दी',                       kgNodeIds: ['sanskrit.gadya.sanskrit_se_hindi'] },
        // ── [रुचिरा] गद्य-पद्य-सुभाषित अंश (Sprint DM) ──
        { id: 'cbse.san.8.ch10', order: 10, title: '[रुचिरा] सुभाषितानि (सुभाषित)',                          kgNodeIds: ['sanskrit.padya.subhashitani', 'sanskrit.kavya_bodh.shlok_vyakhya'] },
        { id: 'cbse.san.8.ch11', order: 11, title: '[रुचिरा] बिलस्य वाणी न कदापि मे श्रुता (गद्य-नीतिकथा)',  kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.8.ch12', order: 12, title: '[रुचिरा] डिजीभारतम् (गद्य)',                              kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.8.ch13', order: 13, title: '[रुचिरा] सदैव पुरतो निधेहि चरणम् (पद्य)',                kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.san.8.ch14', order: 14, title: '[रुचिरा] कण्टकेनैव कण्टकम् (गद्य-नीति)',                 kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.8.ch15', order: 15, title: '[रुचिरा] गृहं शून्यं सुतां विना (गद्य-कथा)',             kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.8.ch16', order: 16, title: '[रुचिरा] भारतजनताऽहम् (पद्य)',                           kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.san.8.ch17', order: 17, title: '[रुचिरा] संसारसागरस्य नायकाः (गद्य)',                    kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.kavya_bodh.lekhak_kavi_parichay'] },
        { id: 'cbse.san.8.ch18', order: 18, title: '[रुचिरा] सप्तभगिन्यः (गद्य)',                            kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.8.ch19', order: 19, title: '[रुचिरा] नीतिनवनीतम् (सुभाषित)',                         kgNodeIds: ['sanskrit.padya.subhashitani', 'sanskrit.kavya_bodh.shlok_vyakhya'] },
        { id: 'cbse.san.8.ch20', order: 20, title: '[रुचिरा] सावित्रीबाई फुले (गद्य-जीवनी)',                 kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.kavya_bodh.lekhak_kavi_parichay'] },
        { id: 'cbse.san.8.ch21', order: 21, title: '[रुचिरा] कः रक्षति कः रक्षितः (गद्य-कथा)',               kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.8.ch22', order: 22, title: '[रुचिरा] क्षितौ राजते भारतस्वर्णभूमिः (पद्य)',           kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.san.8.ch23', order: 23, title: '[रुचिरा] आर्यभटः (गद्य-जीवनी)',                          kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.kavya_bodh.lekhak_kavi_parichay'] },
      ],
    },

    // ── Grade 9 ─────────────────────────────────────────────────────────────
    {
      grade: 9,
      chapters: [
        { id: 'cbse.san.9.ch1', order: 1, title: '[व्याकरण] प्रत्यय — कृत् और तद्धित प्रत्यय का परिचय',  kgNodeIds: ['sanskrit.vyakarana.pratyaya'] },
        { id: 'cbse.san.9.ch2', order: 2, title: '[व्याकरण] छन्द परिचय — मात्रा, गण और प्रमुख छन्द',     kgNodeIds: ['sanskrit.vyakarana.chhanda_parichay'] },
        { id: 'cbse.san.9.ch3', order: 3, title: '[शब्द-रूप] सर्वनाम शब्द-रूप: किम् (प्रश्नवाचक)',       kgNodeIds: ['sanskrit.shabda_roopa.sarvanam_kim'] },
        { id: 'cbse.san.9.ch4', order: 4, title: '[धातु-रूप] लृट् लकार (भविष्य काल)',                     kgNodeIds: ['sanskrit.dhaatu_roopa.lrt_lakar'] },
        { id: 'cbse.san.9.ch5', order: 5, title: '[धातु-रूप] प्रमुख धातुएँ: कृ और वद्',                   kgNodeIds: ['sanskrit.dhaatu_roopa.kri_vad'] },
        { id: 'cbse.san.9.ch6', order: 6, title: '[पठन] अपठित गद्यांश अवबोधन',                            kgNodeIds: ['sanskrit.gadya.apathit_avbodh'] },
        { id: 'cbse.san.9.ch7', order: 7, title: '[पठन] अपठित पद्यांश अवबोधन',                            kgNodeIds: ['sanskrit.padya.apathit_padyansh'] },
        { id: 'cbse.san.9.ch8', order: 8, title: '[संधि-समास] संधि और समास — पुनरावृत्ति',                kgNodeIds: ['sanskrit.sandhi.parichay', 'sanskrit.samasa.parichay'] },
        // ── [शेमुषी] गद्य-पद्य-सूक्ति अंश (Sprint DM) ──
        { id: 'cbse.san.9.ch9',  order: 9,  title: '[शेमुषी] भारतीवसन्तगीतिः (गद्य)',                kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.9.ch10', order: 10, title: '[शेमुषी] स्वर्णकाकः (गद्य-कथा)',                  kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.9.ch11', order: 11, title: '[शेमुषी] गोदोहनम् (नाट्यांश)',                    kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'cbse.san.9.ch12', order: 12, title: '[शेमुषी] सूक्तिमौक्तिकम् (सूक्ति)',               kgNodeIds: ['sanskrit.padya.subhashitani', 'sanskrit.kavya_bodh.shlok_vyakhya'] },
        { id: 'cbse.san.9.ch13', order: 13, title: '[शेमुषी] भ्रान्तो बालः (गद्य-कथा)',               kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.9.ch14', order: 14, title: '[शेमुषी] लौहतुला (गद्य-कथा)',                     kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.9.ch15', order: 15, title: '[शेमुषी] सिकतासेतुः (गद्य-कथा)',                  kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.9.ch16', order: 16, title: '[शेमुषी] जटायोः शौर्यम् — वाल्मीकि रामायण (पद्य)', kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.shlok_vyakhya', 'sanskrit.kavya_bodh.lekhak_kavi_parichay'] },
        { id: 'cbse.san.9.ch17', order: 17, title: '[शेमुषी] पर्यावरणम् (पद्य)',                      kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.san.9.ch18', order: 18, title: '[शेमुषी] वाङ्मनःप्राणस्वरूपम् — उपनिषद् (गद्य)',  kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
      ],
    },

    // ── Grade 10 ────────────────────────────────────────────────────────────
    {
      grade: 10,
      chapters: [
        { id: 'cbse.san.10.ch1', order: 1, title: '[व्याकरण] वाच्य — कर्तृवाच्य, कर्मवाच्य और भाववाच्य',  kgNodeIds: ['sanskrit.vyakarana.vachya'] },
        { id: 'cbse.san.10.ch2', order: 2, title: '[व्याकरण] वाक्य रचना एवं अनुवाद — हिन्दी-संस्कृत',     kgNodeIds: ['sanskrit.vyakarana.vakya_rachana_anuvad'] },
        { id: 'cbse.san.10.ch3', order: 3, title: '[धातु-रूप] विधिलिङ् लकार (चाहिए/उचित)',                kgNodeIds: ['sanskrit.dhaatu_roopa.vidhiling_lakar'] },
        { id: 'cbse.san.10.ch4', order: 4, title: '[लेखन] संवाद लेखन — सरल संस्कृत वार्तालाप',            kgNodeIds: ['sanskrit.gadya.samvad_lekhan'] },
        { id: 'cbse.san.10.ch5', order: 5, title: '[पठन] छन्दयुक्त पाठ — छन्द-बोध',                       kgNodeIds: ['sanskrit.padya.chhanda_yukt_path'] },
        { id: 'cbse.san.10.ch6', order: 6, title: '[पठन] श्लोक अर्थ-बोध एवं कण्ठस्थीकरण',                  kgNodeIds: ['sanskrit.padya.shlok_arth_bodh'] },
        { id: 'cbse.san.10.ch7', order: 7, title: '[संधि] संधि — सम्पूर्ण पुनरावृत्ति',                    kgNodeIds: ['sanskrit.sandhi.deergha', 'sanskrit.sandhi.guna', 'sanskrit.sandhi.yan', 'sanskrit.sandhi.ayadi', 'sanskrit.sandhi.vyanjan', 'sanskrit.sandhi.visarga'] },
        { id: 'cbse.san.10.ch8', order: 8, title: '[समास] समास — सम्पूर्ण पुनरावृत्ति',                    kgNodeIds: ['sanskrit.samasa.avyayibhava', 'sanskrit.samasa.tatpurusha', 'sanskrit.samasa.karmadharaya', 'sanskrit.samasa.dvigu', 'sanskrit.samasa.dvandva', 'sanskrit.samasa.bahuvrihi'] },
        // ── [शेमुषी] गद्य-पद्य-सूक्ति अंश (Sprint DM) ──
        { id: 'cbse.san.10.ch9',  order: 9,  title: '[शेमुषी] शुचिपर्यावरणम् (गद्य-निबन्ध)',                   kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.10.ch10', order: 10, title: '[शेमुषी] बुद्धिर्बलवती सदा (गद्य-कथा)',                   kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.10.ch11', order: 11, title: '[शेमुषी] शिशुलालनम् — भवभूति, उत्तररामचरितम् (नाट्यांश)', kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.kavya_bodh.lekhak_kavi_parichay'] },
        { id: 'cbse.san.10.ch12', order: 12, title: '[शेमुषी] जननी तुल्यवत्सला (गद्य-कथा)',                    kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.10.ch13', order: 13, title: '[शेमुषी] सुभाषितानि (सूक्ति)',                            kgNodeIds: ['sanskrit.padya.subhashitani', 'sanskrit.kavya_bodh.shlok_vyakhya'] },
        { id: 'cbse.san.10.ch14', order: 14, title: '[शेमुषी] सौहार्दं प्रकृतेः शोभा (पद्य)',                  kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.san.10.ch15', order: 15, title: '[शेमुषी] विचित्रः साक्षी (गद्य-कथा)',                     kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.10.ch16', order: 16, title: '[शेमुषी] सूक्तयः (सूक्ति)',                               kgNodeIds: ['sanskrit.padya.subhashitani', 'sanskrit.kavya_bodh.shlok_vyakhya'] },
        { id: 'cbse.san.10.ch17', order: 17, title: '[शेमुषी] भूकम्पविभीषिका (गद्य-निबन्ध)',                   kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.10.ch18', order: 18, title: '[शेमुषी] अन्योक्तयः (पद्य)',                              kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.shlok_vyakhya'] },
      ],
    },

    // ── Grade 11 ────────────────────────────────────────────────────────────
    {
      grade: 11,
      chapters: [
        { id: 'cbse.san.11.ch1', order: 1, title: '[शब्द-रूप] संज्ञा शब्द-रूप — सम्पूर्ण पुनरावृत्ति',     kgNodeIds: ['sanskrit.shabda_roopa.akaranta_pum', 'sanskrit.shabda_roopa.akaranta_napunsak', 'sanskrit.shabda_roopa.akaranta_stri', 'sanskrit.shabda_roopa.ikaranta_ukaranta'] },
        { id: 'cbse.san.11.ch2', order: 2, title: '[शब्द-रूप] सर्वनाम शब्द-रूप — सम्पूर्ण पुनरावृत्ति',    kgNodeIds: ['sanskrit.shabda_roopa.sarvanam_tad_yad_etad', 'sanskrit.shabda_roopa.sarvanam_kim', 'sanskrit.shabda_roopa.asmad_yushmad'] },
        { id: 'cbse.san.11.ch3', order: 3, title: '[धातु-रूप] सभी लकारों की पुनरावृत्ति',                  kgNodeIds: ['sanskrit.dhaatu_roopa.lat_lakar', 'sanskrit.dhaatu_roopa.lot_lakar', 'sanskrit.dhaatu_roopa.lang_lakar', 'sanskrit.dhaatu_roopa.lrt_lakar', 'sanskrit.dhaatu_roopa.vidhiling_lakar'] },
        { id: 'cbse.san.11.ch4', order: 4, title: '[व्याकरण] कारक, वाच्य एवं वाक्य रचना — उन्नत अभ्यास',   kgNodeIds: ['sanskrit.vyakarana.karak_vibhakti', 'sanskrit.vyakarana.vachya', 'sanskrit.vyakarana.vakya_rachana_anuvad'] },
        { id: 'cbse.san.11.ch5', order: 5, title: '[संधि-समास] व्यंजन-विसर्ग संधि और बहुव्रीहि — उन्नत',   kgNodeIds: ['sanskrit.sandhi.vyanjan', 'sanskrit.sandhi.visarga', 'sanskrit.samasa.bahuvrihi'] },
        { id: 'cbse.san.11.ch6', order: 6, title: '[लेखन] अनुवाद अभ्यास — हिन्दी-संस्कृत (उन्नत)',          kgNodeIds: ['sanskrit.gadya.hindi_se_sanskrit', 'sanskrit.gadya.sanskrit_se_hindi'] },
        { id: 'cbse.san.11.ch7', order: 7, title: '[पठन] अपठित गद्यांश एवं पद्यांश — वरिष्ठ स्तर',         kgNodeIds: ['sanskrit.gadya.apathit_avbodh', 'sanskrit.padya.apathit_padyansh'] },
        // ── [भास्वती] गद्य-पद्य-सूक्ति अंश (Sprint DM) ──
        { id: 'cbse.san.11.ch8',  order: 8,  title: '[भास्वती] कुशलप्रशासनम् (गद्य-कथा)',           kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.11.ch9',  order: 9,  title: '[भास्वती] सौवर्णो नकुलः (गद्य-कथा)',            kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.11.ch10', order: 10, title: '[भास्वती] सूक्तिसुधा (सूक्ति)',                  kgNodeIds: ['sanskrit.padya.subhashitani', 'sanskrit.kavya_bodh.shlok_vyakhya'] },
        { id: 'cbse.san.11.ch11', order: 11, title: '[भास्वती] ऋतुचर्या (पद्य)',                     kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.san.11.ch12', order: 12, title: '[भास्वती] वीरः सर्वदमनः (गद्य-कथा)',             kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.11.ch13', order: 13, title: '[भास्वती] शुकशावकोदन्तः (गद्य-कथा)',             kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.11.ch14', order: 14, title: '[भास्वती] भव्यः सत्याग्रहाश्रमः (गद्य-निबन्ध)',  kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.11.ch15', order: 15, title: '[भास्वती] सङ्गीतानुरागी सुब्बण्णः (गद्य-जीवनी)', kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.kavya_bodh.lekhak_kavi_parichay'] },
        { id: 'cbse.san.11.ch16', order: 16, title: '[भास्वती] वस्त्रविक्रयः (नाट्यांश)',             kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.bhasha_shaili'] },
        { id: 'cbse.san.11.ch17', order: 17, title: '[भास्वती] यद्भूतहितं तत्सत्यम् (सूक्ति)',        kgNodeIds: ['sanskrit.padya.subhashitani', 'sanskrit.kavya_bodh.shlok_vyakhya'] },
        { id: 'cbse.san.11.ch18', order: 18, title: '[भास्वती] स मे प्रियः (पद्य)',                   kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.san.11.ch19', order: 19, title: '[भास्वती] अथ शिक्षां प्रवक्ष्यामि (पद्य)',       kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.shlok_vyakhya'] },
      ],
    },

    // ── Grade 12 ────────────────────────────────────────────────────────────
    {
      grade: 12,
      chapters: [
        { id: 'cbse.san.12.ch1', order: 1, title: '[संधि] संधि — बोर्ड-परीक्षा स्तर पुनरावृत्ति',          kgNodeIds: ['sanskrit.sandhi.deergha', 'sanskrit.sandhi.guna', 'sanskrit.sandhi.yan', 'sanskrit.sandhi.ayadi'] },
        { id: 'cbse.san.12.ch2', order: 2, title: '[समास] समास — बोर्ड-परीक्षा स्तर पुनरावृत्ति',          kgNodeIds: ['sanskrit.samasa.tatpurusha', 'sanskrit.samasa.karmadharaya', 'sanskrit.samasa.dvigu', 'sanskrit.samasa.dvandva'] },
        { id: 'cbse.san.12.ch3', order: 3, title: '[शब्द-रूप] शब्द-रूप — बोर्ड-परीक्षा स्तर पुनरावृत्ति',  kgNodeIds: ['sanskrit.shabda_roopa.akaranta_napunsak', 'sanskrit.shabda_roopa.akaranta_stri', 'sanskrit.shabda_roopa.ikaranta_ukaranta', 'sanskrit.shabda_roopa.sarvanam_kim'] },
        { id: 'cbse.san.12.ch4', order: 4, title: '[धातु-रूप] धातु-रूप — बोर्ड-परीक्षा स्तर पुनरावृत्ति',  kgNodeIds: ['sanskrit.dhaatu_roopa.bhu_as', 'sanskrit.dhaatu_roopa.gam_path', 'sanskrit.dhaatu_roopa.kri_vad', 'sanskrit.dhaatu_roopa.vidhiling_lakar'] },
        { id: 'cbse.san.12.ch5', order: 5, title: '[व्याकरण] प्रत्यय, उपसर्ग एवं शब्द-निर्माण — पुनरावृत्ति', kgNodeIds: ['sanskrit.vyakarana.upasarga', 'sanskrit.vyakarana.pratyaya'] },
        { id: 'cbse.san.12.ch6', order: 6, title: '[लेखन] अनुवाद एवं संवाद लेखन — बोर्ड-परीक्षा स्तर',     kgNodeIds: ['sanskrit.gadya.hindi_se_sanskrit', 'sanskrit.gadya.sanskrit_se_hindi', 'sanskrit.gadya.samvad_lekhan'] },
        { id: 'cbse.san.12.ch7', order: 7, title: '[पठन] अपठित गद्यांश-पद्यांश एवं श्लोक — बोर्ड-परीक्षा स्तर', kgNodeIds: ['sanskrit.gadya.apathit_avbodh', 'sanskrit.gadya.shabda_arth_prashna', 'sanskrit.padya.apathit_padyansh', 'sanskrit.padya.shlok_arth_bodh'] },
        // ── [भास्वती] गद्य-पद्य-सूक्ति अंश (Sprint DM) ──
        { id: 'cbse.san.12.ch8',  order: 8,  title: '[भास्वती] अनुशासनम् (गद्य-निबन्ध)',                  kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.12.ch9',  order: 9,  title: '[भास्वती] न त्वं शोचितुमर्हसि — श्रीमद्भगवद्गीता (पद्य)', kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.shlok_vyakhya'] },
        { id: 'cbse.san.12.ch10', order: 10, title: '[भास्वती] राष्ट्रचिन्ता गरीयसी (गद्य-निबन्ध)',       kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.12.ch11', order: 11, title: '[भास्वती] प्रजानुरञ्जको नृपः (गद्य-कथा)',             kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.12.ch12', order: 12, title: '[भास्वती] दौवारिकस्य निष्ठा (गद्य-कथा)',              kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.12.ch13', order: 13, title: '[भास्वती] सूक्तिसौरभम् (सूक्ति)',                     kgNodeIds: ['sanskrit.padya.subhashitani', 'sanskrit.kavya_bodh.shlok_vyakhya'] },
        { id: 'cbse.san.12.ch14', order: 14, title: '[भास्वती] नैकेनापि समं गता वसुमती (पद्य)',           kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.san.12.ch15', order: 15, title: '[भास्वती] हल्दीघाटी (पद्य)',                          kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.san.12.ch16', order: 16, title: '[भास्वती] मदालसा (गद्य-कथा)',                         kgNodeIds: ['sanskrit.gadya.varnan_katha', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.12.ch17', order: 17, title: '[भास्वती] प्रतीक्षा (पद्य)',                          kgNodeIds: ['sanskrit.padya.kavya_path', 'sanskrit.kavya_bodh.bhav_saundarya'] },
        { id: 'cbse.san.12.ch18', order: 18, title: '[भास्वती] कार्याकार्यव्यवस्थितिः (गद्य-निबन्ध)',     kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
        { id: 'cbse.san.12.ch19', order: 19, title: '[भास्वती] विद्यास्थानानि (गद्य-निबन्ध)',              kgNodeIds: ['sanskrit.gadya.nibandh_jeevani', 'sanskrit.sahitya_vishleshan.vishay_vastu'] },
      ],
    },

  ],
}

export function getCBSESanskritChapters(grade: number) {
  return CBSE_SANSKRIT_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getCBSESanskritChapter(grade: number, chapterId: string) {
  return getCBSESanskritChapters(grade).find((c) => c.id === chapterId) ?? null
}
