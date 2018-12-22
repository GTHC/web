import React, { Component } from 'react';

import { Image, Label } from 'semantic-ui-react';
import * as default_image from '../../../images/default_image.png';

// utils
import { defineTentColors } from './../../utils/tent'

export default class UserPane extends Component {
  render () {
    const { team } = this.props;
    const { tentType, tentTypeColor } = defineTentColors(team.tent_type);

    return (
      <div>
        <Image
          src={default_image}
          label={{
            content: 'Team Picture',
            attached: 'bottom',
            size: 'small'
          }}
          size='small'
          floated='left'
          />
        <br />
        <strong>Team Name: </strong>
        <Label>{ team.name }</Label>
        <br />
        <br />
        <strong>Tent Type: </strong>
        <Label color={tentTypeColor}>{ tentType }</Label>
      </div>
    );
  }
}
