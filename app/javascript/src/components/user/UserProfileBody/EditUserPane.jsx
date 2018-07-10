import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

export default class UserPane extends Component {
  render () {
    const { user } = this.props;

    return (
      <div>
        <Form>
        <Form.Field>
          <label>Name</label>
          <input placeholder={user.name} />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input placeholder={user.email} />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
      </div>
    );
  }
}
