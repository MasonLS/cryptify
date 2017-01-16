import React, { Component } from 'react';
import { Row, Col, Image, Glyphicon, Button, ButtonGroup, FormGroup } from 'react-bootstrap';
import TrackForm from './track-form';
import SearchContainer from '../containers/search';

class TrackDetail extends Component {
  componentDidUpdate() {
      const audio = this.refs.preview;
      if (this.props.trackPlaying === this.props.password.track.id) {
        audio.load();
        audio.play();
      } else {
        audio.pause();
      }
  }

  render() {
    const {
      password,
      trackPlaying,
      togglePreview,
      setTrackWhy,
      generatePassword,
    } = this.props;
    const track = password.track;

    if (!track) return null;

    return (
      <Row>
        <Col sm={4}>
          <Image responsive src={track.album.images[1].url} />
        </Col>
        <Col sm={6}>
          <Row>
            <Col sm={12}>
              <audio ref="preview" src={track.preview_url} />
              <p>
                <h4>Track: {track.name}</h4>
                <h4>Artist: {track.artists[0].name}</h4>
                <h4>Album: {track.album.name}</h4>
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <TrackForm trackPlaying={trackPlaying} password={password} generatePassword={generatePassword} togglePreview={togglePreview} setTrackWhy={setTrackWhy} />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default TrackDetail;
