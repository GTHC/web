import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

export default class UserPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      name: props.user.name,
    };
  }

  onInputChange = (e, { id, value }) => {
    this.setState({ [id]: value },
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

  render () {
    const { disabled, name } = this.state;

    return (
      <div>
        <Form>
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
          <Form.Button disabled={disabled}>Save</Form.Button>
      </Form>
      </div>
    );
  }
}
