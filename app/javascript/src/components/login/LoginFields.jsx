import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from './../../actions/router';


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
            toggleLoginType(login.type);
          }}
        >
          <Icon name="signup" />
          Sign Up
        </Button>

        <br />
        <br />

        <div
          onClick={() => {
            this.props.push('/reset_password')
          }}
        >
        Forgot Password?
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      push: push,
    },
    dispatch);
};

export default connect(null, mapDispatchToProps)(LoginFields);

export {
  LoginFields
};
