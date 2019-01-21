import React, { Component } from 'react';

// calendar components
import Calendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

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
    const { postAvail } = this.props;

    postAvail({
      start,
      end,
      somewhat: false,
    });
  };

  render() {
    const { availabilities } = this.props;
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
