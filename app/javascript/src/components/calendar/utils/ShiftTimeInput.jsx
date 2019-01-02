import React, { Component } from 'react';

// components
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
      value: genDateJustTime(props.value),
    };
  }

  onInputChange = (e, { id, value }) => {
    const { type, updateShiftData, limit } = this.props;
    const originalDate = this.props.value;
    if (type == 'start' && !timeIsLater(value, limit)) {
      this.setState({
        [id]: value,
      });
      updateShiftData({
        start_time: timeToDate(value, originalDate),
      });
    } else if (type == 'end' && timeIsLater(value, limit)) {
      this.setState({
        [id]: value,
      });
      updateShiftData({
        end_time: timeToDate(value, originalDate),
      });
    }
  };

  render() {
    const { value } = this.state;
    return (
      <TimeInput
        id="value"
        timeFormat="ampm"
        value={value}
        onChange={this.onInputChange}
      />
    );
  }

}

export default ShiftTimeInput;
