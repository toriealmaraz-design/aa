import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Zap,
  Bot,
  Image as ImageIcon,
  Plus,
  Trash2,
  Save,
  Check,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react'
import {
  loadNetworks,
  saveNetworks,
  loadResponses,
  saveResponses,
  DEFAULT_NETWORKS,
  DEFAULT_RESPONSES,
  type NetworkBadge,
  type ArionResponse,
} from '../lib/store'

type Tab = 'arion' | 'badges'

export default function Admin() {
  const [tab, setTab] = useState<Tab>('arion')
  const [responses, setResponses] = useState<ArionResponse[]>(() => loadResponses())
  const [networks, setNetworks] = useState<NetworkBadge[]>(() => loadNetworks())
  const [saved, setSaved] = useState<'' | 'arion' | 'badges'>('')

  const flashSaved = (which: 'arion' | 'badges') => {
    setSaved(which)
    setTimeout(() => setSaved(''), 1600)
  }

  /* ---- Arion response editing ---- */
  const updateResponse = (id: string, patch: Partial<ArionResponse>) =>
    setResponses((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  const addResponse = () =>
    setResponses((rs) => [
      ...rs,
      { id: `resp-${Date.now()}`, title: 'New response', keywords: [], reply: '' },
    ])
  const removeResponse = (id: string) => setResponses((rs) => rs.filter((r) => r.id !== id))
  const saveArion = () => {
    saveResponses(responses)
    flashSaved('arion')
  }

  /* ---- Network badge editing ---- */
  const updateNetwork = (id: string, patch: Partial<NetworkBadge>) =>
    setNetworks((ns) => ns.map((n) => (n.id === id ? { ...n, ...patch } : n)))
  const saveBadges = () => {
    saveNetworks(networks)
    flashSaved('badges')
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top bar */}
      <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-5xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap size={18} className="text-white" fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-white">Nexify</span>
            <span className="ml-2 text-xs font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
              Admin
            </span>
          </Link>
          <Link to="/dashboard" className="text-sm text-slate-400 hover:text-white flex items-center gap-1">
            <ArrowLeft size={15} /> Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Auth note */}
        <div className="flex items-start gap-3 bg-blue-600/10 border border-blue-500/20 rounded-xl p-4 mb-8">
          <ShieldCheck size={18} className="text-blue-400 mt-0.5 flex-none" />
          <p className="text-sm text-slate-300">
            This panel will be restricted to the authorized Google admin account once the database is
            connected. For now, edits are saved to this browser and feed Arion and the checkout page live.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <TabBtn active={tab === 'arion'} onClick={() => setTab('arion')} icon={<Bot size={16} />} label="Arion Responses" />
          <TabBtn active={tab === 'badges'} onClick={() => setTab('badges')} icon={<ImageIcon size={16} />} label="Network Badges" />
        </div>

        {/* ---- Arion tab ---- */}
        {tab === 'arion' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-white">Arion responses</h1>
                <p className="text-slate-400 text-sm">Edit the fixed answers Arion gives. Keywords trigger each reply.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setResponses(DEFAULT_RESPONSES)} className="btn-secondary text-sm px-3 py-2">
                  Reset
                </button>
                <button onClick={saveArion} className="btn-primary text-sm px-4 py-2">
                  {saved === 'arion' ? <Check size={16} /> : <Save size={16} />}
                  {saved === 'arion' ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>

            {responses.map((r) => (
              <div key={r.id} className="card space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    value={r.title}
                    onChange={(e) => updateResponse(r.id, { title: e.target.value })}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-white font-medium focus:outline-none focus:border-blue-500"
                    placeholder="Title"
                  />
                  <button
                    onClick={() => removeResponse(r.id)}
                    className="text-slate-500 hover:text-red-400 p-2"
                    aria-label="Delete response"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Trigger keywords (comma separated)</label>
                  <input
                    value={r.keywords.join(', ')}
                    onChange={(e) =>
                      updateResponse(r.id, {
                        keywords: e.target.value.split(',').map((k) => k.trim()).filter(Boolean),
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-slate-300 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="e.g. buy, purchase, how do i"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Reply</label>
                  <textarea
                    value={r.reply}
                    onChange={(e) => updateResponse(r.id, { reply: e.target.value })}
                    rows={3}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-slate-300 text-sm focus:outline-none focus:border-blue-500 resize-none"
                    placeholder="What Arion replies…"
                  />
                </div>
              </div>
            ))}

            <button onClick={addResponse} className="btn-secondary w-full justify-center py-3">
              <Plus size={16} /> Add response
            </button>
          </div>
        )}

        {/* ---- Badges tab ---- */}
        {tab === 'badges' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-white">Network badges</h1>
                <p className="text-slate-400 text-sm">Control how each network looks on the checkout page.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setNetworks(DEFAULT_NETWORKS)} className="btn-secondary text-sm px-3 py-2">
                  Reset
                </button>
                <button onClick={saveBadges} className="btn-primary text-sm px-4 py-2">
                  {saved === 'badges' ? <Check size={16} /> : <Save size={16} />}
                  {saved === 'badges' ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>

            {networks.map((n) => (
              <div key={n.id} className="card flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Preview */}
                <div className="flex items-center gap-3 sm:w-40">
                  <span
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-none"
                    style={{ background: n.color, color: n.textDark ? '#0f172a' : '#fff' }}
                  >
                    {n.code}
                  </span>
                  <span className="text-white font-medium">{n.name}</span>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
                  <LabeledInput label="Name" value={n.name} onChange={(v) => updateNetwork(n.id, { name: v })} />
                  <LabeledInput label="Badge text" value={n.code} onChange={(v) => updateNetwork(n.id, { code: v })} />
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={n.color}
                        onChange={(e) => updateNetwork(n.id, { color: e.target.value })}
                        className="w-9 h-9 rounded bg-transparent border border-slate-800 cursor-pointer"
                      />
                      <span className="text-xs text-slate-400">{n.color}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Options</span>
                    <label className="flex items-center gap-2 text-sm text-slate-300">
                      <input
                        type="checkbox"
                        checked={n.textDark}
                        onChange={(e) => updateNetwork(n.id, { textDark: e.target.checked })}
                        className="accent-blue-600"
                      />
                      Dark text
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-300">
                      <input
                        type="checkbox"
                        checked={n.active}
                        onChange={(e) => updateNetwork(n.id, { active: e.target.checked })}
                        className="accent-blue-600"
                      />
                      Active
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function TabBtn({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        active ? 'bg-blue-600/15 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function LabeledInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-slate-500 mb-1">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:border-blue-500"
      />
    </div>
  )
}
