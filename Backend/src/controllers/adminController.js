const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }

  const token = jwt.sign(
    { type: 'admin', email },
    process.env.JWT_SECRET || 'change_this_secret',
    { expiresIn: '8h' }
  );

  const { incrementLoginCount } = require('../services/analyticsService');
  await incrementLoginCount();

  res.json({ message: 'Admin authenticated', token });
};

const { getAnalytics } = require('../services/analyticsService');

const getDashboard = async (req, res) => {
  try {
    const analytics = await getAnalytics();
    res.json({
      message: 'Admin dashboard access granted',
      admin: req.admin,
      analytics: {
        loginCount: analytics.loginCount,
        pageViews: analytics.pageViews,
        uniqueVisitors: analytics.uniqueVisitors,
      },
      notes: 'Use the /admin/projects and /admin/experiences endpoints to manage portfolio data.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to load dashboard analytics', error: error.message });
  }
};

module.exports = {
  login,
  getDashboard,
};
