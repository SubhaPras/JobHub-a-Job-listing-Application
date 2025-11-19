import ContactMessage from "../Models/ContactMessageModel.js"
import Job from "../Models/JobModel.js"
import User from "../Models/UserModel.js"

export const getAllUsers = async(req, res) => {
    try {
        if(req.user.role !== 'admin'){
           return res.json({
                success : false,
                message : "Admin Required"
            })
        }
        const users = await User.find()
       return res.json({
            success : true,
            userCount : users.length,
            users
        })
    } catch (error) {
        return res.json({
            success : false,
            message : error.message            
        })
    }
}

export const getEveryjobs = async (req, res) => {
    try {
        if(req.user.role !== 'admin'){
            return res.json({
                success : false,
                message : "admin required"
            })
        }
        const jobs = await Job.find()
        return res.json({
            success : true,
            jobs,
            jobCount : jobs.length
        })
    } catch (error) {
        return res.json({
            success : false,
            message : error.message
        })
    }
}

export const getAllMessages = async(req, res) => {
    try {
        const messages = await ContactMessage.find()
        return res.json({
            success : true,
            messageCount : messages.length,
            messages
        })
    } catch (error) {
        return res.json({
            success : false,
            message : error.message
        })
    }
}

export const deleteUser = async(req, res) => {
    try {
        if(req.user.role !== 'admin') {
            return res.json({
                success : false,
                message : "admin required"
            })
        }
        const userId = req.params.id;
        await User.findOneAndDelete(userId)
        return res.json({
            success: true,
            message : "user deleted successfully"
        })
    } catch (error) {
        return res.json({
            success : false,
            message : error.message
        })
    }
}


export const makeAdmin = async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.json({ success: false, message: "Admin required" });
      }
  
      const userId = req.params.id;
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { role: "admin" },
        { new: true }
      );
  
      return res.json({
        success: true,
        message: "User promoted to admin",
        user: updatedUser,
      });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  };
  