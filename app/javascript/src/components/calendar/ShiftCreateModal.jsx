import React, { Component } from 'react';

// semantic-ui
import { Modal } from 'semantic-ui-react';

class ShiftCreateModal extends Component {

  render() {
    const { start, end } = this.props;
    return (
      <React.Fragment>
        <Modal.Header>Create a new shift</Modal.Header>
        <Modal.Content>
          <Modal.Description as="h3">
            {start.toString()}
            <br />
            {end.toString()}
          </Modal.Description>
        </Modal.Content>
      </React.Fragment>
    );
  }

}

export default ShiftCreateModal;
