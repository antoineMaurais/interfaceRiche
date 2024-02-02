import React, { useRef, useEffect, useState } from 'react';
import { Player } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";

function LecteurVideo({ filmLink, initialTime, onTimeUpdate }) {
  const playerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(true);

  const handleTimeUpdate = (state) => {
    if (isMounted) {
      onTimeUpdate(state.currentTime);
    }
  };

  useEffect(() => {
    setIsMounted(true);

    if (playerRef.current) {
      playerRef.current.subscribeToStateChange(handleTimeUpdate);
      if (initialTime !== undefined) {
        playerRef.current.seek(initialTime);
      }
    }

    return () => {
      setIsMounted(false);
    };
  }, [initialTime]);

  return (
    <Player
      ref={playerRef}
      playsInline
      src={filmLink}
      currentTime={initialTime}
    />
  );
}

export default LecteurVideo;
