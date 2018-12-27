import React, { Component } from 'react';

// semantic-ui
import { Form } from 'semantic-ui-react';

// utils
import getShiftAvailability from './../utils/getShiftAvailability';
import hourToAvailPosition from './../utils/hourToAvailPosition';
import PopupInfo from './../utils/PopupInfo';

class UpdateShiftForm extends Component {

  constructor(props) {
    super(props);
    const usersData = props.team.data.users;
    const userOptions = usersData.map(user => ({
      key: user.id,
      value: user.id,
      text: user.name,
    }));
    this.state = {
      error: false,
      userOptions,
    };
  }

  componentDidMount() {
    const { start, end } = this.props.shiftData;
    const availStart = hourToAvailPosition(start);
    const availEnd = hourToAvailPosition(end);
    const availDay = start.getDay();
    getShiftAvailability(availDay, availStart, availEnd)
    .then(res => {
      const { data } = res.data;
      const userOptions = [];

      // sorting users by availability and then alphabetically
      data.sort((a, b) => {
        if (a.shift_availability == b.shift_availability) {
          if (a.name > b.name) { return 1; }
          if (a.name < b.name) { return -1; }
          return 0;
        } else {
          return b.shift_availability - a.shift_availability;
        }
      });

      data.forEach(user => {
        // choose color for availability
        const color = user.shift_availability == 2 ? 'green' :
        (user.shift_availability == 1 ? 'yellow' : 'red');

        // adding dropdown item elements to userOptions
        userOptions.push({
          key: user.id,
          value: user.id,
          text: user.name,
          label: { color: color, circular: true, empty: true },
          // TODO: Add image src for user profile
          // image: { avatar: true, src: 'https://react.semantic-ui.com/images/wireframe/image.png' },
        });
      });
      this.setState({ userOptions });
    });
  }

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
    const { userOptions } = this.state;
    // defaultValue for Dropdown
    const user_ids = users.map(user => user.id);
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
          scrolling upward
          label={<div>Users on Shift <PopupInfo /></div>}
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
