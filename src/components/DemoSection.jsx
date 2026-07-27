import { useState } from 'react'

const SUPABASE_DEMO_FUNCTION_URL = 'https://jrtyogapratsgypicwti.supabase.co/functions/v1/demo-request'

export default function DemoSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(SUPABASE_DEMO_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
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

  return (
    <div
      id="demo"
      style={{
        background: '#161820',
        border: '0.5px solid rgba(34,211,200,0.2)',
        borderRadius: 12,
        margin: '0 40px',
        padding: 48,
        textAlign: 'center',
      }}
    >
      <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 500, margin: '0 0 10px' }}>
        See Certivue in action
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 28, fontSize: 15 }}>
        Schedule a 30-minute demo with our team. We'll walk through your department's specific needs.
      </p>
      {submitted ? (
        <p style={{ color: '#22d3c8', fontWeight: 500 }}>Thank you! We'll be in touch shortly.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <input
            type="email"
            required
            placeholder="Your work email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '0.5px solid rgba(255,255,255,0.15)',
              borderRadius: 8,
              color: '#fff',
              fontSize: 14,
              padding: '10px 16px',
              outline: 'none',
              minWidth: 240,
              flex: '1 1 240px',
              maxWidth: 340,
            }}
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
              whiteSpace: 'nowrap',
            }}
          >
            {loading ? 'Sending…' : 'Request demo'}
          </button>
        </form>
      )}
      {error && <p style={{ color: '#f87171', marginTop: 12, fontSize: 14 }}>{error}</p>}
    </div>
  )
}
