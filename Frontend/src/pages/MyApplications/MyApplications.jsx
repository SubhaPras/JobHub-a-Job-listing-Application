import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyApplications.css";
import { FaMapMarkerAlt, FaUserTie, FaEnvelope, FaFileAlt } from "react-icons/fa";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/applications/getmyapplications",
          { withCredentials: true }
        );

        if (res.data.success) {
          setApplications(res.data.applications);
        } else {
          setError("Failed to load applications.");
        }
      } catch (err) {
        setError("Error fetching your applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div className="apps-loading">Loading...</div>;
  if (error) return <div className="apps-error">{error}</div>;

  return (
    <div className="applications-container">
      <h2>Your Applications</h2>

      {applications?.length === 0 ? (
        <p className="no-applications">You haven’t applied to any jobs yet.</p>
      ) : (
        <div className="applications-grid">
          {applications?.map((app) => (
            <div key={app._id} className="application-card">
              <h3>{app.job?.title}</h3>

              <p className="app-row">
                <FaMapMarkerAlt />
                {app.job?.location}
              </p>

              <p className="app-row">
                <FaUserTie />
                {app.job?.employer?.name}
              </p>

              <p className="app-row">
                <FaEnvelope />
                {app.job?.employer?.email}
              </p>

              <p className="status-row">
                <strong>Status:</strong>
                <span className={`status ${app.status}`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </p>

              <p className="app-date">
                Applied on: {new Date(app.appliedAt).toLocaleDateString()}
              </p>

              {app.resumeUrl && (
                <a
                  href={app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-link"
                >
                  <FaFileAlt /> View Resume
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
