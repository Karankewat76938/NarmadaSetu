import React, { useState, useEffect } from "react";
import "../styles/global.css";

function Navbar() {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  return (
    <nav className={scroll ? "navbar active" : "navbar"}>
      <div className="logo">NarmadaSetu</div>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#trust">Trust</a></li>
        <li><a href="#gallery">Gallery</a></li>
      </ul>

      <div className="nav-buttons">
        <button className="login-btn">Login</button>
        <button className="register-btn">Register</button>
      </div>
    </nav>
  );
}

export default Navbar;