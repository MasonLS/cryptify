import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

class Track extends Component {
  componentDidUpdate() {
      const audio = this.refs.preview;
      if (this.props.trackPlaying === this.props.track.id) {
        audio.load();
        audio.play();
      } else {
        audio.pause();
      }
  }

  render() {
    const {
      track,
      trackPlaying
    } = this.props;

    return (
      <tr>
        <audio ref="preview" src={track.preview_url} />
        <td><a href="#" onClick={(e) => { e.preventDefault(); this.props.togglePreview(track.id, this.props.trackPlaying) }}><Glyphicon glyph={track.id === trackPlaying ? 'stop' : 'play'} /></a></td>
        <td><a href="#" onClick={(e) => { e.preventDefault(); this.props.selectTrack(track) }}>{track.name}</a></td>
        <td>
          <a href="#" onClick={(e) => { e.preventDefault(); this.props.fetchArtistTopTracks(track.artists[0].id) }} key={track.artists[0].id}>{track.artists[0].name}</a>
        </td>
        <td>{track.album.name}</td>
        <td>{track.popularity}</td>
      </tr>
    );
  }
}

export default Track;
