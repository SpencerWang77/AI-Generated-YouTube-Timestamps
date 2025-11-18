import React from 'react';
import logo from '../../assets/logo.png';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="nav-brand">
        <img src={logo} alt="My React App logo" className="nav-logo" />
        <span>AI-powered YouTube Video Timestamp Generator</span>
      </div>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

export default NavBar;

