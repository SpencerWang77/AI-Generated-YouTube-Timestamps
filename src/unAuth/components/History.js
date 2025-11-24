import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import './History.css';

function History({ onLoadHistoryItem }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const stored = localStorage.getItem('timestampHistory');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Sort by date, most recent first
        const sorted = parsed.sort((a, b) => new Date(b.date) - new Date(a.date));
        setHistory(sorted);
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const handleRefresh = () => {
    loadHistory();
  };

  const handleViewTimestamps = (item) => {
    if (onLoadHistoryItem) {
      onLoadHistoryItem(item);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <button 
          className="history-refresh-button"
          onClick={handleRefresh}
          title="Refresh history"
        >
          <FontAwesomeIcon icon={faSync} className="history-refresh-icon" />
        </button>
        <h2 className="history-title">History</h2>
      </div>
      
      {history.length === 0 ? (
        <p className="history-empty">No history yet.</p>
      ) : (
        <div className="history-list">
          {history.map((item, index) => (
            <div key={index} className="history-item">
              <div className="history-item-thumbnail">
                <img 
                  src={item.thumbnail || `https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`}
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = `https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`;
                  }}
                />
              </div>
              <div className="history-item-content">
                <h3 className="history-item-title">{item.title}</h3>
                <p className="history-item-date">{formatDate(item.date)}</p>
              </div>
              <button
                className="history-view-button"
                onClick={() => handleViewTimestamps(item)}
              >
                View Timestamps
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;

