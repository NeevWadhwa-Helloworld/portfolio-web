const { Schema, model } = require('mongoose');

const experienceSchema = new Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    highlights: [{ type: String }],
  },
  { timestamps: true }
);

experienceSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
experienceSchema.set('toJSON', { virtuals: true });

module.exports = model('Experience', experienceSchema);
