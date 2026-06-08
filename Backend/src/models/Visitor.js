const { Schema, model } = require('mongoose');

const visitorSchema = new Schema(
  {
    ip: { type: String, required: true, unique: true },
    userAgent: { type: String },
  },
  { timestamps: true }
);

module.exports = model('Visitor', visitorSchema);
