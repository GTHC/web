import React, { Component } from 'react';

import { Image, Label } from 'semantic-ui-react';
import * as default_image from '../../../images/default_image.png';

export default class UserPane extends Component {
  render () {
    const { team } = this.props;

    let tentType, tentTypeColor;
    switch (team.tent_type.toLowerCase()) {
      case 'black': {
        tentType = 'Black';
        tentTypeColor = 'black';
        break;
      }
      case 'blue': {
        tentType = 'Blue';
        tentTypeColor = 'blue';
        break;
      }
      case 'white': {
        tentType = 'White';
        tentTypeColor = 'white';
        break;
      }
      case 'dirty black': {
        tentType = 'Dirty Black';
        tentTypeColor = 'black';
        break;
      }
      case 'dirty blue': {
        tentType = 'Dirty Blue';
        tentTypeColor = 'blue';
        break;
      }
      default: {
        tentType = 'Unknown';
        tentTypeColor = 'grey';
        break;
      }
    }

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
