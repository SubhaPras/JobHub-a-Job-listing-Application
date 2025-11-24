import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal.jsx";
import "./JobSeekers.css";

const JobSeekers = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/getallusers", {
        withCredentials: true,
      });

      if (res.data.success) {
        const filtered = res.data.users.filter((u) => u.role === "user");
        setUsers(filtered);
      }
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (action, id) => {
    setModalAction(action);
    setSelectedUserId(id);
    setModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedUserId) return;

    if (modalAction === "delete") {
      try {
        const res = await axios.delete(
          `http://localhost:3000/api/admin/deleteuser/${selectedUserId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          toast.success("User deleted");
          setUsers((prev) => prev.filter((u) => u._id !== selectedUserId));
        } else {
          toast.error(res.data.message);
        }
      } catch {
        toast.error("Delete failed");
      }
    }

    if (modalAction === "makeAdmin") {
      try {
        const res = await axios.put(
          `http://localhost:3000/api/admin/makeadmin/${selectedUserId}`,
          {},
          { withCredentials: true }
        );

        if (res.data.success) {
          toast.success("User promoted to admin");
          setUsers((prev) => prev.filter((u) => u._id !== selectedUserId));
        } else {
          toast.error(res.data.message);
        }
      } catch {
        toast.error("Action failed");
      }
    }

    setModalOpen(false);
  };

  return (
    <div className="jobseekers-container">
      <h2 className="page-title">Job Seekers</h2>

      <div className="jobseekers-grid">
        {users.map((user) => (
          <div className="user-card" key={user._id}>
            <div className="uc-header">
              <h3>{user.name}</h3>
              <span className="uc-email">{user.email}</span>
            </div>

            <div className="actions">
              <button
                className="delete-btn"
                onClick={() => openModal("delete", user._id)}
              >
                Delete
              </button>

              <button
                className="admin-btn"
                onClick={() => openModal("makeAdmin", user._id)}
              >
                Make Admin
              </button>
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <p className="no-users">No Job Seekers Found</p>
        )}
      </div>

      <ConfirmModal
        open={modalOpen}
        title={modalAction === "delete" ? "Delete User" : "Make Admin"}
        message={
          modalAction === "delete"
            ? "Are you sure you want to delete this user?"
            : "Do you want to promote this user to admin?"
        }
        onConfirm={handleConfirm}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};

export default JobSeekers;
