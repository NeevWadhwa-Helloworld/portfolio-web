import { useEffect, useState } from 'react'

const Portfolio = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects')
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message || 'Unable to load projects')
        }
        setProjects(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="page-shell section-page">
      <section className="section-hero">
        <div>
          <p className="section-label">Portfolio</p>
          <h1>Selected works with real user impact.</h1>
          <p className="section-text">
            Projects built for brands, businesses and personal projects. Each project is a unique solution crafted with attention to detail, performance, and user experience.
          </p>
        </div>
        <div className="project-grid">
          {loading && <p>Loading projects...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && projects.length === 0 && <p>No projects found.</p>}
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-meta">
                {project.tags?.map((tag) => (
                  <span key={tag} className="skill-chip">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-links">
                {project.liveUrl && (
                  <a className="nav-link" href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live
                  </a>
                )}
                {project.githubUrl && (
                  <a className="nav-link" href={project.githubUrl} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Portfolio;
