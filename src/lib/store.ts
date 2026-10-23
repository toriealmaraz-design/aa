/**
 * Local data store for Nexify — browser localStorage backed.
 * This is a temporary bridge until Supabase is wired in. Each accessor
 * reads from localStorage (falling back to seeded defaults) and persists
 * on save, so admin edits survive reloads and feed Arion + checkout.
 *
 * When the DB lands, swap these load/save functions for Supabase calls;
 * the component APIs stay the same.
 */

export interface NetworkBadge {
  id: string
  name: string // must match bundle keys (MTN, Telecel, AirtelTigo)
  code: string // short letter/abbr shown in the badge circle
  color: string // hex background
  textDark: boolean // dark vs light text on the badge
  active: boolean
}

export interface ArionResponse {
  id: string
  title: string
  keywords: string[] // lowercased triggers
  reply: string
}

export interface MockOrder {
  id: string
  bundle: string
  network: string
  status: 'Delivered' | 'Processing' | 'Failed'
  date: string
}

const KEYS = {
  networks: 'nexify_networks',
  responses: 'nexify_arion_responses',
}

/* ----------------------------- defaults ----------------------------- */

export const DEFAULT_NETWORKS: NetworkBadge[] = [
  { id: 'mtn', name: 'MTN', code: 'M', color: '#facc15', textDark: true, active: true },
  { id: 'telecel', name: 'Telecel', code: 'T', color: '#ef4444', textDark: false, active: true },
  { id: 'airteltigo', name: 'AirtelTigo', code: 'AT', color: '#3b82f6', textDark: false, active: true },
]

export const DEFAULT_RESPONSES: ArionResponse[] = [
  {
    id: 'greeting',
    title: 'Greeting',
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening'],
    reply: "Hi! I'm Arion, your Nexify assistant. I can help you track an order, explain how buying works, or answer questions about data bundles. What do you need?",
  },
  {
    id: 'buy',
    title: 'How to buy data',
    keywords: ['buy', 'purchase', 'how do i', 'get data', 'order data'],
    reply: 'To buy data: open a vendor shop link, pick a network, choose a bundle, enter the recipient number, and pay with Mobile Money. Your data arrives in seconds.',
  },
  {
    id: 'networks',
    title: 'Supported networks',
    keywords: ['network', 'mtn', 'telecel', 'airteltigo', 'vodafone', 'which networks'],
    reply: 'Nexify supports MTN, Telecel, and AirtelTigo data bundles across Ghana.',
  },
  {
    id: 'payment',
    title: 'Payment methods',
    keywords: ['pay', 'payment', 'momo', 'mobile money', 'card'],
    reply: 'Payments are made securely via Mobile Money — MTN MoMo, Telecel Cash, or AT Money. You approve the charge with a prompt on your phone.',
  },
  {
    id: 'withdraw',
    title: 'Vendor withdrawals',
    keywords: ['withdraw', 'payout', 'cash out', 'earnings'],
    reply: 'Vendors can withdraw earnings to their Mobile Money number anytime from the wallet. Withdrawals are instant with no minimum.',
  },
  {
    id: 'failed',
    title: 'Failed transaction',
    keywords: ['failed', 'not received', "didn't get", 'no data', 'refund'],
    reply: "Sorry about that. Failed transactions are automatically refunded to the payment number, usually within minutes. Share your order ID and I'll check the status.",
  },
  {
    id: 'human',
    title: 'Talk to a human',
    keywords: ['human', 'agent', 'support', 'contact', 'help me'],
    reply: 'You can reach our support team on WhatsApp at +233 00 000 0000, or email support@nexify.app. We usually reply within minutes.',
  },
]

/** Seeded orders Arion can look up (mirrors the dashboard sample). */
export const MOCK_ORDERS: MockOrder[] = [
  { id: 'NX-10492', bundle: 'MTN 5GB', network: 'MTN', status: 'Delivered', date: 'Today, 2:14 PM' },
  { id: 'NX-10491', bundle: 'Telecel 1GB', network: 'Telecel', status: 'Delivered', date: 'Today, 2:00 PM' },
  { id: 'NX-10490', bundle: 'AirtelTigo 2GB', network: 'AirtelTigo', status: 'Processing', date: 'Today, 1:43 PM' },
  { id: 'NX-10488', bundle: 'MTN 1GB', network: 'MTN', status: 'Failed', date: 'Today, 12:10 PM' },
]

/* ----------------------------- helpers ----------------------------- */

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore quota / privacy-mode errors */
  }
}

/* ----------------------------- public API ----------------------------- */

export const loadNetworks = (): NetworkBadge[] => read(KEYS.networks, DEFAULT_NETWORKS)
export const saveNetworks = (n: NetworkBadge[]): void => write(KEYS.networks, n)

export const loadResponses = (): ArionResponse[] => read(KEYS.responses, DEFAULT_RESPONSES)
export const saveResponses = (r: ArionResponse[]): void => write(KEYS.responses, r)

export const loadOrders = (): MockOrder[] => MOCK_ORDERS

/** Find an order by its ID (case-insensitive, tolerant of missing prefix). */
export function findOrder(query: string): MockOrder | null {
  const q = query.trim().toUpperCase().replace(/\s+/g, '')
  if (!q) return null
  return (
    MOCK_ORDERS.find((o) => o.id.toUpperCase() === q) ||
    MOCK_ORDERS.find((o) => o.id.toUpperCase().endsWith(q)) ||
    null
  )
}

/** Match a free-text message to the best canned response, or null. */
export function matchResponse(message: string, responses: ArionResponse[]): ArionResponse | null {
  const text = message.toLowerCase()
  let best: { r: ArionResponse; score: number } | null = null
  for (const r of responses) {
    let score = 0
    for (const kw of r.keywords) {
      if (kw && text.includes(kw.toLowerCase())) score += kw.length
    }
    if (score > 0 && (!best || score > best.score)) best = { r, score }
  }
  return best ? best.r : null
}
