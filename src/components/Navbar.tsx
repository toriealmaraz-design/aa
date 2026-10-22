import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Menu, X } from 'lucide-react'

interface NavbarProps {
  /** Mark the active top-level link */
  active?: 'how-it-works' | 'pricing' | null
}

/**
 * Public marketing navbar — shared across Home, How It Works, Pricing, legal pages.
 * Section links use /#anchor so they work from any route (ScrollToHash handles scroll).
 */
export default function Navbar({ active = null }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkBase = 'transition-colors text-sm font-medium'
  const idle = 'text-slate-400 hover:text-white'
  const on = 'text-white'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap size={18} className="text-white" fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-white">Nexify</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/#features" className={`${linkBase} ${idle}`}>Features</Link>
            <Link to="/how-it-works" className={`${linkBase} ${active === 'how-it-works' ? on : idle}`}>How It Works</Link>
            <Link to="/#vendors" className={`${linkBase} ${idle}`}>For Vendors</Link>
            <Link to="/pricing" className={`${linkBase} ${active === 'pricing' ? on : idle}`}>Pricing</Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/signin" className="text-slate-400 hover:text-white text-sm font-medium px-4 py-2">Sign In</Link>
            <Link to="/signup" className="btn-primary text-sm">Get Started Free</Link>
          </div>

          <button className="md:hidden text-slate-400" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4">
          <nav className="flex flex-col gap-3">
            <Link to="/#features" className="text-slate-400 hover:text-white py-2">Features</Link>
            <Link to="/how-it-works" className="text-slate-400 hover:text-white py-2">How It Works</Link>
            <Link to="/#vendors" className="text-slate-400 hover:text-white py-2">For Vendors</Link>
            <Link to="/pricing" className="text-slate-400 hover:text-white py-2">Pricing</Link>
            <hr className="border-slate-800 my-2" />
            <Link to="/signin" className="text-slate-400 hover:text-white py-2">Sign In</Link>
            <Link to="/signup" className="btn-primary justify-center mt-2">Get Started Free</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
