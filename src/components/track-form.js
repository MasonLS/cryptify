import React, { Component } from 'react';
import { Radio, Button, FormGroup, ButtonGroup, Glyphicon } from 'react-bootstrap';
import SearchContainer from '../containers/search';

class TrackForm extends Component {
  render() {
    const {
      trackPlaying,
      password,
      generatePassword,
      togglePreview,
      setTrackWhy
    } = this.props;
    const {
      track,
      why
    } = password;

    return (
      <form onSubmit={(e) => { e.preventDefault() }}>
        <h4>What do you like best about this track?</h4>
        <FormGroup>
          <Radio inline checked={why === "vocals"} value="vocals" onChange={(e) => { setTrackWhy(e.target.value) }} >The vocals</Radio>
          <Radio inline checked={why === "instrumentals"} value="instrumentals" onChange={(e) => { setTrackWhy(e.target.value) }}>The instrumentals</Radio>
          <Radio inline checked={why === "dancing"} value="dancing" onChange={(e) => { setTrackWhy(e.target.value) }}>Dancing to it</Radio>
        </FormGroup>
        <FormGroup>
        <ButtonGroup>
          <Button onClick={() => { togglePreview(track.id, trackPlaying) }}><Glyphicon glyph={track.id === trackPlaying ? 'stop' : 'play'} />{' '}Preview</Button>
          <Button onClick={() => { generatePassword(track.id, why) }}><Glyphicon glyph="lock" />{' '}Cryptify</Button>
        </ButtonGroup>
        </FormGroup>
        <SearchContainer />
      </form>
    );
  }
}

export default TrackForm;
