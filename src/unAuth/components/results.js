import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import './results.css';

function Results({ timestampsData }) {
  const [copied, setCopied] = useState(false);

  if (!timestampsData) {
    return null;
  }

  const { timestamps_list, timestamps_string, video_duration } = timestampsData;

  const handleCopy = async () => {
    if (timestamps_string) {
      try {
        await navigator.clipboard.writeText(timestamps_string);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2 className="results-title">Generated Timestamps</h2>
        {video_duration && (
          <p className="results-duration">Video Duration: {video_duration} minutes</p>
        )}
      </div>
      
      {timestamps_list && timestamps_list.length > 0 ? (
        <div className="results-content">
          <ul className="results-list">
            {timestamps_list.map((timestamp, index) => (
              <li key={index} className="results-item">
                {timestamp}
              </li>
            ))}
          </ul>
          
          {timestamps_string && (
            <div className="results-text">
              <div className="results-text-header">
                <h3 className="results-text-title">Copy All Timestamps</h3>
                <button
                  type="button"
                  className="results-copy-button"
                  onClick={handleCopy}
                  title={copied ? 'Copied!' : 'Copy to clipboard'}
                >
                  <FontAwesomeIcon 
                    icon={copied ? faCheck : faCopy} 
                    className="results-copy-icon"
                  />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <textarea
                className="results-textarea"
                value={timestamps_string}
                readOnly
                onClick={(e) => e.target.select()}
              />
            </div>
          )}
        </div>
      ) : (
        <p className="results-empty">No timestamps generated yet.</p>
      )}
    </div>
  );
}

export default Results;

