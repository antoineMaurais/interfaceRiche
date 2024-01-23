import React from 'react';
import { Player } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";

function lecteurVideo({ filmLink }) {
  return (
    <Player
      playsInline
      poster="/assets/poster.png"
      src={filmLink}
    />
  );
};

export default lecteurVideo;