import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify"
import "./ViewApplicants.css";

const ViewApplicants = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/applications/${jobId}`,
          { withCredentials: true }
        );
        // console.log("GET applicants response:", res.data);
        // your backend returns { success: true, apps } or { success: true, applications }
        const apps = res.data.applications ?? res.data.apps ?? res.data.appsList ?? [];
        setApplications(apps);
      } catch (err) {
        console.error("fetch applicants error:", err);
        setMsg(err.response?.data?.message || "Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [jobId]);

  const handleStatusChange = async (applicationId, newStatus) => {
    setMsg("");
    try {
      const res = await axios.put(
        `http://localhost:3000/api/applications/updatestatus/${applicationId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      console.log("PUT update status response:", res.data);
      if (res.data.success) {
        setApplications((prev) =>
          prev.map((a) => (a._id === applicationId ? { ...a, status: newStatus } : a))
        );
        setMsg("Status updated");
        toast.success("Status updated")
        setTimeout(() => setMsg(""), 2000);
      } else {
        setMsg(res.data.message || "Failed to update status");
        toast.error("failed to update status")
      }
    } catch (err) {
      console.error("update status error:", err);
      setMsg(err.response?.data?.message || "Error updating status");
      toast.error("Error updating status")
    }
  };

  if (loading) return <div className="applicants-loading">Loading applicants…</div>;

  return (
    <div className="applicants-page">
      <div className="applicants-container">
        <h2>Applicants for this Job</h2>
        {msg && <div className="status-message">{msg}</div>}

        {applications.length === 0 ? (
          <p className="no-applicants">No applicants yet.</p>
        ) : (
          applications.map((app) => {
            // safety: application may have job populated or not
            // app.applicant may be populated (object) or an id
            // console.log("application item:", app);
            const applicant = app.applicant || {};
            const profileResume = applicant.resumeUrl || null;
            const applicationResume = app.resumeUrl || null; // set when applicant uploaded during apply
            const coverLetter = app.coverLetter || "";
            return (
              <div key={app._id} className="applicant-card">
                <div className="applicant-left">
                  <h3 className="applicant-name">{applicant.name ?? "Unknown"}</h3>
                  <p className="applicant-email"><strong>Email:</strong> {applicant.email ?? "-"}</p>

                  {coverLetter ? (
                    <>
                      <p className="label">Cover Letter</p>
                      <div className="cover-letter">{coverLetter}</div>
                    </>
                  ) : (
                    <p className="no-cover">No cover letter provided.</p>
                  )}

                  <div className="resume-links">
                    {applicationResume && (
                      <a
                        className="resume-link"
                        href={applicationResume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📄 Resume (attached to application)
                      </a>
                    )}

                    {profileResume && (
                      <a
                        className="resume-link"
                        href={profileResume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        👤 Resume (profile)
                      </a>
                    )}

                    {!applicationResume && !profileResume && (
                      <div className="no-resume">No resume available</div>
                    )}
                  </div>
                </div>

                <div className="applicant-right">
                  <div className="current-status">
                    <div><strong>Status</strong></div>
                    <div className={`status-chip ${app.status}`}>{app.status}</div>
                  </div>

                  <div className="update-block">
                    <label htmlFor={`status-${app._id}`} className="sr-only">Update status</label>
                    <select
                      id={`status-${app._id}`}
                      value={app.status}
                      onChange={(e) => handleStatusChange(app._id, e.target.value)}
                    >
                      <option value="applied">Applied</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ViewApplicants;
