import {
  Zap,
  Shield,
  Clock,
  Users,
  Smartphone,
  ArrowRight,
  Check,
  Wallet,
  Share2,
  Lock,
  Headphones,
  TrendingUp,
  Gift,
  Store,
  UserCheck,
  ChevronRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto animate-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-blue-400 text-sm font-medium">Ghana's #1 Data Reseller Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Buy & Sell Data<br />
              <span className="text-blue-500">Bundles in Ghana</span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Create your own digital data shop. Sell MTN, Telecel, and AirtelTigo bundles. 
              Earn commissions on every sale with instant mobile money payouts.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/signup" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                Create Your Data Shop <ArrowRight size={20} />
              </Link>
              <Link to="/how-it-works" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                Explore the Platform
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <Check size={18} className="text-green-500" />
                <span>Free to Start</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={18} className="text-green-500" />
                <span>Instant Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={18} className="text-green-500" />
                <span>Mobile Money Payments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Logos */}
      <section className="py-12 px-4 border-y border-slate-800/50 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-slate-500 text-sm mb-8">SUPPORTED NETWORKS</p>
          <div className="flex items-center justify-center gap-12 md:gap-20 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                <span className="text-black font-bold text-lg">M</span>
              </div>
              <span className="text-white font-semibold text-lg">MTN</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-white font-semibold text-lg">Telecel</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">AT</span>
              </div>
              <span className="text-white font-semibold text-lg">AirtelTigo</span>
            </div>
          </div>
        </div>
      </section>

      {/* What is Nexify */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">What is Nexify?</h2>
            <p className="section-subtitle mx-auto">
              Nexify is a vendor-based platform that enables anyone in Ghana to buy and resell data bundles, 
              airtime, and digital services. Start your own data business with zero capital.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Smartphone size={28} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Data Bundles</h3>
              <p className="text-slate-400">
                Sell MTN, Telecel, and AirtelTigo data bundles at competitive rates with instant delivery to customers.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-14 h-14 bg-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Check size={28} className="text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Result Checkers</h3>
              <p className="text-slate-400">
                Offer BECE and WASSCE result checker PINs to students and earn on every sale.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-14 h-14 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Zap size={28} className="text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Utility Services</h3>
              <p className="text-slate-400">
                Expand your offerings with ECG prepaid, DSTV/GOtv subscriptions, and more coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Everything You Need to Succeed</h2>
            <p className="section-subtitle mx-auto">
              Built for vendors, by people who understand the data reselling business in Ghana.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Smartphone className="text-yellow-500" />}
              iconBg="bg-yellow-500/20"
              title="MTN, Telecel & AT Data"
              description="Access all major networks in one platform. Competitive wholesale prices on all bundles."
            />
            <FeatureCard
              icon={<Zap className="text-blue-500" />}
              iconBg="bg-blue-500/20"
              title="Instant Delivery"
              description="Data reaches your customers in under 10 seconds. No delays, no failed transactions."
            />
            <FeatureCard
              icon={<TrendingUp className="text-green-500" />}
              iconBg="bg-green-500/20"
              title="Commission-Based Earnings"
              description="Set your own prices. Keep the difference as profit on every single sale you make."
            />
            <FeatureCard
              icon={<Share2 className="text-purple-500" />}
              iconBg="bg-purple-500/20"
              title="Guest Payment Links"
              description="Share payment links with customers. They pay, you fulfill — no app download needed."
            />
            <FeatureCard
              icon={<Users className="text-orange-500" />}
              iconBg="bg-orange-500/20"
              title="Referral Network"
              description="Build your team of subagents. Earn commissions on their sales automatically."
            />
            <FeatureCard
              icon={<Lock className="text-red-500" />}
              iconBg="bg-red-500/20"
              title="Secure Transactions"
              description="Bank-level security. Your wallet and customer data are protected 24/7."
            />
          </div>
        </div>
      </section>

      {/* Referrals Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Earn More with Referrals</h2>
              <p className="section-subtitle mb-8">
                Build your network and multiply your earnings. Every vendor you bring to the platform 
                means more passive income for you.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={14} className="text-green-500" />
                  </div>
                  <span className="text-slate-300">Earn commission on every sale your referrals make</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={14} className="text-green-500" />
                  </div>
                  <span className="text-slate-300">No limit on how many vendors you can refer</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={14} className="text-green-500" />
                  </div>
                  <span className="text-slate-300">Automatic tracking and instant payouts to your wallet</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={14} className="text-green-500" />
                  </div>
                  <span className="text-slate-300">Dedicated dashboard to track your network's performance</span>
                </li>
              </ul>

              <button className="btn-primary">
                Start Referring Today <ArrowRight size={18} />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="card">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                  <Wallet size={24} className="text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Direct Sales Profit</h3>
                <p className="text-slate-400 text-sm">Keep 100% of the margin on your personal sales.</p>
              </div>
              <div className="card">
                <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mb-4">
                  <Gift size={24} className="text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Referral Commissions</h3>
                <p className="text-slate-400 text-sm">Earn a percentage of every sale your referrals make.</p>
              </div>
              <div className="card sm:col-span-2">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp size={24} className="text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Easy Withdrawals</h3>
                <p className="text-slate-400 text-sm">
                  Withdraw your earnings anytime to MTN MoMo, Telecel Cash, or AT Money. No minimum balance required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Types */}
      <section id="vendors" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Choose Your Vendor Level</h2>
            <p className="section-subtitle mx-auto">
              Start where you are. Upgrade as you grow. Every level unlocks more benefits.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <VendorCard
              title="Subagent"
              description="Perfect for beginners. Start with zero capital and learn the business."
              features={[
                "Access to all data bundles",
                "Personal payment link",
                "Basic commission rates",
                "WhatsApp support",
              ]}
              buttonText="Start as Subagent"
              highlight={false}
            />
            <VendorCard
              title="Agent"
              description="For growing vendors. Better rates and more features."
              features={[
                "Everything in Subagent",
                "Higher commission rates",
                "Recruit subagents",
                "Priority support",
                "Transaction history export",
              ]}
              buttonText="Become an Agent"
              highlight={true}
            />
            <VendorCard
              title="Super Agent"
              description="For serious entrepreneurs. Maximum benefits and earnings."
              features={[
                "Everything in Agent",
                "Best commission rates",
                "API access for automation",
                "Dedicated account manager",
                "Custom branding options",
              ]}
              buttonText="Apply for Super Agent"
              highlight={false}
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TrustItem icon={<Shield />} title="Secure Payments" description="SSL encrypted transactions" />
            <TrustItem icon={<Clock />} title="24/7 Availability" description="Platform never sleeps" />
            <TrustItem icon={<Zap />} title="Instant Fulfillment" description="Under 10 seconds delivery" />
            <TrustItem icon={<Headphones />} title="Vendor Support" description="Help when you need it" />
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Why Vendors Choose Nexify</h2>
              <p className="section-subtitle mb-8">
                We built Nexify to solve the real problems data vendors face every day.
              </p>

              <div className="space-y-6">
                <BenefitItem
                  title="No Upfront Costs"
                  description="Start selling immediately. No registration fees, no hidden charges, no monthly subscriptions."
                />
                <BenefitItem
                  title="Real-Time Dashboard"
                  description="Track your sales, commissions, and referral network performance in real-time."
                />
                <BenefitItem
                  title="Mobile-First Design"
                  description="Built for how Ghanaians actually use technology. Works perfectly on any phone."
                />
                <BenefitItem
                  title="Reliable Infrastructure"
                  description="99.9% uptime. Your business runs 24/7 without interruption."
                />
              </div>
            </div>

            <div className="card bg-gradient-to-br from-blue-600/20 to-slate-900/50 border-blue-500/20">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Store size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready to Start?</h3>
                <p className="text-slate-400 mb-6">
                  Join thousands of vendors already earning with Nexify
                </p>
                <Link to="/signup" className="btn-primary w-full justify-center text-lg py-4">
                  Create Your Shop Now <ArrowRight size={20} />
                </Link>
                <p className="text-slate-500 text-sm mt-4">Free forever • No credit card required</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600/20 via-slate-950 to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Start Your Data Business Today
          </h2>
          <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join the growing community of Nexify vendors across Ghana. 
            Zero startup cost, instant setup, real earnings.
          </p>
          <Link to="/signup" className="btn-primary text-lg px-10 py-4">
            Get Started Free <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

function FeatureCard({ icon, iconBg, title, description }: {
  icon: React.ReactNode
  iconBg: string
  title: string
  description: string
}) {
  return (
    <div className="card card-hover">
      <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  )
}

function VendorCard({ title, description, features, buttonText, highlight }: {
  title: string
  description: string
  features: string[]
  buttonText: string
  highlight: boolean
}) {
  return (
    <div className={`card relative ${highlight ? 'border-blue-500/50 bg-blue-600/5' : ''}`}>
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <div className="text-center mb-6 pt-2">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
            <Check size={16} className="text-green-500 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full justify-center ${highlight ? 'btn-primary' : 'btn-secondary'}`}>
        {buttonText} <ChevronRight size={18} />
      </button>
    </div>
  )
}

function TrustItem({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-500">
        {icon}
      </div>
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      <p className="text-slate-500 text-sm">{description}</p>
    </div>
  )
}

function BenefitItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
        <UserCheck size={18} className="text-blue-500" />
      </div>
      <div>
        <h3 className="text-white font-semibold mb-1">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
    </div>
  )
}
