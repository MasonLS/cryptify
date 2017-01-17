import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader, Alert } from 'react-bootstrap';

class Login extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={8} smOffset={2}>
            <PageHeader>Welcome to Cryptify,{'  '}
            <small>the service that lets you use your favorite tracks as high-strength personal passwords.</small>
            {' '}
            <small>Simply select a track from Spotify's library, and Cryptify will produce a user-unique password based on its musical qualities.</small>
            {' '}
            <small>Don't worry about remembering it: Cryptify will always show you the same password for your chosen track.</small>
            {' '}
            <small>
            <a style={{ color: 'black', fontWeight: 'bold' }} href="https://accounts.spotify.com/authorize?client_id=49859018c9a4462cbb4336259546f1e9&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Fcallback&response_type=code&scope=user-top-read%20user-read-private">Log in with Spotify</a> to get started!
            </small>
            </PageHeader>
            <Alert bsStyle='danger'>
              <strong>Warning:{' '}</strong>
              In it's current state of development, it would be inadvisable to use or rely in any way on the strength of the passwords Cryptify produces.
              For detail on Cryptify's security issues, please visit <strong><a style={{ color: 'inherit' }} href='https://github.com/MasonLS/cryptify'>https://github.com/MasonLS/cryptify</a></strong> and read the README.
            </Alert>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Login;
