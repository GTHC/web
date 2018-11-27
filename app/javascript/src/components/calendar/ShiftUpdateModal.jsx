import React, { Component } from 'react';

// semantic-ui
import { Button, Form, Modal } from 'semantic-ui-react';

// components
import UpdateShiftForm from './update/UpdateShiftForm';

class ShiftUpdateModal extends Component {

  render() {
    return (
      <Modal
        closeIcon
        trigger={<Button>Update</Button>}
      >
        <Modal.Header>Update shift</Modal.Header>
        <Modal.Content>
          <UpdateShiftForm {...this.props} />
        </Modal.Content>
      </Modal>
    );
  }

}

export default ShiftUpdateModal;
