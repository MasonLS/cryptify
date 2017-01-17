import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

class Login extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={12}>
            <h1>
              Welcome to Cryptify!
            </h1>
            <h3>
              Please log in to your Spotify account to get started.
            </h3>
            <Button href="https://accounts.spotify.com/authorize?client_id=49859018c9a4462cbb4336259546f1e9&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Fcallback&response_type=code&scope=user-top-read%20user-read-private">Log in with Spotify</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Login;
