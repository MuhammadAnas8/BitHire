// src/components/HeroSection.jsx
import React from "react";
import "../styles/HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">BitHire</h1>
        <p className="hero-subtitle">
          Your gateway to the best jobs. Connect, apply, and grow your career with ease.
        </p>
        <button
          className="hero-btn"
          onClick={() => {
            const jobSection = document.querySelector(".jobs-container");
            if (jobSection) jobSection.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Explore Jobs
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
