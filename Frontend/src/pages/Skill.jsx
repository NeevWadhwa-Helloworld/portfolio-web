import { useEffect, useState } from 'react'

const Skill = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills')
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message || 'Unable to load skills')
        }
        setSkills(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  return (
    <div className="page-shell section-page">
      <section className="section-hero">
        <div>
          <p className="section-label">Skill</p>
          <h1>Tools and technologies I use daily.</h1>
          <p className="section-text">
            I work and learn in 3 main domains - Web Development, Artificial Intelligence, and Blockchain.
          </p>
        </div>
        <div className="skill-grid">
          {loading && <p>Loading skills...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && skills.length === 0 && <p>No skills found.</p>}
          {skills.map((skill) => (
            <div key={skill.id} className="skill-chip">
              {skill.name} {skill.level ? `• ${skill.level}` : ''}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Skill;
