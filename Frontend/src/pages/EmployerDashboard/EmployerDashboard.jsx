import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./EmployerDashboard.css";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/jobs/getmyjobs", {
          withCredentials: true,
        });
        if (res.data.success) {
          setJobs(res.data?.jobs);
        } else {
          setMessage("Failed to load jobs");
        }
      } catch (err) {
        setMessage("Error fetching your jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, []);

  // Open popup
  const confirmDelete = (id) => {
    setSelectedJob(id);
    setShowPopup(true);
  };

  // Actual delete
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/jobs/${selectedJob}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setJobs((prev) => prev.filter((job) => job._id !== selectedJob));
        toast.success("Job deleted successfully");
      } else {
        toast.error("Failed to delete job");
      }
    } catch (err) {
      toast.error("Error deleting job");
    } finally {
      setShowPopup(false);
      setSelectedJob(null);
    }
  };

  if (loading) return <div className="dashboard-loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Employer Dashboard</h2>
        <button
          className="create-job-btn"
          onClick={() => navigate("/createjob")}
        >
          + Create Job
        </button>
      </div>

      {message && <p className="dashboard-message">{message}</p>}

      {jobs.length > 0 ? (
        <div className="job-list">
          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Type:</strong> {job.jobType}</p>
              <p><strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>

              <div className="job-actions">
                <button
                  className="view-btn"
                  onClick={() => navigate(`/employer/applicants/${job._id}`)}
                >
                  View Applicants
                </button>

                <button
                  className="delete-btn"
                  onClick={() => confirmDelete(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-jobs-text">You haven’t posted any jobs yet.</p>
      )}

      {/* POPUP */}
      {showPopup && (
        <div className="popup-backdrop">
          <div className="popup-box">
            <h3>Delete Job?</h3>
            <p>This action cannot be undone.</p>

            <div className="popup-buttons">
              <button className="cancel-btn" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EmployerDashboard;
