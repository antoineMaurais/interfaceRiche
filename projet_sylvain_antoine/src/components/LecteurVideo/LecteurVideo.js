import React, { useRef, useEffect } from 'react';
import { Player } from 'video-react';
import '../../../node_modules/video-react/dist/video-react.css';

function LecteurVideo({ filmLink, initialTime }) {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current && initialTime !== null && initialTime !== undefined) {
      playerRef.current.seek(initialTime);
    }
  }, [initialTime]);

  return (
    <Player ref={playerRef} playsInline src={filmLink} />
  );
}

export default LecteurVideo;
