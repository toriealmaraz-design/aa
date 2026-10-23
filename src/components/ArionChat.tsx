import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, Zap, Package } from 'lucide-react'
import {
  loadResponses,
  findOrder,
  matchResponse,
  type ArionResponse,
} from '../lib/store'
import './ArionChat.css'

interface Msg {
  from: 'arion' | 'user'
  text: string
}

const QUICK = ['Track my order', 'How do I buy?', 'Which networks?', 'Talk to support']

const GREETING =
  "Hi! I'm Arion, your Nexify assistant 🤖 I can track an order or answer questions about data bundles. How can I help?"

export default function ArionChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([{ from: 'arion', text: GREETING }])
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

  const handle = (raw: string) => {
    const text = raw.trim()
    if (!text) return
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')

    // Order-tracking flow
    if (awaitingOrderId) {
      setAwaitingOrderId(false)
      const order = findOrder(text)
      if (order) {
        reply(
          `Order ${order.id} — ${order.bundle}\nStatus: ${order.status}\nPlaced: ${order.date}` +
            (order.status === 'Failed'
              ? '\n\nThis one failed and has been auto-refunded to the payment number.'
              : order.status === 'Processing'
              ? '\n\nIt is on the way — usually completes within a minute.'
              : '\n\nDelivered successfully ✅'),
        )
      } else {
        reply(
          `I couldn't find an order matching "${text}". Double-check the ID (e.g. NX-10492) or contact support and we'll look into it.`,
        )
      }
      return
    }

    const lower = text.toLowerCase()

    // Intent: track order
    if (/\btrack\b|\border\b|where.*(data|order)|status/.test(lower)) {
      const inlineId = text.match(/nx[-\s]?\d+/i)
      if (inlineId) {
        const order = findOrder(inlineId[0])
        reply(
          order
            ? `Order ${order.id} — ${order.bundle}\nStatus: ${order.status}\nPlaced: ${order.date}`
            : `I couldn't find "${inlineId[0]}". Please check the order ID.`,
        )
      } else {
        setAwaitingOrderId(true)
        reply('Sure — what is your order ID? It looks like NX-XXXXX.')
      }
      return
    }

    // Canned responses
    const match = matchResponse(text, responses.length ? responses : loadResponses())
    if (match) {
      reply(match.reply)
    } else {
      reply(
        "I'm not sure about that one yet. You can ask me to track an order, explain how to buy, list supported networks, or connect you with support.",
      )
    }
  }

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
                  <span className="arion-online" /> Nexify Assistant
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
                {QUICK.map((q) => (
                  <button key={q} onClick={() => handle(q)} className="arion-chip">
                    {q === 'Track my order' && <Package size={13} />} {q}
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
