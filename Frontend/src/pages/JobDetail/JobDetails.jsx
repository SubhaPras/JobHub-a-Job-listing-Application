import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
      const res = await axios.post(
        `http://localhost:3000/api/applications/${id}/apply`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Application submitted successfully!");
        setShowModal(false);
        setCoverLetter("");
        setResume(null);
        setMessage("");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Error applying for job");
    }
  };

  if (loading) return <div className="job-details-loading">Loading...</div>;
  if (error) return <div className="job-details-error">{error}</div>;

  return (
    <div className="job-details-wrapper">
      <div className="job-details-card">
        {job ? (
          <>
            <h2 className="job-title">{job.title}</h2>
            <p className="job-company">Posted by {job.employer?.name}</p>

            {/* ICON METADATA */}
            <div className="job-meta">
              <div className="meta-box">
                {/* <i className="fa-solid fa-location-dot"></i> */}
                📌
                <span>{job.location}</span>
              </div>

              <div className="meta-box">
                {/* <i className="fa-solid fa-briefcase"></i> */}
                💼
                <span>{job.jobType}</span>
              </div>

              <div className="meta-box">
                {/* <i className="fa-solid fa-indian-rupee-sign"></i> */}
                💰
                <span>
                  {job.salaryRange?.min} - {job.salaryRange?.max}
                </span>
              </div>
            </div>

            {/* Description */}
            <h3 className="rgb-title">Description</h3>
            <p>{job.description}</p>

            {/* Qualifications */}
            {job.qualifications?.length > 0 && (
              <>
                <h3 className="rgb-title">Qualifications</h3>
                <ul>
                  {job.qualifications.map((q, index) => (
                    <li key={index}>{q}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Responsibilities */}
            {job.responsibilities?.length > 0 && (
              <>
                <h3 className="rgb-title">Responsibilities</h3>
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

            {/* APPLY MODAL */}
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

                    <p className="error-message">{message}</p>

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
    </div>
  );
};

export default JobDetails;
