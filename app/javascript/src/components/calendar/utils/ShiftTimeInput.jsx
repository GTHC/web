import React, { Component } from 'react';

// components
import { Message } from 'semantic-ui-react';
import { TimeInput } from 'semantic-ui-calendar-react';

// util functions
import {
  genDateJustTime,
  timeIsLater,
  timeToDate,
} from './dateFormatting';

class ShiftTimeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: "",
      value: genDateJustTime(props.value),
    };
  }

  onInputChange = (e, { id, value }) => {
    const { type, updateShiftData, limit } = this.props;
    const originalDate = this.props.value;
    if (type == 'start') {
      if (timeIsLater(value, limit)) {
        // if it is a start component and the time is after the end time
        this.setState({
          error: true,
          errorMessage: `Make sure your start time is not after end time (${value} is after ${genDateJustTime(limit)}).`,
        })
      } else {
        // if it is a start component and the time is before the end time
        this.setState({
          [id]: value,
          error: false,
        });
        updateShiftData({
          start_time: timeToDate(value, originalDate),
        });
      }
    } else if (type == 'end') {
      if (timeIsLater(value, limit)) {
        // if it is a end component and the time is after the start time
        this.setState({
          [id]: value,
          error: false,
        });
        updateShiftData({
          end_time: timeToDate(value, originalDate),
        });
      } else {
        // if it is a end component and the time is before the start time
        this.setState({
          error: true,
          errorMessage: `Make sure your end time is not before start time (${value} is before ${genDateJustTime(limit)}).`,
        })
      }
    }
  };

  render() {
    const { error, errorMessage, value } = this.state;
    return (
      <div>
        <TimeInput
          id="value"
          timeFormat="ampm"
          value={value}
          onChange={this.onInputChange}
        />
        <Message
          warning
          hidden={!error}
          content={errorMessage}
        />
      </div>
    );
  }

}

export default ShiftTimeInput;
