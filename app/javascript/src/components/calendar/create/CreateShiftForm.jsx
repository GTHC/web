import React, { Component } from 'react';

import { Form, Divider } from 'semantic-ui-react';

class CreateShiftForm extends Component {

  onInputChange = (e, { value, id }) => {
    const { updateShiftData } = this.props;
    updateShiftData({
      [id]: value,
    });
  };

  render() {
    const { title, note, userIDs, team } = this.props;
    const usersData = team.data.users;
    const userOptions = usersData.map(user => ({
      key: user.id,
      value: user.id,
      text: user.name,

      // TODO: Add image src for user profile
      image: { avatar: true },
    }));
    return (
      <Form>
        <Divider />
        <Form.Input
          id="title"
          label="Title"
          placeholder="Enter a title here"
          value={title}
          onChange={this.onInputChange}
        />
        <Form.TextArea
          id="note"
          label="Description"
          placeholder="Shift Description"
          value={note}
          onChange={this.onInputChange}
        />
        <Form.Dropdown
          id="user_ids"
          fluid multiple search selection
          label="Add users to new Shift"
          placeholder="(Default: You)"
          options={userOptions}
          onChange={this.onInputChange}
        />
      </Form>
    );
  }

}

export default CreateShiftForm;
