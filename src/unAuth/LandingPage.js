import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Bumpups from './components/Bumpups';
import Timestamp from './components/Timestamp';
import Results from './components/results';
import Footer from './components/Footer';
import './LandingPage.css';

function LandingPage() {
  const [timestampsData, setTimestampsData] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [onTimestampClick, setOnTimestampClick] = useState(null);

  const handleTimestampsGenerated = (data) => {
    setTimestampsData(data);
  };

  const handleVideoIdChange = (id, onClickCallback) => {
    setVideoId(id);
    setOnTimestampClick(() => onClickCallback);
  };

  return (
    <div className="landing-page">
      <div className="landing-shell">
        <NavBar />
        <div className="landing-content">
          <section className="landing-hero">
            <p className="landing-kicker">BY SPENCER WANG</p>
            <h1 className="landing-title">Welcome to the AI Timestamp Generator</h1>
            <p className="landing-description">
              Welcome to Spencer's first software project!
              This is a website designed to be a YouTube video timestamp generator built with React.
              Enter a YouTube video URL below and click the button to generate timestamps.
            </p>
            <Timestamp 
              onTimestampsGenerated={handleTimestampsGenerated}
              onVideoIdChange={handleVideoIdChange}
            />
            <Results 
              timestampsData={timestampsData}
              videoId={videoId}
              onTimestampClick={onTimestampClick}
            />
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

