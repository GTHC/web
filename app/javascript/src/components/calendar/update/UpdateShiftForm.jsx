import React, { Component } from 'react';

// semantic-ui
import { Form } from 'semantic-ui-react';

// utils
import PopupInfo from './../utils/PopupInfo';
import getTeamAvailability from '../utils/getTeamAvailability';

// images
import * as defaultSrc from './../../../images/default_image.png';

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

  componentDidUpdate(prevProps) {
    // any changes made to ShiftTimeInput will update availabilities
    const props = this.props;
    if (prevProps.start_time !== props.start_time || prevProps.end_time !== props.end_time) {
      // TODO: Call API to get team availability
      this.getAvailabilities(props.start_time, props.end_time);
    }
  }

  componentDidMount() {
    // Before the form mounts, we get all of the users availabilities for the possible shift
    // TODO: Call API to get team availability
    const { start_time, end_time } = this.props;
    this.getAvailabilities(start_time, end_time);
  }

  getAvailabilities = (start, end) => {
    getTeamAvailability(start, end)
    .then(res => {
      const { data } = res.data;
      const userOptions = [];

      // sorting users by availability and then alphabetically
      data.sort((a, b) => {
        if (a.level == b.level) {
          if (a.name > b.name) { return 1; }
          if (a.name < b.name) { return -1; }
          return 0;
        } else {
          return b.level - a.level;
        }
      });

      data.forEach(user => {
        let src = defaultSrc;
        if (user.avatarURL) {
          src = user.avatarURL;
        }

        // adding dropdown item elements to userOptions
        userOptions.push({
          key: user.id,
          value: user.id,
          text: user.name,
          label: { color: user.color, circular: true, empty: true },
          image: { src: src, rounded: true },
        });
      });
      this.setState({ userOptions });
    });
  };


  onInputChange = (e, { value, id }) => {
    const { updateShiftData, shiftData } = this.props;
    this.setState({ errors: [] });
    updateShiftData({
      ...shiftData,
      [id]: value,
    });
  };

  handleUpdate = () => {
    const {
      close, shiftData, updateShift,
      start_time, end_time,
    } = this.props;
    if (this.checkErrors(shiftData)) return;

    const data = {
      ...shiftData,
      start_time,
      end_time,
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
