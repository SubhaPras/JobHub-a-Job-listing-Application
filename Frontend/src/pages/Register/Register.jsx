import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    phone: "",
    companyInfo: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Registered successfully!");
        localStorage.setItem("token", res.data?.token);
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="Reg-container">
      <div className="Reg-card">
        <h2>Create Your Account</h2>
        <p className="reg-sub">Build your profile and start exploring jobs.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="reg-eye"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <input
            type="text"
            name="phone"
            placeholder="Phone (optional)"
            value={formData.phone}
            onChange={handleChange}
          />

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>

          {formData.role === "employer" && (
            <textarea
              name="companyInfo"
              placeholder="Company details"
              rows="3"
              value={formData.companyInfo}
              onChange={handleChange}
            />
          )}

          <button type="submit">Register</button>
        </form>

        <p className="reg-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="reg-link">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
