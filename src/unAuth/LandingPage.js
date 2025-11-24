import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Bumpups from './components/Bumpups';
import Timestamp from './components/Timestamp';
import Results from './components/results';
import Footer from './components/Footer';
import './LandingPage.css';

function LandingPage() {
  const [timestampsData, setTimestampsData] = useState(null);

  const handleTimestampsGenerated = (data) => {
    setTimestampsData(data);
  };

  return (
    <div className="landing-page">
      <div className="landing-shell">
        <NavBar />
        <div className="landing-content">
          <section className="landing-hero">
            <p className="landing-kicker">BY SPENCER WANG</p>
            <h1 className="landing-title">Welcome to the Timestamp Generator</h1>
            <p className="landing-description">
              Hello there! This is Spencer Wang and welcome to my first software project!
              This is a website designed to be a YouTube video timestamp generator built with React.
              Enter a YouTube video URL below and click the button to generate timestamps.
            </p>
            <Timestamp onTimestampsGenerated={handleTimestampsGenerated} />
            <Results timestampsData={timestampsData} />
            {/* <div className="landing-actions">
              <button className="landing-primary">Get Started</button>
              <button className="landing-secondary">Learn More</button>
              
            </div> */}
          </section>
          {/* <Bumpups /> */}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;

