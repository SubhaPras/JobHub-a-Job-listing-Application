import Application from "../Models/ApplicationModel.js";
import Job from "../Models/JobModel.js";
import cloudinary from "../Utils/cloudinary.js";
import getDataUri from "../Utils/dataUri.js";

export const apply = async (req, res) => {
  try {
    // Only job seekers can apply
    if (req.user.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Only job seekers can apply"
      });
    }

    // Check job
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Prevent duplicate applications
    const existing = await Application.findOne({
      job: job._id,
      applicant: req.user._id
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already applied"
      });
    }

    // Build application data
    const appData = {
      job: job._id,
      applicant: req.user._id,
      coverLetter: req.body.coverLetter || ""
    };

    // Upload resume if provided
    if (req.file) {
      const fileUri = getDataUri(req.file); // convert buffer → base64
      const result = await cloudinary.uploader.upload(fileUri, {
        folder: "resumes",
        resource_type: "raw"
      });

      appData.resumeUrl = result.secure_url;
    }

    // Save application
    const application = await Application.create(appData);

    return res.status(201).json({
      success: true,
      message: "Application submitted",
      application
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


export const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email resumeUrl")
      .populate("job", "title");

    res.status(200).json({ success: true, applications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate({
        path: "job",
        populate: {
          path: "employer",
          select: "name email",
        },
      });

    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
