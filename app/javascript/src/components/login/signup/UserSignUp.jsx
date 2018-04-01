import React, { Component } from 'react';

// semantic ui components
import { Button, Form, Step } from 'semantic-ui-react';

class UserSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidePasswords: true,
      email: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: '',
    };
  }

  onInputChange = (e, data) => {
    this.setState({ [data.id]: e.target.value },
      () => { this.validInput(); }
    );
  }

  validInput = () => {
    const { hidePasswords, email, password, passwordConfirmation } = this.state;
    if (password !== passwordConfirmation) {
      this.setState({ errorMessage: 'Make sure both passwords are the same.' });
      return;
    } else if (email === '' || password === '' || passwordConfirmation === '') {
      this.setState({ errorMessage: 'Make sure none of the fields are empty.' });
      return;
    }
    this.setState({ errorMessage: '' });
    this.props.toggleDisableNext(false);
  }

  render() {
    const { hidePasswords, email, password, passwordConfirmation, errorMessage } = this.state;
    return (
      <div>
        <Form.Input
          fluid
          value={email}
          id="email"
          label="Email"
          placeholder="Email"
          onChange={this.onInputChange}
        />
        <Form.Input
          fluid
          value={password}
          id="password"
          label="Password"
          placeholder="Password"
          onChange={this.onInputChange}
          type={hidePasswords ? "password" : ""}
          action={{
            icon: hidePasswords ? 'unhide' : 'hide',
            onClick: () => { this.setState({ hidePasswords: !hidePasswords }) }
          }}
        />
        <Form.Input
          fluid
          value={passwordConfirmation}
          id="passwordConfirmation"
          label="Password Confirmation"
          placeholder="Password Confirmation"
          onChange={this.onInputChange}
          type={hidePasswords ? "password" : ""}
          action={{
            icon: hidePasswords ? 'unhide' : 'hide',
            onClick: () => { this.setState({ hidePasswords: !hidePasswords }) }
          }}
        />
      <p style={{ color: 'red' }}>
        {errorMessage}
      </p>
      </div>
    );
  }
}

export default UserSignUp;
