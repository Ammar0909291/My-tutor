'use client'

import { useState, useEffect, useRef } from 'react'

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
      const errorMsg = teachingLanguage === 'ru' ? 'Ошибка ответа. Попробуй ещё раз.' : 'Error. Please try again.'
      const reply = data?.content ?? errorMsg
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      const errorMsg = teachingLanguage === 'ru' ? 'Произошла ошибка. Попробуй ещё раз.' : 'Something went wrong. Please try again.'
      setMessages((prev) => [...prev, { role: 'assistant', content: errorMsg }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'rgba(13,17,23,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 50 }}>
        <a href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
          {teachingLanguage === 'ru' ? '← Назад' : '← Back'}
        </a>
        <span style={{ fontSize: 20 }}>🎯</span>
        <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 16 }}>{teachingLanguage === 'ru' ? 'Коуч' : 'Coach'}</span>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginLeft: 4 }}>{subject}</span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', maxWidth: 800, margin: '0 auto', width: '100%' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 16, display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '75%',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: msg.role === 'user' ? 'rgba(247,129,102,0.15)' : 'var(--bg-surface)',
              border: `1px solid ${msg.role === 'user' ? 'rgba(247,129,102,0.3)' : 'var(--border-default)'}`,
              color: 'var(--text-primary)',
              fontSize: 14,
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 16 }}>
            <div style={{ padding: '12px 16px', borderRadius: '16px 16px 16px 4px', background: 'var(--bg-surface)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)', fontSize: 14 }}>
              {teachingLanguage === 'ru' ? 'Думаю...' : 'Thinking...'}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-default)', background: 'var(--bg-base)', position: 'sticky', bottom: 0 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', gap: 10 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder={teachingLanguage === 'ru' ? 'Напиши сообщение...' : 'Type a message...'}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: 12,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
              fontSize: 14,
              outline: 'none',
            }}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            style={{
              padding: '12px 20px',
              borderRadius: 12,
              background: loading ? 'rgba(247,129,102,0.3)' : '#F78166',
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}
