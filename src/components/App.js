import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import TracksTableContainer from '../containers/tracks-table';
import SearchContainer from '../containers/search';
import TrackDetailContainer from '../containers/track-detail';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={12}>
            <TrackDetailContainer />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <SearchContainer />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <TracksTableContainer />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
