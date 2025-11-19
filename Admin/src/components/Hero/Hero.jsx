import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [apps, setApps] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchJobs();
    fetchApps();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/api/admin/users", {
      withCredentials: true,
    });
    if (res.data.success) setUsers(res.data.users);
  };

  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:3000/api/admin/jobs", {
      withCredentials: true,
    });
    if (res.data.success) setJobs(res.data.jobs);
  };

  const fetchApps = async () => {
    const res = await axios.get("http://localhost:3000/api/admin/applications", {
      withCredentials: true,
    });
    if (res.data.success) setApps(res.data.apps);
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>

      <div className="admin-grid">
        <div className="admin-card" onClick={() => navigate("/admin/users")}>
          <h3>Users</h3>
          <p>{users.length} Registered Users</p>
        </div>

        <div className="admin-card" onClick={() => navigate("/admin/jobs")}>
          <h3>Jobs</h3>
          <p>{jobs.length} Jobs Posted</p>
        </div>

        <div className="admin-card" onClick={() => navigate("/admin/applications")}>
          <h3>Applications</h3>
          <p>{apps.length} Total Applications</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
