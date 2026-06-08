import resumePdf from '../assets/Neev_Wadhwa_Improved_Resume.pdf'
import profileImage from '../assets/WhatsApp Image 2026-06-07 at 12.21.29 PM.jpeg'

const Home = () => {
  return (
    <div className="page-shell home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Hello, I'm</span>
          <h1>Neev Wadhwa</h1>
          <p className="hero-subtitle">Future-Ready Leader</p>
          <p className="hero-description">
            I am a Full-Stack Web Developer with experience in creating MERN Stack web applications. My expertise is in creating and designing websites,
            AI integrations, and Web3 solutions.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="/services">Learn More</a>
            <a className="button button-outline" href="/contact">Contact Me</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-content">
              <img className="hero-avatar" src={profileImage} alt="Neev" />
              <div>
                <p className="hero-card-title">Neev</p>
                <p className="hero-card-subtitle">Personal Portfolio</p>
              </div>
            </div>
            <div className="hero-card-actions">
              <a className="button button-secondary" href={resumePdf} download="Neev_Wadhwa_Improved_Resume.pdf">
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-intro">
          <p className="section-label">About Me</p>
          <h2>Elegant design, fast performance, and attention to detail.</h2>
        </div>
        <div className="feature-grid">
          <article className="feature-card">
            <h3>Web Development</h3>
            <p>I build applications using MERN Stack technologies for a seamless user experience.</p>
          </article>
          <article className="feature-card">
            <h3>AI Integrations</h3>
            <p>Seamless integration of artificial intelligence into web applications for enhanced user experiences.</p>
          </article>
          <article className="feature-card">
            <h3>Web3 Solutions</h3>
            <p>Decentralized applications and smart contracts for the future of the internet.</p>
          </article>
        </div>
      </section>
    </div>
  )
}

export default Home;
