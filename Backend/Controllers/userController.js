import User from "../Models/UserModel.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res.status(404).json({ success: false, error: "User not found" });
    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (
      req.user._id.toString() !== userId &&
      req.user.role !== "employer"
    ) {
      return res.status(403).json({ success: false, error: "Not allowed" });
    }

    const update = { ...req.body };

    if (req.file) update.resumeUrl = req.file.path; 
    delete update.role;

    const user = await User.findByIdAndUpdate(userId, update, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
