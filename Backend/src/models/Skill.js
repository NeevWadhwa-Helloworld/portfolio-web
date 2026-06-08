const { Schema, model } = require('mongoose');

const skillSchema = new Schema(
  {
    name: { type: String, required: true },
    level: { type: String, default: 'Intermediate' },
  },
  { timestamps: true }
);

skillSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
skillSchema.set('toJSON', { virtuals: true });

module.exports = model('Skill', skillSchema);
