import { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface LegalPageProps {
  title: string
  updated: string
  children: ReactNode
}

/** Shared container for Terms / Privacy / policy pages. */
export default function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
          <p className="text-slate-500 text-sm mb-10">Last updated: {updated}</p>
          <div className="legal-prose space-y-8 text-slate-300 leading-relaxed">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

/** Section heading + body helper for legal content. */
export function LegalSection({ id, heading, children }: { id?: string; heading: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-xl font-semibold text-white mb-3">{heading}</h2>
      <div className="space-y-3 text-slate-400">{children}</div>
    </section>
  )
}
