import User from "../Models/UserModel.js";
import cloudinary from "../Utils/cloudinary.js";
import getDataUri from "../Utils/dataUri.js";

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

    // Allow only the owner or an employer
    if (req.user._id.toString() !== userId && req.user.role !== "employer") {
      return res.status(403).json({
        success: false,
        error: "Not allowed"
      });
    }

    const update = { ...req.body };

    // Prevent changing user role
    delete update.role;

    // Upload resume/profile file to Cloudinary
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const result = await cloudinary.uploader.upload(fileUri, {
        folder: "user_uploads",
        resource_type: "raw"
      });

      update.resumeUrl = result.secure_url;
    }

    // Update user in DB
    const user = await User.findByIdAndUpdate(userId, update, {
      new: true
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
