import React from 'react';
import { render } from 'react-dom';
import { Button, Container, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

const root = document.getElementById('root');

const App = () => (
  <Container>
    <Header as='h1'>Hello world!</Header>

    <Button
      content='Discover docs'
      href='http://react.semantic-ui.com'
      icon='github'
      labelPosition='left'
    />
  </Container>
)

document.addEventListener('DOMContentLoaded', () => {
  render(
    <div>
      <App/>
    </div>, root,
  );
});
