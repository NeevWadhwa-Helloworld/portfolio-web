import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminPortal = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')

    try {
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      if (!response.ok) {
        setMessage(data.message || 'Login failed')
        return
      }

      localStorage.setItem('adminToken', data.token)
      navigate('/admin/dashboard')
    } catch (error) {
      setMessage('Unable to reach the server.')
    }
  }

  return (
    <div className="page-shell section-page">
      <section className="section-hero">
        <div>
          <p className="section-label">Admin Login</p>
          <h1>Secure admin access</h1>
          <p className="section-text">Authenticate to manage projects, experience, and skills.</p>
        </div>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label htmlFor="admin-email">
            Email
            <input
              id="admin-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              placeholder="admin@example.com"
              required
            />
          </label>
          <label htmlFor="admin-password">
            Password
            <input
              id="admin-password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Enter your password"
              required
            />
          </label>
          <button className="button button-primary" type="submit">Login</button>
          {message && <p className="form-message">{message}</p>}
        </form>
      </section>
    </div>
  )
}

export default AdminPortal;
