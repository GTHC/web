import React, { Component } from 'react';

// semantic ui components
import { Button, Form, Step } from 'semantic-ui-react';

class UserSignUp extends Component {
  constructor(props) {
    super(props);
    const data = props.login.signUpData;
    this.state = {
      hidePasswords: true,
      email: data.email,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      errorMessage: '',
    };
    // this checks if the Next button for the user creds should be active or not (useful for situations where user comes from a future page)
    if (data.email && data.password && data.passwordConfirmation) {
      if (data.password === data.passwordConfirmation) {
        props.toggleDisableNext(false);
      } else {
        props.toggleDisableNext(true);
      }
    }
  }

  onInputChange = (e, data) => {
    this.setState({ [data.id]: e.target.value },
      () => { this.validInput(); }
    );
  }

  validInput = () => {
    const { hidePasswords, email, password, passwordConfirmation } = this.state;
    const { updateUserInfo, toggleDisableNext } = this.props;
    if (password !== passwordConfirmation) {
      this.setState({ errorMessage: 'Make sure both passwords are the same.' });
      toggleDisableNext(true);
      return;
    } else if (email === '' || password === '' || passwordConfirmation === '') {
      this.setState({ errorMessage: 'Make sure none of the fields are empty.' });
      toggleDisableNext(true);
      return;
    } else if ( !email.includes('@') ) {
      this.setState({ errorMessage: 'Make sure to use a valid email.' });
      toggleDisableNext(true);
      return;
    } else if ( password.length < 6 ) {
      this.setState({ errorMessage: 'Make sure passwords are at least 6 characters.' });
      toggleDisableNext(true);
      return;
    }
    this.setState({ errorMessage: '' });
    updateUserInfo(this.state);
    toggleDisableNext(false);
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
