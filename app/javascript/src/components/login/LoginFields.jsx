import React, { Component } from 'react';

// semantic ui components
import { Input, Button, Icon } from 'semantic-ui-react';

class LoginFields extends Component {
  render() {
    return (
      <div>
        <Input placeholder="Username" />

        <br />
        <br />

        <Input placeholder="Password" type="password" />

        <br />
        <br />

        <Button
          icon
          color="green"
          labelPosition="right"
        >
          <Icon name="checkmark" />
          Sign In!
        </Button>

        <br />
        <br />

        <Button
          icon
          color="blue"
          labelPosition="right"
        >
          <Icon name="signup" />
          Sign Up!
        </Button>
      </div>
    );
  }
}

export default LoginFields;
