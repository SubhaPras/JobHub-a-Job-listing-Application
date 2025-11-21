import React, { useEffect, useState } from "react";
import axios from "axios";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal.jsx";
import "./Messages.css";
import { toast } from "react-toastify";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [viewMessage, setViewMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/admin/getallmessages",
        { withCredentials: true }
      );

      if (res.data.success) {
        setMessages(res.data.messages);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = (message) => {
    setSelectedMessage(message);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/admin/deletemessage/${selectedMessage._id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Message deleted successfully");
        setMessages((prev) =>
          prev.filter((msg) => msg._id !== selectedMessage._id)
        );
      }
    } catch (error) {
      console.log(error);
    }
    setConfirmOpen(false);
  };

  return (
    <div className="admin-messages">
      <h2>Messages</h2>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="no-messages">No messages found</p>
      ) : (
        <div className="messages-grid">
          {messages.map((msg) => (
            <div className="message-card" key={msg._id}>
              <h3>{msg.name}</h3>
              <p className="email">{msg.email}</p>

              <p className="message-text">
                {msg.message.length > 120
                  ? msg.message.slice(0, 100) + "..."
                  : msg.message}
              </p>

              <p className="date">
                {new Date(msg.createdAt).toLocaleDateString()}
              </p>

              <div className="actions">
                <button
                  className="view-btn"
                  onClick={() => setViewMessage(msg)}
                >
                  View Message
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(msg)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        open={confirmOpen}
        title="Delete Message"
        message="Are you sure you want to delete this message?"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />

      {/* View Message Modal */}
      {viewMessage && (
  <div className="view-modal-overlay">
    <div className="view-modal-box">
      <h3>{viewMessage.name}</h3>
      <p className="email">{viewMessage.email}</p>

      <div className="full-message">
        {viewMessage.message}
      </div>

      <button
        className="close-btn"
        onClick={() => setViewMessage(null)}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default AdminMessages;
