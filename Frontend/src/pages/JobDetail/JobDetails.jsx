import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify"
import axios from "axios";
import "./JobDetails.css";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/jobs/${id}`);
        setJob(res.data.job);
      } catch (err) {
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!resume) return setMessage("Please upload your resume before applying.");

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("coverLetter", coverLetter);

    try {
      const res = await axios.post(`http://localhost:3000/api/applications/${id}/apply`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        setMessage("✅ Application submitted successfully!");
        toast.success("Application submitted successfully!")
        setShowModal(false);
        setCoverLetter("");
        setResume(null);
      } else {
        setMessage(res.data.message || "Something went wrong");
        toast.error("something went wrong")
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error applying for job");
      toast.error("error Applying for job")
    }
  };

  if (loading) return <div className="job-details-loading">Loading...</div>;
  if (error) return <div className="job-details-error">{error}</div>;

  return (
    <div className="job-details-container">
      {job ? (
        <>
          <h2>{job.title}</h2>
          <p className="job-company">Posted by: {job.employer?.name}</p>

          <div className="job-meta">
            <p><strong>📍 Location:</strong> {job.location}</p>
            <p><strong>💼 Type:</strong> {job.jobType}</p>
            <p><strong>💰 Salary:</strong> ₹{job.salaryRange?.min} - ₹{job.salaryRange?.max}</p>
          </div>

          <h3>Description</h3>
          <p>{job.description}</p>

          {job.qualifications?.length > 0 && (
            <>
              <h3>Qualifications</h3>
              <ul>
                {job.qualifications.map((q, index) => (
                  <li key={index}>{q}</li>
                ))}
              </ul>
            </>
          )}

          {job.responsibilities?.length > 0 && (
            <>
              <h3>Responsibilities</h3>
              <ul>
                {job.responsibilities.map((r, index) => (
                  <li key={index}>{r}</li>
                ))}
              </ul>
            </>
          )}

          <button className="apply-now-btn" onClick={() => setShowModal(true)}>
            Apply Now
          </button>

          {message && <p className="apply-message">{message}</p>}

          {/* Apply Modal */}
          {showModal && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
              <div className="apply-modal" onClick={(e) => e.stopPropagation()}>
                <h3>Apply for {job.title}</h3>
                <form onSubmit={handleApply}>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Write your cover letter..."
                  ></textarea>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResume(e.target.files[0])}
                  />

                  <div className="modal-buttons">
                    <button type="submit">Submit</button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Job not found.</p>
      )}
    </div>
  );
};

export default JobDetails;
