const Analytics = require('../models/Analytics');
const Visitor = require('../models/Visitor');

const getAnalytics = async () => {
  return Analytics.getSingleton();
};

const incrementLoginCount = async () => {
  const analytics = await Analytics.getSingleton();
  analytics.loginCount += 1;
  return analytics.save();
};

const recordVisit = async (ip, userAgent) => {
  const analytics = await Analytics.getSingleton();
  analytics.pageViews += 1;

  const existingVisitor = await Visitor.findOne({ ip });
  if (!existingVisitor) {
    await Visitor.create({ ip, userAgent });
    analytics.uniqueVisitors += 1;
  }

  return analytics.save();
};

module.exports = {
  getAnalytics,
  incrementLoginCount,
  recordVisit,
};
