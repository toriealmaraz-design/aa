import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NexifyLoader from './components/NexifyLoader'
import './index.css'

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
