import Application from "../Models/ApplicationModel.js";
import Job from "../Models/JobModel.js";

export const apply = async (req, res) => {
  try {
    if (req.user.role !== "user")
      return res
        .status(403)
        .json({ success: false, message: "Only job seekers can apply" });
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({success : false, message: "Job not found" });

    const existing = await Application.findOne({
      success: false,
      job: job._id,
      applicant: req.user._id,
    });
    if (existing)
      return res
        .status(400)
        .json({ success: false, message: "Already applied" });

    const appData = {
      job: job._id,
      applicant: req.user._id,
      coverLetter: req.body.coverLetter || "",
    };
    if (req.file) appData.resumeUrl = req.file.path; 
    
    const application = new Application(appData);
    await application.save();
    res.status(201).json({ success: true, application });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });
    if (job.employer.toString() !== req.user._id.toString())
      return res.status(403).json({ success: false, message: "Not owner" });
    const apps = await Application.find({ job: job._id }).populate(
      "applicant",
      "name email resumeUrl phone"
    );
    res.json({ success: true, apps });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ applicant: req.user._id }).populate(
      "job"
    );
    res.json({ success: true, apps });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      "job"
    );
    if (!application)
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    if (application.job.employer.toString() !== req.user._id.toString())
      return res.status(403).json({ success: false, message: "Not owner" });
    const { status } = req.body;
    if (!["applied", "reviewed", "rejected", "accepted"].includes(status))
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    application.status = status;
    await application.save();
    res.json({ success: true, application });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
