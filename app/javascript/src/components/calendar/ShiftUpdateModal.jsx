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

  updateClose = () => {
    this.props.closeShiftView();
    this.close();
  };

  render() {
    const { open } = this.state;
    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        closeIcon
        trigger={<Button positive>Update</Button>}
      >
        <Modal.Header>Update shift</Modal.Header>
        <Modal.Content>
          <UpdateShiftForm {...this.props} close={this.updateClose} />
        </Modal.Content>
      </Modal>
    );
  }

}

export default ShiftUpdateModal;
