import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const [message, setMessage] = useState('Loading admin dashboard...')
  const [adminInfo, setAdminInfo] = useState(null)
  const [submitMessage, setSubmitMessage] = useState('')
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    tags: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
  })
  const [experienceForm, setExperienceForm] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    highlights: '',
  })
  const [skillForm, setSkillForm] = useState({
    name: '',
    level: 'Intermediate',
  })
  const [resources, setResources] = useState({
    projects: [],
    experiences: [],
    skills: [],
  })
  const [editingProjectId, setEditingProjectId] = useState(null)
  const [editingExperienceId, setEditingExperienceId] = useState(null)
  const [editingSkillId, setEditingSkillId] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    if (!token) {
      navigate('/admin')
      return
    }

    const fetchDashboard = async () => {
      try {
        const response = await fetch('/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        if (!response.ok) {
          setMessage(data.message || 'You must login first.')
          localStorage.removeItem('adminToken')
          navigate('/admin')
          return
        }
        setAdminInfo(data)
        setMessage('')
      } catch (error) {
        setMessage('Unable to load admin dashboard.')
      }
    }

    const fetchResources = async () => {
      try {
        const responses = await Promise.all([
          fetch('/admin/projects', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/admin/experiences', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/admin/skills', { headers: { Authorization: `Bearer ${token}` } }),
        ])
        const [projects, experiences, skills] = await Promise.all(responses.map((res) => res.json()))
        setResources({ projects, experiences, skills })
      } catch (error) {
        console.error('Unable to load admin resources', error)
      }
    }

    fetchDashboard()
    fetchResources()
  }, [navigate, token])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin')
  }

  const createAdminResource = async (endpoint, body) => {
    try {
      const response = await fetch(`/admin/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Unable to save data')
      }
      setSubmitMessage(`Successfully added ${endpoint.slice(0, -1)}.`)
      return data
    } catch (error) {
      setSubmitMessage(error.message)
      return null
    }
  }

  const updateAdminResource = async (endpoint, id, body) => {
    try {
      const response = await fetch(`/admin/${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Unable to update data')
      }
      setSubmitMessage(`Successfully updated ${endpoint.slice(0, -1)}.`)
      return data
    } catch (error) {
      setSubmitMessage(error.message)
      return null
    }
  }

  const deleteAdminResource = async (endpoint, id) => {
    try {
      const response = await fetch(`/admin/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete data')
      }
      setSubmitMessage(`Successfully deleted ${endpoint.slice(0, -1)}.`)
      return data
    } catch (error) {
      setSubmitMessage(error.message)
      return null
    }
  }

  const refreshResources = async () => {
    try {
      const responses = await Promise.all([
        fetch('/admin/projects', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/admin/experiences', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/admin/skills', { headers: { Authorization: `Bearer ${token}` } }),
      ])
      const [projects, experiences, skills] = await Promise.all(responses.map((res) => res.json()))
      setResources({ projects, experiences, skills })
    } catch (error) {
      console.error('Unable to refresh admin resources', error)
    }
  }

  const handleProjectSubmit = async (event) => {
    event.preventDefault()
    setSubmitMessage('')
    const payload = {
      title: projectForm.title,
      description: projectForm.description,
      tags: projectForm.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      liveUrl: projectForm.liveUrl,
      githubUrl: projectForm.githubUrl,
      featured: projectForm.featured,
    }

    const result = editingProjectId
      ? await updateAdminResource('projects', editingProjectId, payload)
      : await createAdminResource('projects', payload)

    if (result) {
      setProjectForm({ title: '', description: '', tags: '', liveUrl: '', githubUrl: '', featured: false })
      setEditingProjectId(null)
      refreshResources()
    }
  }

  const handleExperienceSubmit = async (event) => {
    event.preventDefault()
    setSubmitMessage('')
    const payload = {
      company: experienceForm.company,
      role: experienceForm.role,
      startDate: experienceForm.startDate,
      endDate: experienceForm.endDate,
      highlights: experienceForm.highlights
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    }

    const result = editingExperienceId
      ? await updateAdminResource('experiences', editingExperienceId, payload)
      : await createAdminResource('experiences', payload)
    if (result) {
      setExperienceForm({ company: '', role: '', startDate: '', endDate: '', highlights: '' })
      setEditingExperienceId(null)
      refreshResources()
    }
  }

  const handleSkillSubmit = async (event) => {
    event.preventDefault()
    setSubmitMessage('')
    const payload = {
      name: skillForm.name,
      level: skillForm.level,
    }

    const result = editingSkillId
      ? await updateAdminResource('skills', editingSkillId, payload)
      : await createAdminResource('skills', payload)
    if (result) {
      setSkillForm({ name: '', level: 'Intermediate' })
      setEditingSkillId(null)
      refreshResources()
    }
  }

  const startEditingProject = (project) => {
    setEditingProjectId(project.id || project._id)
    setProjectForm({
      title: project.title || '',
      description: project.description || '',
      tags: (project.tags || []).join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured || false,
    })
    setSubmitMessage('Editing project. Save to update.')
  }

  const startEditingExperience = (experience) => {
    setEditingExperienceId(experience.id || experience._id)
    setExperienceForm({
      company: experience.company || '',
      role: experience.role || '',
      startDate: experience.startDate || '',
      endDate: experience.endDate || '',
      highlights: (experience.highlights || []).join('\n'),
    })
    setSubmitMessage('Editing experience. Save to update.')
  }

  const startEditingSkill = (skill) => {
    setEditingSkillId(skill.id || skill._id)
    setSkillForm({
      name: skill.name || '',
      level: skill.level || 'Intermediate',
    })
    setSubmitMessage('Editing skill. Save to update.')
  }

  const cancelEdit = () => {
    setEditingProjectId(null)
    setEditingExperienceId(null)
    setEditingSkillId(null)
    setProjectForm({ title: '', description: '', tags: '', liveUrl: '', githubUrl: '', featured: false })
    setExperienceForm({ company: '', role: '', startDate: '', endDate: '', highlights: '' })
    setSkillForm({ name: '', level: 'Intermediate' })
    setSubmitMessage('Edit canceled.')
  }

  const handleDeleteResource = async (endpoint, id) => {
    const confirmed = window.confirm('Delete this item? This cannot be undone.')
    if (!confirmed) return
    const result = await deleteAdminResource(endpoint, id)
    if (result) {
      if (endpoint === 'projects' && editingProjectId === id) {
        cancelEdit()
      }
      if (endpoint === 'experiences' && editingExperienceId === id) {
        cancelEdit()
      }
      if (endpoint === 'skills' && editingSkillId === id) {
        cancelEdit()
      }
      refreshResources()
    }
  }

  return (
    <div className="page-shell section-page admin-dashboard-page">
      <section className="section-hero admin-hero">
        <div>
          <p className="section-label">Admin Dashboard</p>
          <h1>Manage your portfolio content</h1>
          <p className="section-text">Use the forms below to add new projects, experience, and skills. All items are saved to MongoDB and exposed through live API data.</p>
          {message && <p className="section-text">{message}</p>}
        </div>
        <div className="admin-card admin-hero-card">
          <p className="section-label">Welcome back</p>
          <p className="section-text">{adminInfo?.admin?.email || 'administrator'}</p>
          <div className="analytics-grid admin-hero-grid">
            <div className="analytics-card">
              <p className="section-label">Logins</p>
              <p className="section-text">{adminInfo?.analytics?.loginCount ?? 0}</p>
            </div>
            <div className="analytics-card">
              <p className="section-label">Page Views</p>
              <p className="section-text">{adminInfo?.analytics?.pageViews ?? 0}</p>
            </div>
            <div className="analytics-card">
              <p className="section-label">Visitors</p>
              <p className="section-text">{adminInfo?.analytics?.uniqueVisitors ?? 0}</p>
            </div>
          </div>
          <div className="resource-summary">
            <p className="section-label">Current data</p>
            <div className="resource-stats">
              <span>Projects: {resources.projects.length}</span>
              <span>Experiences: {resources.experiences.length}</span>
              <span>Skills: {resources.skills.length}</span>
              <button className="button admin-button" type="button" onClick={refreshResources}>
                Refresh
              </button>
            </div>
          </div>
          <button className="button button-primary" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>

      <section className="section-form-grid">
        <div className="admin-card">
          <h2 className="section-label">{editingProjectId ? 'Edit Project' : 'Add Project'}</h2>
          <form onSubmit={handleProjectSubmit} className="admin-form">
            <label>
              Title
              <input
                value={projectForm.title}
                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                required
              />
            </label>
            <label>
              Description
              <textarea
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                required
              />
            </label>
            <label>
              Tags (comma separated)
              <input
                value={projectForm.tags}
                onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
              />
            </label>
            <label>
              Live URL
              <input
                value={projectForm.liveUrl}
                onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
              />
            </label>
            <label>
              GitHub URL
              <input
                value={projectForm.githubUrl}
                onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
              />
            </label>
            <label>
              Featured
              <input
                type="checkbox"
                checked={projectForm.featured}
                onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
              />
            </label>
            <div className="button-group">
              <button className="button button-primary" type="submit">
                {editingProjectId ? 'Update Project' : 'Save Project'}
              </button>
              {editingProjectId && (
                <button className="button admin-button" type="button" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="resource-list">
            {resources.projects.map((project) => (
              <div key={project.id || project._id} className="resource-item">
                <div className="resource-item-head">
                  <strong>{project.title}</strong>
                  <div className="resource-actions">
                    <button type="button" className="button admin-button" onClick={() => startEditingProject(project)}>
                      Edit
                    </button>
                    <button type="button" className="button admin-button" onClick={() => handleDeleteResource('projects', project.id || project._id)}>
                      Delete
                    </button>
                  </div>
                </div>
                <p>{project.description}</p>
                <p><strong>Tags:</strong> {(project.tags || []).join(', ')}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h2 className="section-label">{editingExperienceId ? 'Edit Experience' : 'Add Experience'}</h2>
          <form onSubmit={handleExperienceSubmit} className="admin-form">
            <label>
              Company
              <input
                value={experienceForm.company}
                onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                required
              />
            </label>
            <label>
              Role
              <input
                value={experienceForm.role}
                onChange={(e) => setExperienceForm({ ...experienceForm, role: e.target.value })}
                required
              />
            </label>
            <label>
              Start Date
              <input
                value={experienceForm.startDate}
                onChange={(e) => setExperienceForm({ ...experienceForm, startDate: e.target.value })}
                placeholder="e.g. Jan 2024"
                required
              />
            </label>
            <label>
              End Date
              <input
                value={experienceForm.endDate}
                onChange={(e) => setExperienceForm({ ...experienceForm, endDate: e.target.value })}
                placeholder="e.g. Present"
                required
              />
            </label>
            <label>
              Highlights (one per line)
              <textarea
                value={experienceForm.highlights}
                onChange={(e) => setExperienceForm({ ...experienceForm, highlights: e.target.value })}
              />
            </label>
            <div className="button-group">
              <button className="button button-primary" type="submit">
                {editingExperienceId ? 'Update Experience' : 'Save Experience'}
              </button>
              {editingExperienceId && (
                <button className="button admin-button" type="button" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="resource-list">
            {resources.experiences.map((experience) => (
              <div key={experience.id || experience._id} className="resource-item">
                <div className="resource-item-head">
                  <strong>{experience.company} — {experience.role}</strong>
                  <div className="resource-actions">
                    <button type="button" className="button admin-button" onClick={() => startEditingExperience(experience)}>
                      Edit
                    </button>
                    <button type="button" className="button admin-button" onClick={() => handleDeleteResource('experiences', experience.id || experience._id)}>
                      Delete
                    </button>
                  </div>
                </div>
                <p>{experience.startDate} — {experience.endDate}</p>
                <p><strong>Highlights:</strong></p>
                <ul>
                  {(experience.highlights || []).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h2 className="section-label">{editingSkillId ? 'Edit Skill' : 'Add Skill'}</h2>
          <form onSubmit={handleSkillSubmit} className="admin-form">
            <label>
              Skill Name
              <input
                value={skillForm.name}
                onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                required
              />
            </label>
            <label>
              Level
              <select
                value={skillForm.level}
                onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>
              </select>
            </label>
            <div className="button-group">
              <button className="button button-primary" type="submit">
                {editingSkillId ? 'Update Skill' : 'Save Skill'}
              </button>
              {editingSkillId && (
                <button className="button admin-button" type="button" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="resource-list">
            {resources.skills.map((skill) => (
              <div key={skill.id || skill._id} className="resource-item">
                <div className="resource-item-head">
                  <strong>{skill.name}</strong>
                  <div className="resource-actions">
                    <button type="button" className="button admin-button" onClick={() => startEditingSkill(skill)}>
                      Edit
                    </button>
                    <button type="button" className="button admin-button" onClick={() => handleDeleteResource('skills', skill.id || skill._id)}>
                      Delete
                    </button>
                  </div>
                </div>
                <p><strong>Level:</strong> {skill.level}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {submitMessage && <p className="form-message">{submitMessage}</p>}
    </div>
  )
}

export default AdminDashboard;
