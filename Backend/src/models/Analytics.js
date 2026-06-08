const { Schema, model } = require('mongoose');

const analyticsSchema = new Schema(
  {
    loginCount: { type: Number, default: 0 },
    pageViews: { type: Number, default: 0 },
    uniqueVisitors: { type: Number, default: 0 },
  },
  { timestamps: true }
);

analyticsSchema.statics.getSingleton = async function () {
  const stats = await this.findOne();
  if (stats) return stats;
  return this.create({});
};

module.exports = model('Analytics', analyticsSchema);
