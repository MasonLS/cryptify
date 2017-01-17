import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class PasswordModal extends Component {

  render() {
    if (!this.props.password.showModal) {
      return null;
    }

    const passwordStrength = determineStrength(this.props.password.track.popularity);

    const style = {
      password: {
        color: determineColor(passwordStrength)
      }
    }

    let body;

    if (this.props.password.isFetching) {
      body = (
          <h4>Retrieving password for track...</h4>
      );
    } else if (this.props.password.errorFetching) {
      body= (
        <h4>Encountered an error retrieving password</h4>
      );
    } else {
      body= (
        <div>
          <h4>Password:</h4>
          <h4 style={style.password}>{this.props.password.hash}</h4>
          <h4>Strength:</h4>
          <h4 style={style.password}>{passwordStrength}</h4>
        </div>
      );
    }

    return (
      <Modal show={this.props.password.showModal}>
        <Modal.Body>
          {body}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { this.props.toggleModal() }}>{ this.props.password.isFetching ? 'Cancel' : 'Close'}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PasswordModal;

function determineStrength(popularity) {
  if (popularity < 25) {
    return 'Strong';
  } else if (popularity >= 25 && popularity < 50) {
    return 'Not very strong';
  } else {
    return 'Weak';
  }
}

function determineColor(strength) {
  if (strength === 'Strong') {
    return 'green';
  } else if (strength === 'Not very strong') {
    return 'orange';
  } else {
    return 'red';
  }
}
