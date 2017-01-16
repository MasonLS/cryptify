import React, { Component } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';

class PasswordModal extends Component {
  render() {
    return (
      <Modal show={this.props.password.showModal}>
        <Button onClick={() => { this.props.toggleModal() }}>Close</Button>
      </Modal>
    );
  }
}

export default PasswordModal;
