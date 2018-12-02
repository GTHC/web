import React, { Component } from 'react';
import Availability from '../../availability/index';
import {Form, Button} from 'semantic-ui-react';


export default class Schedule extends Component {

  render () {
      const { user } = this.props
    return (
     <div>

      <React.Fragment>
        <Availability />
      </React.Fragment>

      <React.Fragment>

        <Button type='submit'>Save</Button>
      </React.Fragment>

     </div>
    );
  }
}
