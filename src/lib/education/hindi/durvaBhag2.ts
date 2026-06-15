import type { Chapter } from '../educationTypes'

/**
 * दूर्वा भाग–2 — CBSE Hindi supplementary reader, Grade 7.
 * Official NCERT textbook, 18 chapters.
 * Sprint EU.1B.
 */
export const DURVA_BHAG2_CHAPTERS: Chapter[] = [
  { id: 'cbse.hin.durva2.ch1',  order: 1,  title: '[दूर्वा] चिड़िया और चुरुंगुन',              kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
  { id: 'cbse.hin.durva2.ch2',  order: 2,  title: '[दूर्वा] सबसे सुंदर लड़की',                kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.patra_chitran'] },
  { id: 'cbse.hin.durva2.ch3',  order: 3,  title: '[दूर्वा] मैं हूँ रोबोट',                   kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
  { id: 'cbse.hin.durva2.ch4',  order: 4,  title: '[दूर्वा] गुब्बारे पर चीता',                kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.vishay_vastu'] },
  { id: 'cbse.hin.durva2.ch5',  order: 5,  title: '[दूर्वा] थोड़ी धरती पाऊँ',                 kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
  { id: 'cbse.hin.durva2.ch6',  order: 6,  title: '[दूर्वा] गारो',                             kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.samaj_darshan'] },
  { id: 'cbse.hin.durva2.ch7',  order: 7,  title: '[दूर्वा] पुस्तकें जो अमर हैं',             kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.vishay_vastu'] },
  { id: 'cbse.hin.durva2.ch8',  order: 8,  title: '[दूर्वा] काबुलीवाला',                        kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.patra_chitran'] },
  { id: 'cbse.hin.durva2.ch9',  order: 9,  title: '[दूर्वा] विश्वेश्वरैया',                    kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.patra_chitran'] },
  { id: 'cbse.hin.durva2.ch10', order: 10, title: '[दूर्वा] हम धरती के लाल',                   kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
  { id: 'cbse.hin.durva2.ch11', order: 11, title: '[दूर्वा] पोंगल',                             kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.samaj_darshan'] },
  { id: 'cbse.hin.durva2.ch12', order: 12, title: '[दूर्वा] शहीद झलकारीबाई',                  kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.vishay_vastu'] },
  { id: 'cbse.hin.durva2.ch13', order: 13, title: '[दूर्वा] नृत्यांगना सुधा चंद्रन',           kgNodeIds: ['hindi.gadya.jeevani_aatmkatha', 'hindi.sahitya_vishleshan.patra_chitran'] },
  { id: 'cbse.hin.durva2.ch14', order: 14, title: '[दूर्वा] पानी और धूप',                       kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
  { id: 'cbse.hin.durva2.ch15', order: 15, title: '[दूर्वा] गीत',                               kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
  { id: 'cbse.hin.durva2.ch16', order: 16, title: '[दूर्वा] मेला',                              kgNodeIds: ['hindi.gadya.nibandh_prabandh', 'hindi.sahitya_vishleshan.samaj_darshan'] },
  { id: 'cbse.hin.durva2.ch17', order: 17, title: '[दूर्वा] जूही की कली',                         kgNodeIds: ['hindi.padya.chhayavad', 'hindi.kavya_bodh.bhav_saundarya'] },
  { id: 'cbse.hin.durva2.ch18', order: 18, title: '[दूर्वा] पार करो',                           kgNodeIds: ['hindi.padya.bal_kavita', 'hindi.kavya_bodh.bhav_saundarya'] },
]

export function getDurvaBhag2Chapter(chapterId: string): Chapter | null {
  return DURVA_BHAG2_CHAPTERS.find((c) => c.id === chapterId) ?? null
}
