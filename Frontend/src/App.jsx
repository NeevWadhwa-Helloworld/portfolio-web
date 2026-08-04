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
      </div>
    </BrowserRouter>
  )
}

export default App;
