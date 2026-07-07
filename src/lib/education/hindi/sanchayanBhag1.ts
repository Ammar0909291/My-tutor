import type { Chapter } from '../educationTypes'

/**
 * संचयन भाग–1 — CBSE Hindi B supplementary reader, Grade 9.
 * Official NCERT textbook, 3 chapters. Sprint EU.2.
 */
export const SANCHAYAN_BHAG1_CHAPTERS: Chapter[] = [
  { id: 'cbse.hinb.sanchayan1.ch1', order: 1, title: '[संचयन] हामिद खाँ — एस.के. पोट्टेकाट (कहानी)',              kgNodeIds: ['hindi.gadya.kahani', 'hindi.sahitya_vishleshan.patra_chitran'] },
  { id: 'cbse.hinb.sanchayan1.ch2', order: 2, title: '[संचयन] दियें जल उठे — मधुकर उपाध्याय (रिपोर्ताज)',          kgNodeIds: ['hindi.gadya.reportaj_patra', 'hindi.sahitya_vishleshan.vishay_vastu'] },
  { id: 'cbse.hinb.sanchayan1.ch3', order: 3, title: '[संचयन] कल्लू कुम्हार की उनाकोटी — शेखर जोशी (यात्रावृत्त)', kgNodeIds: ['hindi.gadya.yatra_sansmaran', 'hindi.sahitya_vishleshan.vishay_vastu'] },
]
