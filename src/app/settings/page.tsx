'use client'
import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useLanguage, LanguageToggle } from '@/components/ui/LanguageToggle'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useCountry, type Country } from '@/components/Providers'
import type { TeachingLang } from '@/lib/tts'
import { Card, CandyButton, SectionTitle, EagleMascot } from '@/components/ui/candy'
import tokenStyles from '@/components/ui/candy/tokens.module.css'

type LangOption = { key: TeachingLang; icon: string; label: string }
type CountryOption = { key: Country; flag: string; name: string; desc: string; color: string }

const COUNTRY_OPTIONS: CountryOption[] = [
  { key: 'ru',     flag: '🇷🇺', name: 'Россия', desc: 'YandexGPT · SpeechKit', color: '#F78166' },
  { key: 'in',     flag: '🇮🇳', name: 'India',  desc: 'Groq · Hinglish',      color: '#3FB950' },
  { key: 'global', flag: '🌍', name: 'Global', desc: 'Groq · English',        color: '#79C0FF' },
]

const LANG_OPTIONS: LangOption[] = [
  { key: 'ru', icon: '🇷🇺', label: 'Russian' },
  { key: 'en', icon: '🇬🇧', label: 'English' },
  { key: 'hi', icon: '🇮🇳', label: 'Hinglish' },
]

interface SettingsData {
  voiceId: string
  teachingLanguage: TeachingLang
  voiceSpeed: number
}

interface ProfileData {
  name: string
  email: string
  createdAt: string
  xpPoints: number
  lessonsCount: number
  selfDescription: string
  voiceId: string
  userType: string
  educationBoard: string | null
  grade: number | null
}

// Mirrors the education board registry (kept static — see OnboardingWizard)
const SCHOOL_BOARDS = [
  { id: 'cbse', shortName: 'CBSE' },
  { id: 'up_board', shortName: 'UP Board' },
]
const SCHOOL_GRADES = [5, 6, 7, 8, 9, 10, 11, 12]

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: 14,
  border: '1px solid var(--candy-shadow)',
  background: 'var(--candy-bg)',
  color: 'var(--candy-ink)',
  fontSize: 14,
  outline: 'none',
}

export default function SettingsPage() {
  const { t, lang, setLang } = useLanguage()
  const { country, setCountry } = useCountry()
  const [data, setData] = useState<SettingsData | null>(null)
  const [teachingLanguage, setTeachingLang] = useState<TeachingLang>('en')
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [loadError, setLoadError] = useState(false)

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
  // School section state (Sprint BF)
  const [schoolBoard, setSchoolBoard] = useState('')
  const [schoolGrade, setSchoolGrade] = useState<number | null>(null)
  const [schoolSave, setSchoolSave] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [profileName, setProfileName] = useState('')
  const [profileLevel, setProfileLevel] = useState('')
  const [profileSave, setProfileSave] = useState<'idle' | 'saving' | 'saved'>('idle')

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((d: { success?: boolean; data?: SettingsData }) => {
        if (d.success && d.data) {
          setData(d.data)
          setTeachingLang(d.data.teachingLanguage)
          setLoadError(false)
        } else {
          setLoadError(true)
        }
      })
      .catch((err) => {
        // DEF-EJ-06: no longer swallowed — log + show a visible error.
        console.error('[settings] failed to load settings', err)
        setLoadError(true)
      })

    fetch('/api/user/profile')
      .then((r) => r.json())
      .then((d: { user?: { name?: string; email?: string; createdAt?: string; xpPoints?: number; _count?: { learnSessions?: number }; profile?: { selfDescription?: string; voiceId?: string; userType?: string; educationBoard?: string | null; grade?: number | null } } }) => {
        if (d.user) {
          const p: ProfileData = {
            name: d.user.name ?? '',
            email: d.user.email ?? '',
            createdAt: d.user.createdAt ?? '',
            xpPoints: d.user.xpPoints ?? 0,
            lessonsCount: d.user._count?.learnSessions ?? 0,
            selfDescription: d.user.profile?.selfDescription ?? '',
            voiceId: d.user.profile?.voiceId ?? 'male',
            userType: d.user.profile?.userType ?? 'GENERAL_LEARNER',
            educationBoard: d.user.profile?.educationBoard ?? null,
            grade: d.user.profile?.grade ?? null,
          }
          setProfile(p)
          setProfileName(p.name)
          setProfileLevel(p.selfDescription)
          setSchoolBoard(p.educationBoard ?? '')
          setSchoolGrade(p.grade)
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
        body: JSON.stringify({ teachingLanguage }),
      })
      const d = await res.json() as { success?: boolean }
      if (res.ok && d.success) {
        setSaveState('saved')
        // Refetch to confirm saved values are reflected in UI
        const fresh = await fetch('/api/settings').then((r) => r.json()) as { success?: boolean; data?: SettingsData }
        if (fresh.success && fresh.data) {
          setData(fresh.data)
          setTeachingLang(fresh.data.teachingLanguage)
        }
        setTimeout(() => setSaveState('idle'), 2000)
      } else {
        throw new Error(`save failed (HTTP ${res.status})`)
      }
    } catch (err) {
      // DEF-EJ-06: surface the failure instead of silently resetting.
      console.error('[settings] failed to save settings', err)
      setSaveState('error')
    }
  }

  async function handleProfileSave() {
    setProfileSave('saving')
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: profileName, levelDescription: profileLevel }),
      })
      const d = await res.json() as { success?: boolean }
      if (d.success) {
        setProfileSave('saved')
        // Refetch profile to confirm updated values
        const fresh = await fetch('/api/user/profile').then((r) => r.json()) as { user?: { name?: string; email?: string; createdAt?: string; xpPoints?: number; _count?: { learnSessions?: number }; profile?: { selfDescription?: string; voiceId?: string; userType?: string; educationBoard?: string | null; grade?: number | null } } }
        if (fresh.user) {
          const p: ProfileData = {
            name: fresh.user.name ?? '',
            email: fresh.user.email ?? '',
            createdAt: fresh.user.createdAt ?? '',
            xpPoints: fresh.user.xpPoints ?? 0,
            lessonsCount: fresh.user._count?.learnSessions ?? 0,
            selfDescription: fresh.user.profile?.selfDescription ?? '',
            voiceId: fresh.user.profile?.voiceId ?? 'male',
            userType: fresh.user.profile?.userType ?? 'GENERAL_LEARNER',
            educationBoard: fresh.user.profile?.educationBoard ?? null,
            grade: fresh.user.profile?.grade ?? null,
          }
          setProfile(p)
          setProfileName(p.name)
          setProfileLevel(p.selfDescription)
        }
        setTimeout(() => setProfileSave('idle'), 2000)
      } else {
        setProfileSave('idle')
      }
    } catch { setProfileSave('idle') }
  }


  async function handleSchoolSave() {
    if (!schoolBoard || schoolGrade === null) return
    setSchoolSave('saving')
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ educationBoard: schoolBoard, grade: schoolGrade }),
      })
      const d = await res.json() as { success?: boolean }
      if (d.success) {
        setSchoolSave('saved')
        setTimeout(() => setSchoolSave('idle'), 2000)
      } else {
        setSchoolSave('error')
      }
    } catch { setSchoolSave('error') }
  }

  function handleLangClick(key: TeachingLang) {
    setTeachingLang(key)
    setLang(key)
  }

  const avatarName = profileName || profile?.name || 'U'
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(avatarName)}&background=F78166&color=fff&size=128&bold=true&rounded=true`

  return (
    <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', background: 'var(--candy-bg)' }}>

      {/* Nav */}
      <nav className="sticky top-0 z-50" style={{ background: 'var(--candy-card)', borderBottom: '1px solid var(--candy-shadow)' }}>
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="text-sm font-semibold transition-colors" style={{ color: 'var(--candy-ink-soft)' }}>
            {t('settings_back')}
          </Link>
          {/* LOW-1: appearance/theme control belongs on Settings too — users
              reasonably look here for it, not only in the dashboard nav. */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-10 space-y-6">
        <div className="flex items-center gap-3">
          <EagleMascot variant="hero" size={48} />
          <h1 style={{ fontSize: 24, fontWeight: 900, color: 'var(--candy-ink)', fontFamily: 'var(--font-baloo2)' }}>{t('settings_title')}</h1>
        </div>

        {/* Profile */}
        <Section label={t('profile_title')}>
          <div className="flex items-center gap-4 mb-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarUrl} alt="avatar" width={64} height={64} className="rounded-2xl" style={{ flexShrink: 0 }} />
            <div className="min-w-0">
              <p className="font-bold text-sm" style={{ color: 'var(--candy-ink)' }}>{profile?.name || '—'}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--candy-ink-soft)' }}>{profile?.email}</p>
              {profile && (
                <div className="flex gap-3 mt-1.5 text-xs" style={{ color: 'var(--candy-ink-soft)' }}>
                  <span>{t('profile_lessons')}: {profile.lessonsCount}</span>
                  <span>{t('profile_xp')}: {profile.xpPoints}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--candy-ink-soft)' }}>
                {t('profile_name')}
              </label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--candy-ink-soft)' }}>
                {t('profile_email')} 🔒
              </label>
              <input
                type="email"
                value={profile?.email ?? ''}
                readOnly
                style={{ ...inputStyle, background: 'var(--candy-card)', color: 'var(--candy-ink-soft)', cursor: 'not-allowed' }}
              />
            </div>

            {/* Level/About */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--candy-ink-soft)' }}>
                {t('profile_level')}
              </label>
              <textarea
                value={profileLevel}
                onChange={(e) => setProfileLevel(e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: 'none' }}
              />
            </div>

            {/* Member since + stats */}
            {profile && (
              <div className="flex gap-4 text-xs" style={{ color: 'var(--candy-ink-soft)' }}>
                <span>{t('profile_member')}: {new Date(profile.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <CandyButton
            onClick={handleProfileSave}
            disabled={profileSave === 'saving'}
            style={{ marginTop: 20, width: '100%', padding: '12px', borderRadius: 14, background: 'var(--candy-orange)', color: '#fff', fontWeight: 800, fontSize: 14, opacity: profileSave === 'saving' ? 0.6 : 1 }}>
            {profileSave === 'saved' ? t('profile_saved') : profileSave === 'saving' ? '...' : t('profile_save')}
          </CandyButton>
        </Section>


        {/* My School — board/grade context switcher. Shown for any learner who
            has ever used School Mode (SCHOOL_STUDENT, or a GENERAL_LEARNER who
            opted in via /modes), so it's always reachable, not a one-time choice. */}
        {(profile?.userType === 'SCHOOL_STUDENT' || !!profile?.educationBoard) && (
          <Section label="My School 🎒">
            <p className="text-xs mb-4" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>
              Switch board or class anytime — each combination keeps its own separate progress.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--candy-ink-soft)' }}>
                  Board
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SCHOOL_BOARDS.map((b) => (
                    <ChoiceButton key={b.id} active={schoolBoard === b.id} onClick={() => setSchoolBoard(b.id)}>
                      {b.shortName}
                    </ChoiceButton>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--candy-ink-soft)' }}>
                  Class
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {SCHOOL_GRADES.map((g) => (
                    <ChoiceButton key={g} active={schoolGrade === g} onClick={() => setSchoolGrade(g)}>
                      {g}
                    </ChoiceButton>
                  ))}
                </div>
              </div>
              <CandyButton
                onClick={handleSchoolSave}
                disabled={schoolSave === 'saving' || !schoolBoard || schoolGrade === null}
                style={{ width: '100%', padding: '12px', borderRadius: 14, background: 'var(--candy-orange)', color: '#fff', fontWeight: 800, fontSize: 14, opacity: (schoolSave === 'saving' || !schoolBoard || schoolGrade === null) ? 0.6 : 1 }}>
                {schoolSave === 'saved' ? '✓ Switched' : schoolSave === 'saving' ? '...' : schoolSave === 'error' ? 'Failed — try again' : 'Switch board / class'}
              </CandyButton>
            </div>
          </Section>
        )}

        {/* Teaching language — changes immediately */}
        <Section label={t('settings_lang')}>
          <div className="grid grid-cols-3 gap-3">
            {LANG_OPTIONS.map((l) => (
              <ChoiceButton key={l.key} active={teachingLanguage === l.key || lang === l.key} onClick={() => handleLangClick(l.key)} column>
                <span className="text-xl">{l.icon}</span>
                <span>{l.label}</span>
              </ChoiceButton>
            ))}
          </div>
        </Section>

        {/* Region */}
        <Section label={t('settings_region')}>
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
                    background: isSelected ? `${opt.color}15` : 'var(--candy-bg)',
                    border: `2px solid ${isSelected ? opt.color : 'var(--candy-shadow)'}`,
                    borderRadius: 14, padding: '14px 12px', textAlign: 'center',
                    transition: 'all 200ms', outline: 'none',
                  }}>
                  {isSelected && (
                    <div style={{ position: 'absolute', top: 8, right: 8, width: 16, height: 16, borderRadius: '50%', background: opt.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700 }}>✓</div>
                  )}
                  <div style={{ fontSize: 28 }}>{opt.flag}</div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--candy-ink)', marginTop: 6 }}>{opt.name}</p>
                  <p style={{ fontSize: 11, color: 'var(--candy-ink-soft)', marginTop: 3 }}>{opt.desc}</p>
                </button>
              )
            })}
          </div>
          <p style={{ fontSize: 11, color: 'var(--candy-ink-soft)', marginTop: 10 }}>
            {t('settings_region_hint')}
          </p>
        </Section>

        {/* Danger Zone */}
        <Card style={{ padding: 20, border: '1px solid rgba(255,75,75,0.25)' }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--candy-red)' }}>
            {t('settings_danger_zone')}
          </p>

          {deleteStep === 'hidden' && (
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--candy-ink)' }}>
                  {t('settings_delete_title')}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--candy-ink-soft)' }}>
                  {t('settings_delete_desc')}
                </p>
              </div>
              <CandyButton
                onClick={() => setDeleteStep('confirm')}
                style={{ padding: '10px 16px', borderRadius: 14, background: 'rgba(255,75,75,0.1)', color: 'var(--candy-red)', border: '1px solid rgba(255,75,75,0.3)', fontWeight: 700, fontSize: 14, flexShrink: 0 }}
                shadowColor="rgba(255,75,75,0.2)">
                {t('settings_delete_title')}
              </CandyButton>
            </div>
          )}

          {(deleteStep === 'confirm' || deleteStep === 'deleting') && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl" style={{ background: 'rgba(255,75,75,0.08)', border: '1px solid rgba(255,75,75,0.2)' }}>
                <p className="text-sm font-bold mb-2" style={{ color: 'var(--candy-red)' }}>
                  {t('settings_delete_irreversible')}
                </p>
                <ul className="text-xs space-y-1" style={{ color: 'var(--candy-ink-soft)' }}>
                  <li>• {t('settings_delete_bullet1')}</li>
                  <li>• {t('settings_delete_bullet2')}</li>
                  <li>• {t('settings_delete_bullet3')}</li>
                </ul>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--candy-ink-soft)' }}>
                  {t('settings_delete_confirm_label')}
                </label>
                <input
                  type="text"
                  value={deleteInput}
                  onChange={(e) => setDeleteInput(e.target.value)}
                  placeholder="DELETE"
                  disabled={deleteStep === 'deleting'}
                  className="font-mono"
                  style={{ ...inputStyle, border: '1px solid rgba(255,75,75,0.3)' }}
                />
              </div>
              <div className="flex gap-3">
                <CandyButton
                  onClick={() => { setDeleteStep('hidden'); setDeleteInput('') }}
                  disabled={deleteStep === 'deleting'}
                  style={{ flex: 1, padding: '10px', borderRadius: 14, background: 'var(--candy-bg)', color: 'var(--candy-ink-soft)', border: '1px solid var(--candy-shadow)', fontWeight: 700, fontSize: 14 }}>
                  {t('settings_cancel')}
                </CandyButton>
                <CandyButton
                  onClick={handleDeleteAccount}
                  disabled={!deleteReady || deleteStep === 'deleting'}
                  style={{ flex: 1, padding: '10px', borderRadius: 14, background: deleteReady ? 'var(--candy-red)' : 'rgba(255,75,75,0.2)', color: '#fff', fontWeight: 800, fontSize: 14, opacity: (!deleteReady || deleteStep === 'deleting') ? 0.5 : 1 }}
                  shadowColor="#D43B3B">
                  {deleteStep === 'deleting' ? t('settings_deleting') : t('settings_delete_permanent')}
                </CandyButton>
              </div>
            </div>
          )}
        </Card>

        {/* DEF-EJ-06: visible load/save error feedback */}
        {loadError && (
          <p className="text-sm text-center py-2 px-4 rounded-xl" style={{ background: 'rgba(255,75,75,0.15)', color: 'var(--candy-red)' }}>
            {t('settings_load_error')}
          </p>
        )}
        {saveState === 'error' && (
          <p className="text-sm text-center py-2 px-4 rounded-xl" style={{ background: 'rgba(255,75,75,0.15)', color: 'var(--candy-red)' }}>
            {t('settings_save_error')}
          </p>
        )}

        {/* Save (language) */}
        <button
          onClick={handleSave}
          disabled={saveState === 'saving'}
          style={{ width: '100%', padding: '14px', borderRadius: 16, background: 'var(--candy-orange)', color: '#fff', fontWeight: 800, fontSize: 15, opacity: saveState === 'saving' ? 0.6 : 1 }}>
          {saveState === 'saved' ? t('settings_saved')
            : saveState === 'saving' ? '...'
            : saveState === 'error' ? t('settings_save_retry')
            : t('settings_save')}
        </button>
      </main>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Card style={{ padding: 20 }}>
      <SectionTitle style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--candy-ink-soft)', marginBottom: 16, fontWeight: 700 }}>{label}</SectionTitle>
      {children}
    </Card>
  )
}

function ChoiceButton({ active, onClick, children, column, disabled }: { active: boolean; onClick: () => void; children: React.ReactNode; column?: boolean; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-2.5 rounded-xl text-xs font-bold transition-all ${column ? 'flex flex-col items-center gap-1' : ''}`}
      style={{
        background: active ? 'rgba(255,148,53,0.12)' : 'var(--candy-bg)',
        border: `1px solid ${active ? 'var(--candy-orange)' : 'var(--candy-shadow)'}`,
        color: active ? 'var(--candy-orange)' : 'var(--candy-ink-soft)',
      }}>
      {children}
    </button>
  )
}
