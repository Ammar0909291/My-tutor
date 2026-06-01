'use client'
import { createContext, useCallback, useContext, useState } from 'react'

type ToastType = 'success' | 'error' | 'info'
interface Toast { id: string; message: string; type: ToastType }
interface ToastContextValue { show: (message: string, type?: ToastType) => void }

const ToastContext = createContext<ToastContextValue>({ show: () => {} })

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const show = useCallback((message: string, type: ToastType = 'info') => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000)
  }, [])

  const iconMap = { success: '✓', error: '✕', info: 'ℹ' }
  const colorMap = { success: 'var(--accent-green)', error: '#F85149', info: 'var(--accent-secondary)' }

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id}
            className="animate-slide-down flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium shadow-lg pointer-events-auto"
            style={{
              background: 'rgba(22,27,34,0.96)',
              border: `1px solid ${colorMap[toast.type]}44`,
              backdropFilter: 'blur(12px)',
              color: 'var(--text-primary)',
              minWidth: 240,
              boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 0 1px ${colorMap[toast.type]}22`,
            }}>
            <span style={{ color: colorMap[toast.type], fontSize: 15 }}>{iconMap[toast.type]}</span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() { return useContext(ToastContext) }
