import React, { Component } from 'react';
import Availability from '../../availability/index';
import {Form, Button} from 'semantic-ui-react';


export default class Schedule extends Component {

  render () {
      const { user } = this.props
      /*
      const ButtonE = () => (
        <div>
          <Button primary>Save</Button>
        </div>
      )
*/
    return (
     <div>

      <React.Fragment>
        <Availability />
      </React.Fragment>

      <React.Fragment>
        <ButtonE />
        <Button type='submit'>Save2</Button>
      </React.Fragment>

     </div>
    );
  }
}
