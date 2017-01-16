import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import TracksTableContainer from '../containers/tracks-table';
import SearchContainer from '../containers/search';
import TrackDetailContainer from '../containers/track-detail';
import PasswordModalContainer from '../containers/password-modal';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={10} mdOffset={1}>
            <TrackDetailContainer />
          </Col>
        </Row>
        <Row>
          <Col sm={10} mdOffset={1}>
            <TracksTableContainer />
          </Col>
        </Row>
        <PasswordModalContainer />
      </Grid>
    );
  }
}

export default App;
