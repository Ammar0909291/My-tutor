import type { TeachingLang } from '@/lib/tts'

export type QuickActionKey = 'simpler' | 'example' | 'diagram' | 'challenge'

export interface QuickAction {
  key: QuickActionKey
  icon: QuickActionKey
  label: string
  /** Sent verbatim as the learner's turn. */
  prompt: string
}

/**
 * The lesson screen's "What would you like to do?" actions, sent verbatim as a
 * user turn. One definition, read by the screen that sends them AND by the
 * recovery guard that must recognise them (a tapped action repeats byte-for-byte,
 * which the repeated-answer check would otherwise read as frustration).
 */
export const QUICK_ACTIONS: Record<TeachingLang, QuickAction[]> = {
  en: [
    { key: 'simpler',  icon: 'simpler',  label: 'Explain in simpler way',   prompt: 'Can you explain that in a simpler way?' },
    { key: 'example',  icon: 'example',  label: 'Show real-life example',  prompt: 'Can you show me a real-life example of this?' },
    { key: 'diagram',  icon: 'diagram',  label: 'Give me a diagram',       prompt: 'Can you give me a diagram to visualize this?' },
    { key: 'challenge',icon: 'challenge',label: 'Challenge me',            prompt: 'Challenge me with a harder question on this topic.' },
  ],
  ru: [
    { key: 'simpler',  icon: 'simpler',  label: 'Объясни проще',            prompt: 'Можешь объяснить это проще?' },
    { key: 'example',  icon: 'example',  label: 'Пример из жизни',          prompt: 'Покажи пример из реальной жизни.' },
    { key: 'diagram',  icon: 'diagram',  label: 'Дай диаграмму',            prompt: 'Дай диаграмму для наглядности.' },
    { key: 'challenge',icon: 'challenge',label: 'Испытай меня',             prompt: 'Дай мне более сложный вопрос по этой теме.' },
  ],
  hi: [
    { key: 'simpler',  icon: 'simpler',  label: 'Aasan tarike se samjhao',  prompt: 'Isse aasan tarike se samjha sakte ho?' },
    { key: 'example',  icon: 'example',  label: 'Real-life example dikhao',prompt: 'Isse real-life example ke saath dikhao.' },
    { key: 'diagram',  icon: 'diagram',  label: 'Diagram do',              prompt: 'Isko samjhane ke liye ek diagram do.' },
    { key: 'challenge',icon: 'challenge',label: 'Challenge do',            prompt: 'Mujhe iss topic pe ek mushkil sawal do.' },
  ],
}
