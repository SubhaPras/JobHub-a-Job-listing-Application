import Job from "../Models/JobModel.js";

export const createJob = async (req, res) => {
  try {
    const payload = { ...req.body, employer: req.user._id };
    const job = new Job(payload);
    await job.save();
    res.status(201).json({ success: true, job });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const {
      keyword,
      location,
      jobType,
      minSalary,
      maxSalary,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Keyword search in multiple fields
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { qualifications: { $regex: keyword, $options: "i" } },
        { responsibilities: { $regex: keyword, $options: "i" } },
      ];
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Job type filter
    if (jobType) {
      query.jobType = jobType;
    }

    // Salary range filter
    if (minSalary || maxSalary) {
      query["salaryRange.min"] = { $gte: Number(minSalary) || 0 };
      if (maxSalary) query["salaryRange.max"] = { $lte: Number(maxSalary) };
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find(query)
      .populate("employer", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Job.countDocuments(query);

    res.json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      jobs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getJobDetail = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "employer",
      "name email"
    );
    if (!job)
      return res.status(404).json({ success: false, error: "Job not found" });
    res.json({ success: true, job });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(404).json({ success: false, error: "Job not found" });
    if (job.employer.toString() !== req.user._id.toString())
      return res.status(403).json({ success: false, error: "Not owner" });
    Object.assign(job, req.body, { updatedAt: new Date() });
    await job.save();
    res.json({ success: true, job });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteJob = async(req, res) => {
     try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({success: false, error: 'Job not found' });
    if (job.employer.toString() !== req.user._id.toString()) return res.status(403).json({ error: 'Not owner' });
    await Job.findByIdAndDelete(req.params.id)
    res.json({success: true, message: 'Job removed' });
  } catch (err) { res.json({
    success : false,
    message : err.message
  }) }
}


export const getmyjobs = async (req, res) => {
  try {
const jobs = await Job.find({ employer: req.user._id }).populate("employer", "name email");
    res.status(200).json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}