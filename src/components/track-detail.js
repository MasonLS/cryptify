import React, { Component } from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import TrackForm from './track-form';

class TrackDetail extends Component {
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
    const { track, why, trackPlaying, togglePreview, setTrackWhy } = this.props;
    if (!track) return null;
    return (
      <Row>
        <Col sm={6}>
          <Row>
            <Col sm={6}>
              <Image responsive src={track.album.images[1].url} />
            </Col>
            <Col sm={6}>
              <h3>Track: {track.name}</h3>
              <h4>Artist: {track.artists[0].name}</h4>
              <h4>Album: {track.album.name}</h4>
              <audio ref="preview" src={track.preview_url} />
              <Button onClick={() => { togglePreview(track.id, trackPlaying) }}>Play sample</Button>
            </Col>
          </Row>
        </Col>
        <Col sm={6}>
          <TrackForm why={why} setTrackWhy={setTrackWhy} />
        </Col>
      </Row>
    );
  }
}

export default TrackDetail;
