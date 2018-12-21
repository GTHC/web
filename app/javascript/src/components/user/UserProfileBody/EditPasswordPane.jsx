import React, { Component } from 'react';
import { Form, Input, Dimmer } from 'semantic-ui-react';

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
      active: true, // dimmer
      disabled: false, // disable for button
      loading: props.userState.isLoading,
      savePressed: false,
    };
  }

  onInputChange = (e, { id, value }) => {
    this.setState({
      savePressed: false,
      [id]: value,
    });
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

  renderNewPassword = () => (
    <Form>
      <Form.Input
        id="password"
        type="password"
        label="Password"
        placeholder="Password"
        value={this.state.password}
      />
      <Form.Input
        id="password_confirmation"
        type="password"
        label="Password Confirmation"
        placeholder="Password Confirmation"
        value={this.state.password_confirmation}
      />
      <Form.Button>Save</Form.Button>
    </Form>
  );

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
