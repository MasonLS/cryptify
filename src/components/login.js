import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

class Login extends Component {
  handleLogin() {
    fetch('/auth/login');
  }

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
            <Button onClick={this.handleLogin.bind(this)}>Log in</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Login;
