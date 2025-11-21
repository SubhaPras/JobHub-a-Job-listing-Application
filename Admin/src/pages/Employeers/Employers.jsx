import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal.jsx";
import "./Employers.css";

const Employers = () => {
  const [employers, setEmployers] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null); // delete | makeAdmin
  const [selectedId, setSelectedId] = useState(null);

  const fetchEmployers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/getallusers", {
        withCredentials: true,
      });

      if (res.data.success) {
        const filtered = res.data.users.filter((u) => u.role === "employer");
        setEmployers(filtered);
      }
    } catch {
      toast.error("Failed to load employers");
    }
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  // Open popup
  const openModal = (action, id) => {
    setModalAction(action);
    setSelectedId(id);
    setModalOpen(true);
  };

  // Confirm Action
  const handleConfirm = async () => {
    if (!selectedId) return;

    if (modalAction === "delete") {
      try {
        const res = await axios.delete(
          `http://localhost:3000/api/admin/deleteuser/${selectedId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          toast.success("Employer deleted");
          setEmployers((prev) => prev.filter((u) => u._id !== selectedId));
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
          `http://localhost:3000/api/admin/makeadmin/${selectedId}`,
          {},
          { withCredentials: true }
        );

        if (res.data.success) {
          toast.success("Employer promoted to admin");
          setEmployers((prev) => prev.filter((u) => u._id !== selectedId));
        } else {
          toast.error(res.data.message);
        }
      } catch {
        toast.error("Update failed");
      }
    }

    setModalOpen(false);
  };

  return (
    <div className="employer-container">
      <h2 className="page-title">Employers</h2>

      <div className="employer-grid">
        {employers.map((employer) => (
          <div className="employer-card" key={employer._id}>
            <h3>{employer.name}</h3>
            <p>{employer.email}</p>

            <div className="actions">
              <button
                className="delete-btn"
                onClick={() => openModal("delete", employer._id)}
              >
                Delete
              </button>

              <button
                className="admin-btn"
                onClick={() => openModal("makeAdmin", employer._id)}
              >
                Make Admin
              </button>
            </div>
          </div>
        ))}

        {employers.length === 0 && (
          <p className="no-employers">No Employers Found</p>
        )}
      </div>

      <ConfirmModal
        open={modalOpen}
        title={modalAction === "delete" ? "Delete Employer" : "Make Admin"}
        message={
          modalAction === "delete"
            ? "Are you sure you want to delete this employer?"
            : "Do you want to promote this employer to admin?"
        }
        onConfirm={handleConfirm}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Employers;
