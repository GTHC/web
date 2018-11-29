import React, { Component } from 'react';

// semantic-ui
import { Form } from 'semantic-ui-react';

class UpdateShiftForm extends Component {

  onInputChange = (e, { value, id }) => {
    const { updateShiftData, shiftData } = this.props;
    updateShiftData({
      ...shiftData,
      [id]: value,
    });
  };

  handleUpdate = () => {
    const { close, shiftData, updateShift } = this.props;
    const data = {
      ...shiftData,
      start_time: shiftData.start,
      end_time: shiftData.end,
    };
    updateShift(shiftData.id, data);
    close();
  };

  render() {
    const { shiftData, team } = this.props;
    const { title, note, users } = shiftData;
    // defaultValue for Dropdown
    const user_ids = users.map(user => user.id);
    // options for Dropdown
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
        <Form.Input
          id="title"
          label="Title"
          placeholder="Enter a title here"
          value={title}
          onChange={this.onInputChange}
          // error={error}
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
          label="Users on Shift"
          options={userOptions}
          defaultValue={user_ids}
          onChange={this.onInputChange}
          // placeholder="(Default: You)"
        />
        <Form.Button
          onClick={this.handleUpdate}
        >
          Update
        </Form.Button>
      </Form>
    );
  }

}

export default UpdateShiftForm;
