const express = require('express');
const { saveContactRequest } = require('../controllers/contactController');

const router = express.Router();

router.post('/', saveContactRequest);

module.exports = router;
