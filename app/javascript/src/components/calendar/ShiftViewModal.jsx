import React, { Component } from 'react';

// semantic-ui
import { Modal, Label, Image } from 'semantic-ui-react';

// utils
import { genDatesFormat } from './utils/dateFormatting';

class ShiftViewModal extends Component {

  /**
   * getAvatarURL - get avatar url from user in team redux state by id
   * @param  {[number]} id [id of user]
   * @return {[string || null]}    [get url or null if undefined]
   */
  getAvatarURL = id => {
    const { team } = this.props;

    // get user from team redux state
    const filterRes = team.data.users.filter(u => u.id == id);
    if (filterRes[0]) {
      return filterRes[0].avatarURL;
    }

    return null;
  };

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
            {/* Repeated the && statement twice due to improved spacing */}
            {
              shiftData.note &&
              <Modal.Description as="h4">
                Note:
              </Modal.Description>
            }
            {
              shiftData.note &&
                <Modal.Description>
                  <p>{shiftData.note}</p>
                </Modal.Description>
            }
            <Modal.Description as="h4">
              Users:
            </Modal.Description>
            <Modal.Description>
              {/* TODO: Add Avatar Here */}
              {shiftData.users.map(user => {
                const avatarURL = this.getAvatarURL(user.id)
                return (
                  <Label key={user.id} image>
                    <Image src={avatarURL} rounded/>
                    {user.name}
                  </Label>
                )
              })}
            </Modal.Description>
          </Modal.Content>
        </React.Fragment>
    );
  }

}

export default ShiftViewModal;
