import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/** True when env vars are present — lets the app fall back to seed data if not. */
export const hasSupabase = Boolean(url && anonKey)

/**
 * Supabase client. If env vars are missing we still export a client pointed at
 * a dummy URL so imports don't throw; callers should guard with `hasSupabase`.
 */
export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  anonKey || 'placeholder-key',
  { auth: { persistSession: true, autoRefreshToken: true } },
)
