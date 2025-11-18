import React from 'react';
import NavBar from './components/NavBar';
import Bumpups from './components/Bumpups';
import Timestamp from './components/Timestamp';
import Footer from './components/Footer';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-shell">
        <NavBar />
        <div className="landing-content">
          <section className="landing-hero">
            <p className="landing-kicker">Preview Build</p>
            <h1 className="landing-title">Hello Landing Page</h1>
            <p className="landing-description">
              This is a lightweight placeholder layout showing how child components plug
              into the landing page. Each block has its own CSS so you can extend it
              later.
            </p>
            <div className="landing-actions">
              <button className="landing-primary">Get Started</button>
              <button className="landing-secondary">Learn More</button>
              <Timestamp />
            </div>
          </section>
          <Bumpups />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;

