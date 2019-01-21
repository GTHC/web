import React, { Component } from 'react';
import { Card, Button, Message } from 'semantic-ui-react';

import Availability from '../../availability/index';

class EditUserAvailability extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      user,
      putAvail, postAvail, deleteAvail, dragDropUpdate,
    } = this.props;
    return (
      <Availability
        availabilities={user.availabilities}
        putAvail={putAvail}
        postAvail={postAvail}
        deleteAvail={deleteAvail}
        dragDropUpdate={dragDropUpdate}
      />
    );
  }
}

export default EditUserAvailability;
