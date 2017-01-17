import React, { Component } from 'react';
import Sound from 'react-sound';

class Preview extends Component {
  render() {
    const {
      trackPlaying,
      setTrackPlaying
    } = this.props;

    if (!trackPlaying) return null;

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
