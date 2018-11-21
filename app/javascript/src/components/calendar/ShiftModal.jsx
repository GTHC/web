import React, { Component } from 'react';

// semantic-ui
import { Modal } from 'semantic-ui-react';

class ShiftModal extends Component {

  render() {
    const { shiftData } = this.props;
    return (
        <React.Fragment>
          <Modal.Header>
            {shiftData.title}
          </Modal.Header>
          <Modal.Content>
            <Modal.Description as="h3">
              {shiftData.start.toString()}
              <br />
              {shiftData.end.toString()}
            </Modal.Description>
            <Modal.Description>
              {shiftData.note}
            </Modal.Description>
          </Modal.Content>
        </React.Fragment>
    );
  }

}

export default ShiftModal;
