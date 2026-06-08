const express = require('express');
const adminAuth = require('../middlewares/adminAuth');
const { login, getDashboard } = require('../controllers/adminController');
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require('../controllers/dataController');
const { getContactRequests, deleteContactRequest } = require('../controllers/contactController');

const router = express.Router();

router.post('/login', login);
router.get('/', adminAuth, getDashboard);
router.get('/dashboard', adminAuth, getDashboard);

router.get('/projects', adminAuth, getProjects);
router.post('/projects', adminAuth, createProject);
router.put('/projects/:id', adminAuth, updateProject);
router.delete('/projects/:id', adminAuth, deleteProject);

router.get('/experiences', adminAuth, getExperiences);
router.post('/experiences', adminAuth, createExperience);
router.put('/experiences/:id', adminAuth, updateExperience);
router.delete('/experiences/:id', adminAuth, deleteExperience);

router.get('/skills', adminAuth, getSkills);
router.post('/skills', adminAuth, createSkill);
router.put('/skills/:id', adminAuth, updateSkill);
router.delete('/skills/:id', adminAuth, deleteSkill);

router.get('/contacts', adminAuth, getContactRequests);
router.delete('/contacts/:id', adminAuth, deleteContactRequest);

module.exports = router;
