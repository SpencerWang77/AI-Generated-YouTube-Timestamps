// src/components/Timestamp.js
import React, { useState } from 'react';
import './Timestamp.css';

const YOUTUBE_URL_REGEX =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}([&?][^\s]*)?$/;

function Timestamp() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUrl(e.target.value);
    setError('');
  };

  const handleGenerate = () => {
    if (!YOUTUBE_URL_REGEX.test(url.trim())) {
      setError('Please enter a valid YouTube video URL.');
      return;
    }

    // Call your API here later
    console.log('Generating timestamps for:', url);
  };

  return (
    <div className="timestamp-widget">
      <div className="timestamp-input-row">
        <span className="timestamp-input-icon">🔗</span>

        <input
          type="text"
          value={url}
          onChange={handleChange}
          placeholder="Enter YouTube video URL"
          className="timestamp-input"
        />

        <button
          type="button"
          className="timestamp-button"
          onClick={handleGenerate}
        >
          Generate
        </button>
      </div>

      {error && <p className="timestamp-error">{error}</p>}
    </div>
  );
}

export default Timestamp;