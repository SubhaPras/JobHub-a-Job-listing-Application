import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resumeUrl: String,
  coverLetter: String,
  status: { type: String, enum: ['applied','reviewed','rejected','accepted'], default: 'applied' },
  appliedAt: { type: Date, default: Date.now }
});

ApplicationSchema.index({ job: 1, applicant: 1 }, { unique: true }); 

const Application = mongoose.model('Application', ApplicationSchema);

export default Application;
