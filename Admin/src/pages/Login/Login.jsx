import React, { useState } from 'react'
import axios from "axios";
import {toast} from "react-toastify"
import "./Login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/api/auth/login', {email, password}, {withCredentials : true})
          if(response.data?.user?.role === 'admin'){
            toast.success("login success !")
            navigate('/')
          }else{
            toast.error("invalid credentials!")           
          }
        } catch (error) {
          toast.error(error.message)
        }
    };


    return (
        <div className="login-container fade-in">
      <div className="login-card slide-up">
        <h2 className="title">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="show-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
    )
}

export default Login