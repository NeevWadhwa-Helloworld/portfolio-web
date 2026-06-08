const { recordVisit } = require('../services/analyticsService');

const saveVisit = async (req, res) => {
  try {
    const forwarded = req.headers['x-forwarded-for']
    const ip = forwarded ? forwarded.split(',')[0].trim() : req.ip || req.socket?.remoteAddress || ''
    const userAgent = req.headers['user-agent'] || ''

    await recordVisit(ip, userAgent)
    res.json({ message: 'Visit recorded' })
  } catch (error) {
    res.status(500).json({ message: 'Unable to record visit', error: error.message })
  }
};

module.exports = {
  saveVisit,
};
