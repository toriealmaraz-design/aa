import { useState } from 'react'
import {
  Wallet as WalletIcon,
  Database,
  TrendingUp,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  Check,
  ExternalLink,
  Plus,
  Bell,
  History,
  Link2,
  ArrowLeftRight,
  Tag,
  Users,
  UserCircle,
  Share2,
} from 'lucide-react'
import DashboardLayout, { DashTab } from '../components/DashboardLayout'
import { VENDOR, VENDOR_STATS, MOCK_ORDERS } from '../lib/store'

/* ---------- derived mock figures ---------- */
const orders = MOCK_ORDERS
const todaySales = VENDOR_STATS.todaySales
const todayOrders = orders.length
const todaySuccessful = orders.filter((o) => o.status === 'Delivered').length
const todayCommission = 'GH₵48.50'

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
  const [tab, setTab] = useState<DashTab>('home')
  const [copied, setCopied] = useState(false)
  const shopLink = VENDOR.shopLink

  const copy = () => {
    navigator.clipboard?.writeText(`https://${shopLink}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const activity = [
    { label: "Today's sales", value: todaySales, icon: <WalletIcon size={20} />, tone: 'text-amber-400 bg-amber-500/15' },
    { label: "Today's orders", value: String(todayOrders), icon: <Database size={20} />, tone: 'text-blue-400 bg-blue-500/15' },
    { label: "Today's total commission", value: todayCommission, icon: <TrendingUp size={20} />, tone: 'text-emerald-400 bg-emerald-500/15' },
    { label: "Today's successful orders", value: String(todaySuccessful), icon: <CheckCircle2 size={20} />, tone: 'text-purple-400 bg-purple-500/15' },
  ]

  const quickActions: { label: string; icon: React.ReactNode; tone: string; go: DashTab }[] = [
    { label: 'History', icon: <History size={22} />, tone: 'bg-blue-500/15 text-blue-400', go: 'sales' },
    { label: 'Link', icon: <Link2 size={22} />, tone: 'bg-emerald-500/15 text-emerald-400', go: 'links' },
    { label: 'Transactions', icon: <ArrowLeftRight size={22} />, tone: 'bg-purple-500/15 text-purple-400', go: 'transactions' },
    { label: 'Prices', icon: <Tag size={22} />, tone: 'bg-amber-500/15 text-amber-400', go: 'prices' },
    { label: 'Sub Agents', icon: <Users size={22} />, tone: 'bg-cyan-500/15 text-cyan-400', go: 'subagents' },
    { label: 'Profile', icon: <UserCircle size={22} />, tone: 'bg-pink-500/15 text-pink-400', go: 'profile' },
  ]

  return (
    <DashboardLayout active={tab} onChange={setTab}>
      {/* ───────────────── HOME ───────────────── */}
      {tab === 'home' && (
        <div className="space-y-6">
          {/* Available balance (overlaps the header) */}
          <div className="card">
            <p className="text-slate-400 text-sm mb-1">Available Balance</p>
            <div className="flex items-center justify-between">
              <p className="text-4xl font-bold text-white">{VENDOR_STATS.walletBalance}</p>
              <button onClick={() => setTab('transactions')} className="text-blue-400 text-sm hover:text-blue-300 flex items-center gap-1">
                Refresh
              </button>
            </div>
            <button onClick={() => setTab('wallet')} className="btn-primary w-full justify-center py-3.5 mt-5">
              <WalletIcon size={18} /> Withdraw
            </button>
            <button onClick={() => setTab('transactions')} className="w-full text-center text-blue-400 text-sm hover:text-blue-300 mt-3">
              View withdrawal history →
            </button>
          </div>

          {/* Push notifications */}
          <div className="card flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center flex-none">
              <Bell size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold">Enable push notifications</h3>
              <p className="text-slate-400 text-sm mb-3">
                Get alerted instantly when you earn a sale or commission, even when the app is closed.
              </p>
              <button className="btn-primary text-sm px-4 py-2">
                <Bell size={15} /> Turn on notifications
              </button>
            </div>
          </div>

          {/* Today's activity */}
          <div>
            <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase mb-3">Today's Activity</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activity.map((a) => (
                <div key={a.label} className="card">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${a.tone}`}>{a.icon}</div>
                  <div className="text-2xl font-bold text-white">{a.value}</div>
                  <div className="text-slate-400 text-sm">{a.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div>
            <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase mb-3">Quick Actions</p>
            <div className="grid grid-cols-3 gap-4">
              {quickActions.map((q) => (
                <button
                  key={q.label}
                  onClick={() => setTab(q.go)}
                  className="card flex flex-col items-center justify-center gap-2 py-5 hover:border-slate-700 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${q.tone}`}>{q.icon}</div>
                  <span className="text-slate-300 text-sm font-medium">{q.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ───────────────── SALES HISTORY ───────────────── */}
      {tab === 'sales' && (
        <Panel title="Sales History" subtitle="Every bundle sold through your shop.">
          <div className="card">
            <OrdersTable rows={orders} />
          </div>
        </Panel>
      )}

      {/* ───────────────── LINKS ───────────────── */}
      {tab === 'links' && (
        <Panel title="Your Links" subtitle="Share these to get paid and grow your team.">
          <div className="space-y-4">
            <LinkCard
              title="Shop payment link"
              desc="Customers buy data here."
              value={shopLink}
              onCopy={copy}
              copied={copied}
            />
            <LinkCard
              title="Referral link"
              desc="Earn commission when new vendors join."
              value={`nexify.app/r/${VENDOR.name.toLowerCase()}`}
            />
          </div>
        </Panel>
      )}

      {/* ───────────────── WALLET ───────────────── */}
      {tab === 'wallet' && (
        <Panel title="Wallet" subtitle="Withdraw your earnings to Mobile Money anytime.">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card md:col-span-1 bg-gradient-to-br from-blue-600/20 to-slate-900 border-blue-500/20">
              <p className="text-slate-400 text-sm mb-1">Available balance</p>
              <p className="text-3xl font-bold text-white mb-6">{VENDOR_STATS.walletBalance}</p>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                <input type="number" placeholder="Amount to withdraw" className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500" />
                <input type="tel" placeholder="MoMo number" className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500" />
                <button type="submit" className="btn-primary w-full justify-center py-3">Withdraw <ArrowUpRight size={16} /></button>
              </form>
            </div>
            <div className="card md:col-span-2">
              <h2 className="text-lg font-semibold text-white mb-4">Recent transactions</h2>
              <TxnList />
            </div>
          </div>
        </Panel>
      )}

      {/* ───────────────── TRANSACTIONS ───────────────── */}
      {tab === 'transactions' && (
        <Panel title="Transactions" subtitle="Your sales and withdrawals.">
          <div className="card"><TxnList /></div>
        </Panel>
      )}

      {/* ───────────────── PRICES ───────────────── */}
      {tab === 'prices' && (
        <Panel
          title="Prices"
          subtitle="Set your selling price on each bundle."
          action={<button className="btn-primary text-sm px-4 py-2"><Plus size={16} /> Add bundle</button>}
        >
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
                    <td className="py-3 text-emerald-400">GH₵{(p.price - p.wholesale).toFixed(2)}</td>
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
        </Panel>
      )}

      {/* ───────────────── REFERRALS ───────────────── */}
      {tab === 'referrals' && (
        <Panel title="Referrals" subtitle="Invite other vendors and earn commission on their sales.">
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Referred vendors', value: '8' },
              { label: 'Active this month', value: '5' },
              { label: 'Referral earnings', value: 'GH₵126.00' },
            ].map((s) => (
              <div key={s.label} className="card">
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
          <LinkCard
            title="Your referral link"
            desc="Share it anywhere."
            value={`nexify.app/r/${VENDOR.name.toLowerCase()}`}
          />
        </Panel>
      )}

      {/* ───────────────── SUB AGENTS ───────────────── */}
      {tab === 'subagents' && (
        <Panel
          title="Sub Agents"
          subtitle="Vendors operating under your account."
          action={<button className="btn-primary text-sm px-4 py-2"><Plus size={16} /> Add sub agent</button>}
        >
          <div className="card divide-y divide-slate-800/60">
            {[
              { name: 'Ama Boateng', phone: '024 •••• 118', sales: 'GH₵420' },
              { name: 'Yaw Mensah', phone: '055 •••• 907', sales: 'GH₵180' },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between py-3 first:pt-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-cyan-500/15 text-cyan-400 flex items-center justify-center text-sm font-semibold">
                    {s.name[0]}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{s.name}</div>
                    <div className="text-slate-500 text-xs">{s.phone}</div>
                  </div>
                </div>
                <div className="text-slate-300 text-sm">{s.sales}</div>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {/* ───────────────── PROFILE ───────────────── */}
      {tab === 'profile' && (
        <Panel title="Profile" subtitle="Your account details.">
          <form onSubmit={(e) => e.preventDefault()} className="card space-y-5 max-w-2xl">
            <Field label="Full name" defaultValue={VENDOR.name} />
            <Field label="Email" defaultValue="kofi@example.com" />
            <Field label="Phone" defaultValue="024 123 4567" />
            <button type="submit" className="btn-primary px-6 py-3">Save changes</button>
          </form>
        </Panel>
      )}

      {/* ───────────────── SHOP SETTINGS ───────────────── */}
      {tab === 'shop' && (
        <Panel title="Shop Settings" subtitle="Customize how customers see your store.">
          <form onSubmit={(e) => e.preventDefault()} className="card space-y-5 max-w-2xl">
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
        </Panel>
      )}
    </DashboardLayout>
  )
}

/* ---------- helpers ---------- */

function Panel({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
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

function TxnList() {
  return (
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
  )
}

function LinkCard({ title, desc, value, onCopy, copied }: { title: string; desc: string; value: string; onCopy?: () => void; copied?: boolean }) {
  return (
    <div className="card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-white font-medium">
          <Share2 size={15} className="text-blue-400" /> {title}
        </div>
        <p className="text-slate-500 text-xs mb-1">{desc}</p>
        <p className="text-slate-300 text-sm truncate">{value}</p>
      </div>
      <div className="flex gap-2 flex-none">
        <button
          onClick={() => (onCopy ? onCopy() : navigator.clipboard?.writeText(`https://${value}`))}
          className="btn-secondary text-sm px-4 py-2"
        >
          {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <a href={`https://${value}`} className="btn-primary text-sm px-4 py-2">
          <ExternalLink size={16} /> Open
        </a>
      </div>
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
