import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, Zap, Package } from 'lucide-react'
import {
  loadResponses,
  findOrder,
  matchResponse,
  type ArionResponse,
  type MockOrder,
  type VendorStats,
} from '../lib/store'
import './ArionChat.css'

interface Msg {
  from: 'arion' | 'user'
  text: string
}

export interface ArionContext {
  scope: 'public' | 'vendor'
  vendorName?: string
  orders?: MockOrder[]
  stats?: VendorStats
}

const PUBLIC_QUICK = ['Track my order', 'How do I buy?', 'Which networks?', 'Talk to support']
const VENDOR_QUICK = ['My recent orders', 'How many orders?', 'Wallet balance', "Today's sales"]

const PUBLIC_GREETING =
  "Hi! I'm Arion, your Nexify assistant 🤖 I can track an order or answer questions about data bundles. How can I help?"

function orderLine(o: MockOrder) {
  return `• ${o.id} · ${o.bundle} · GH₵${o.amount} · ${o.status} (${o.date})`
}

export default function ArionChat({ context = { scope: 'public' } }: { context?: ArionContext }) {
  const isVendor = context.scope === 'vendor'
  const greeting = isVendor
    ? `Hi ${context.vendorName || 'there'}! I'm Arion 🤖 I can see your shop activity — ask about your recent orders, total sales, or wallet balance.`
    : PUBLIC_GREETING

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([{ from: 'arion', text: greeting }])
  const [input, setInput] = useState('')
  const [awaitingOrderId, setAwaitingOrderId] = useState(false)
  const [typing, setTyping] = useState(false)
  const [responses, setResponses] = useState<ArionResponse[]>([])
  const bodyRef = useRef<HTMLDivElement>(null)

  // (Re)load editable responses whenever the panel opens — picks up admin edits.
  useEffect(() => {
    if (open) setResponses(loadResponses())
  }, [open])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  const reply = (text: string) => {
    setTyping(true)
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'arion', text }])
      setTyping(false)
    }, 450)
  }

  const describeOrder = (o: MockOrder) =>
    `Order ${o.id} — ${o.bundle} (GH₵${o.amount})\nStatus: ${o.status}\nPlaced: ${o.date}` +
    (o.status === 'Failed'
      ? '\n\nThis one failed and was auto-refunded to the payment number.'
      : o.status === 'Processing'
      ? '\n\nIt is on the way — usually completes within a minute.'
      : '\n\nDelivered successfully ✅')

  const handle = (raw: string) => {
    const text = raw.trim()
    if (!text) return
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    const lower = text.toLowerCase()

    // Public-only: step 2 of the "what's your order ID" flow
    if (awaitingOrderId) {
      setAwaitingOrderId(false)
      const order = findOrder(text)
      reply(
        order
          ? describeOrder(order)
          : `I couldn't find an order matching "${text}". Double-check the ID (e.g. NX-10492) or contact support.`,
      )
      return
    }

    // Vendor stats intents (only when we have the vendor's context)
    if (isVendor && context.stats) {
      const s = context.stats
      if (/wallet|balance|earning|how much.*(made|money|have)/.test(lower)) {
        reply(`Your wallet balance is ${s.walletBalance}. You can withdraw to Mobile Money anytime from the Wallet tab.`)
        return
      }
      if (/\bsales\b|revenue|today/.test(lower)) {
        reply(`Today's sales so far: ${s.todaySales}.`)
        return
      }
      if (/how many|number of|total.*order|orders.*(made|have|processed|sold)/.test(lower)) {
        reply(
          `You've processed ${s.totalOrders.toLocaleString()} orders in total and served ${s.customers} customers.` +
            (context.orders?.length ? `\n\nYour most recent:\n${context.orders.slice(0, 3).map(orderLine).join('\n')}` : ''),
        )
        return
      }
      if (/customer/.test(lower)) {
        reply(`You've served ${s.customers} customers so far. Keep sharing your shop link to grow that!`)
        return
      }
    }

    // Order tracking / recent orders
    if (/\btrack\b|\border\b|\brecent\b|my orders|where.*(data|order)|status|last order/.test(lower)) {
      const inlineId = text.match(/nx[-\s]?\d+/i)
      if (inlineId) {
        const o = findOrder(inlineId[0])
        reply(o ? describeOrder(o) : `I couldn't find "${inlineId[0]}". Please check the order ID.`)
        return
      }
      // Vendor: don't ask for an ID — show their recent orders directly
      if (isVendor && context.orders?.length) {
        reply(
          `Here are your most recent orders:\n${context.orders.slice(0, 4).map(orderLine).join('\n')}\n\n` +
            `Ask me about any order ID for full details.`,
        )
        return
      }
      // Public: ask for the ID
      setAwaitingOrderId(true)
      reply('Sure — what is your order ID? It looks like NX-XXXXX.')
      return
    }

    // Canned responses, then fallback
    const match = matchResponse(text, responses.length ? responses : loadResponses())
    reply(
      match
        ? match.reply
        : isVendor
        ? "I can help with your orders, sales, wallet balance, or customers. Try 'show my recent orders' or 'what's my balance?'"
        : "I'm not sure about that one yet. You can ask me to track an order, explain how to buy, list supported networks, or connect you with support.",
    )
  }

  const quick = isVendor ? VENDOR_QUICK : PUBLIC_QUICK

  return (
    <>
      {/* Launcher */}
      <button
        className={`arion-fab ${open ? 'hidden' : ''}`}
        onClick={() => setOpen(true)}
        aria-label="Open Arion assistant"
      >
        <MessageCircle size={24} />
        <span className="arion-fab-dot" />
      </button>

      {/* Panel */}
      {open && (
        <div className="arion-panel" role="dialog" aria-label="Arion assistant">
          <header className="arion-head">
            <div className="arion-head-id">
              <div className="arion-avatar">
                <Zap size={16} className="text-white" fill="currentColor" />
              </div>
              <div>
                <div className="arion-name">Arion</div>
                <div className="arion-status">
                  <span className="arion-online" /> {isVendor ? 'Shop Assistant' : 'Nexify Assistant'}
                </div>
              </div>
            </div>
            <button className="arion-close" onClick={() => setOpen(false)} aria-label="Close">
              <X size={18} />
            </button>
          </header>

          <div className="arion-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`arion-msg ${m.from}`}>
                {m.from === 'arion' && (
                  <div className="arion-msg-avatar">
                    <Zap size={12} className="text-white" fill="currentColor" />
                  </div>
                )}
                <div className="arion-bubble">{m.text}</div>
              </div>
            ))}

            {typing && (
              <div className="arion-msg arion">
                <div className="arion-msg-avatar">
                  <Zap size={12} className="text-white" fill="currentColor" />
                </div>
                <div className="arion-bubble arion-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}

            {messages.length <= 1 && (
              <div className="arion-quick">
                {quick.map((q) => (
                  <button key={q} onClick={() => handle(q)} className="arion-chip">
                    {(q === 'Track my order' || q === 'My recent orders') && <Package size={13} />} {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="arion-input"
            onSubmit={(e) => {
              e.preventDefault()
              handle(input)
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={awaitingOrderId ? 'Enter your order ID…' : 'Ask Arion anything…'}
              aria-label="Message Arion"
            />
            <button type="submit" aria-label="Send" disabled={!input.trim()}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
