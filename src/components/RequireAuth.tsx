import { Navigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { hasSupabase } from '../lib/supabase'
import NexifyLoader from './NexifyLoader'

/** Gate for any signed-in vendor. Redirects to /signin when logged out. */
export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  // If Supabase isn't configured, don't lock the app (local dev without env).
  if (!hasSupabase) return <>{children}</>
  if (loading) return <NexifyLoader fullscreen sublabel="Checking session" />
  if (!user) return <Navigate to="/signin" replace />
  return <>{children}</>
}
