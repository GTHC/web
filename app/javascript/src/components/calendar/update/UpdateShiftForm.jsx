import React, { Component } from 'react';

// semantic-ui
import { Form } from 'semantic-ui-react';

class UpdateShiftForm extends Component {

  state = { error: false };

  onInputChange = (e, { value, id }) => {
    const { updateShiftData, shiftData } = this.props;
    this.setState({ errors: [] });
    updateShiftData({
      ...shiftData,
      [id]: value,
    });
  };

  handleUpdate = () => {
    const { close, shiftData, updateShift } = this.props;
    if (this.checkErrors(shiftData)) return;

    const data = {
      ...shiftData,
      start_time: shiftData.start,
      end_time: shiftData.end,
    };
    updateShift(shiftData.id, data);
    close();
  };

  checkErrors = data => {
    if (data.title.length == 0) {
      this.setState({ error: true });
      return true;
    } else {
      this.setState({ error: false });
      return false;
    }
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
          error={this.state.error}
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
          placeholder="(Default: You)"
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
