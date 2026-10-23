import { useEffect, useState } from 'react'
import { Check, Info, X } from 'lucide-react'
import { createPortal } from 'react-dom'

type ToastKind = 'success' | 'info'
interface ToastItem {
  id: number
  text: string
  kind: ToastKind
}

type Listener = (t: ToastItem) => void
let listeners: Listener[] = []
let counter = 0

/** Fire a toast from anywhere: toast('Copied!') or toast('Saved', 'success'). */
export function toast(text: string, kind: ToastKind = 'success') {
  const item = { id: ++counter, text, kind }
  listeners.forEach((l) => l(item))
}

/** Mount once near the app root. */
export function ToastHost() {
  const [items, setItems] = useState<ToastItem[]>([])

  useEffect(() => {
    const l: Listener = (t) => {
      setItems((prev) => [...prev, t])
      setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== t.id)), 2600)
    }
    listeners.push(l)
    return () => {
      listeners = listeners.filter((x) => x !== l)
    }
  }, [])

  if (typeof document === 'undefined') return null

  return createPortal(
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[70] flex flex-col items-center gap-2 pointer-events-none">
      {items.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-2.5 bg-slate-900 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-xl shadow-[0_18px_40px_-15px_rgba(0,0,0,0.8)] animate-in"
        >
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center flex-none ${
              t.kind === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
            }`}
          >
            {t.kind === 'success' ? <Check size={13} /> : <Info size={13} />}
          </span>
          {t.text}
          <button
            onClick={() => setItems((prev) => prev.filter((x) => x.id !== t.id))}
            className="text-slate-500 hover:text-white ml-1"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>,
    document.body,
  )
}
