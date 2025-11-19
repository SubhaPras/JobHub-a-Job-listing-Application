import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/getadmin", {
          withCredentials: true,
        });

        if (res.data?.success && res.data.user?.role === "admin") {
          setIsLoggedin(true);
        } else {
          setIsLoggedin(false);
        }
      } catch (err) {
        setIsLoggedin(false);
        console.log("Admin check failed:", err.message);
      }
    };

    checkAdmin();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Logged out");
        setIsLoggedin(false);
        navigate("/");
      }
    } catch (err) {
      toast.error("Logout failed");
      console.log(err);
    }
  };

  return (
    <nav className="nav">
      <h2 className="logo">ADMIN</h2>

      <div className={`nav-links ${open ? "active" : ""}`}>
        <a href="/">Home</a>
        <a href="/jobs">Jobs</a>
        <a href="/jobseekers">JobSeekers</a>
        <a href="/employers">Employers</a>
        <a href="/messages">Messages</a>

        {isLoggedin ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>

      <div className="menu-icon" onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
