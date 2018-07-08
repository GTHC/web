import React from 'react';
import YouTube from 'react-youtube';

const DukeVideo = () => {
  const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

  return (
    <div style={{ display: 'inline', float: 'left' }}>
      <YouTube
        videoId="LPFkFU8QMfI"
        opts={opts}
      />
    </div>
  );
}

export default DukeVideo;
