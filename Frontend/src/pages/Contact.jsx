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
        <p className="section-label">Let&apos;s Talk</p>
        <h1>Ready to collaborate?</h1>
        <p className="section-text">
          Send a message and I&apos;ll respond with a proposal or next steps for your project.
        </p>
      </section>

      <div className="contact-grid">
        <div className="contact-card">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-name">
              Name
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </label>
            <label htmlFor="contact-email">
              Email
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>
            <label htmlFor="contact-message">
              Message
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project"
                rows={6}
                required
              />
            </label>
            <button className="button button-primary" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {status && <p className="form-message">{status}</p>}
          </form>
        </div>

        <div className="contact-card info-card">
          <h2>Direct Info</h2>
          <p className="info-desc">
            Feel free to reach out directly through email, phone, or connect on professional platforms.
          </p>

          <div className="info-details">
            <div className="info-item">
              <span className="info-label">Email</span>
              <a href="mailto:neevwadhwa9568@gmail.com" className="info-value">
                neevwadhwa9568@gmail.com
              </a>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <a href="tel:9568770930" className="info-value">
                +91 9568770930
              </a>
            </div>
          </div>

          <div className="info-socials">
            <span className="info-label">On the Web</span>
            <div className="social-links-vertical">
              <a href="https://www.linkedin.com/in/neev-wadhwa/" target="_blank" rel="noreferrer" className="button button-secondary social-btn">
                LinkedIn
              </a>
              <a href="https://github.com/NeevWadhwa-Helloworld" target="_blank" rel="noreferrer" className="button button-outline social-btn">
                GitHub
              </a>
              <a href="https://leetcode.com/u/NeevWadhwa1/" target="_blank" rel="noreferrer" className="button button-outline social-btn">
                LeetCode
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;
