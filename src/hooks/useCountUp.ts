import { useEffect, useRef, useState } from 'react'

/**
 * Animated count-up. Returns the current value climbing from 0 → target
 * with an exponential ease-out, once, on mount. Respects reduced-motion.
 */
export function useCountUp(target: number, duration = 1100): number {
  const [value, setValue] = useState(0)
  const raf = useRef<number>()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3) // cubic ease-out
      setValue(target * eased)
      if (t < 1) raf.current = requestAnimationFrame(tick)
      else setValue(target)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [target, duration])

  return value
}

/** Format a cedi amount with thousands separators and 2 decimals. */
export function cedis(n: number): string {
  return 'GH₵' + n.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
