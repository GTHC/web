import React, { Component } from 'react';
import { Form, Message, Loader, Dimmer } from 'semantic-ui-react';

export default class UserPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      name: props.user.data.name,
      phone: props.user.data.phone,
      enable_shift_notifications: props.user.data.enable_shift_notifications,
      enable_announcement_notifications: props.user.data.enable_announcement_notifications,
      savePressed: false,
      loading: props.user.isLoading,
    };
  }

  onInputChange = (e, { id, value }) => {
    this.setState({
      savePressed: false,
      [id]: value,
    },
      () => { this.validInput(); });
  };

  validInput = () => {
    const { name, phone, enable_shift_notifications } = this.state;
    if (name.trim() == '' || phone.trim() == '') {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  };

  onSave = () => {
    const { user, updateUser } = this.props;
    const { name, phone, enable_shift_notifications } = this.state;
    const data = {
      name,
      phone,
      enable_shift_notifications,
    };
    updateUser(user.data.id, data);
    this.setState({ savePressed: true });
  };

  render () {
    const { disabled, name, phone, enable_shift_notifications, loading, savePressed } = this.state;
    const { error } = this.props.user;

    return (
      <div>
        <Form className='attached fluid segment'>
          <Form.Input
            fluid
            type="text"
            id="name"
            error={disabled}
            label="Name"
            placeholder="Name"
            value={name}
            onChange={this.onInputChange}
          />
          <Form.Input
            fluid
            type="text"
            id="phone"
            error={disabled}
            label="Phone Number"
            placeholder="Phone"
            value={phone}
            onChange={this.onInputChange}
          />
          <Form.Checkbox
              toggle
              label="Enable Shift Notifications"
              defaultChecked={enable_shift_notifications}
              onChange={this.onInputChange}
          />
          <Form.Button disabled={disabled} onClick={this.onSave}>Save</Form.Button>
      </Form>
      { loading && savePressed &&
        <Dimmer active>
          <Loader>Updating</Loader>
        </Dimmer>
      }
      {
        !loading && savePressed && !error &&
        <Message
          positive
          attached
          icon="check"
          header="Updated Successfully!"
          content="User information has been updated."
        />
      }
      {
        !loading && savePressed && error &&
        <Message
          negative
          attached
          icon="x"
          header="Error"
          content="User information has not been updated."
        />
      }
      {
        disabled &&
        <Message
          warning
          attached
          icon="exclamation triangle"
          header="Warning!"
          content="Please fill in all details."
        />
      }
      </div>
    );
  }
}
