import React, { useState } from "react";
import "./Home.css";
import Hero from "../../components/Hero/Hero.jsx";
import ChatBot from "../../components/ChatBot/ChatBot.jsx";

const Home = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="home-container">
      <Hero />

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            JOB HUB connects people to opportunities. Whether you’re hiring or searching for your next role, we keep the process simple and effective.
          </p>

          <div className="about-features">
            <div className="feature-card">
              <h3>Verified Jobs</h3>
              <p>We ensure that companies and listings meet quality standards.</p>
            </div>

            <div className="feature-card">
              <h3>Fast Hiring</h3>
              <p>Streamlined tools that help employers hire without delays.</p>
            </div>

            <div className="feature-card">
              <h3>User Friendly</h3>
              <p>A clean dashboard that makes navigation smooth for everyone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Chat Button */}
      <button
        className="chatbot-button"
        onClick={() => setChatOpen(true)}
      >
        💬
      </button>

      {/* Chatbot Popup */}
      {chatOpen && (
  <div className="chatbot-modal-overlay">
    <div className="chatbot-modal" onClick={(e) => e.stopPropagation()}>
      <ChatBot onClose={() => setChatOpen(false)} />
    </div>
  </div>
)}

    </div>
  );
};

export default Home;
