import React, { Component } from 'react';
import { Radio, Button } from 'react-bootstrap';

class TrackForm extends Component {
  render() {
    const {
      password,
      generatePassword
    } = this.props;
    const {
      track,
      why,
      hash
    } = password;

    return (
      <div>
      <form>
        <label>What do you like best about this track?</label>
        <Radio checked={why === "vocals"} value="vocals" onChange={(e) => { this.props.setTrackWhy(e.target.value) }} >Vocals</Radio>
        <Radio checked={why === "instrumentals"} value="instrumentals" onChange={(e) => { this.props.setTrackWhy(e.target.value) }}>Instrumentals</Radio>
        <Radio checked={why === "dancing"} value="dancing" onChange={(e) => { this.props.setTrackWhy(e.target.value) }}>Dancing to it</Radio>
        <Button onClick={() => { generatePassword(track.id, why) }}>Cryptify</Button>
      </form>
      <p>Password: {hash}</p>
      <p>Strength: {track.popularity}</p>
      </div>
    );
  }
}

export default TrackForm;
