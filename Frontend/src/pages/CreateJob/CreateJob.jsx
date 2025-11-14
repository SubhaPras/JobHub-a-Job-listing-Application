import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./CreateJob.css";
import {toast} from "react-toastify"

const CreateJob = () => {
  
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
    minSalary: "",
    maxSalary: "",
    qualifications: "",
    responsibilities: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const jobData = {
      ...formData,
      salaryRange: {
        min: formData.minSalary,
        max: formData.maxSalary,
      },
      qualifications: formData.qualifications
        .split(",")
        .map((q) => q.trim())
        .filter((q) => q),
      responsibilities: formData.responsibilities
        .split(",")
        .map((r) => r.trim())
        .filter((r) => r),
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/jobs/createjob",
        jobData,
        { withCredentials: true }
      );
      if (res.data.success) {
        setMessage("✅ Job posted successfully!");
        toast.success("Job posted successfully!")
        navigate("/employerdashboard")
      } else {
        setMessage(res.data.message || "Something went wrong");
        toast.error("Something went wrong!")
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error posting job");
      toast.error("Error Posting Job")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-job-container">
      <h2>Post a New Job</h2>

      <form onSubmit={handleSubmit} className="create-job-form">
        <label>Job Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>

        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Job Type</label>
        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <div className="salary-section">
          <div>
            <label>Min Salary (₹)</label>
            <input
              type="number"
              name="minSalary"
              value={formData.minSalary}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Max Salary (₹)</label>
            <input
              type="number"
              name="maxSalary"
              value={formData.maxSalary}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label>Qualifications (comma-separated)</label>
        <input
          type="text"
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
        />

        <label>Responsibilities (comma-separated)</label>
        <input
          type="text"
          name="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>

      {message && <p className="job-message">{message}</p>}
    </div>
  );
};

export default CreateJob;
