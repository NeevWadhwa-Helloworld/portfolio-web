const { Schema, model } = require('mongoose');

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    liveUrl: { type: String },
    githubUrl: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

projectSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
projectSchema.set('toJSON', { virtuals: true });

module.exports = model('Project', projectSchema);
