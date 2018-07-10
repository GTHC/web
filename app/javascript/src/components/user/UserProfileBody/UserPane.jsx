import React, { Component } from 'react';

import { Image, Label } from 'semantic-ui-react';
import * as default_image from '../../../images/default_image.png';

export default class UserPane extends Component {
  render () {
    const { user } = this.props;

    return (
      <div>
        <Image
          src={default_image}
          label={{
            content: 'You',
            attached: 'bottom',
            size: 'small'
          }}
          size='small'
          floated='left'
          />
        <br />
        <strong>Name: </strong>
        <Label>{ user.name }</Label>
        <br />
        <br />
        <strong>Email: </strong>
        <Label>{ user.email }</Label>
      </div>
    );
  }
}
