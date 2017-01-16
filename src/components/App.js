import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import TracksTableContainer from '../containers/tracks-table';
import SearchContainer from '../containers/search';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={6}>
          </Col>
          <Col sm={6}>
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
