import { useState } from 'react'
import {
  ClipboardCheck,
  Award,
  Users,
  BarChart2,
  Smartphone,
  GraduationCap,
} from 'lucide-react'

const SUPABASE_DEMO_FUNCTION_URL = 'https://jrtyogapratsgypicwti.supabase.co/functions/v1/demo-request'
const SUPABASE_CONTACT_FUNCTION_URL = 'https://jrtyogapratsgypicwti.supabase.co/functions/v1/contact-message'

function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" stroke="#22d3c8" strokeWidth="1.5" fill="none" />
      <ellipse cx="32" cy="32" rx="14" ry="30" stroke="#22d3c8" strokeWidth="1" fill="none" opacity="0.4" />
      <line x1="2" y1="32" x2="62" y2="32" stroke="#22d3c8" strokeWidth="1" opacity="0.4" />
      <line x1="8" y1="16" x2="56" y2="16" stroke="#22d3c8" strokeWidth="0.75" opacity="0.25" />
      <line x1="8" y1="48" x2="56" y2="48" stroke="#22d3c8" strokeWidth="0.75" opacity="0.25" />
      <text x="32" y="38" textAnchor="middle" fontSize="16" fontWeight="600" fill="#22d3c8">CV</text>
    </svg>
  )
}

function Wordmark() {
  return (
    <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.3px' }}>
      <span style={{ color: '#fff' }}>Certi</span>
      <span style={{ color: '#22d3c8' }}>vue</span>
    </span>
  )
}

const features = [
  {
    icon: <ClipboardCheck size={20} />,
    title: 'Competency tracking',
    desc: 'Build assessment templates, assign by clinical role, and grade via QR code on the floor.',
  },
  {
    icon: <Award size={20} />,
    title: 'Certification management',
    desc: 'Track CRCST, CBSPD, and custom certs with expiration alerts and document uploads.',
  },
  {
    icon: <Users size={20} />,
    title: 'Staff profiles',
    desc: 'Manage your full roster with department assignments, roles, and training history.',
  },
  {
    icon: <BarChart2 size={20} />,
    title: 'Dashboard analytics',
    desc: 'See competency gaps, staff requiring attention, and compliance at a glance.',
  },
  {
    icon: <Smartphone size={20} />,
    title: 'Mobile assessments',
    desc: 'Scan a QR code at the point of care. No login required for technicians being assessed.',
  },
  {
    icon: <GraduationCap size={20} />,
    title: 'Exam Gym',
    desc: 'Prep for CRCST, CBSPD, and other exams with practice questions curated by SPD experts.',
  },
]

function DemoSection() {
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

function ContactSection() {
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

function App() {
  return (
    <div style={{ background: '#0f1117', minHeight: '100vh', fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif" }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: '#0f1117',
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: 60,
      }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Logo size={32} />
          <Wordmark />
        </a>

        <div className="nav-links" style={{ display: 'flex', gap: 28 }}>
          {[['Features', '#features'], ['About', '#about'], ['Contact', '#contact']].map(([label, href]) => (
            <a
              key={href}
              href={href}
              style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14, fontWeight: 400 }}
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="#demo"
          style={{
            background: '#22d3c8',
            color: '#0f1117',
            fontWeight: 500,
            borderRadius: 8,
            padding: '8px 18px',
            textDecoration: 'none',
            fontSize: 14,
            whiteSpace: 'nowrap',
          }}
        >
          Request a demo
        </a>
      </nav>

      {/* HERO */}
      <section
        id="features"
        style={{
          paddingTop: 140,
          paddingBottom: 64,
          paddingLeft: 20,
          paddingRight: 20,
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(34,211,200,0.1)',
            border: '0.5px solid rgba(34,211,200,0.3)',
            color: '#22d3c8',
            borderRadius: 999,
            fontSize: 13,
            padding: '5px 14px',
            marginBottom: 24,
          }}>
            Built for sterile processing departments
          </span>

          <h1 style={{
            color: '#fff',
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: 500,
            letterSpacing: '-1px',
            lineHeight: 1.15,
            margin: '0 0 20px',
          }}>
            Staff competency,<br />
            <span style={{ color: '#22d3c8' }}>simplified.</span>
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 17,
            lineHeight: 1.6,
            marginBottom: 32,
          }}>
            Certivue helps SPD leaders track employee competencies, certifications, and training — all in one place, from any device.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#demo"
              style={{
                background: '#22d3c8',
                color: '#0f1117',
                fontWeight: 500,
                borderRadius: 8,
                padding: '10px 22px',
                textDecoration: 'none',
                fontSize: 15,
              }}
            >
              Request a demo
            </a>
            <a
              href="#contact"
              style={{
                background: 'transparent',
                border: '0.5px solid rgba(255,255,255,0.2)',
                color: '#fff',
                borderRadius: 8,
                padding: '10px 22px',
                textDecoration: 'none',
                fontSize: 15,
              }}
            >
              Contact us
            </a>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '0.5px solid rgba(255,255,255,0.06)',
        borderBottom: '0.5px solid rgba(255,255,255,0.06)',
        margin: '0 40px 64px',
      }}>
        {[
          { value: '100%', label: 'Paperless compliance' },
          { value: 'QR', label: 'Mobile point-of-care assessments' },
          { value: 'A+', label: 'Automated competency grading' },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              padding: '28px 24px',
              textAlign: 'center',
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
          >
            <div style={{ color: '#22d3c8', fontSize: 28, fontWeight: 600, marginBottom: 6 }}>{stat.value}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section id="about" style={{ padding: '0 40px 80px' }}>
        <div style={{ marginBottom: 36 }}>
          <p style={{
            color: '#22d3c8',
            fontSize: 11,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            PLATFORM
          </p>
          <h2 style={{
            color: '#fff',
            fontSize: 26,
            fontWeight: 500,
            margin: 0,
            letterSpacing: '-0.3px',
          }}>
            Everything your SPD team needs to stay compliant
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
        }}>
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                background: '#161820',
                border: '0.5px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: 24,
              }}
            >
              <div style={{
                width: 36,
                height: 36,
                background: 'rgba(34,211,200,0.1)',
                borderRadius: 8,
                color: '#22d3c8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 14,
              }}>
                {f.icon}
              </div>
              <h3 style={{ color: '#fff', fontSize: 15, fontWeight: 500, margin: '0 0 8px' }}>{f.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.55, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO */}
      <DemoSection />

      {/* CONTACT */}
      <ContactSection />

      {/* FOOTER */}
      <footer style={{
        borderTop: '0.5px solid rgba(255,255,255,0.06)',
        padding: '24px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <Logo size={24} />
          <Wordmark />
        </a>
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>
          © 2026 Certivue. Built for sterile processing.
        </span>
      </footer>

      <style>{`
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </div>
  )
}

export default App
