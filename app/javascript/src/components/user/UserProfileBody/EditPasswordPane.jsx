import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

export default class UserPane extends Component {
  render () {
    const { user } = this.props;

    return (
      <div>
        <Form>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Password' />
        </Form.Field>
        <Form.Field>
          <label>Password Confirmation</label>
          <input placeholder='Password Confirmation' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
      </div>
    );
  }
}
