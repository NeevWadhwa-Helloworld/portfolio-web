const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Skill = require('../models/Skill');

const getHome = async (req, res) => {
  res.json({
    message: 'Portfolio backend is running',
    publicRoutes: ['/api/projects', '/api/experiences', '/api/skills', '/api/mission'],
    adminRoutes: ['/admin/login', '/admin/dashboard', '/admin/projects', '/admin/experiences', '/admin/skills'],
  });
};

const getPublicProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load projects', error: error.message });
  }
};

const getPublicExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load experiences', error: error.message });
  }
};

const getPublicSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ name: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load skills', error: error.message });
  }
};

module.exports = {
  getHome,
  getPublicProjects,
  getPublicExperiences,
  getPublicSkills,
};
