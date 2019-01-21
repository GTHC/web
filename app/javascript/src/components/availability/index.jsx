import React, { Component } from 'react';

// calendar components
import Calendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

// components
import CustomEvent from './CustomEvent';

const localizer = Calendar.momentLocalizer(moment);

const DragDropCal = withDragAndDrop(Calendar);

class Availability extends Component {

  constructor(props) {
    super(props);
    this.state = {
      availabilities: props.availabilities,
    };
  }

  moveEvent = ({ event, start, end, droppedOnAllDaySlot }) => {
    if (droppedOnAllDaySlot || event.allDay) {
      return;
    }

    const { availabilities } = this.state;

    const idx = availabilities.indexOf(event);

    const updatedEvent = { ...event, start, end };

    const nextEvents = [...availabilities];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      availabilities: nextEvents,
    });
  };

  handleSelectDrag = ({ event, start, end }) => {
    const { availabilities } = this.state;
    const newAvailability = { start, end, title: 'test' };
    const newAvailabilities = [...availabilities, newAvailability];
    this.setState({
      availabilities: newAvailabilities,
    });
  };

  render() {
    const { availabilities } = this.state;
    const events = availabilities.map(avail => ({
      ...avail,
      title: avail.somewhat ? 'Somewhat' : 'Available',
      start: new Date(avail.start),
      end: new Date(avail.end),
    }));

    const components = {
      event: CustomEvent,
    };

    return (
      <DragDropCal
        resizeable
        // components={components}
        onEventDrop={this.moveEvent}
        onEventResize={this.moveEvent}
        step={30}
        timeslots={4}
        selectable
        popup
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="day"
        events={events}
        // onSelectEvent={this.onSelectEvent}
        onSelectSlot={this.handleSelectDrag}
        // eventPropGetter={}
        style={{ height: '80vh' }}
      />
    );
  }

}

export default Availability;
