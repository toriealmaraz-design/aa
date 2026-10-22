import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Zap,
  LayoutDashboard,
  ShoppingBag,
  Package,
  Wallet,
  Store,
  Menu,
  X,
  LogOut,
  Bell,
} from 'lucide-react'

export type DashTab = 'overview' | 'orders' | 'products' | 'wallet' | 'shop'

const NAV: { id: DashTab; label: string; icon: ReactNode }[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
  { id: 'orders', label: 'Orders', icon: <ShoppingBag size={18} /> },
  { id: 'products', label: 'Products', icon: <Package size={18} /> },
  { id: 'wallet', label: 'Wallet', icon: <Wallet size={18} /> },
  { id: 'shop', label: 'Shop Setup', icon: <Store size={18} /> },
]

interface Props {
  active: DashTab
  onChange: (t: DashTab) => void
  children: ReactNode
}

export default function DashboardLayout({ active, onChange, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const SidebarInner = (
    <>
      <Link to="/" className="flex items-center gap-2 px-6 h-16 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Zap size={18} className="text-white" fill="currentColor" />
        </div>
        <span className="text-xl font-bold text-white">Nexify</span>
      </Link>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map((item) => (
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
      </nav>
      <div className="px-3 py-4 border-t border-slate-800">
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
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900/50 border-r border-slate-800 fixed inset-y-0">
        {SidebarInner}
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 z-50 flex flex-col lg:hidden">
            {SidebarInner}
          </aside>
        </>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64 min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-slate-950/80 backdrop-blur border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <button className="lg:hidden text-slate-400" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
          <div className="hidden lg:block text-sm text-slate-500">
            Welcome back, <span className="text-white font-medium">Kofi</span> 👋
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-slate-400 hover:text-white transition-colors" aria-label="Notifications">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-semibold">
              K
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl">{children}</main>
      </div>

      {/* Mobile menu close helper icon (a11y) */}
      <span className="sr-only">{mobileOpen ? <X /> : null}</span>
    </div>
  )
}
