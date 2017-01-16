import React, { Component } from 'react';
import { Radio } from 'react-bootstrap';

class TrackForm extends Component {
  render() {
    const { why } = this.props;
    return (
      // <form>
      //   <label>What do you like best about this track?</label>
      //   <Radio ref="vocals" onClick={() => { this.props.setTrackWhy('vocals') }}>Vocals</Radio>
      //   <Radio ref="instrumentals" onClick={() => { this.props.setTrackWhy('instrumentals') }}>Instrumentals</Radio>
      //   <Radio ref="dancing" onClick={() => { this.props.setTrackWhy('dancing') }}>Dancing to it</Radio>
      // </form>
      <form>
        <label>What do you like best about this track?</label>
        <Radio checked={why === "vocals"} value="vocals" onChange={(e) => { this.props.setTrackWhy(e.target.value) }} >Vocals</Radio>
        <Radio checked={why === "instrumentals"} value="instrumentals" onChange={(e) => { this.props.setTrackWhy(e.target.value) }}>Instrumentals</Radio>
        <Radio checked={why === "dancing"} value="dancing" onChange={(e) => { this.props.setTrackWhy(e.target.value) }}>Dancing to it</Radio>
      </form>
    );
  }
}

export default TrackForm;
