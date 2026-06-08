const Services = () => {
  return (
    <div className="page-shell section-page">
      <section className="section-hero">
        <div>
          <p className="section-label">Services</p>
          <h1>What I deliver as a web developer.</h1>
          <p className="section-text">
            From landing pages to full product launches, I help teams go from idea to live product with speed and quality.
          </p>
        </div>
        <div className="service-grid">
          <article className="service-card">
            <h3>Web Applications</h3>
            <p>Custom web applications built with the latest technologies for a seamless user experience.</p>
          </article>
          <article className="service-card">
            <h3>AI Integrations</h3>
            <p>Seamless integration of artificial intelligence into web applications for enhanced user experiences.</p>
          </article>
          <article className="service-card">
            <h3>Web3 Solutions</h3>
            <p>Decentralized applications and smart contracts for the future of the internet.</p>
          </article>
        </div>
      </section>
    </div>
  )
}

export default Services;
