import { useState } from 'react'
import {
  Zap,
  Users,
  Smartphone,
  Share2,
  Wallet,
  ArrowRight,
  Check,
  Clock,
  Shield,
  TrendingUp,
  ChevronDown,
  Star,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const steps = [
    {
      number: '01',
      icon: <Users size={24} />,
      title: 'Create Your Free Account',
      description: 'Sign up on Nexify with just your email and phone number. No fees, no hidden charges. Get verified and approved within minutes.',
    },
    {
      number: '02',
      icon: <Smartphone size={24} />,
      title: 'Set Up Your Digital Shop',
      description: 'Customize your shop name, add your logo, and set your selling prices. You control your profit margins on every product.',
    },
    {
      number: '03',
      icon: <Share2 size={24} />,
      title: 'Share Your Unique Link',
      description: 'Get a personalized payment link (e.g., nexify.app/pay/yourshop). Share it on WhatsApp, Facebook, Instagram, or anywhere online.',
    },
    {
      number: '04',
      icon: <Wallet size={24} />,
      title: 'Receive Orders & Earn',
      description: 'Customers pay via Mobile Money, orders are delivered automatically, and profits are added to your wallet instantly. Withdraw anytime!',
    },
  ]

  const benefits = [
    'No registration fees or hidden charges',
    'Keep 100% of your profit margin',
    'Automatic instant delivery to customers',
    'All major networks: MTN, Telecel, AirtelTigo',
    'Mobile Money withdrawals anytime',
    '24/7 automated service - earn while you sleep',
    'Build a team and earn referral commissions',
    'Works on any phone or device',
  ]

  const features = [
    { icon: <Zap size={22} />, title: 'Instant Delivery', description: 'Data delivered in seconds automatically' },
    { icon: <TrendingUp size={22} />, title: 'Unlimited Earnings', description: 'No cap on how much you can earn' },
    { icon: <Shield size={22} />, title: 'Secure Payments', description: 'Safe Mobile Money transactions' },
    { icon: <Clock size={22} />, title: '24/7 Operations', description: 'Your shop never closes' },
  ]

  const faqs = [
    {
      question: 'How much money do I need to start selling data bundles in Ghana?',
      answer: 'You need absolutely nothing to start! Nexify is 100% free to join. There are no registration fees, no monthly subscriptions, and no hidden charges. You can start selling immediately after creating your account. You only need money when you want to fulfill orders, and you can use the customer\'s payment directly.',
    },
    {
      question: 'What data bundles can I sell on Nexify?',
      answer: 'You can sell data bundles from all major networks in Ghana: MTN, Telecel (formerly Vodafone), and AirtelTigo. We offer a wide range of bundle sizes from as low as GHS 1 to unlimited data packages. You can also sell airtime, BECE/WASSCE result checker PINs, and more services coming soon.',
    },
    {
      question: 'How do customers pay for data bundles?',
      answer: 'Customers pay directly through Mobile Money (MTN MoMo, Telecel Cash, or AT Money). When you share your unique payment link, customers can select the bundle they want and pay instantly. The payment goes to the platform, your profit is calculated automatically, and the data is delivered to the customer within seconds.',
    },
    {
      question: 'How much can I earn selling data bundles online?',
      answer: 'Your earnings depend on how many customers you serve and the profit margins you set. On average, vendors earn between GHS 50 to GHS 500+ daily. Some of our top vendors earn over GHS 3,000 per week. The more you promote your shop and build your customer base, the more you earn. Plus, you can earn additional commissions by referring other vendors.',
    },
    {
      question: 'Do I need technical skills to sell data online?',
      answer: 'Not at all! Nexify is designed to be simple enough for anyone to use. If you can use WhatsApp, you can use Nexify. Our platform handles all the technical work - payment processing, data delivery, and order tracking. You just focus on sharing your link and serving customers.',
    },
    {
      question: 'How do I withdraw my earnings?',
      answer: 'Withdrawing is easy and instant. Just go to your wallet, enter the amount you want to withdraw, and select your Mobile Money number. Your money will be sent to your MTN MoMo, Telecel Cash, or AT Money account within seconds. There\'s no minimum withdrawal amount and no waiting period.',
    },
    {
      question: 'Can I sell data bundles part-time?',
      answer: 'Absolutely! Many of our vendors are students, teachers, or have full-time jobs. Since Nexify is fully automated, your shop runs 24/7 even when you\'re busy. Customers can order and receive their data anytime, and your profits accumulate automatically. It\'s perfect passive income.',
    },
    {
      question: 'What happens if a transaction fails?',
      answer: 'Failed transactions are rare on Nexify (less than 0.1%), but when they happen, customers are automatically refunded. If a customer reports an issue, our support team investigates within minutes. We also have a built-in dispute resolution system to protect both vendors and customers.',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <Navbar active="how-it-works" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-slate-950 to-slate-950 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
            <Star size={16} className="text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Complete Guide for Beginners</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            How to Sell <span className="text-blue-500">Data Bundles Online</span> in Ghana
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Learn how to start a profitable data reselling business in Ghana with zero investment. 
            Sell MTN, Telecel & AirtelTigo bundles and earn money from your phone.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/signup" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                          Start Selling Now <ArrowRight size={20} />
                        </Link>
                        <Link to="/how-it-works" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
              See How It Works <ChevronDown size={20} />
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <Check size={18} className="text-green-500" />
              <span>100% Free to Start</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={18} className="text-green-500" />
              <span>No Stock Needed</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={18} className="text-green-500" />
              <span>Instant Withdrawals</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Steps Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">4 Simple Steps to Start Selling Data in Ghana</h2>
            <p className="section-subtitle mx-auto">
              Follow this step-by-step guide to launch your data reselling business today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {steps.map((step) => (
              <div key={step.number} className="card flex gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-bold text-slate-700">{step.number}</span>
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-slate-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/signup" className="btn-primary text-lg px-8 py-4">
                          Create Your Shop <ArrowRight size={20} />
                        </Link>
          </div>
        </div>
      </section>

      {/* Why Sell Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="section-title">Why Sell Data Bundles with Nexify?</h2>
              <p className="section-subtitle mb-8">
                Nexify makes it easy for anyone in Ghana to start a profitable online business 
                selling data bundles, airtime, and digital services.
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-green-500" />
                    </div>
                    <span className="text-slate-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              {features.map((feature, i) => (
                <div key={i} className="card flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="text-slate-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle mx-auto">
              Everything you need to know about selling data bundles online in Ghana.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card">
                <button
                  className="w-full flex items-center justify-between text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-slate-400 flex-shrink-0 transition-transform ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <p className="text-slate-400 mt-4 pt-4 border-t border-slate-800">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Selling Data Bundles?
          </h2>
          <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of Ghanaians already earning with Nexify. Create your free account now 
            and start selling within minutes.
          </p>
          <Link to="/signup" className="btn-primary text-lg px-10 py-4">
                      Start Selling Free <ArrowRight size={20} />
                    </Link>
          <p className="text-slate-500 text-sm mt-6">
            No credit card required • Free forever • Start earning today
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
