import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About JobHub</h1>
        <p>Your bridge between opportunity and talent.</p>
      </div>

      <div className="about-section">
        <h2>Who We Are</h2>
        <p>
          JobHub is a modern job portal designed to help job seekers find the
          right opportunities while giving employers a simple and powerful way
          to post jobs and manage applicants. Our mission is to reduce the gap
          between companies seeking skilled talent and professionals looking for
          the perfect role.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3>10,000+ Jobs Posted</h3>
          <p>
            Every day new positions are added across IT, Marketing, Finance,
            Design, HR, Sales and many more industries.
          </p>
        </div>

        <div className="about-card">
          <h3>5,000+ Employers</h3>
          <p>
            Leading companies trust JobHub to hire top talent quickly and
            effectively.
          </p>
        </div>

        <div className="about-card">
          <h3>1,00,000+ Users</h3>
          <p>
            A growing community of job seekers using JobHub to boost their
            careers.
          </p>
        </div>
      </div>

      <div className="about-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Simple and easy job application process</li>
          <li>Secure resume uploads powered by Cloudinary</li>
          <li>Dashboard for job seekers and employers</li>
          <li>Fast application tracking system</li>
          <li>Transparent hiring process</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
