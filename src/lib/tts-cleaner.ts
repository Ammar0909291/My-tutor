export function cleanTextForTTS(text: string): string {
  return text
    // [CODE]...[/CODE] blocks — never read code aloud
    .replace(/\[CODE\][\s\S]*?\[\/CODE\]/gi, '')
    // Triple backtick code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Inline code
    .replace(/`[^`\n]+`/g, '')
    // Emojis (Extended Pictographic covers actual emoji glyphs, excludes digits/#/*)
    .replace(/\p{Extended_Pictographic}[️⃣‍]*/gu, '')
    // Bold and italic markers — keep text
    .replace(/\*{1,3}([^*\n]+)\*{1,3}/g, '$1')
    .replace(/_{1,3}([^_\n]+)_{1,3}/g, '$1')
    // Headings — keep text
    .replace(/^#{1,6}\s+/gm, '')
    // Horizontal rules → silence
    .replace(/^[-_*]{3,}$/gm, '')
    // Markdown links — keep label text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Bullet points at line start
    .replace(/^[•\-*]\s+/gm, '')
    // Numbered list markers — keep text
    .replace(/^\d+\.\s+/gm, '')
    // Collapse whitespace
    .replace(/\n{3,}/g, '\n\n')
    .replace(/ {2,}/g, ' ')
    .trim()
}
