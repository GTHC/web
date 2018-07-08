import React, { Component } from 'react';

import { Container, Divider, Embed, Transition } from 'semantic-ui-react';

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
      <div onMouseOver={() => {
          this.setState({ visible: true })
        }}>
        <Container textAlign="center">
          <Transition visible={visible} duration={1000}>
            <h1>Welcome to your scheduler, { user.name }!</h1>
          </Transition>
          <Divider />
          <Embed source='youtube' id='LPFkFU8QMfI' icon='youtube'
            iframe= {{
              widht: '20px',
              height: '20px'
            }}
          />
        </Container>
      </div>
    );
  }
}
