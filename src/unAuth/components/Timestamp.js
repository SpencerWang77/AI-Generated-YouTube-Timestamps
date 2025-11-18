import React, { useMemo } from 'react';
import './Timestamp.css';

function Timestamp() {
  const timestamp = useMemo(() => new Date(), []);

  return (
    <div className="timestamp">
      <span>Snapshot generated:</span>
      <time dateTime={timestamp.toISOString()}>{timestamp.toLocaleString()}</time>
    </div>
  );
}

export default Timestamp;

