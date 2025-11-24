import React, { useState } from 'react'
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data?.user?.role === "admin") {
        toast.success("Login success!");
        navigate("/");
      } else {
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card neon-border">
        <h2 className="title">Welcome Back 🎉</h2>
        <p className="subtitle">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Email</label>
            <input
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-box">
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
