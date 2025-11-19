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
            <p className="landing-kicker">BY SPENCER WANG</p>
            <h1 className="landing-title">Welcome to the Timestamp Generator</h1>
            <p className="landing-description">
              Welcome to my first software project!
              This is a minimalistic site for a YouTube video timestamp generator built with React.
              Enter a YouTube video URL below and click the button to generate timestamps.
            </p>
            <Timestamp />
            <div className="landing-actions">
              <button className="landing-primary">Get Started</button>
              <button className="landing-secondary">Learn More</button>
              
            </div>
          </section>
          {/* <Bumpups /> */}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;

