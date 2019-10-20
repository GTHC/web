import React, { Component } from 'react';

import { Image, Label } from 'semantic-ui-react';
import * as defaultSrc from '../../../images/default_image.png';

export default class UserPane extends Component {
  render () {
    const data = this.props.user.data;
    const src = data.avatarURL || defaultSrc;
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
          size='medium'
          floated='left'
          />
        <br />
        <strong>Name: </strong>
        <Label>{ data.name }</Label>
        <br />
        <br />
        <strong>NetID: </strong>
        <Label>{ data.netid }</Label>
        <br />
        <br />
        <strong>Email: </strong>
        <Label>{ data.email }</Label>
        <br />
        <br />
        <strong>Phone: </strong>
        <Label>{ data.phone }</Label>
      </div>
    );
  }
}
