/**
 * Local data store for Nexify — browser localStorage backed.
 * This is a temporary bridge until Supabase is wired in. Each accessor
 * reads from localStorage (falling back to seeded defaults) and persists
 * on save, so admin edits survive reloads and feed Arion + checkout.
 *
 * When the DB lands, swap these load/save functions for Supabase calls;
 * the component APIs stay the same.
 */

import { supabase, hasSupabase } from './supabase'

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
  customer: string
  bundle: string
  network: string
  amount: number
  status: 'Delivered' | 'Processing' | 'Failed'
  date: string
}

/** The signed-in vendor (placeholder until auth/DB). */
export const VENDOR = { name: 'Kofi', shopLink: 'nexify.app/pay/kofi-data' }

export interface VendorStats {
  walletBalance: string
  todaySales: string
  totalOrders: number
  customers: number
}

export const VENDOR_STATS: VendorStats = {
  walletBalance: 'GH₵1,284.50',
  todaySales: 'GH₵340.00',
  totalOrders: 1920,
  customers: 612,
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
  { id: 'NX-10492', customer: '024 •••• 231', bundle: 'MTN 5GB', network: 'MTN', amount: 25, status: 'Delivered', date: '2m ago' },
  { id: 'NX-10491', customer: '055 •••• 887', bundle: 'Telecel 1GB', network: 'Telecel', amount: 5, status: 'Delivered', date: '14m ago' },
  { id: 'NX-10490', customer: '020 •••• 014', bundle: 'AirtelTigo 2GB', network: 'AirtelTigo', amount: 10, status: 'Processing', date: '31m ago' },
  { id: 'NX-10489', customer: '024 •••• 556', bundle: 'MTN 10GB', network: 'MTN', amount: 46, status: 'Delivered', date: '1h ago' },
  { id: 'NX-10488', customer: '059 •••• 773', bundle: 'MTN 1GB', network: 'MTN', amount: 6, status: 'Failed', date: '2h ago' },
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

/* ───────────────────────── Supabase data layer ─────────────────────────
 * Async fetchers hydrate the UI from the database; every one falls back to
 * the seed defaults when Supabase isn't configured or a query fails, so the
 * app always renders. DB savers mirror to localStorage too.
 */

function rel(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime()
  const m = Math.max(0, Math.round(diff / 60000))
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.round(h / 24)}d ago`
}

export async function fetchNetworks(): Promise<NetworkBadge[]> {
  if (!hasSupabase) return loadNetworks()
  const { data, error } = await supabase.from('networks').select('*').order('sort')
  if (error || !data || !data.length) return loadNetworks()
  return data.map((r: any) => ({
    id: r.id, name: r.name, code: r.code, color: r.color, textDark: r.text_dark, active: r.active,
  }))
}

export async function fetchResponses(): Promise<ArionResponse[]> {
  if (!hasSupabase) return loadResponses()
  const { data, error } = await supabase.from('arion_responses').select('*').order('sort')
  if (error || !data || !data.length) return loadResponses()
  return data.map((r: any) => ({ id: r.id, title: r.title, keywords: r.keywords || [], reply: r.reply }))
}

/** Bundles grouped by network NAME, e.g. { MTN: [{size,validity,price}], ... }. */
export async function fetchBundles(): Promise<Record<string, { size: string; validity: string; price: number }[]> | null> {
  if (!hasSupabase) return null
  const [nets, bundles] = await Promise.all([
    supabase.from('networks').select('id,name'),
    supabase.from('bundles').select('*').eq('active', true),
  ])
  if (nets.error || bundles.error || !bundles.data?.length) return null
  const nameById: Record<string, string> = {}
  ;(nets.data || []).forEach((n: any) => (nameById[n.id] = n.name))
  const grouped: Record<string, { size: string; validity: string; price: number }[]> = {}
  bundles.data.forEach((b: any) => {
    const name = nameById[b.network_id]
    if (!name) return
    ;(grouped[name] ||= []).push({ size: b.size, validity: b.validity, price: Number(b.price) })
  })
  return grouped
}

export async function fetchOrders(): Promise<MockOrder[]> {
  if (!hasSupabase) return MOCK_ORDERS
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
  if (error || !data || !data.length) return MOCK_ORDERS
  return data.map((r: any) => ({
    id: r.id,
    customer: r.customer_phone || '',
    bundle: `${r.network} ${r.bundle_size}`,
    network: r.network,
    amount: Number(r.amount),
    status: r.status,
    date: rel(r.created_at),
  }))
}

export async function fetchVendor(): Promise<{ name: string; walletBalance: number } | null> {
  if (!hasSupabase) return null
  const { data, error } = await supabase.from('vendors').select('*').limit(1).maybeSingle()
  if (error || !data) return null
  return { name: data.name, walletBalance: Number(data.wallet_balance) }
}

export async function saveNetworksDB(networks: NetworkBadge[]): Promise<void> {
  saveNetworks(networks)
  if (!hasSupabase) return
  await supabase.from('networks').upsert(
    networks.map((n, i) => ({
      id: n.id, name: n.name, code: n.code, color: n.color, text_dark: n.textDark, active: n.active, sort: i + 1,
    })),
  )
}

export async function saveResponsesDB(responses: ArionResponse[]): Promise<void> {
  saveResponses(responses)
  if (!hasSupabase) return
  await supabase.from('arion_responses').upsert(
    responses.map((r, i) => ({ id: r.id, title: r.title, keywords: r.keywords, reply: r.reply, sort: i + 1 })),
  )
}
