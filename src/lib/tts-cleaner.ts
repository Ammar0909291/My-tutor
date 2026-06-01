export function cleanTextForTTS(text: string): string {
  console.log('[TTS-CLEANER] INPUT:', text.slice(0, 160))

  const result = text
    // [CODE]...[/CODE] blocks — never read aloud
    .replace(/\[CODE\][\s\S]*?\[\/CODE\]/gi, '')
    // Triple backtick code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Inline code → speak as "код"
    .replace(/`[^`\n]+`/g, 'код')
    // Function calls like print() → "функция print"
    .replace(/(\w+)\(\)/g, 'функция $1')
    // Blockquotes (> at line start)
    .replace(/^\s*>\s*/gm, '')
    // Bold (** **) — keep text
    .replace(/\*\*([^*\n]+)\*\*/g, '$1')
    // Italic (* *) — keep text
    .replace(/\*([^*\n]+)\*/g, '$1')
    // Underline italic (_ _)
    .replace(/_{1,3}([^_\n]+)_{1,3}/g, '$1')
    // Explicit instruction icons (▶📌💡⚠️✅❓🔧 and similar)
    .replace(/[▶📌💡⚠✅❓🔧]/gu, '')
    // Broad emoji removal: Miscellaneous Symbols + Dingbats
    .replace(/[\u{2600}-\u{27FF}]/gu, '')
    // Emoji in supplementary planes
    .replace(/[\u{1F000}-\u{1FFFF}]/gu, '')
    // Extended Pictographic catch-all
    .replace(/\p{Extended_Pictographic}/gu, '')
    // Variation selectors, ZWJ, combining enclosing keycap
    .replace(/[\u{FE0F}\u{200D}\u{20E3}]/gu, '')
    // Heading markers
    .replace(/^#{1,6}\s+/gm, '')
    // Horizontal rules
    .replace(/^[-_*]{3,}$/gm, '')
    .replace(/---/g, '')
    // Markdown links → keep label
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Bullet markers at line start
    .replace(/^\s*[•\-*]\s+/gm, '')
    // Numbered list markers — keep text
    .replace(/^\s*\d+\.\s+/gm, '')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    .trim()

  console.log('[TTS-CLEANER] OUTPUT:', result.slice(0, 160))
  return result
}
