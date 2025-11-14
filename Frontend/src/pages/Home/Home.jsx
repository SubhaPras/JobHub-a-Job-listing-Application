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
        <h2>About Us</h2>
        <p>
          JOB HUB is your trusted platform for connecting talent and
          opportunity. Whether you’re an employer or a job seeker, we make the
          process simple and efficient.
        </p>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Home;
