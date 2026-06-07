'use client'
import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useLanguage, LanguageToggle } from '@/components/ui/LanguageToggle'
import { useCountry, type Country } from '@/components/Providers'
import type { TeachingLang } from '@/lib/tts'

type VoiceOption = { key: string; label: string }
type LangOption = { key: TeachingLang; icon: string; label: string }
type CountryOption = { key: Country; flag: string; name: string; desc: string; color: string }

const COUNTRY_OPTIONS: CountryOption[] = [
  { key: 'ru',     flag: '🇷🇺', name: 'Россия', desc: 'YandexGPT · SpeechKit', color: '#F78166' },
  { key: 'in',     flag: '🇮🇳', name: 'India',  desc: 'Groq · Hinglish',      color: '#3FB950' },
  { key: 'global', flag: '🌍', name: 'Global', desc: 'Groq · English',        color: '#79C0FF' },
]

const VOICE_OPTIONS: VoiceOption[] = [
  { key: 'male',   label: 'Male' },
  { key: 'female', label: 'Female' },
  { key: 'warm',   label: 'Warm' },
]

const LANG_OPTIONS: LangOption[] = [
  { key: 'ru', icon: '🇷🇺', label: 'Russian' },
  { key: 'en', icon: '🇬🇧', label: 'English' },
  { key: 'hi', icon: '🇮🇳', label: 'Hinglish' },
]

interface SettingsData {
  voiceId: string
  teachingLanguage: TeachingLang
}

interface ProfileData {
  name: string
  email: string
  createdAt: string
  xpPoints: number
  lessonsCount: number
  selfDescription: string
  voiceId: string
}

export default function SettingsPage() {
  const { t, lang, setLang } = useLanguage()
  const { country, setCountry } = useCountry()
  const [data, setData] = useState<SettingsData | null>(null)
  const [voiceId, setVoiceId] = useState('male')
  const [teachingLanguage, setTeachingLang] = useState<TeachingLang>('en')
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle')

  // Danger zone
  const [deleteStep, setDeleteStep] = useState<'hidden' | 'confirm' | 'deleting'>('hidden')
  const [deleteInput, setDeleteInput] = useState('')
  const deleteReady = deleteInput === 'DELETE'

  async function handleDeleteAccount() {
    if (!deleteReady) return
    setDeleteStep('deleting')
    try {
      const res = await fetch('/api/user/delete-account', { method: 'DELETE' })
      const d = await res.json() as { success?: boolean; error?: string }
      if (d.success) {
        await signOut({ callbackUrl: '/' })
      } else {
        alert(d.error ?? 'Failed to delete account')
        setDeleteStep('confirm')
      }
    } catch {
      alert('Network error. Please try again.')
      setDeleteStep('confirm')
    }
  }

  // Profile state
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [profileName, setProfileName] = useState('')
  const [profileLevel, setProfileLevel] = useState('')
  const [profileVoice, setProfileVoice] = useState('male')
  const [profileSave, setProfileSave] = useState<'idle' | 'saving' | 'saved'>('idle')

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d: { success?: boolean; data?: SettingsData }) => {
        if (d.success && d.data) {
          setData(d.data)
          setVoiceId(d.data.voiceId)
          setTeachingLang(d.data.teachingLanguage)
        }
      })
      .catch(() => {})

    fetch('/api/user/profile')
      .then((r) => r.json())
      .then((d: { user?: { name?: string; email?: string; createdAt?: string; xpPoints?: number; _count?: { learnSessions?: number }; profile?: { selfDescription?: string; voiceId?: string } } }) => {
        if (d.user) {
          const p: ProfileData = {
            name: d.user.name ?? '',
            email: d.user.email ?? '',
            createdAt: d.user.createdAt ?? '',
            xpPoints: d.user.xpPoints ?? 0,
            lessonsCount: d.user._count?.learnSessions ?? 0,
            selfDescription: d.user.profile?.selfDescription ?? '',
            voiceId: d.user.profile?.voiceId ?? 'male',
          }
          setProfile(p)
          setProfileName(p.name)
          setProfileLevel(p.selfDescription)
          setProfileVoice(p.voiceId)
        }
      })
      .catch(() => {})
  }, [])

  async function handleSave() {
    setSaveState('saving')
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voiceId, teachingLanguage }),
      })
      const d = await res.json() as { success?: boolean }
      if (d.success) {
        setSaveState('saved')
        // Refetch to confirm saved values are reflected in UI
        const fresh = await fetch('/api/settings').then((r) => r.json()) as { success?: boolean; data?: SettingsData }
        if (fresh.success && fresh.data) {
          setData(fresh.data)
          setVoiceId(fresh.data.voiceId)
          setTeachingLang(fresh.data.teachingLanguage)
        }
        setTimeout(() => setSaveState('idle'), 2000)
      } else {
        setSaveState('idle')
      }
    } catch { setSaveState('idle') }
  }

  async function handleProfileSave() {
    setProfileSave('saving')
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: profileName, levelDescription: profileLevel, voicePreference: profileVoice }),
      })
      const d = await res.json() as { success?: boolean }
      if (d.success) {
        setProfileSave('saved')
        // Refetch profile to confirm updated values
        const fresh = await fetch('/api/user/profile').then((r) => r.json()) as { user?: { name?: string; email?: string; createdAt?: string; xpPoints?: number; _count?: { learnSessions?: number }; profile?: { selfDescription?: string; voiceId?: string } } }
        if (fresh.user) {
          const p: ProfileData = {
            name: fresh.user.name ?? '',
            email: fresh.user.email ?? '',
            createdAt: fresh.user.createdAt ?? '',
            xpPoints: fresh.user.xpPoints ?? 0,
            lessonsCount: fresh.user._count?.learnSessions ?? 0,
            selfDescription: fresh.user.profile?.selfDescription ?? '',
            voiceId: fresh.user.profile?.voiceId ?? 'male',
          }
          setProfile(p)
          setProfileName(p.name)
          setProfileLevel(p.selfDescription)
          setProfileVoice(p.voiceId)
        }
        setTimeout(() => setProfileSave('idle'), 2000)
      } else {
        setProfileSave('idle')
      }
    } catch { setProfileSave('idle') }
  }

  function handleLangClick(key: TeachingLang) {
    setTeachingLang(key)
    setLang(key)
  }

  const avatarName = profileName || profile?.name || 'U'
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(avatarName)}&background=F78166&color=fff&size=128&bold=true&rounded=true`

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0F', color: '#fff' }}>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06]"
        style={{ background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="text-sm font-medium transition-colors"
            style={{ color: '#52525B' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#52525B' }}>
            {t('settings_back')}
          </Link>
          <LanguageToggle />
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-10 space-y-6">
        <h1 className="text-2xl font-black tracking-tight">{t('settings_title')}</h1>

        {/* Profile */}
        <Section label={t('profile_title')}>
          <div className="flex items-center gap-4 mb-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarUrl} alt="avatar" width={64} height={64} className="rounded-2xl" style={{ flexShrink: 0 }} />
            <div className="min-w-0">
              <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{profile?.name || '—'}</p>
              <p className="text-xs mt-0.5" style={{ color: '#52525B' }}>{profile?.email}</p>
              {profile && (
                <div className="flex gap-3 mt-1.5 text-xs" style={{ color: '#52525B' }}>
                  <span>{t('profile_lessons')}: {profile.lessonsCount}</span>
                  <span>{t('profile_xp')}: {profile.xpPoints}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#3F3F46' }}>
                {t('profile_name')}
              </label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }}
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#3F3F46' }}>
                {t('profile_email')} 🔒
              </label>
              <input
                type="email"
                value={profile?.email ?? ''}
                readOnly
                className="w-full px-4 py-2.5 rounded-xl text-sm"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#52525B', cursor: 'not-allowed' }}
              />
            </div>

            {/* Voice preference */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#3F3F46' }}>
                {t('profile_voice')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {VOICE_OPTIONS.map((v) => (
                  <button key={v.key} onClick={() => setProfileVoice(v.key)}
                    className="py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: profileVoice === v.key ? 'rgba(247,129,102,0.12)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${profileVoice === v.key ? 'var(--accent-primary)' : 'rgba(255,255,255,0.08)'}`,
                      color: profileVoice === v.key ? 'var(--accent-primary)' : '#71717A',
                    }}>
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Level/About */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#3F3F46' }}>
                {t('profile_level')}
              </label>
              <textarea
                value={profileLevel}
                onChange={(e) => setProfileLevel(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl text-sm resize-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }}
              />
            </div>

            {/* Member since + stats */}
            {profile && (
              <div className="flex gap-4 text-xs" style={{ color: '#52525B' }}>
                <span>{t('profile_member')}: {new Date(profile.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <button
            onClick={handleProfileSave}
            disabled={profileSave === 'saving'}
            className="mt-5 w-full py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-60"
            style={{ background: 'var(--accent-primary)', color: '#fff' }}>
            {profileSave === 'saved' ? t('profile_saved') : profileSave === 'saving' ? '...' : t('profile_save')}
          </button>
        </Section>

        {/* Voice */}
        <Section label={t('settings_voice')}>
          <div className="grid grid-cols-3 gap-3">
            {VOICE_OPTIONS.map((v) => (
              <button key={v.key} onClick={() => setVoiceId(v.key)}
                className="py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: voiceId === v.key ? 'rgba(247,129,102,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${voiceId === v.key ? 'var(--accent-primary)' : 'rgba(255,255,255,0.08)'}`,
                  color: voiceId === v.key ? 'var(--accent-primary)' : '#71717A',
                }}>
                {v.label}
              </button>
            ))}
          </div>
        </Section>

        {/* Teaching language — changes immediately */}
        <Section label={t('settings_lang')}>
          <div className="grid grid-cols-3 gap-3">
            {LANG_OPTIONS.map((l) => (
              <button key={l.key} onClick={() => handleLangClick(l.key)}
                className="py-3 rounded-xl text-sm font-semibold transition-all flex flex-col items-center gap-1"
                style={{
                  background: (teachingLanguage === l.key || lang === l.key) ? 'rgba(247,129,102,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${(teachingLanguage === l.key || lang === l.key) ? 'var(--accent-primary)' : 'rgba(255,255,255,0.08)'}`,
                  color: (teachingLanguage === l.key || lang === l.key) ? 'var(--accent-primary)' : '#71717A',
                }}>
                <span className="text-xl">{l.icon}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        </Section>

        {/* Region */}
        <Section label={lang === 'ru' ? 'Ваш регион' : 'Your Region'}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {COUNTRY_OPTIONS.map((opt) => {
              const isSelected = country === opt.key
              return (
                <button
                  key={opt.key}
                  onClick={() => {
                    setCountry(opt.key)
                    if (opt.key === 'ru') setLang('ru')
                    else if (opt.key === 'in') setLang('hi')
                    else setLang('en')
                  }}
                  style={{
                    flex: 1, minWidth: 100, cursor: 'pointer', position: 'relative',
                    background: isSelected ? `${opt.color}15` : 'rgba(255,255,255,0.04)',
                    border: `2px solid ${isSelected ? opt.color : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 14, padding: '14px 12px', textAlign: 'center',
                    transition: 'all 200ms', outline: 'none',
                  }}>
                  {isSelected && (
                    <div style={{ position: 'absolute', top: 8, right: 8, width: 16, height: 16, borderRadius: '50%', background: opt.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700 }}>✓</div>
                  )}
                  <div style={{ fontSize: 28 }}>{opt.flag}</div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#E6EDF3', marginTop: 6 }}>{opt.name}</p>
                  <p style={{ fontSize: 11, color: '#7D8590', marginTop: 3 }}>{opt.desc}</p>
                </button>
              )
            })}
          </div>
          <p style={{ fontSize: 11, color: '#484F58', marginTop: 10 }}>
            {lang === 'ru' ? 'Регион определяет AI-репетитора и голос' : 'Changing region affects AI tutor and voice'}
          </p>
        </Section>

        {/* Danger Zone */}
        <div className="rounded-2xl p-5" style={{ background: '#0F0F18', border: '1px solid rgba(248,81,73,0.25)' }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#F85149' }}>
            {lang === 'ru' ? '⚠ Опасная зона' : '⚠ Danger Zone'}
          </p>

          {deleteStep === 'hidden' && (
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm font-semibold" style={{ color: '#E6EDF3' }}>
                  {lang === 'ru' ? 'Удалить аккаунт' : 'Delete Account'}
                </p>
                <p className="text-xs mt-1" style={{ color: '#52525B' }}>
                  {lang === 'ru'
                    ? 'Доступ будет закрыт. История обучения сохранится. Email можно использовать снова.'
                    : 'Access removed. Learning history archived. Email becomes available again.'}
                </p>
              </div>
              <button
                onClick={() => setDeleteStep('confirm')}
                className="text-sm font-semibold px-4 py-2 rounded-xl transition-all flex-shrink-0"
                style={{ background: 'rgba(248,81,73,0.1)', color: '#F85149', border: '1px solid rgba(248,81,73,0.3)' }}>
                {lang === 'ru' ? 'Удалить аккаунт' : 'Delete Account'}
              </button>
            </div>
          )}

          {(deleteStep === 'confirm' || deleteStep === 'deleting') && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl" style={{ background: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.2)' }}>
                <p className="text-sm font-bold mb-2" style={{ color: '#F85149' }}>
                  {lang === 'ru' ? 'Это действие необратимо.' : 'This action cannot be undone.'}
                </p>
                <ul className="text-xs space-y-1" style={{ color: '#8B949E' }}>
                  <li>• {lang === 'ru' ? 'Доступ к аккаунту будет закрыт навсегда' : 'Account access will be permanently removed'}</li>
                  <li>• {lang === 'ru' ? 'История уроков сохранится в базе данных' : 'Learning progress is archived in the database'}</li>
                  <li>• {lang === 'ru' ? 'Email станет доступен для новой регистрации' : 'Your email can be used to register a new account'}</li>
                </ul>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: '#3F3F46' }}>
                  {lang === 'ru' ? 'Введите DELETE для подтверждения' : 'Type DELETE to confirm'}
                </label>
                <input
                  type="text"
                  value={deleteInput}
                  onChange={(e) => setDeleteInput(e.target.value)}
                  placeholder="DELETE"
                  disabled={deleteStep === 'deleting'}
                  className="w-full px-4 py-2.5 rounded-xl text-sm font-mono"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(248,81,73,0.3)', color: '#fff', outline: 'none' }}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setDeleteStep('hidden'); setDeleteInput('') }}
                  disabled={deleteStep === 'deleting'}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)', color: '#71717A', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {lang === 'ru' ? 'Отмена' : 'Cancel'}
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={!deleteReady || deleteStep === 'deleting'}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40"
                  style={{ background: deleteReady ? '#F85149' : 'rgba(248,81,73,0.2)', color: '#fff', border: 'none', cursor: deleteReady ? 'pointer' : 'not-allowed' }}>
                  {deleteStep === 'deleting'
                    ? (lang === 'ru' ? 'Удаление...' : 'Deleting...')
                    : (lang === 'ru' ? 'Удалить навсегда' : 'Delete permanently')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Save (voice + language) */}
        <button
          onClick={handleSave}
          disabled={saveState === 'saving'}
          className="btn-primary w-full py-3.5 font-bold disabled:opacity-60">
          {saveState === 'saved' ? t('settings_saved') : saveState === 'saving' ? '...' : t('settings_save')}
        </button>
      </main>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5 border border-white/[0.07]" style={{ background: '#0F0F18' }}>
      <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#3F3F46' }}>{label}</p>
      {children}
    </div>
  )
}
