export function cleanTextForTTS(text: string): string {
  return text
    // [CODE]...[/CODE] blocks — never read aloud
    .replace(/\[CODE\][\s\S]*?\[\/CODE\]/gi, '')
    // Triple backtick code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Inline code → speak as "код"
    .replace(/`[^`\n]+`/g, 'код')
    // Bold then italic (order matters — bold first to consume **)
    .replace(/\*\*([^*\n]+)\*\*/g, '$1')
    .replace(/\*([^*\n]+)\*/g, '$1')
    .replace(/_{1,3}([^_\n]+)_{1,3}/g, '$1')
    // Emojis — broad unicode ranges + Extended Pictographic
    .replace(/[\u{1F000}-\u{1FFFF}]/gu, '')
    .replace(/[\u{2600}-\u{27FF}]/gu, '')
    .replace(/\p{Extended_Pictographic}/gu, '')
    // Variation selectors and zero-width joiners (emoji components)
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
}
