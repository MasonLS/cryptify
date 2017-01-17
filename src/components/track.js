import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import Sound from 'react-sound';

class Track extends Component {
  render() {
    const {
      track,
      trackPlaying,
      togglePreview,
      selectTrack,
      fetchArtistTopTracks
    } = this.props;
    const strength = determineStrength(track.popularity);
    const style = {
      strength: {
        color: determineColor(strength)
      },
      links: {
        color: 'black'
      }
    }

    let playStatus;

    if (track.id === trackPlaying) {
      playStatus = 'PLAYING';
    } else {
      playStatus = 'STOPPED';
    }

    return (
      <tr>
        <Sound playStatus={playStatus} url={track.preview_url} />
        <td><a style={style.links} href="#" onClick={(e) => { e.preventDefault(); togglePreview(track.id, trackPlaying) }}><Glyphicon glyph={track.id === trackPlaying ? 'stop' : 'play'} /></a></td>
        <td><a style={style.links} href="#" onClick={(e) => { e.preventDefault(); selectTrack(track) }}>{track.name}</a></td>
        <td><a style={style.links} href="#" onClick={(e) => { e.preventDefault(); fetchArtistTopTracks(track.artists[0].id) }} key={track.artists[0].id}>{track.artists[0].name}</a></td>
        <td>{track.album.name}</td>
        <td style={style.strength}>{Math.abs(100 - track.popularity)}</td>
      </tr>
    );
  }
}

export default Track;

function determineStrength(popularity) {
  if (popularity < 25) {
    return 'Strong';
  } else if (popularity >= 25 && popularity < 50) {
    return 'Not very strong';
  } else {
    return 'Weak';
  }
}

function determineColor(strength) {
  if (strength === 'Strong') {
    return 'green';
  } else if (strength === 'Not very strong') {
    return 'orange';
  } else {
    return 'red';
  }
}
