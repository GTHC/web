import React, { Component } from 'react';
import { Button, Container, Header } from 'semantic-ui-react';

import Availability from './../components/availability';

class Test extends Component {
  render() {
    return (
        <div>
          <Container>
            <Header as='h1'>Hello world!</Header>

            <Button
              content='Discover docs'
              href='http://react.semantic-ui.com'
              icon='github'
              labelPosition='left'
            />
            <Availability />
          </Container>
        </div>
    );
  }
}

export default Test;
