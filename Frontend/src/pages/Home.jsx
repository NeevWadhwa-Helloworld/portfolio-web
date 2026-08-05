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
            <div className="hero-social-links">
              <a href="https://www.linkedin.com/in/neev-wadhwa/" target="_blank" rel="noreferrer" title="LinkedIn">
                <svg className="social-icon" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8.37h2.8v-4.87c0-.25.05-.5.12-.69a.9.9 0 0 1 .83-.62c.6 0 .73.56.73 1v5.18h2.9M6.5 8.37a1.37 1.37 0 0 0 0-2.75 1.37 1.37 0 0 0 0 2.75M8 18.5V10.1H5v8.4h3z" fill="currentColor"/></svg>
              </a>
              <a href="https://github.com/NeevWadhwa-Helloworld" target="_blank" rel="noreferrer" title="GitHub">
                <svg className="social-icon" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" fill="currentColor"/></svg>
              </a>
              <a href="https://leetcode.com/u/NeevWadhwa1/" target="_blank" rel="noreferrer" title="LeetCode">
                <svg className="social-icon" viewBox="0 0 24 24"><path d="M16.102 17.93l-2.69 2.607c-.466.451-1.111.696-1.744.696a2.285 2.285 0 0 1-1.744-.696l-4.755-4.607a2.403 2.403 0 0 1 0-3.437l4.755-4.607c.466-.451 1.111-.696 1.744-.696.632 0 1.277.245 1.744.696l2.69 2.607a.724.724 0 0 1 0 1.027.766.766 0 0 1-1.062 0l-2.69-2.607a.782.782 0 0 0-.537-.208.782.782 0 0 0-.537.208l-4.755 4.607a.885 8.85 0 0 0 0 1.252l4.755 4.607c.15.145.344.208.537.208.193 0 .386-.063.537-.208l2.69-2.607a.766.766 0 0 1 1.062 0 .724.724 0 0 1 0 1.027zm4.326-6.104l-2.425-2.35a.724.724 0 0 0-1.062 0 .766.766 0 0 0 0 1.028l2.425 2.35c.15.145.344.208.537.208.193 0 .386-.063.537-.208a.724.724 0 0 0 0-1.028z" fill="currentColor"/><path d="M22 14.122a1 1 0 0 1-1 1h-7.854a1 1 0 0 1-1-1v-4.244a1 1 0 0 1 1-1H21a1 1 0 0 1 1 1v4.244z" fill="currentColor" opacity=".15"/><path d="M13 11.5v2h6v-2h-6z" fill="currentColor"/></svg>
              </a>
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
