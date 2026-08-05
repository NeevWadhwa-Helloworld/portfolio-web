import { BrowserRouter, NavLink, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Experience from './pages/Experience'
import Skill from './pages/Skill'
import Portfolio from './pages/Portfolio'
import Mission from './pages/Mission'
import Contact from './pages/Contact'
import AdminPortal from './pages/AdminPortal'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'
import logoImg from './assets/logo.png'
import './App.css'

const AppRoutes = () => {
  const location = useLocation()

  useEffect(() => {
    const recordVisit = async () => {
      try {
        await fetch('/api/visit', {
          method: 'POST',
        })
      } catch (error) {
        // ignore visit tracking errors in the public UI
      }
    }

    recordVisit()
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mission" element={<Mission />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/skill" element={<Skill />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<AdminPortal />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="site-header">
          <div className="brand">
            <img className="brand-logo-img" src={logoImg} alt="Neev Wadhwa Logo" />
            <div className="brand-text">NEEV</div>
          </div>
          <nav className="site-nav">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Home
            </NavLink>
            <NavLink to="/experience" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Experience
            </NavLink>
            <NavLink to="/skill" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Skills
            </NavLink>
            <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Portfolio
            </NavLink>
            <NavLink to="/mission" className={({ isActive }) => (isActive ? 'nav-link active mission-link' : 'nav-link mission-link')}>
              Wadhwa Foundation
            </NavLink>
          </nav>
          <div className="button-group">
            <NavLink to="/admin" className="button button-outline admin-button">
              Admin Access
            </NavLink>
            <NavLink to="/contact" className="button button-secondary">
              LET&apos;S TALK
            </NavLink>
          </div>
        </header>

        <main className="page-router">
          <AppRoutes />
        </main>

        <footer className="site-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="brand-text">NEEV</span>
              <p className="footer-copyright">© {new Date().getFullYear()} Neev Wadhwa. All rights reserved.</p>
            </div>
            <div className="footer-links">
              <div className="footer-contact">
                <span>Email: <a href="mailto:neevwadhwa9568@gmail.com">neevwadhwa9568@gmail.com</a></span>
                <span>Phone: <a href="tel:9568770930">+91 9568770930</a></span>
              </div>
              <div className="footer-socials">
                <a href="https://www.linkedin.com/in/neev-wadhwa/" target="_blank" rel="noreferrer" className="social-link">
                  LinkedIn
                </a>
                <a href="https://github.com/NeevWadhwa-Helloworld" target="_blank" rel="noreferrer" className="social-link">
                  GitHub
                </a>
                <a href="https://leetcode.com/u/NeevWadhwa1/" target="_blank" rel="noreferrer" className="social-link">
                  LeetCode
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App;
