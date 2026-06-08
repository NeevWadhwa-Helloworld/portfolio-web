const { Schema, model } = require('mongoose');

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

contactSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
contactSchema.set('toJSON', { virtuals: true });

module.exports = model('Contact', contactSchema);
