import React, { Component } from 'react';

// semantic-ui
import { Button, Form, Modal } from 'semantic-ui-react';

// components
import UpdateShiftForm from './update/UpdateShiftForm';

class ShiftUpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.close = this.close.bind(this);
  }

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        closeIcon
        trigger={<Button>Update</Button>}
      >
        <Modal.Header>Update shift</Modal.Header>
        <Modal.Content>
          <UpdateShiftForm {...this.props} close={this.close} />
        </Modal.Content>
      </Modal>
    );
  }

}

export default ShiftUpdateModal;
