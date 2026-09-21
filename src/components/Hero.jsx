import React from "react";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>
          Experience the <span>Narmada</span> Like Never Before
        </h1>

        <p>
          Book boat rides, homestays, food & spiritual experiences
          directly with local providers.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Explore Rides</button>
          <button className="secondary-btn">Become a Rider</button>
        </div>
      </div>

      {/* floating shapes */}
      <div className="floating circle1"></div>
      <div className="floating circle2"></div>
    </section>
  );
};

export default Hero;