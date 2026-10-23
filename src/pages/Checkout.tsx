import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Zap,
  Smartphone,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'
import { loadNetworks } from '../lib/store'

type Network = 'MTN' | 'Telecel' | 'AirtelTigo'

interface Bundle {
  size: string
  validity: string
  price: number
}

const BUNDLES: Record<Network, Bundle[]> = {
  MTN: [
    { size: '1GB', validity: '30 days', price: 6 },
    { size: '2GB', validity: '30 days', price: 11 },
    { size: '5GB', validity: '30 days', price: 25 },
    { size: '10GB', validity: '30 days', price: 46 },
    { size: '20GB', validity: '30 days', price: 85 },
  ],
  Telecel: [
    { size: '1GB', validity: '30 days', price: 5 },
    { size: '3GB', validity: '30 days', price: 14 },
    { size: '6GB', validity: '30 days', price: 27 },
    { size: '15GB', validity: '30 days', price: 60 },
  ],
  AirtelTigo: [
    { size: '1GB', validity: '30 days', price: 5 },
    { size: '2GB', validity: '30 days', price: 10 },
    { size: '5GB', validity: '30 days', price: 23 },
    { size: '12GB', validity: '30 days', price: 52 },
  ],
}

export default function Checkout() {
  const { shop } = useParams()
  const shopName = shop
    ? shop.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Nexify Shop'

  const [network, setNetwork] = useState<Network>('MTN')
  const [bundle, setBundle] = useState<Bundle | null>(null)
  const [recipient, setRecipient] = useState('')
  const [payNumber, setPayNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  // Network badges come from the admin-editable store; only show active ones
  // whose name maps to a known bundle set.
  const badges = useMemo(
    () => loadNetworks().filter((n) => n.active && n.name in BUNDLES),
    [],
  )

  const bundles = useMemo(() => BUNDLES[network], [network])
  const canPay = bundle && recipient.trim().length >= 9 && payNumber.trim().length >= 9

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canPay || loading) return
    setLoading(true)
    // Placeholder for Mobile Money charge + bundle dispatch.
    await new Promise((r) => setTimeout(r, 1800))
    setLoading(false)
    setDone(true)
  }

  if (done && bundle) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-500/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Payment successful</h1>
          <p className="text-slate-400 mb-8">
            <span className="text-white font-medium">{bundle.size}</span> {network} data is on its way to{' '}
            <span className="text-white font-medium">{recipient}</span>. Delivery usually completes within
            a minute.
          </p>
          <div className="card text-left mb-8">
            <Row label="Shop" value={shopName} />
            <Row label="Network" value={network} />
            <Row label="Bundle" value={`${bundle.size} · ${bundle.validity}`} />
            <Row label="Recipient" value={recipient} />
            <Row label="Amount paid" value={`GH₵${bundle.price.toFixed(2)}`} bold />
          </div>
          <button
            onClick={() => {
              setDone(false)
              setBundle(null)
              setRecipient('')
              setPayNumber('')
            }}
            className="btn-secondary w-full justify-center py-3"
          >
            Buy another bundle
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="max-w-md mx-auto">
        {/* Shop header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <Zap size={24} className="text-white" fill="currentColor" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white leading-tight">{shopName}</h1>
            <p className="text-slate-500 text-xs flex items-center gap-1">
              <ShieldCheck size={12} className="text-green-500" /> Secure data store · Powered by Nexify
            </p>
          </div>
        </div>

        <form onSubmit={handlePay} className="space-y-6">
          {/* Network */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Select network</label>
            <div className="grid grid-cols-3 gap-2">
              {badges.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => {
                    setNetwork(n.name as Network)
                    setBundle(null)
                  }}
                  className={`rounded-xl py-3 text-sm font-semibold border transition-colors ${
                    network === n.name
                      ? 'border-blue-500 bg-blue-600/10 text-white'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <span
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold mb-1"
                    style={{ background: n.color, color: n.textDark ? '#0f172a' : '#fff' }}
                  >
                    {n.code}
                  </span>
                  <div>{n.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Bundle */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Choose a bundle</label>
            <div className="space-y-2">
              {bundles.map((b) => (
                <button
                  key={b.size}
                  type="button"
                  onClick={() => setBundle(b)}
                  className={`w-full flex items-center justify-between rounded-xl px-4 py-3 border transition-colors ${
                    bundle?.size === b.size
                      ? 'border-blue-500 bg-blue-600/10'
                      : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone size={18} className="text-blue-400" />
                    <div className="text-left">
                      <div className="text-white font-medium">{b.size}</div>
                      <div className="text-slate-500 text-xs">{b.validity}</div>
                    </div>
                  </div>
                  <div className="text-white font-semibold">GH₵{b.price.toFixed(2)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Recipient number */}
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-slate-300 mb-2">
              Recipient phone number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Smartphone size={18} className="text-slate-500" />
              </div>
              <input
                id="recipient"
                type="tel"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="024 123 4567"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-500">The number that will receive the data.</p>
          </div>

          {/* Payment number */}
          <div>
            <label htmlFor="payNumber" className="block text-sm font-medium text-slate-300 mb-2">
              Pay with Mobile Money
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone size={18} className="text-slate-500" />
              </div>
              <input
                id="payNumber"
                type="tel"
                value={payNumber}
                onChange={(e) => setPayNumber(e.target.value)}
                placeholder="MoMo number to charge"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Summary + pay */}
          <div className="border-t border-slate-800 pt-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400">Total</span>
              <span className="text-2xl font-bold text-white">
                {bundle ? `GH₵${bundle.price.toFixed(2)}` : 'GH₵0.00'}
              </span>
            </div>
            <button
              type="submit"
              disabled={!canPay || loading}
              className="btn-primary w-full justify-center text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="nx-btn-spinner" aria-hidden="true" />
                  Processing payment…
                </>
              ) : (
                <>
                  Pay Now <ArrowRight size={18} />
                </>
              )}
            </button>
            <p className="mt-3 text-center text-xs text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck size={12} className="text-green-500" /> You'll get a MoMo prompt to approve the payment.
            </p>
          </div>
        </form>

        <a
          href="/"
          className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> What is Nexify?
        </a>
      </div>
    </div>
  )
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-slate-500 text-sm">{label}</span>
      <span className={`text-sm ${bold ? 'text-white font-semibold' : 'text-slate-300'}`}>{value}</span>
    </div>
  )
}
