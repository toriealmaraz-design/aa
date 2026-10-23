import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Zap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  User,
  Phone,
} from 'lucide-react'
import { useAuth } from '../lib/auth'

export default function SignUp() {
  const { signInWithGoogle } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    // Nexify is Google-only — account creation goes through Google OAuth.
    setLoading(true)
    await signInWithGoogle()
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left side - Feature highlight (hidden on mobile) */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600/20 via-slate-900 to-slate-950 items-center justify-center p-12">
        <div className="max-w-md">
          <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-8">
            <Zap size={32} className="text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Your data business starts here
          </h2>
          <p className="text-slate-400 mb-8">
            Create your free Nexify account and start earning from data sales today. 
            No experience needed, no upfront costs.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-slate-300">
              <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                <Check size={14} className="text-green-500" />
              </div>
              100% free to create account
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                <Check size={14} className="text-green-500" />
              </div>
              Get your personal payment link
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                <Check size={14} className="text-green-500" />
              </div>
              Start selling within 5 minutes
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                <Check size={14} className="text-green-500" />
              </div>
              Earn unlimited commissions
            </li>
          </ul>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-slate-800">
            <div>
              <div className="text-2xl font-bold text-white">5K+</div>
              <div className="text-slate-500 text-sm">Active Vendors</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">₵2M+</div>
              <div className="text-slate-500 text-sm">Paid Out</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-slate-500 text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Zap size={22} className="text-white" fill="currentColor" />
            </div>
            <span className="text-2xl font-bold text-white">Nexify</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
            <p className="text-slate-400">
              Start your data reselling business in Ghana
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">
                Full name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-500" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Kofi Mensah"
                  required
                />
              </div>
            </div>

            {/* Email */}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                Phone number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone size={18} className="text-slate-500" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="024 123 4567"
                  required
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-500">We'll use this for Mobile Money withdrawals</p>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3.5 pl-11 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="mt-1.5 text-xs text-slate-500">Minimum 8 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start pt-2">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 bg-slate-900 border-slate-700 rounded text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-950"
                required
              />
              <label htmlFor="agreeTerms" className="ml-2 text-sm text-slate-400">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-500 hover:text-blue-400">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-blue-500 hover:text-blue-400">Privacy Policy</Link>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center text-base py-4 mt-2 disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="nx-btn-spinner" aria-hidden="true" />
                  Creating account…
                </>
              ) : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-950 text-slate-500">or sign up with</span>
            </div>
          </div>

          {/* Google sign up */}
          <button onClick={() => signInWithGoogle()} className="w-full flex items-center justify-center gap-3 bg-slate-900 border border-slate-800 rounded-xl py-3.5 px-4 text-white hover:bg-slate-800 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Sign in link */}
          <p className="mt-6 text-center text-slate-400">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
