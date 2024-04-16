import React, { useState } from 'react';
import TrackMatch from './TrackMatch';

function TrackSession() {
  const [trackType, setTrackType] = useState('');

  if (trackType === 'match') {
    return <TrackMatch />;
  }

  return (
    <div>
      <h2>What are you tracking today?</h2>
      <button onClick={() => setTrackType('match')}>Match</button>
      {/* Add practice option when ready */}
    </div>
  );
}

export default TrackSession;