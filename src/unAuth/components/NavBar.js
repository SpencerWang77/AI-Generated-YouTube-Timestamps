import React from 'react';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="nav-brand">My React App</div>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

export default NavBar;

