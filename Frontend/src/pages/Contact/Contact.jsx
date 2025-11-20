import React, { useState } from "react";
import axios from 'axios';
import "./Contact.css";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { toast } from 'react-toastify';

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  try {
      const response = await axios.post("http://localhost:3000/api/contact/createmessage", form)
        if(response.data.success){
            toast.success("Message sent successfully!");
            setForm({ name: "", email: "", message: "" });
        }
  } catch (error) {
    toast.error(error.message || "Could not send message")
  }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">

        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We’re always here to help you with anything job-related.</p>
        </div>

        <div className="contact-grid">

          {/* LEFT SECTION */}
          <div className="contact-info box">
            <h3>Our Details</h3>

            <p><strong>Email:</strong> support@jobhub.com</p>
            <p><strong>Phone:</strong> +1 987 654 3210</p>
            <p><strong>Address:</strong> 123 Tech Park, New Delhi, India</p>

            <h3 className="follow-title">Follow Us</h3>

            <div className="social-links">
              <a href="#"><FaFacebook className="social-icon" /></a>
              <a href="#"><FaInstagram className="social-icon" /></a>
              <a href="#"><FaLinkedin className="social-icon" /></a>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <form className="contact-form box" onSubmit={handleSubmit}>
            <h3>Send a Message</h3>

            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>Message</label>
            <textarea
              name="message"
              placeholder="Write your message"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Contact;
