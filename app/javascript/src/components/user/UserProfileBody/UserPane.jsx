import React, { Component } from 'react';

import { Image, Label } from 'semantic-ui-react';
import * as defaultSrc from '../../../images/default_image.png';

export default class UserPane extends Component {
  render () {
    const { user } = this.props;
    const src = user.avatarURL || defaultSrc;
    return (
      <div>
        <Image
          rounded
          src={src}
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
        <br />
        <br />
        <strong>Phone: </strong>
        <Label>{ user.phone }</Label>
      </div>
    );
  }
}
