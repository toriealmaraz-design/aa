import './NexifyLoader.css'

interface NexifyLoaderProps {
  /** Overall mark size in pixels (default 150) */
  size?: number
  /** Primary label beneath the mark. Pass null to hide. */
  label?: string | null
  /** Small uppercase sub-label. Pass null to hide. */
  sublabel?: string | null
  /** Show the wordmark (NEXIFY). Default true. */
  wordmark?: boolean
  /** Render full-screen centered on the navy surface */
  fullscreen?: boolean
}

/**
 * Nexify System Loader
 * Animates the brand mark: emerald ring draws on → gold arrow shoots up →
 * wifi arcs ping → N node flashes emerald (integration) → reverts to gold.
 * Orbiting network nodes + conic halo add depth. 1.6s infinite loop.
 */
export default function NexifyLoader({
  size = 150,
  label,
  sublabel = 'Connecting network',
  wordmark = true,
  fullscreen = false,
}: NexifyLoaderProps) {
  const inner = (
    <div className="nx-scene">
      <div className="nx-mark" style={{ width: size * 1.4, height: size * 1.4 }}>
        <div className="nx-halo" />
        <div className="nx-orbit"><span /><span /><span /></div>
        <div className="nx-orbit rev"><span /><span /></div>
        <div className="nx-glow" />
        <div className="nx-logo" style={{ width: size, height: size }}>
          <svg viewBox="0 0 150 150" aria-label="Loading">
            <defs>
              <linearGradient id="nx-goldgrad" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#2563eb" />
                <stop offset="1" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <circle className="nx-ring" cx="72" cy="74" r="52" transform="rotate(-50 72 74)" />
            <path className="nx-arrow" d="M40 124 L98 44 M98 44 L78 48 M98 44 L94 66" />
            <circle className="nx-data" />
            <path className="nx-wifi a1" d="M52 70 A20 20 0 0 1 80 70" />
            <path className="nx-wifi a2" d="M45 64 A30 30 0 0 1 87 64" />
            <path className="nx-wifi a3" d="M38 58 A40 40 0 0 1 94 58" />
            <circle className="nx-node" cx="66" cy="92" r="20" />
            <text className="nx-letter" x="66" y="93">N</text>
          </svg>
        </div>
      </div>

      {(wordmark || label || sublabel) && (
        <div className="nx-caption">
          {wordmark && <div className="nx-word">NE<span className="x">X</span>IFY</div>}
          {label && <div className="nx-label">{label}</div>}
          {sublabel && <div className="nx-sub">{sublabel}</div>}
          <div className="nx-track"><i /></div>
        </div>
      )}
    </div>
  )

  return fullscreen ? <div className="nx-fullscreen">{inner}</div> : inner
}
