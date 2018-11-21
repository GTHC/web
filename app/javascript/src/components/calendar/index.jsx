import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";

const localizer = Calendar.momentLocalizer(moment);

class BigCal extends Component {
  render() {
    const { team_shifts } = this.props.shifts;
    const events = team_shifts.map((shift) => ({
      ...shift,
      start: new Date(shift.start),
      end: new Date(shift.end),
    }));

    return (
      <div>
        <Calendar
          step={15}
          timeslots={8}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="day"
          events={events}
          style={{ height: "80vh" }}
        />
      </div>
    );
  }
}

export default BigCal;
