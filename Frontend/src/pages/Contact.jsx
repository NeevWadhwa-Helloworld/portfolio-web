import { useState } from 'react'

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('')
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await response.json()
      if (!response.ok) {
        setStatus(data.message || 'Unable to send message')
      } else {
        setStatus('Message sent successfully!')
        setName('')
        setEmail('')
        setMessage('')
      }
    } catch (error) {
      setStatus('Unable to send message. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-shell section-page">
      <section className="section-hero">
        <div>
          <p className="section-label">Let&apos;s Talk</p>
          <h1>Ready to collaborate?</h1>
          <p className="section-text">
            Send a message and I&apos;ll respond with a proposal or next steps for your project.
          </p>
        </div>
        <div className="contact-card contact-form-card">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project"
              rows={6}
              required
            />
            <button className="button button-primary" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {status && <p className="form-message">{status}</p>}
          </form>
        </div>
      </section>
    </div>
  )
}

export default Contact;
