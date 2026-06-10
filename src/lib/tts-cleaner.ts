export function cleanTextForTTS(text: string): string {
  let t = text
  // Remove [CODE]...[/CODE] blocks entirely
  t = t.replace(/\[CODE\][\s\S]*?\[\/CODE\]/gi, '')
  // Remove triple backtick code blocks
  t = t.replace(/```[\s\S]*?```/g, '')
  // Remove inline code
  t = t.replace(/`([^`]+)`/g, '$1')
  // Remove emojis
  t = t.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F900}-\u{1F9FF}]/gu, '')
  // Remove special icons
  t = t.replace(/[▶📌💡⚠✅❓🔧🎯💬🧠🎓⏱🔥📚📈⚙🏠📋🐍🇷🇺🇬🇧🇮🇳]/gu, '')
  // Remove markdown bold and italic
  t = t.replace(/\*\*(.*?)\*\*/g, '$1')
  t = t.replace(/\*(.*?)\*/g, '$1')
  // Remove headings
  t = t.replace(/#{1,6}\s+/g, '')
  // Remove bullet points
  t = t.replace(/^[-•·]\s+/gm, '')
  // Remove numbered lists
  t = t.replace(/^\d+\.\s+/gm, '')
  // Remove dividers
  t = t.replace(/---+/g, '.')
  // Remove blockquotes
  t = t.replace(/^>\s+/gm, '')
  // Remove function call notation - say naturally
  t = t.replace(/(\w+)\(\)/g, '$1')
  // Collapse whitespace
  t = t.replace(/\s+/g, ' ').trim()
  return t
}
