import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Bumpups from './components/Bumpups';
import Timestamp from './components/Timestamp';
import Results from './components/results';
import History from './components/History';
import Footer from './components/Footer';
import './LandingPage.css';

function LandingPage() {
  const [timestampsData, setTimestampsData] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [onTimestampClick, setOnTimestampClick] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [historyItemToLoad, setHistoryItemToLoad] = useState(null);

  const handleTimestampsGenerated = (data, videoInfo) => {
    setTimestampsData(data);
    
    // Save to localStorage
    if (data && videoInfo) {
      try {
        const historyItem = {
          videoId: videoInfo.videoId,
          title: videoInfo.title,
          thumbnail: videoInfo.thumbnail,
          timestampsData: data,
          url: videoInfo.url,
          date: new Date().toISOString()
        };

        const existing = localStorage.getItem('timestampHistory');
        let history = existing ? JSON.parse(existing) : [];
        
        // Remove duplicate if exists (same videoId)
        history = history.filter(item => item.videoId !== videoInfo.videoId);
        
        // Add new item at the beginning
        history.unshift(historyItem);
        
        // Keep only last 50 items
        if (history.length > 50) {
          history = history.slice(0, 50);
        }
        
        localStorage.setItem('timestampHistory', JSON.stringify(history));
      } catch (error) {
        console.error('Error saving to history:', error);
      }
    }
  };

  const handleVideoIdChange = (id, onClickCallback, url) => {
    setVideoId(id);
    setVideoUrl(url || '');
    setOnTimestampClick(() => onClickCallback);
  };

  const handleLoadHistoryItem = (item) => {
    // Load the history item's data
    setTimestampsData(item.timestampsData);
    setVideoId(item.videoId);
    setVideoUrl(item.url);
    setHistoryItemToLoad(item);
    
    // Scroll to top to show the video and results
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              historyItemToLoad={historyItemToLoad}
              onHistoryItemLoaded={() => setHistoryItemToLoad(null)}
            />
            <Results 
              timestampsData={timestampsData}
              videoId={videoId}
              onTimestampClick={onTimestampClick}
            />
          </section>
        </div>
        
        <div className="landing-history-section">
          <History onLoadHistoryItem={handleLoadHistoryItem} />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;

