import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'
import NexifyLoader from '../components/NexifyLoader'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 text-center">
      <div className="scale-90 mb-4 pointer-events-none">
        <NexifyLoader size={120} wordmark={false} sublabel={null} />
      </div>

      <div className="text-7xl font-extrabold text-white mb-2">404</div>
      <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
      <p className="text-slate-400 max-w-md mb-8">
        The page you're looking for doesn't exist or has moved. Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link to="/" className="btn-primary px-6 py-3">
          <Home size={18} /> Back to Home
        </Link>
        <Link to="/how-it-works" className="btn-secondary px-6 py-3">
          <Search size={18} /> How Nexify Works
        </Link>
      </div>
    </div>
  )
}
