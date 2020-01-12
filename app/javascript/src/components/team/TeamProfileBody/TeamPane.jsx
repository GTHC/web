import React, { Component } from 'react';

import { Image, Label } from 'semantic-ui-react';
import * as default_image from '../../../images/default_image.png';

// utils
import { defineTentColors } from './../../utils/tent'

export default class TeamPane extends Component {
  render () {
    const data = this.props.team.data;
    const { tentType, tentTypeColor } = defineTentColors(data.tent_type);
    return (
      <div>
        <br />
        <strong>Team Name: </strong>
        <Label>{ data.name }</Label>
        <br />
        <br />
        <strong>Tent Type: </strong>
        <Label color={tentTypeColor}>{ tentType }</Label>
        <br />
        <br />
        <strong>Passcode: </strong>
        <Label>{ data.passcode }</Label>
      </div>
    );
  }
}
