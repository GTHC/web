import React, { Component } from 'react';

// semantic-ui
import { Modal, Label } from 'semantic-ui-react';

// utils
import { genDatesFormat } from './utils/dateFormatting';

class ShiftViewModal extends Component {

  render() {
    const { shiftData } = this.props;
    return (
        <React.Fragment>
          <Modal.Header>
            {shiftData.title}
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>{genDatesFormat(shiftData.start, shiftData.end)}</p>
            </Modal.Description>
            {
              shiftData.note &&
              <div>
                <br />
                <br />
                <Modal.Description as="h4">
                  Note:
                </Modal.Description>
                <Modal.Description>
                  <p>{shiftData.note}</p>
                </Modal.Description>
              </div>
            }
            <Modal.Description as="h4">
              Users:
            </Modal.Description>
            <Modal.Description>
              {shiftData.users.map(user => (
                <Label key={user.id}>{user.name}</Label>
              ))}
            </Modal.Description>
          </Modal.Content>
        </React.Fragment>
    );
  }

}

export default ShiftViewModal;
