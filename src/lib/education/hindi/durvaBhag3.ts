import type { Chapter } from '../educationTypes'

/**
 * दूर्वा भाग–3 — CBSE Hindi supplementary reader, Grade 8.
 * Official NCERT textbook, 18 chapters.
 * Sprint EU.1B.
 */
export const DURVA_BHAG3_CHAPTERS: Chapter[] = [
  { id: 'cbse.hin.durva3.ch1',  order: 1,  title: '[दूर्वा] गुड़िया (कविता)',                    kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
  { id: 'cbse.hin.durva3.ch2',  order: 2,  title: '[दूर्वा] दो गोरैया (कहानी)',                 kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.patra_chitran'] },
  { id: 'cbse.hin.durva3.ch3',  order: 3,  title: '[दूर्वा] चिट्ठियों में यूरोप (पत्र)',         kgNodeIds: ['hindi.gadya.reportaj_patra', 'hindi.sahitya_vishleshan.vishay_vastu'] },
  { id: 'cbse.hin.durva3.ch4',  order: 4,  title: '[दूर्वा] ओस (कविता)',                         kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
  { id: 'cbse.hin.durva3.ch5',  order: 5,  title: '[दूर्वा] नाटक में नाटक (कहानी)',              kgNodeIds: ['hindi.gadya.natak_ekaanki', 'hindi.sahitya_vishleshan.vishay_vastu'] },
  { id: 'cbse.hin.durva3.ch6',  order: 6,  title: '[दूर्वा] सागर यात्रा (यात्रा-वृत्तांत)',      kgNodeIds: ['hindi.gadya.yatra_sansmaran', 'hindi.sahitya_vishleshan.vishay_vastu'] },
  { id: 'cbse.hin.durva3.ch7',  order: 7,  title: '[दूर्वा] उठ किसान ओ (कविता)',                kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
  { id: 'cbse.hin.durva3.ch8',  order: 8,  title: '[दूर्वा] सस्ते का चक्कर (व्यंग्य)',           kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.bhasha_shaili'] },
  { id: 'cbse.hin.durva3.ch9',  order: 9,  title: '[दूर्वा] एक खिलाड़ी की कुछ यादें (संस्मरण)', kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.vishay_vastu'] },
  { id: 'cbse.hin.durva3.ch10', order: 10, title: '[दूर्वा] बस की सैर (कहानी)',                  kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.vishay_vastu'] },
  { id: 'cbse.hin.durva3.ch11', order: 11, title: '[दूर्वा] हिंदी ने जिनकी जिंदगी बदल दी (साक्षात्कार)', kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.samaj_darshan'] },
  { id: 'cbse.hin.durva3.ch12', order: 12, title: '[दूर्वा] आषाढ़ का पहला दिन (कविता)',          kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
  { id: 'cbse.hin.durva3.ch13', order: 13, title: '[दूर्वा] अन्याय के खिलाफ (कहानी-अंश)',        kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.samaj_darshan'] },
  { id: 'cbse.hin.durva3.ch14', order: 14, title: '[दूर्वा] बच्चों के प्रिय श्री केशव शंकर पिल्लै (जीवनी)', kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.patra_chitran'] },
  { id: 'cbse.hin.durva3.ch15', order: 15, title: '[दूर्वा] फ़र्श पर (कविता)',                   kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
  { id: 'cbse.hin.durva3.ch16', order: 16, title: '[दूर्वा] बड़ी अम्मा की बात (लोककथा)',         kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.vishay_vastu'] },
  { id: 'cbse.hin.durva3.ch17', order: 17, title: '[दूर्वा] वह सुबह कभी तो आएगी (निबंध-अंश)',   kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.samaj_darshan'] },
  { id: 'cbse.hin.durva3.ch18', order: 18, title: '[दूर्वा] आओ पत्रिका निकालें (क्रियाकलाप)',   kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
]

export function getDurvaBhag3Chapter(chapterId: string): Chapter | null {
  return DURVA_BHAG3_CHAPTERS.find((c) => c.id === chapterId) ?? null
}
