import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-wrapper">

      {/* Hero */}
      <div className="about-hero">
        <h1>About JobHub</h1>
        <p>Connecting skilled people with the right opportunities.</p>
      </div>

      {/* Who we are */}
      <div className="about-section fade-in">
        <h2>Who We Are</h2>
        <p>
          JobHub is a hiring platform built to bring job seekers and employers
          closer with a simple process. Our goal is to make hiring faster and
          easier for companies and to help candidates find roles that match their
          skills and passion.
        </p>
      </div>

      {/* Stats */}
      <div className="about-stats fade-in">
        <div className="stat-card">
          <h3>10,000+ Jobs Posted</h3>
          <p>New openings added across technology, design, finance and more.</p>
        </div>

        <div className="stat-card">
          <h3>5,000+ Employers</h3>
          <p>Companies across India trust us for quality applications.</p>
        </div>

        <div className="stat-card">
          <h3>1,00,000+ Users</h3>
          <p>Professionals finding better roles and growing their careers.</p>
        </div>

        <div className="stat-card">
          <h3>3,500+ Successful Hires</h3>
          <p>Positions filled through JobHub in the last 12 months.</p>
        </div>

        <div className="stat-card">
          <h3>50+ Industries</h3>
          <p>From startups to enterprises across multiple domains.</p>
        </div>
      </div>

      {/* Why choose us */}
      <div className="about-section fade-in">
        <h2>Why Choose Us?</h2>
        <ul className="features-list">
          <li>Easy and fast job application process</li>
          <li>Cloud-secured resume uploads</li>
          <li>Dashboard for candidates and employers</li>
          <li>Real-time application tracking</li>
          <li>Verified companies and safe hiring</li>
          <li>Modern AI-based job matching (beta)</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
