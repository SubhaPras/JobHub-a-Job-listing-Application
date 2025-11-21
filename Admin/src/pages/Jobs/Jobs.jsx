import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal.jsx";
import "./Jobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/geteveryjobs", {
        withCredentials: true,
      });
      console.log(res.data);
      
      if (res.data.success) {
        setJobs(res.data.jobs);
      }
    } catch (error) {
      toast.error("Failed to load jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openDeleteModal = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedJob) return;

    try {
      const res = await axios.delete(
        `http://localhost:3000/api/admin/deletejob/${selectedJob._id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Job deleted");
        setJobs((prev) => prev.filter((j) => j._id !== selectedJob._id));
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Failed to delete job");
    }

    setModalOpen(false);
  };

  return (
    <div className="admin-jobs-container">
      <h2 className="page-title">All Jobs</h2>

      <div className="jobs-grid">
        {jobs.map((job) => (
          <div key={job._id} className="job-card">
            <h3>{job.title}</h3>

            <p><strong>Employer:</strong> {job.employer?.name || "Unknown"}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Type:</strong> {job.jobType}</p>
            <p><strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>

            <div className="actions">
              <button
                className="delete-btn"
                onClick={() => openDeleteModal(job)}
              >
                Delete Job
              </button>
            </div>
          </div>
        ))}

        {jobs.length === 0 && (
          <p className="no-jobs">No Jobs Found</p>
        )}
      </div>

      <ConfirmModal
        open={modalOpen}
        title="Delete Job"
        message="Are you sure you want to delete this job?"
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Jobs;
