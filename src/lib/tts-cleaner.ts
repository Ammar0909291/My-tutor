export function cleanTextForTTS(text: string): string {
  let t = text
  t = t.replace(/\[CODE\][\s\S]*?\[\/CODE\]/gi, '')
  t = t.replace(/```[\s\S]*?```/g, '')
  t = t.replace(/`([^`]+)`/g, '$1')
  t = t.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F02F}]/gu, '')
  t = t.replace(/[▶📌💡⚠✅❓🔧🎯💬🧠🎓⏱🔥📚📈⚙️🏠📋🐍]/gu, '')
  t = t.replace(/\*\*(.*?)\*\*/g, '$1')
  t = t.replace(/\*(.*?)\*/g, '$1')
  t = t.replace(/#{1,6}\s+/g, '')
  t = t.replace(/^[-•·]\s+/gm, '')
  t = t.replace(/^\d+\.\s+/gm, '')
  t = t.replace(/---+/g, '.')
  t = t.replace(/>\s+/g, '')
  t = t.replace(/\s+/g, ' ').trim()
  return t
}
