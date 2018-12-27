import React, { Component } from 'react';
import { Form, Message, Loader, Dimmer } from 'semantic-ui-react';

export default class UserPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      name: props.user.name,
      savePressed: false,
      loading: props.userState.isLoading,
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
    const { name } = this.state;
    if (name.trim() == '') {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  };

  onSave = () => {
    const { user, updateUser } = this.props;
    const { name } = this.state;
    const data = {
      name,
    };
    updateUser(user.id, data);
    this.setState({ savePressed: true });
  };

  render () {
    const { disabled, name, loading, savePressed } = this.state;
    const { error } = this.props.userState;

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
          <Form.Button disabled={disabled} onClick={this.onSave}>Save</Form.Button>
      </Form>
      { loading &&
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
