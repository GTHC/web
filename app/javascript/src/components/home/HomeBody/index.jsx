import React, { Component } from 'react';
import { Container, Divider, Embed, Transition } from 'semantic-ui-react';

import DukeTwitterTimeline from './DukeTwitterTimeline';
import DukeVideo from './DukeVideo';
import KvilleWeather from './KvilleWeather'

export default class HomeBody extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

  render () {
    const { user } = this.props.userData;
    const { visible } = this.state;

    return (
      <div style={{ paddingBottom: '48px' }}>
        <Container>
          {/* <Container textAlign="center">
            <Transition visible={visible} duration={1000}>
              <h1>Welcome to your scheduler, { user.name }!</h1>
            </Transition>
          </Container> */}
          {/* <Divider /> */}
          <KvilleWeather />
          {/* <DukeVideo /> */}
          <DukeTwitterTimeline />
        </Container>
      </div>
    );
  }
}
