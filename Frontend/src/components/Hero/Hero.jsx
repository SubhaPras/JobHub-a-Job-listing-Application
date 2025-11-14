import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Your Dream Job That Make You Come</h1>
        <p>Discover opportunities that match your skills and goals.</p>

        <div className="search-bar">
          <input type="text" placeholder="Job title or keyword..." />
          <input type="text" placeholder="Location..." />
          <button>Search</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
