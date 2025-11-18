import React from 'react';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="landing-footer">
      <p>© {year} AI-powered YouTube Video Timestamp Generator by Spencer Wang. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

