import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  jobType: { type: String, enum: ['full-time','part-time','contract','internship'], default: 'full-time' },
  salaryRange: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 }
  },
  qualifications: [String],
  responsibilities: [String],
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

const Job = mongoose.model('Job', JobSchema);

export default Job;
