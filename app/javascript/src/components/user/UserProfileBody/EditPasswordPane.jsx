import React, { Component } from 'react';
import { Form, Input, Dimmer } from 'semantic-ui-react';

export default class UserPane extends Component {

  renderNewPassword = () => (
    <Form>
      <Form.Input
        id="password"
        type="password"
        label="Password"
        placeholder="Password"
      />
      <Form.Input
        id="password_confirmation"
        type="password"
        label="Password Confirmation"
        placeholder="Password Confirmation"
      />
      <Form.Button>Save</Form.Button>
    </Form>
  );

  dimmerContent = () => (
    <Input
      id="current_password"
      type="password"
      label="Current Password"
      placeholder="Current Password"
    />
  );

  render () {
    const { user } = this.props;

    return (
      <div>
        { this.renderNewPassword()}
        <Dimmer active>
          {this.dimmerContent()}
        </Dimmer>
      </div>
    );
  }
}
