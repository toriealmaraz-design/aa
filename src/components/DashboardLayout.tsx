import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Home as HomeIcon,
  History,
  Link2,
  Wallet,
  Users,
  Store,
  Menu,
  LogOut,
  Shield,
} from 'lucide-react'
import { VENDOR } from '../lib/store'

export type DashTab =
  | 'home'
  | 'sales'
  | 'links'
  | 'wallet'
  | 'referrals'
  | 'shop'
  | 'prices'
  | 'transactions'
  | 'subagents'
  | 'profile'

const GROUPS: { heading: string; items: { id: DashTab; label: string; icon: ReactNode }[] }[] = [
  {
    heading: 'Navigation',
    items: [
      { id: 'home', label: 'Home', icon: <HomeIcon size={18} /> },
      { id: 'sales', label: 'Sales History', icon: <History size={18} /> },
      { id: 'links', label: 'Links', icon: <Link2 size={18} /> },
    ],
  },
  {
    heading: 'Quick Access',
    items: [
      { id: 'wallet', label: 'Wallet', icon: <Wallet size={18} /> },
      { id: 'referrals', label: 'Referrals', icon: <Users size={18} /> },
    ],
  },
  {
    heading: 'Settings',
    items: [{ id: 'shop', label: 'Shop Settings', icon: <Store size={18} /> }],
  },
]

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

interface Props {
  active: DashTab
  onChange: (t: DashTab) => void
  children: ReactNode
}

export default function DashboardLayout({ active, onChange, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const name = VENDOR.name

  const Sidebar = (
    <>
      <Link to="/" className="flex items-center gap-2 px-6 h-16 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">N</span>
        </div>
        <span className="text-xl font-bold text-white">Nexify</span>
      </Link>

      <nav className="flex-1 px-3 py-5 overflow-y-auto">
        {GROUPS.map((group) => (
          <div key={group.heading} className="mb-6">
            <p className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
              {group.heading}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onChange(item.id)
                    setMobileOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active === item.id
                      ? 'bg-blue-600/15 text-blue-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-slate-800 space-y-1">
        <Link
          to="/admin"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <Shield size={18} /> Admin Panel
        </Link>
        <Link
          to="/signin"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <LogOut size={18} /> Sign out
        </Link>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900/60 border-r border-slate-800 fixed inset-y-0">
        {Sidebar}
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 z-50 flex flex-col lg:hidden">
            {Sidebar}
          </aside>
        </>
      )}

      {/* Main column */}
      <div className="flex-1 lg:ml-64 min-w-0">
        {/* Blue gradient header (our primary blue, on the dark app) */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-b-3xl px-4 sm:px-6 lg:px-8 pt-5 pb-20 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden text-white/90 mr-1"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
              <div className="w-11 h-11 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white font-semibold">
                {initials(name)}
              </div>
              <div>
                <p className="text-blue-100 text-sm leading-tight">{greeting()}</p>
                <h1 className="text-white text-xl font-bold leading-tight">{name}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold tracking-wider text-white bg-white/15 border border-white/25 px-2.5 py-1 rounded-md">
                SUBAGENT
              </span>
              <Link to="/signin" className="text-white/90 hover:text-white" aria-label="Sign out">
                <LogOut size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Content pulled up to overlap the header */}
        <main className="px-4 sm:px-6 lg:px-8 -mt-14 pb-16 max-w-5xl">{children}</main>
      </div>
    </div>
  )
}
