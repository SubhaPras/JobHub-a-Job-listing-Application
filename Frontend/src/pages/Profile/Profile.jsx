import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
        setName(res.data.user.name);
        setPhone(res.data.user.phone || "");
      } catch (err) {
        setMessage("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    if (resume) formData.append("resume", resume);

    try {
      const res = await axios.put(
        `http://localhost:3000/api/users/${user._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setUser(res.data.user);
        setMessage("Profile updated successfully!");
        toast.success("Profile updated!");
        setShowModal(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Error updating profile");
    }
  };

  if (loading) return <div className="profile-loading">Loading...</div>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h2>{user.name}</h2>
          <p className="profile-email">📩 {user.email}</p>
        </div>

        <div className="profile-info">
          <p><strong>👤 Role:</strong> {user.role}</p>
          <p><strong>📞 Phone:</strong> {user.phone || "Not added"}</p>

          {user.resumeUrl && (
            <p>
              <strong>📝 Resume:</strong>{" "}
              <a href={user.resumeUrl} target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
            </p>
          )}
        </div>

        <div className="profile-actions">
          <button className="edit-btn" onClick={() => setShowModal(true)}>
            Edit Profile
          </button>
          <button
            className="view-apps-btn"
            onClick={() => navigate("/myapplications")}
          >
            View My Applications
          </button>
        </div>

        {message && <p className="profile-message">{message}</p>}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Update Profile</h3>

            <form onSubmit={handleUpdate}>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <label>Upload New Resume</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
              />

              <div className="modal-buttons">
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
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
    </div>
  );
};

export default Profile;
