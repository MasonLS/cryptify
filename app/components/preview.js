import React, { Component } from 'react';

let Sound;

if (global.window) {
  Sound = require('react-sound');
}

class Preview extends Component {
  render() {
    const {
      trackPlaying,
      setTrackPlaying
    } = this.props;

    if (!trackPlaying || !global.window) return null;

    let playStatus = 'STOPPED';

    if (trackPlaying) {
      playStatus = 'PLAYING';
    }

    return (
      <Sound playStatus={playStatus} url={trackPlaying.preview_url} onFinishedPlaying={()=>{ setTrackPlaying(null) }} />
    );
  }
}

export default Preview;
