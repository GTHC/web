import React, { Component } from 'react';

import { Form, Divider } from 'semantic-ui-react';

// utils
import getShiftAvailability from './../utils/getShiftAvailability';

class CreateShiftForm extends Component {

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
    const { start, end } = this.props;
    const availStart = this.hourToAvailPosition(start);
    const availEnd = this.hourToAvailPosition(end);
    const availDay = start.getDay();
    getShiftAvailability(availDay, availStart, availEnd)
    .then(res => {
      const { data } = res.data;
      console.log(data);
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

  /**
   * hourToAvailPosition - get aprox. position of date in Availability component
   *                       which runs from 7 AM - 2AM
   * @param  {[Date]} date [Date object of either the start or end time of a shift]
   * @param {[boolean]} isEnd [tells function if this is for a start or end]
   * @return {[number]}      [row number in Availability grid]
   */
  hourToAvailPosition = (date, isEnd=false) => {
    let output = date.getHours() - 7 + (Math.floor(date.getMinutes() / 60));
    if (output < 0 && output > -6) {
      output = 19;
    } else if (output < -5) {
      output = output + 24;
    }

    return output;
  };

  onInputChange = (e, { value, id }) => {
    const { updateShiftData } = this.props;
    updateShiftData({
      [id]: value,
    });
  };

  handleCreate = () => {
    const {
      onClose,
      createShift, getAllShifts,
      title, note, user_ids,
      start, end,
    } = this.props;
    if (title.trim() == '') {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      const shiftData = {
        title, note,
        start_time: start,
        end_time: end,
        user_ids: user_ids.length > 0 ? user_ids : undefined,
      };
      createShift(shiftData);
      onClose('create');
      getAllShifts();
    }
  };

  render() {
    const { title, note, team } = this.props;
    const { error, userOptions } = this.state;
    return (
      <Form>
        <Form.Input
          id="title"
          label="Title"
          placeholder="Enter a title here"
          value={title}
          onChange={this.onInputChange}
          error={error}
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
          label="Add users to new Shift"
          placeholder="(Default: You)"
          options={userOptions}
          onChange={this.onInputChange}
        />
        <Form.Button
          onClick={this.handleCreate}
        >
          Create
        </Form.Button>
      </Form>
    );
  }

}

export default CreateShiftForm;
