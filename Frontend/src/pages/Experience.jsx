import { useEffect, useState } from 'react'

const Experience = () => {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/api/experiences')
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message || 'Unable to load experiences')
        }
        setExperiences(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  return (
    <div className="page-shell section-page">
      <section className="section-hero">
        <div>
          <p className="section-label">Experience</p>
          <h1>Career milestones and technology story.</h1>
          <p className="section-text">
            Over the years I have contributed to product teams, crafted features for real users, and managed both frontend and backend releases.
          </p>
        </div>
        <div className="timeline-grid">
          {loading && <p>Loading experiences...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && experiences.length === 0 && <p>No experiences found.</p>}
          {experiences.map((experience) => (
            <article key={experience.id} className="timeline-card">
              <span className="timeline-date">{experience.startDate} — {experience.endDate}</span>
              <h3>{experience.role}</h3>
              <p className="section-text">{experience.company}</p>
              <ul>
                {experience.highlights?.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Experience;
