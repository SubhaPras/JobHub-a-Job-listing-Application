import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/me", {
          withCredentials: true,
        });
        if (res.data.success) {
          setUser(res.data.user);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        localStorage.removeItem("token");
        toast.success("Logout successful!");
        setIsLoggedIn(false);
        setUser(null);
        navigate("/");
      }
    } catch (err) {
      toast.error("Logout failed");
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        JOB HUB
      </div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="/">Home</a>
        <a href="/jobs">Jobs</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>

        {isLoggedIn ? (
          user?.role === "employer" ? (
            <>
              <a href="/employerdashboard">Dashboard</a>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/profile" className="profile-icon">
                <CgProfile size={24} />
              </a>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )
        ) : (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
};

export default Navbar;
