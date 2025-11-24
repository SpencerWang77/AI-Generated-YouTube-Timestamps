// src/components/Timestamp.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../firebase';
import './Timestamp.css';

// Error boundary for Firebase functions
let functionsAvailable = true;
try {
  if (!functions) {
    functionsAvailable = false;
    console.warn('Firebase functions not available');
  }
} catch (error) {
  functionsAvailable = false;
  console.error('Error initializing Firebase functions:', error);
}

const YOUTUBE_URL_REGEX =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}([&?][^\s]*)?$/;

function Timestamp({ onTimestampsGenerated, onVideoIdChange, historyItemToLoad, onHistoryItemLoaded }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [loadingTimestamps, setLoadingTimestamps] = useState(false);
  const [videoTime, setVideoTime] = useState(0);

  // Handle loading history items
  useEffect(() => {
    if (historyItemToLoad) {
      setUrl(historyItemToLoad.url);
      setVideoData({
        videoId: historyItemToLoad.videoId,
        title: historyItemToLoad.title,
        thumbnail: historyItemToLoad.thumbnail
      });
      
      // Notify parent component
      if (onVideoIdChange) {
        onVideoIdChange(historyItemToLoad.videoId, (seconds) => {
          setVideoTime(seconds);
        }, historyItemToLoad.url);
      }
      
      if (onHistoryItemLoaded) {
        onHistoryItemLoaded();
      }
    }
  }, [historyItemToLoad, onVideoIdChange, onHistoryItemLoaded]);

  // Extract video ID from YouTube URL
  const extractVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?#]+)/);
    return match ? match[1] : null;
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
    setError('');
    setVideoData(null); // Clear previous video data when URL changes
    setVideoTime(0); // Reset video time
    // Clear timestamps when URL changes
    if (onTimestampsGenerated) {
      onTimestampsGenerated(null);
    }
    // Clear video ID
    if (onVideoIdChange) {
      onVideoIdChange(null, null);
    }
  };

  const handleGenerate = async () => {
    console.log('Generate button clicked, URL:', url);
    
    if (!url.trim()) {
      setError('Please enter a YouTube video URL.');
      return;
    }

    if (!YOUTUBE_URL_REGEX.test(url.trim())) {
      setError('Please enter a valid YouTube video URL.');
      console.log('URL validation failed:', url);
      return;
    }

    const videoId = extractVideoId(url.trim());
    console.log('Extracted video ID:', videoId);
    
    if (!videoId) {
      setError('Could not extract video ID from URL.');
      return;
    }

    setLoading(true);
    setError('');
    setVideoData(null);

    try {
      const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
      console.log('API Key exists:', !!apiKey);
      
      if (!apiKey) {
        throw new Error('YouTube API key is not configured. Please check your .env file and restart the dev server.');
      }

      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;
      console.log('Fetching from:', apiUrl.replace(apiKey, 'API_KEY_HIDDEN'));

      const response = await fetch(apiUrl);

      console.log('Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', errorData);
        throw new Error(`Failed to fetch video data: ${response.status} ${response.statusText}. ${errorData.error?.message || ''}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (data.items && data.items.length > 0) {
        const video = data.items[0];
        setVideoData({
          videoId: videoId,
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.maxres?.url || 
                     video.snippet.thumbnails.high?.url || 
                     video.snippet.thumbnails.medium?.url || 
                     video.snippet.thumbnails.default?.url,
        });
        
        // Notify parent component of video ID and provide jump function
        if (onVideoIdChange) {
          onVideoIdChange(videoId, (seconds) => {
            setVideoTime(seconds);
          }, url.trim());
        }
        
        console.log('Video data set successfully');
      } else {
        setError('Video not found. Please check the URL.');
      }
    } catch (err) {
      console.error('Error in handleGenerate:', err);
      setError(err.message || 'An error occurred while fetching video data.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  const handleGenerateTimestamps = async () => {
    console.log('Generate Timestamps button clicked');
    
    if (!url.trim()) {
      setError('Please enter a YouTube video URL first.');
      return;
    }

    if (!functionsAvailable || !functions) {
      setError('Firebase functions are not available. Please check your configuration.');
      return;
    }

    setLoadingTimestamps(true);
    setError('');

    try {
      const generateTimestamps = httpsCallable(functions, 'generate_timestamps');
      const payload = { url: url.trim() };
      console.log('Payload being sent:', payload);
      console.log('Calling generate_timestamps with URL:', url);
      
      const result = await generateTimestamps(payload);
      console.log('Timestamps data received:', result.data);
      
      // Pass timestamps data and video info to parent component
      if (onTimestampsGenerated && videoData) {
        onTimestampsGenerated(result.data, {
          videoId: videoData.videoId,
          title: videoData.title,
          thumbnail: videoData.thumbnail,
          url: url.trim()
        });
      }
      
    } catch (err) {
      console.error('Error generating timestamps:', err);
      setError(err.message || 'An error occurred while generating timestamps.');
    } finally {
      setLoadingTimestamps(false);
    }
  };

  return (
    <div className="timestamp-widget">
      <div className="timestamp-input-row">
        <FontAwesomeIcon icon={faYoutube} className="timestamp-input-icon" />

        <input
          type="text"
          value={url}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter YouTube video URL"
          className="timestamp-input"
        />

        <button
          type="button"
          className="timestamp-button"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading && (
            <FontAwesomeIcon 
              icon={faSpinner} 
              className="timestamp-button-spinner"
              spin
            />
          )}
          Generate
        </button>
      </div>

      {error && <p className="timestamp-error">{error}</p>}
      
      {loading && (
        <div className="timestamp-loading">
          <p>Loading video information...</p>
        </div>
      )}

      {videoData && (
        <div className="timestamp-video-info">
          <div className="timestamp-video-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${videoData.videoId}${videoTime > 0 ? `?start=${videoTime}&autoplay=1` : ''}`}
              title={videoData.title}
              className="timestamp-video-player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              key={videoTime}
            ></iframe>
          </div>
          <h3 className="timestamp-title">{videoData.title}</h3>
          
          <button
            type="button"
            className="timestamp-button"
            onClick={handleGenerateTimestamps}
            disabled={loadingTimestamps}
            style={{ marginTop: '1rem' }}
          >
            {loadingTimestamps && (
              <FontAwesomeIcon 
                icon={faSpinner} 
                className="timestamp-button-spinner"
                spin
              />
            )}
            Generate Timestamps
          </button>
          
          {loadingTimestamps && (
            <div className="timestamp-loading">
              <p>Generating timestamps...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Timestamp;

