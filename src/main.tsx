import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Pricing from './pages/Pricing'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Checkout from './pages/Checkout'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import NexifyLoader from './components/NexifyLoader'
import ScrollToHash from './components/ScrollToHash'
import ArionChat from './components/ArionChat'
import { ToastHost } from './components/Toast'
import { VENDOR, VENDOR_STATS, MOCK_ORDERS } from './lib/store'
import './index.css'

// Arion shows everywhere except the admin panel. On the vendor dashboard it
// runs in "vendor" scope with the shop's live orders + stats.
function ArionGate() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/admin')) return null
  const isVendor = pathname.startsWith('/dashboard')
  return (
    <ArionChat
      key={isVendor ? 'vendor' : 'public'}
      context={
        isVendor
          ? { scope: 'vendor', vendorName: VENDOR.name, orders: MOCK_ORDERS, stats: VENDOR_STATS }
          : { scope: 'public' }
      }
    />
  )
}

function Root() {
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    // Respect reduced-motion: skip the splash almost immediately
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setTimeout(() => setBooting(false), reduce ? 300 : 2000)
    return () => clearTimeout(t)
  }, [])

  if (booting) {
    return <NexifyLoader fullscreen sublabel="Connecting network" />
  }

  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/pay/:shop" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ArionGate />
      <ToastHost />
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
