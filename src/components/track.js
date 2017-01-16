import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

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
    const track = this.props.track;
    return (
      <tr>
        <audio ref="preview" src={track.preview_url} />
        <td><Button onClick={() => { this.props.togglePreview(track.id, this.props.trackPlaying) }}>Play sample</Button></td>
        <td><a href="#" onClick={() => { this.props.selectTrack(track) }}>{track.name}</a></td>
        <td>
          <a href="#" onClick={() => { this.props.fetchArtistTopTracks(track.artists[0].id) }} key={track.artists[0].id}>{track.artists[0].name}</a>
        </td>
        <td>{track.album.name}</td>
        <td>{track.popularity}</td>
      </tr>
    );
  }
}

export default Track;
