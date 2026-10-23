import { Link } from 'react-router-dom'
import { Check, X, ArrowRight, Zap, Sparkles } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface Plan {
  name: string
  price: string
  period: string
  tagline: string
  highlight?: boolean
  cta: string
  features: { label: string; included: boolean }[]
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: 'GH₵0',
    period: 'forever',
    tagline: 'Everything you need to start reselling today.',
    cta: 'Start Free',
    features: [
      { label: 'Personal data shop & payment link', included: true },
      { label: 'MTN, Telecel & AirtelTigo bundles', included: true },
      { label: 'Instant Mobile Money payouts', included: true },
      { label: 'Standard wholesale pricing', included: true },
      { label: 'Up to GH₵2,000 monthly volume', included: true },
      { label: 'Custom branding & logo', included: false },
      { label: 'Priority support', included: false },
    ],
  },
  {
    name: 'Growth',
    price: 'GH₵30',
    period: 'per month',
    tagline: 'Lower wholesale costs and branding for serious sellers.',
    highlight: true,
    cta: 'Choose Growth',
    features: [
      { label: 'Everything in Starter', included: true },
      { label: 'Discounted wholesale pricing', included: true },
      { label: 'Custom branding & logo', included: true },
      { label: 'Unlimited monthly volume', included: true },
      { label: 'Sales analytics dashboard', included: true },
      { label: 'Referral commissions', included: true },
      { label: 'Priority support', included: false },
    ],
  },
  {
    name: 'Business',
    price: 'GH₵99',
    period: 'per month',
    tagline: 'Best rates and tools for teams and agencies.',
    cta: 'Choose Business',
    features: [
      { label: 'Everything in Growth', included: true },
      { label: 'Best-in-class wholesale pricing', included: true },
      { label: 'Multiple sub-vendor accounts', included: true },
      { label: 'Bulk & API access', included: true },
      { label: 'Dedicated account manager', included: true },
      { label: 'Priority 24/7 support', included: true },
      { label: 'Custom domain', included: true },
    ],
  },
]

export default function Pricing() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar active="pricing" />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles size={14} className="text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Start free — upgrade as you grow</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Simple, transparent <span className="text-blue-500">pricing</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            No setup fees. No hidden charges. You only ever pay the wholesale cost of the data you
            sell — plans just lower that cost and unlock more tools.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 border flex flex-col card-hover ${
                plan.highlight
                  ? 'bg-slate-900 border-blue-500/60 shadow-lg shadow-blue-600/10'
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <div className="mt-3 mb-1 flex items-end gap-1">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-slate-500 text-sm mb-1">/ {plan.period}</span>
              </div>
              <p className="text-slate-400 text-sm mb-6">{plan.tagline}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f.label} className="flex items-start gap-3 text-sm">
                    {f.included ? (
                      <span className="w-5 h-5 rounded-full bg-green-500/15 flex items-center justify-center flex-none mt-0.5">
                        <Check size={13} className="text-green-500" />
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center flex-none mt-0.5">
                        <X size={13} className="text-slate-600" />
                      </span>
                    )}
                    <span className={f.included ? 'text-slate-300' : 'text-slate-600'}>{f.label}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={`w-full justify-center py-3 ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`}
              >
                {plan.cta} <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Reassurance */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6 text-center">
          {[
            { icon: <Zap size={20} />, title: 'Instant delivery', desc: 'Bundles sent to customers in seconds, 24/7.' },
            { icon: <Check size={20} />, title: 'No lock-in', desc: 'Upgrade, downgrade, or cancel any time.' },
            { icon: <Sparkles size={20} />, title: 'Keep your margin', desc: 'You set prices and keep 100% of your markup.' },
          ].map((item) => (
            <div key={item.title} className="card">
              <div className="w-11 h-11 bg-blue-600/15 text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <h4 className="text-white font-semibold mb-1">{item.title}</h4>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-blue-600/20 to-slate-900 border border-blue-500/20 rounded-3xl p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to start earning?</h2>
          <p className="text-slate-400 mb-8">Create your free shop now — no card required.</p>
          <Link to="/signup" className="btn-primary text-lg px-8 py-4">
            Create Your Data Shop <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
