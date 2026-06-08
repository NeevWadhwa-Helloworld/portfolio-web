const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true, min: 1 },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  gateway: { type: String, default: 'mock' },
  paymentUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Donation', donationSchema)
