import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import resumePdf from '../assets/Neev_Wadhwa_Improved_Resume.pdf'
import profileImage from '../assets/WhatsApp Image 2026-06-07 at 12.21.29 PM.jpeg'

const Home = () => {
  const [latestProject, setLatestProject] = useState(null)
  const [latestExperience, setLatestExperience] = useState(null)
  const [skillsList, setSkillsList] = useState([])

  useEffect(() => {
    // Fetch latest project for preview
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setLatestProject(data[0]) // Get the most recent project
        }
      })
      .catch(() => {
        // Fallback static project
        setLatestProject({
          title: 'AI-Powered Portfolio CRM',
          description: 'A full-stack React and Express app to track visitors and manage content dynamic schemas.',
          tags: ['React', 'Node.js', 'MongoDB']
        })
      })

    // Fetch latest experience for preview
    fetch('/api/experiences')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setLatestExperience(data[0])
        }
      })
      .catch(() => {
        setLatestExperience({
          role: 'Full-Stack Developer',
          company: 'Freelance & Open Source',
          startDate: '2024',
          endDate: 'Present'
        })
      })

    // Fetch skills list
    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setSkillsList(data.slice(0, 5)) // Get first 5 skills
        }
      })
      .catch(() => {
        setSkillsList([
          { name: 'MERN Stack' },
          { name: 'AI Integrations' },
          { name: 'Web3 & Smart Contracts' },
          { name: 'Node.js' },
          { name: 'React.js' }
        ])
      })
  }, [])

  return (
    <div className="page-shell home-page">
      <div className="bento-grid">
        
        {/* Card 1: Hero / Profile Card (Spans 2 cols, 2 rows on large screens) */}
        <div className="bento-card card-hero">
          <div className="hero-content">
            <span className="eyebrow">Hello, I'm</span>
            <h1>Neev Wadhwa</h1>
            <p className="hero-subtitle">Future-Ready Leader</p>
            <p className="hero-description">
              I am a Full-Stack Web Developer specializing in MERN Stack web applications, 
              AI integrations, and Web3 solutions. I build fast, responsive, and secure products.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={resumePdf} download="Neev_Wadhwa_Improved_Resume.pdf">
                Download Resume
              </a>
              <Link className="button button-outline" to="/contact">
                Contact Me
              </Link>
            </div>
          </div>
          <div className="hero-avatar-wrapper">
            <div className="avatar-frame">
              <img className="hero-avatar" src={profileImage} alt="Neev Wadhwa" />
              <div className="avatar-badge">Developer</div>
            </div>
          </div>
        </div>

        {/* Card 2: Experience Card (Pastel Purple) */}
        <div className="bento-card card-experience">
          <div className="card-header-group">
            <span className="card-label">Career Journey</span>
            <h2>Experience</h2>
          </div>
          <div className="card-body-content">
            {latestExperience && (
              <div className="experience-preview">
                <span className="date-badge">{latestExperience.startDate} — {latestExperience.endDate}</span>
                <h3>{latestExperience.role}</h3>
                <p className="company-text">{latestExperience.company}</p>
              </div>
            )}
          </div>
          <Link className="card-footer-link" to="/experience">
            <span>View Timeline</span>
            <span className="arrow">→</span>
          </Link>
        </div>

        {/* Card 3: Skills Card (Pastel Green) */}
        <div className="bento-card card-skills">
          <div className="card-header-group">
            <span className="card-label">Tech Stack</span>
            <h2>Skills</h2>
          </div>
          <div className="card-body-content">
            <div className="skills-preview-chips">
              {skillsList.map((skill, index) => (
                <span key={index} className="skill-preview-chip">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
          <Link className="card-footer-link" to="/skill">
            <span>All Technologies</span>
            <span className="arrow">→</span>
          </Link>
        </div>

        {/* Card 4: Portfolio Card (Pastel Peach/Orange, Spans 2 cols on desktop) */}
        <div className="bento-card card-portfolio">
          <div className="card-header-group">
            <span className="card-label">My Works</span>
            <h2>Portfolio</h2>
          </div>
          <div className="card-body-content">
            {latestProject && (
              <div className="project-preview-box">
                <div className="project-details">
                  <h3>{latestProject.title}</h3>
                  <p>{latestProject.description}</p>
                  <div className="project-tags">
                    {latestProject.tags?.map((tag) => (
                      <span key={tag} className="project-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link className="card-footer-link" to="/portfolio">
            <span>Explore Projects</span>
            <span className="arrow">→</span>
          </Link>
        </div>

        {/* Card 5: Wadhwa Foundation Card (Pastel Pink) */}
        <div className="bento-card card-foundation">
          <div className="card-header-group">
            <span className="card-label">Social Impact</span>
            <h2>Foundation</h2>
          </div>
          <div className="card-body-content">
            <p className="foundation-desc">
              Supporting students with mentorship, learning tools, and financial aid to build a brighter future.
            </p>
          </div>
          <Link className="card-footer-link" to="/mission">
            <span>Student Trust</span>
            <span className="arrow">→</span>
          </Link>
        </div>

        {/* Card 6: Contact Card (Pastel Yellow) */}
        <div className="bento-card card-contact">
          <div className="card-header-group">
            <span className="card-label">Collaboration</span>
            <h2>Let's Talk</h2>
          </div>
          <div className="card-body-content">
            <p className="contact-desc">
              Have an idea, project, or opportunity you want to discuss? Let's connect!
            </p>
          </div>
          <Link className="card-footer-link" to="/contact">
            <span>Get In Touch</span>
            <span className="arrow">→</span>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Home;
