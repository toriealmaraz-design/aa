import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    // Placeholder for Supabase password-reset email.
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Zap size={22} className="text-white" fill="currentColor" />
          </div>
          <span className="text-2xl font-bold text-white">Nexify</span>
        </Link>

        {sent ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Check your email</h1>
            <p className="text-slate-400 mb-8">
              We sent a password reset link to{' '}
              <span className="text-white font-medium">{email || 'your email'}</span>.
              Follow the link to set a new password.
            </p>
            <Link to="/signin" className="btn-primary w-full justify-center py-4">
              Back to Sign In
            </Link>
            <button
              onClick={() => setSent(false)}
              className="mt-4 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Didn't get it? Try again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Reset your password</h1>
              <p className="text-slate-400">
                Enter the email tied to your account and we'll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-slate-500" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center text-base py-4 disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="nx-btn-spinner" aria-hidden="true" />
                    Sending link…
                  </>
                ) : (
                  <>
                    Send Reset Link <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <Link
              to="/signin"
              className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> Back to Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
