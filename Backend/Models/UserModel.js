import mongoose from "mongoose";
import validator from "validator"

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, validate: [validator.isEmail, 'Invalid email'] },
  password: { type: String, required: true },
  role: { type: String, enum: ['user','employer'], default: 'user' },
  phone: String,
  resumeUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

export default User;