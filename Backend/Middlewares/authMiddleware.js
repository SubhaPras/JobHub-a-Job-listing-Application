import jwt from 'jsonwebtoken'
import User from '../Models/UserModel.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token; 
    if (!token) return res.status(401).json({ success: false, message: "Not authorized, no token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ success: false, message: "User not found" });

    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Token invalid" });
  }
};


export const isEmployer = (req, res, next) => {
  if (req.user && req.user.role === 'employer') return next();
  return res.status(403).json({success: false, message: 'Employer role required' });
};


