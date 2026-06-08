const express = require('express')
const { getMission, postDonation } = require('../controllers/missionController')

const router = express.Router()

router.get('/', getMission)
router.post('/donate', postDonation)

module.exports = router
