import React, { Component } from 'react';

// calendar components
import Calendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

// components
import SelectAvailType from './SelectAvailType';

const localizer = Calendar.momentLocalizer(moment);

const DragDropCal = withDragAndDrop(Calendar);

class Availability extends Component {

  constructor(props) {
    super(props);
    this.state = {
      availData: {},
      open: false,
      somewhat: false,
    };
  }

  moveEvent = ({ event, start, end, droppedOnAllDaySlot }) => {
    if (droppedOnAllDaySlot || event.allDay || this.props.fixed) {
      return;
    }

    const { putAvail, dragDropUpdate } = this.props;
    const { availabilities } = this.state;

    const idx = availabilities.indexOf(event);

    const updatedEvent = { ...event, start, end };

    const nextEvents = [...availabilities];
    nextEvents.splice(idx, 1, updatedEvent);

    dragDropUpdate(nextEvents);

    putAvail(event.id, {
      ...event,
      start,
      end,
    });
  };

  handleSelectDrag = ({ event, start, end }) => {
    const { postAvail, fixed } = this.props;
    const { somewhat } = this.state;

    if (fixed) {
      return;
    }

    postAvail({
      start,
      end,
      somewhat,
    });
  };

  handleSomewhatChange = () => {
    this.setState({
      somewhat: !this.state.somewhat,
    });
  };

  onSelectEvent = event => {
    const { fixed } = this.props;
    if (fixed) {
      return;
    }

    this.setState({
      availData: event,
      open: true,
    });
  };

  eventPropGetter = ({ somewhat }) => ({
    style: {
      backgroundColor: somewhat ? '#CCCC00' : 'green',
    },
  });

  render() {
    const { availabilities, fixed } = this.props;
    const { somewhat } = this.state;
    const events = availabilities.map(avail => ({
      ...avail,
      title: avail.somewhat ? 'Somewhat Available' : 'Available',
      start: new Date(avail.start),
      end: new Date(avail.end),
    }));

    const components = {
      event: CustomEvent,
    };

    return (
      <div>
        {
          !fixed &&
          <SelectAvailType
            value={somewhat}
            handleChange={this.handleSomewhatChange}
          />
        }
        <DragDropCal
          resizeable
          popup
          selectable={!fixed}
          step={30}
          timeslots={4}
          defaultView="day"
          localizer={localizer}
          events={events}
          defaultDate={new Date()}
          onEventDrop={this.moveEvent}
          onEventResize={this.moveEvent}
          onSelectEvent={this.onSelectEvent}
          onSelectSlot={this.handleSelectDrag}
          eventPropGetter={this.eventPropGetter}
          style={{ height: '80vh' }}
        />
      </div>
    );
  }

}

export default Availability;
