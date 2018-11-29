import React, { Component } from 'react';

// semantic-ui
import { Modal } from 'semantic-ui-react';

// utils
import genDateFormat from './utils/genDateFormat';

class ShiftViewModal extends Component {

  render() {
    const { shiftData } = this.props;
    console.log(shiftData);
    return (
        <React.Fragment>
          <Modal.Header>
            {shiftData.title}
          </Modal.Header>
          <Modal.Content>
            <Modal.Description as="h3">
              {genDateFormat(shiftData.start)}
              <br />
              {genDateFormat(shiftData.end)}
            </Modal.Description>
            <Modal.Description>
              {shiftData.note}
            </Modal.Description>
            <Modal.Description as="h4">
              Users:
            </Modal.Description>
            <Modal.Description>
              {shiftData.users.map(user => (
                <div key={user.name}>{user.name}</div>
              ))}
            </Modal.Description>
          </Modal.Content>
        </React.Fragment>
    );
  }

}

export default ShiftViewModal;
