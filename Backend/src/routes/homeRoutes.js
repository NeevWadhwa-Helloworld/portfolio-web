const express = require('express');
const { getHome, getPublicProjects, getPublicExperiences, getPublicSkills } = require('../controllers/homeController');

const router = express.Router();

router.get('/', getHome);
router.get('/projects', getPublicProjects);
router.get('/experiences', getPublicExperiences);
router.get('/skills', getPublicSkills);

module.exports = router;
