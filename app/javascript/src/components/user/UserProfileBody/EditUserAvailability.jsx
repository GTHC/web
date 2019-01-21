import React, { Component } from 'react';
import { Card, Button, Message } from 'semantic-ui-react';

import Availability from '../../availability/index';

class EditUserAvailability extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { user, postAvail, deleteAvail } = this.props;
    return (
      <Availability
        availabilities={user.availabilities}
        postAvail={postAvail}
        deleteAvail={deleteAvail}
      />
    );
  }
}

export default EditUserAvailability;
