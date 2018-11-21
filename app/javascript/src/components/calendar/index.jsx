import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";

const localizer = Calendar.momentLocalizer(moment);

class BigCal extends Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Some title"
      },
      {
        start: new Date(),
        end: new Date(moment().add(1, "hour")),
        title: "Some title"
      },
    ]
  };

  render() {
    const { team_shifts, user_shifts } = this.props.shifts;
    const events = team_shifts.map((shift) => ({
      ...shift,
      start: new Date(shift.start),
      end: new Date(shift.end),
    }));
    return (
      <div className="App">
        <Calendar
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
