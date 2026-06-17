'use client'

import { useState, useEffect, useRef } from 'react'
import { t as i18n } from '@/lib/i18n'
import { CandyPage, Card, CandyButton, EagleMascot } from '@/components/ui/candy'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Props {
  subject: string
  teachingLanguage: 'ru' | 'en' | 'hi'
}

export default function CoachChat({ subject, teachingLanguage }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const openingMessage =
    teachingLanguage === 'en'
      ? `Hi! I'm your study coach. Let's create a learning plan for ${subject}. Tell me: what's your goal? (job / university / hobby), how many hours per week can you study, and do you have a deadline?`
      : teachingLanguage === 'hi'
      ? `नमस्ते! मैं आपका study coach हूँ। ${subject} के लिए एक learning plan बनाते हैं। बताइए: आपका लक्ष्य क्या है? (job / university / hobby), हफ्ते में कितने घंटे पढ़ सकते हैं, और कोई deadline है?`
      : `Привет! Я твой учебный коуч. Давай составим план обучения по ${subject}. Расскажи: какая у тебя цель? (работа / университет / хобби), сколько часов в неделю можешь учиться, и есть ли дедлайн?`

  const langPrompts: Record<string, string> = {
    en: `You are a helpful study coach for ${subject}. Respond ONLY in English. Create clear, structured study plans. Ask about their goal (job/university/hobby), weekly hours available, and deadline. Then create a detailed week-by-week roadmap, specific about topics per week. After presenting the plan, ask if they want adjustments. Be encouraging and practical.`,
    ru: `Ты помощник по учёбе для ${subject}. Отвечай ТОЛЬКО на русском языке. Создавай понятные планы обучения. Спроси про цель (работа/университет/хобби), сколько часов в неделю и дедлайн. Затем составь подробную дорожную карту по неделям с конкретными темами. После плана спроси, нужны ли изменения. Будь поддерживающим и практичным.`,
    hi: `Aap ${subject} ke liye ek helpful study coach hain. Sirf Hinglish mein respond karein. Clear study plans banao. Goal pucho (job/university/hobby), weekly hours aur deadline. Phir week-by-week roadmap banao with specific topics. Plan ke baad pucho ki koi changes chahiye. Encouraging aur practical raho.`,
  }
  const systemPrompt = langPrompts[teachingLanguage] || langPrompts.en

  useEffect(() => {
    setMessages([{ role: 'assistant', content: openingMessage }])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send() {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'system', content: systemPrompt }, ...newMessages],
        }),
      })
      const data = await res.json()
      const errorMsg = i18n(teachingLanguage, 'coach_error')
      const reply = data?.content ?? errorMsg
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      const errorMsg = i18n(teachingLanguage, 'coach_error')
      setMessages((prev) => [...prev, { role: 'assistant', content: errorMsg }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <CandyPage style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'var(--candy-card)', borderBottom: '1px solid var(--candy-shadow)', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 50 }}>
        <a href="/dashboard" style={{ color: 'var(--candy-ink-soft)', textDecoration: 'none', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
          {i18n(teachingLanguage, 'coach_back')}
        </a>
        <span style={{ fontSize: 20 }}>🎯</span>
        <span style={{ fontWeight: 800, color: 'var(--candy-ink)', fontSize: 16, fontFamily: 'var(--font-baloo2)' }}>{i18n(teachingLanguage, 'coach_title')}</span>
        <span style={{ fontSize: 12, color: 'var(--candy-ink-soft)', marginLeft: 4, fontWeight: 600 }}>{subject}</span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', maxWidth: 800, margin: '0 auto', width: '100%' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 16, display: 'flex', alignItems: 'flex-end', gap: 8, justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {msg.role === 'assistant' && <EagleMascot variant="logo" size={24} />}
            <div style={{
              maxWidth: '75%',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: msg.role === 'user' ? 'var(--candy-purple)' : 'var(--candy-card)',
              color: msg.role === 'user' ? '#fff' : 'var(--candy-ink)',
              boxShadow: '0 3px 0 var(--candy-shadow)',
              fontSize: 14,
              lineHeight: 1.6,
              fontWeight: 600,
              whiteSpace: 'pre-wrap',
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 16 }}>
            <div style={{ padding: '12px 16px', borderRadius: '18px 18px 18px 4px', background: 'var(--candy-card)', boxShadow: '0 3px 0 var(--candy-shadow)', color: 'var(--candy-ink-soft)', fontSize: 14, fontWeight: 600 }}>
              {i18n(teachingLanguage, 'coach_thinking')}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--candy-shadow)', background: 'var(--candy-bg)', position: 'sticky', bottom: 0 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', gap: 10 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder={i18n(teachingLanguage, 'coach_placeholder')}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: 14,
              background: 'var(--candy-card)',
              border: '2px solid var(--candy-shadow)',
              color: 'var(--candy-ink)',
              fontSize: 14,
              fontWeight: 600,
              outline: 'none',
            }}
          />
          <CandyButton
            onClick={send}
            disabled={loading || !input.trim()}
            shadowColor="var(--candy-purple-d)"
            style={{
              padding: '12px 22px',
              borderRadius: 14,
              background: 'var(--candy-purple)',
              color: '#fff',
              fontWeight: 800,
              fontSize: 16,
              opacity: loading || !input.trim() ? 0.5 : 1,
            }}
          >
            →
          </CandyButton>
        </div>
      </div>
    </CandyPage>
  )
}
