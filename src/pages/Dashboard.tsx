import { useState } from 'react'
import {
  Wallet,
  TrendingUp,
  ShoppingBag,
  Users,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  Check,
  ExternalLink,
  Plus,
} from 'lucide-react'
import DashboardLayout, { DashTab } from '../components/DashboardLayout'

/* ---------- mock data ---------- */
const stats = [
  { label: 'Wallet Balance', value: 'GH₵1,284.50', icon: <Wallet size={20} />, tone: 'text-green-400 bg-green-500/15' },
  { label: "Today's Sales", value: 'GH₵340.00', icon: <TrendingUp size={20} />, tone: 'text-blue-400 bg-blue-500/15' },
  { label: 'Total Orders', value: '1,920', icon: <ShoppingBag size={20} />, tone: 'text-purple-400 bg-purple-500/15' },
  { label: 'Customers', value: '612', icon: <Users size={20} />, tone: 'text-amber-400 bg-amber-500/15' },
]

const orders = [
  { id: 'NX-10492', customer: '024 •••• 231', bundle: 'MTN 5GB', amount: 25, status: 'Delivered', date: '2m ago' },
  { id: 'NX-10491', customer: '055 •••• 887', bundle: 'Telecel 1GB', amount: 5, status: 'Delivered', date: '14m ago' },
  { id: 'NX-10490', customer: '020 •••• 014', bundle: 'AirtelTigo 2GB', amount: 10, status: 'Processing', date: '31m ago' },
  { id: 'NX-10489', customer: '024 •••• 556', bundle: 'MTN 10GB', amount: 46, status: 'Delivered', date: '1h ago' },
  { id: 'NX-10488', customer: '059 •••• 773', bundle: 'MTN 1GB', amount: 6, status: 'Failed', date: '2h ago' },
]

const products = [
  { network: 'MTN', size: '1GB', wholesale: 5.2, price: 6, active: true },
  { network: 'MTN', size: '5GB', wholesale: 22, price: 25, active: true },
  { network: 'Telecel', size: '1GB', wholesale: 4.3, price: 5, active: true },
  { network: 'AirtelTigo', size: '2GB', wholesale: 8.5, price: 10, active: false },
]

const txns = [
  { type: 'in', label: 'Sale · MTN 5GB', amount: 25, date: 'Today, 2:14 PM' },
  { type: 'in', label: 'Sale · Telecel 1GB', amount: 5, date: 'Today, 2:00 PM' },
  { type: 'out', label: 'Withdrawal to MoMo', amount: 500, date: 'Yesterday' },
  { type: 'in', label: 'Sale · MTN 10GB', amount: 46, date: 'Yesterday' },
]

function statusClasses(s: string) {
  if (s === 'Delivered') return 'bg-green-500/15 text-green-400'
  if (s === 'Processing') return 'bg-amber-500/15 text-amber-400'
  return 'bg-red-500/15 text-red-400'
}

export default function Dashboard() {
  const [tab, setTab] = useState<DashTab>('overview')
  const [copied, setCopied] = useState(false)
  const shopLink = 'nexify.app/pay/kofi-data'

  const copy = () => {
    navigator.clipboard?.writeText(`https://${shopLink}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <DashboardLayout active={tab} onChange={setTab}>
      {tab === 'overview' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Overview</h1>
            <p className="text-slate-400 text-sm">Here's how your shop is doing.</p>
          </div>

          {/* Shop link banner */}
          <div className="card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-slate-400 text-sm mb-1">Your shop link</p>
              <p className="text-white font-medium">{shopLink}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={copy} className="btn-secondary text-sm px-4 py-2">
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <a href={`https://${shopLink}`} className="btn-primary text-sm px-4 py-2">
                <ExternalLink size={16} /> Visit
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="card">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.tone}`}>{s.icon}</div>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Recent orders */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
              <button onClick={() => setTab('orders')} className="text-blue-400 text-sm hover:text-blue-300">
                View all
              </button>
            </div>
            <OrdersTable rows={orders.slice(0, 4)} />
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Orders</h1>
            <p className="text-slate-400 text-sm">Every bundle sold through your shop.</p>
          </div>
          <div className="card">
            <OrdersTable rows={orders} />
          </div>
        </div>
      )}

      {tab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Products</h1>
              <p className="text-slate-400 text-sm">Set your selling price on each bundle.</p>
            </div>
            <button className="btn-primary text-sm px-4 py-2">
              <Plus size={16} /> Add bundle
            </button>
          </div>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="text-slate-500 text-left border-b border-slate-800">
                  <th className="py-3 font-medium">Network</th>
                  <th className="py-3 font-medium">Bundle</th>
                  <th className="py-3 font-medium">Wholesale</th>
                  <th className="py-3 font-medium">Your Price</th>
                  <th className="py-3 font-medium">Margin</th>
                  <th className="py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i} className="border-b border-slate-800/60 last:border-0">
                    <td className="py-3 text-white">{p.network}</td>
                    <td className="py-3 text-slate-300">{p.size}</td>
                    <td className="py-3 text-slate-400">GH₵{p.wholesale.toFixed(2)}</td>
                    <td className="py-3 text-white font-medium">GH₵{p.price.toFixed(2)}</td>
                    <td className="py-3 text-green-400">GH₵{(p.price - p.wholesale).toFixed(2)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${p.active ? 'bg-green-500/15 text-green-400' : 'bg-slate-700/50 text-slate-400'}`}>
                        {p.active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'wallet' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Wallet</h1>
            <p className="text-slate-400 text-sm">Withdraw your earnings to Mobile Money anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card md:col-span-1 bg-gradient-to-br from-blue-600/20 to-slate-900 border-blue-500/20">
              <p className="text-slate-400 text-sm mb-1">Available balance</p>
              <p className="text-3xl font-bold text-white mb-6">GH₵1,284.50</p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-3"
              >
                <input
                  type="number"
                  placeholder="Amount to withdraw"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="tel"
                  placeholder="MoMo number"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button type="submit" className="btn-primary w-full justify-center py-3">
                  Withdraw <ArrowUpRight size={16} />
                </button>
              </form>
            </div>

            <div className="card md:col-span-2">
              <h2 className="text-lg font-semibold text-white mb-4">Recent transactions</h2>
              <div className="space-y-1">
                {txns.map((t, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-slate-800/60 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${t.type === 'in' ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
                        {t.type === 'in' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{t.label}</div>
                        <div className="text-slate-500 text-xs">{t.date}</div>
                      </div>
                    </div>
                    <div className={`text-sm font-semibold ${t.type === 'in' ? 'text-green-400' : 'text-red-400'}`}>
                      {t.type === 'in' ? '+' : '−'}GH₵{t.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'shop' && (
        <div className="space-y-6 max-w-2xl">
          <div>
            <h1 className="text-2xl font-bold text-white">Shop Setup</h1>
            <p className="text-slate-400 text-sm">Customize how customers see your store.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="card space-y-5">
            <Field label="Shop name" defaultValue="Kofi Data" />
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Shop link</label>
              <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
                <span className="px-3 text-slate-500 text-sm border-r border-slate-800">nexify.app/pay/</span>
                <input defaultValue="kofi-data" className="flex-1 bg-transparent py-3 px-3 text-white focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
              <textarea
                rows={3}
                defaultValue="Fast, reliable data bundles for all networks. Open 24/7."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>
            <Field label="Withdrawal MoMo number" defaultValue="024 123 4567" />
            <button type="submit" className="btn-primary px-6 py-3">Save changes</button>
          </form>
        </div>
      )}
    </DashboardLayout>
  )
}

function OrdersTable({ rows }: { rows: typeof orders }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[520px]">
        <thead>
          <tr className="text-slate-500 text-left border-b border-slate-800">
            <th className="py-3 font-medium">Order</th>
            <th className="py-3 font-medium">Customer</th>
            <th className="py-3 font-medium">Bundle</th>
            <th className="py-3 font-medium">Amount</th>
            <th className="py-3 font-medium">Status</th>
            <th className="py-3 font-medium">Time</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((o) => (
            <tr key={o.id} className="border-b border-slate-800/60 last:border-0">
              <td className="py-3 text-white font-medium">{o.id}</td>
              <td className="py-3 text-slate-400">{o.customer}</td>
              <td className="py-3 text-slate-300">{o.bundle}</td>
              <td className="py-3 text-white">GH₵{o.amount.toFixed(2)}</td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-xs ${statusClasses(o.status)}`}>{o.status}</span>
              </td>
              <td className="py-3 text-slate-500">{o.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <input
        defaultValue={defaultValue}
        className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
      />
    </div>
  )
}
