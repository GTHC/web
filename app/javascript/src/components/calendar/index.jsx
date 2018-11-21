import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";

// semantic-ui
import { Button, Modal } from 'semantic-ui-react';

// components
import ShiftModal from './ShiftModal';

const localizer = Calendar.momentLocalizer(moment);

class BigCal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      shiftData: {},
    };
    this.onSelectEvent = this.onSelectEvent.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onSelectEvent = shiftData => {
    this.setState({
      open: true,
      shiftData,
    });
  };

  onClose = () => this.setState({ open: false });

  render() {
    const { shiftData, open } = this.state;
    const { team_shifts } = this.props.shifts;
    const events = team_shifts.map((shift) => ({
      ...shift,
      start: new Date(shift.start),
      end: new Date(shift.end),
    }));

    return (
      <div>
        <Calendar
          popup
          step={15}
          timeslots={8}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="day"
          events={events}
          onSelectEvent={this.onSelectEvent}
          style={{ height: '80vh' }}
        />
        <Modal open={open} closeIcon onClose={this.onClose}>
          <ShiftModal shiftData={shiftData}/>
          <Modal.Actions>
            <Button onClick={this.onClose}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default BigCal;
