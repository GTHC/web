import React, { Component } from 'react';
import { Form, Input, Message, Dimmer, Loader } from 'semantic-ui-react';

// utils
import checkPassword from './utils/checkPassword';

export default class UserPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_password: '',
      isIncPassword: false, // guess wrong current_password
      password: '',
      password_confirmation: '',
      hidePasswords: true,
      active: true, // dimmer
      disabled: false, // disable for button
      loading: props.userState.isLoading,
      savePressed: false,
      error: false,
    };
  }

  onInputChange = (e, { id, value }) => {
    this.setState({
      savePressed: false,
      [id]: value,
    }, () => { this.validInput(); });
  };

  validInput = () => {
    const { active, password, password_confirmation} = this.state;
    if (!active) {
      if (password.trim() == '' || password_confirmation.trim() == '') {
        this.setState({ disabled: true });
        return false;
      } else if (password !== password_confirmation || password.length < 6 || password_confirmation.length < 6) {
        this.setState({ error: true });
        return false;
      } else {
        this.setState({ error: false, disabled: false });
      }
    }

    return true;
  };

  onEnterPress = () => {
    const { current_password } = this.state;
    checkPassword(current_password)
    .then(res => {
      const { check } = res.data;
      this.setState({
        isIncPassword: !check,
        active: !check,
      });
    });
  };

  onSave = () => {
    const { user, updateUser } = this.props;
    const { password, password_confirmation } = this.state;
    if (this.validInput()) {
      updateUser(user.id, {
        password, password_confirmation,
      });
    }
    this.setState({ savePressed: true });
  };

  renderNewPassword = () => {
    const {
      hidePasswords,
      password, password_confirmation,
      error, disabled, loading, savePressed,
    } = this.state;
    return (
      <div>
        <Form className='attached fluid segment'>
          <Form.Input
            id="password"
            error={error}
            type="password"
            label="Password"
            placeholder="Password"
            value={password}
            onChange={this.onInputChange}
            type={hidePasswords ? "password" : "text"}
            action={{
              icon: hidePasswords ? 'unhide' : 'hide',
              onClick: () => { this.setState({ hidePasswords: !hidePasswords }) }
            }}
          />
          <Form.Input
            id="password_confirmation"
            error={error}
            type="password"
            label="Password Confirmation"
            placeholder="Password Confirmation"
            value={password_confirmation}
            onChange={this.onInputChange}
            type={hidePasswords ? "password" : "text"}
            action={{
              icon: hidePasswords ? 'unhide' : 'hide',
              onClick: () => { this.setState({ hidePasswords: !hidePasswords }) }
            }}
          />
          <Form.Button disabled={disabled} onClick={this.onSave}>Save</Form.Button>
        </Form>
        { loading &&
          <Dimmer active>
            <Loader>Updating</Loader>
          </Dimmer>
        }
        {
          !loading && savePressed && !error && !disabled &&
          <Message
            positive
            attached
            icon="check"
            header="Updated Successfully!"
            content="Password has been changed."
          />
        }
        {
          error &&
          <Message
            negative
            attached
            icon="x"
            header="Error"
            content="Make sure both passwords are the same and longer than 6 characters."
          />
        }
        {
          disabled &&
          <Message
            warning
            attached
            icon="exclamation triangle"
            header="Warning!"
            content="Please fill in all inputs."
          />
        }
      </div>
    );
  };

  dimmerContent = () => {
    const { isIncPassword } = this.state;
    return (
      <Input
        id="current_password"
        type="password"
        label={{
          color: isIncPassword ? 'red' : null,
          icon: isIncPassword ? 'x' : null,
          content: 'Current Password',
        }}
        placeholder="Current Password"
        onChange={this.onInputChange}
        onKeyPress={(e) => {
          if (e.key == 'Enter') {
            this.onEnterPress();
          }
        }}
      />
    );
  };

  render () {
    const { user } = this.props;
    const { active } = this.state;

    return (
      <div>
        { this.renderNewPassword()}
        <Dimmer active={active}>
          {this.dimmerContent()}
        </Dimmer>
      </div>
    );
  }
}
