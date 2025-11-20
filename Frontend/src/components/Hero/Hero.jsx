import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Find Your Next Great Opportunity</h1>
        <p className="hero-sub">Search roles that match your goals.</p>

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
