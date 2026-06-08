import { useEffect, useState } from 'react'

const Mission = () => {
  const [mission, setMission] = useState({})
  const [donation, setDonation] = useState({ name: '', email: '', amount: '' })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadMission = async () => {
      try {
        const response = await fetch('/api/mission')
        const data = await response.json()
        setMission(data)
      } catch (error) {
        setMission({
          title: 'Wadhwa Foundation - Student Helping Trust',
          subtitle: 'A mission-driven student support trust',
          description:
            'It is my personal mission to support students with mentorship, academic resources, and financial aid so they can focus on education and personal growth under Wadhwa Foundation.',
          goals: [
            'Provide scholarships and learning tools for under-resourced students.',
            'Offer mentorship, career guidance, and community workshops.',
            'Build a stronger future through education and trusted support.',
          ],
        })
      }
    }

    loadMission()
  }, [])

  const handleDonate = async (event) => {
    event.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const response = await fetch('/api/mission/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: donation.name,
          email: donation.email,
          amount: Number(donation.amount),
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Donation failed')
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl
        return
      }

      setMessage(data.message || 'Thank you for your donation.')
      setDonation({ name: '', email: '', amount: '' })
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const cleanText = (text = '') =>
    text
      .replace(/Neev\s*/gi, '')
      .replace(/Student Helping Trust/gi, 'Wadhwa Foundation')
      .trim()

  const titleText = cleanText(mission.title) || 'Wadhwa Foundation'
  const descriptionText = cleanText(mission.description) || 'We support students with mentorship, academic resources, and financial aid so they can focus on education and personal growth.'

  return (
    <div className="page-shell mission-page">
      <section className="page-section">
        <div className="section-intro">
          <p className="section-label">A Student Helping Trust</p>
          <h2>{titleText}</h2>
          <p className="section-text">{descriptionText}</p>
        </div>

        <div className="feature-grid mission-grid">
          <article className="feature-card">
            <h3>{mission.subtitle || 'Supporting Students'}</h3>
            <p>{mission.goals?.[0] || 'Provide scholarships and learning tools for under-resourced students.'}</p>
          </article>
          <article className="feature-card">
            <h3>{mission.goals?.[1] || 'Mentorship & guidance'}</h3>
            <p>{mission.goals?.[1] || 'Offer mentorship, career guidance, and community workshops.'}</p>
          </article>
          <article className="feature-card">
            <h3>{mission.goals?.[2] || 'Trusted future'}</h3>
            <p>{mission.goals?.[2] || 'Build a stronger future through education and trusted support.'}</p>
          </article>
        </div>
      </section>

      <section className="page-section">
        <div className="section-intro">
          <p className="section-label">Donate</p>
          <h2>Support the trust with your donation</h2>
          <p className="section-text">
            Your contribution helps fund student scholarships, study materials, mentorship sessions, and digital learning programs.
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-card">
            <form className="contact-form" onSubmit={handleDonate}>
              <label>
                Your Name
                <input
                  value={donation.name}
                  onChange={(e) => setDonation({ ...donation, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={donation.email}
                  onChange={(e) => setDonation({ ...donation, email: e.target.value })}
                  required
                />
              </label>
              <label>
                Donation Amount
                <input
                  type="number"
                  min="1"
                  value={donation.amount}
                  onChange={(e) => setDonation({ ...donation, amount: e.target.value })}
                  required
                />
              </label>
              <button className="button button-primary" type="submit" disabled={loading}>
                {loading ? 'Processing...' : 'Donate Now'}
              </button>
            </form>
            {message && <p className="form-message">{message}</p>}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Mission;
