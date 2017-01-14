import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedTrack: null,
      selectedArtist: null
    }
  }

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
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
