import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Hero from "../../components/Hero/Hero.jsx";

const Home = () => {
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


      {/* <Footer /> */}
    </div>
  );
};

export default Home;
