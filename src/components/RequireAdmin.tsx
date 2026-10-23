import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { supabase, hasSupabase } from '../lib/supabase'
import NexifyLoader from './NexifyLoader'

/** Gate for the admin panel: requires a session whose email is in `admins`. */
export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const [status, setStatus] = useState<'checking' | 'ok' | 'denied'>('checking')

  useEffect(() => {
    if (!hasSupabase) {
      setStatus('ok')
      return
    }
    if (loading) return
    if (!user?.email) {
      setStatus('denied')
      return
    }
    supabase
      .from('admins')
      .select('email')
      .eq('email', user.email)
      .maybeSingle()
      .then(({ data }) => setStatus(data ? 'ok' : 'denied'))
  }, [user, loading])

  if (!hasSupabase) return <>{children}</>
  if (loading || status === 'checking') return <NexifyLoader fullscreen sublabel="Verifying admin" />
  if (!user) return <Navigate to="/signin" replace />

  if (status === 'denied') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 bg-red-500/15 rounded-2xl flex items-center justify-center mb-6">
          <ShieldAlert size={32} className="text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Not authorized</h1>
        <p className="text-slate-400 max-w-md mb-8">
          The account <span className="text-white">{user.email}</span> isn't an admin on Nexify.
          Ask an existing admin to add your email.
        </p>
        <Link to="/dashboard" className="btn-primary px-6 py-3">Back to Dashboard</Link>
      </div>
    )
  }

  return <>{children}</>
}
