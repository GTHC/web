import React, { Component } from 'react';

// semantic ui components
import { Input, Button, Icon } from 'semantic-ui-react';

class LoginFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      error: false,
    };
  }

  onInputChange = (e, data) => {
    this.setState({ [data.id]: e.target.value },
      () => { this.validInput(); }
    );
  }

  validInput = () => {
    const { email, password, errorMessage } = this.state;
    if (email === '' || password === '') {
      this.setState({ error: true, errorMessage: 'Make sure both fields are non-empty.' });
      return false;
    } else {
      this.setState({ error: false, errorMessage: '' });
      return true;
    }
  }

  handleSignIn = () => {
    const { email, password } = this.state;

    if (this.validInput()) {
      this.props.loginUser({ email, password });
    }
  }

  render() {
    const { login, toggleLoginType, user } = this.props;
    return (
      <div>
        <Input
          onChange={this.onInputChange}
          id="email"
          placeholder="Username"
        />

        <br />
        <br />

        <Input
          onChange={this.onInputChange}
          id="password"
          placeholder="Password"
          type="password"
        />

        {/* {this.state.error ?
          <div>
            <br />
            <p style={{ color: 'red' }}>{this.state.errorMessage}</p>
          </div>
        : null}

        {user.error ?
          <div>
            <br />
            <p style={{ color: 'red' }}>{user.errorMessage}</p>
          </div>
        : null} */}

        <br />
        <br />

        <Button
          icon
          color="green"
          labelPosition="right"
          onClick={this.handleSignIn}
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
          onClick={() => {
            toggleLoginType(login.type);
          }}
        >
          <Icon name="signup" />
          Sign Up!
        </Button>
      </div>
    );
  }
}

export default LoginFields;
