import React, { Component } from 'react';

// semantic ui components
import { Input, Button, Icon, Message } from 'semantic-ui-react';

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
    this.props.clearError();
    this.setState({ [data.id]: e.target.value },
      () => { this.validInput(); }
    );
  }

  validInput = () => {
    const { email, password, errorMessage } = this.state;
    if (email === '' || password === '') {
      this.setState({ error: true, errorMessage: 'Make sure to fill in both fields.' });
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
    const { clearError, login, toggleLoginType, user } = this.props;
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
          onKeyPress={(e) => {
            if (e.key == 'Enter') {
              this.handleSignIn();
            }
          }}

        />

        {this.state.error ?
          <div>
            <br />
            <Message
              warning
              header='Friendly Reminder'
              content={this.state.errorMessage}
            />
          </div>
        : null}

        {user.error && user.errorMessage && !this.state.error ?
          <div>
            <br />
            <Message
              error
              header='Error'
              content={user.errorMessage}
            />
          </div>
        : null}

        <br />
        <br />

        <Button
          icon
          color="green"
          labelPosition="right"
          onClick={this.handleSignIn}
        >
          <Icon name="checkmark" />
          Sign In
        </Button>

        <br />
        <br />

        <Button
          icon
          color="blue"
          labelPosition="right"
          onClick={() => {
            // clear/removes user and login redux state error
            clearError();
            toggleLoginType(login.type);
          }}
        >
          <Icon name="signup" />
          Sign Up
        </Button>

        <br />
        <br />

        <Button
          basic
          onClick={() => {
            this.props.getResetPassword();
            this.props.push('/reset_password');
          }}
        >
        Forgot Password?
      </Button>
      </div>
    );
  }
}

export default LoginFields;
