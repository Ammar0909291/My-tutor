'use client'

export function StartLessonButton() {
  return (
    <div className="relative inline-block group">
      <button
        disabled
        className="px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl opacity-60 cursor-not-allowed select-none"
      >
        Начать урок
      </button>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Скоро
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
      </div>
    </div>
  )
}
