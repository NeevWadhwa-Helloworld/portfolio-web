const express = require('express');
const { saveVisit } = require('../controllers/visitController');

const router = express.Router();

router.post('/', saveVisit);

module.exports = router;
