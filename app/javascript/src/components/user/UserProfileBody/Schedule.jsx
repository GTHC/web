import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

import Availability from '../../availability/index';

class Schedule extends Component {

  render () {
    return (
      <div>
        <Availability />
        <Button>Save</Button>
      </div>
    );
  }
}

export default Schedule;
