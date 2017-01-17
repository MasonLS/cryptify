import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import TrackForm from './track-form';
import Sound from 'react-sound';

class TrackDetail extends Component {
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

    let playStatus;

    if (track.id === trackPlaying) {
      playStatus = 'PLAYING';
    } else {
      playStatus = 'STOPPED';
    }

    return (
      <Row>
        <Col sm={4}>
          <Image responsive src={track.album.images[1].url} />
        </Col>
        <Col sm={6}>
          <Row>
            <Col sm={12}>
              <Sound playStatus={playStatus} url={track.preview_url} onFinishedPlaying={()=>{ togglePreview('') }}/>
              <h4>Track: {track.name}</h4>
              <h4>Artist: {track.artists[0].name}</h4>
              <h4>Album: {track.album.name}</h4>
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
