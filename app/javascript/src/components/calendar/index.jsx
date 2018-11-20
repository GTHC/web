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
    return (
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="day"
          events={this.state.events}
          style={{ height: "50vh" }}
        />
      </div>
    );
  }
}

export default BigCal;
