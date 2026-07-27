import { useState } from 'react'

const SUPABASE_CONTACT_FUNCTION_URL = 'https://jrtyogapratsgypicwti.supabase.co/functions/v1/contact-message'

export default function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(SUPABASE_CONTACT_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '0.5px solid rgba(255,255,255,0.15)',
    borderRadius: 8,
    color: '#fff',
    fontSize: 14,
    padding: '10px 16px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  }

  return (
    <div
      id="contact"
      style={{
        background: '#161820',
        border: '0.5px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        margin: '24px 40px 64px',
        padding: 48,
        textAlign: 'center',
      }}
    >
      <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 500, margin: '0 0 10px' }}>
        Get in touch
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 28, fontSize: 15 }}>
        Have questions before booking a demo? Send us a message.
      </p>
      {submitted ? (
        <p style={{ color: '#22d3c8', fontWeight: 500 }}>Thank you! We'll be in touch shortly.</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480, margin: '0 auto' }}
        >
          <input
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={inputStyle}
          />
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />
          <textarea
            required
            rows={4}
            placeholder="Your message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#22d3c8',
              color: '#0f1117',
              border: 'none',
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 14,
              padding: '10px 22px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Sending…' : 'Send message'}
          </button>
          {error && <p style={{ color: '#f87171', fontSize: 14, margin: 0 }}>{error}</p>}
        </form>
      )}
    </div>
  )
}
