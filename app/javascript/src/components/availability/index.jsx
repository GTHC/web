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
      somewhat: false,
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
    const { somewhat } = this.state;

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

  eventPropGetter = ({ somewhat }) => ({
    style: {
      backgroundColor: somewhat ? '#CCCC00' : 'green',
    },
  });

  render() {
    const { availabilities } = this.props;
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
        <SelectAvailType
          value={somewhat}
          handleChange={this.handleSomewhatChange}
        />
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
          eventPropGetter={this.eventPropGetter}
          style={{ height: '80vh' }}
        />
      </div>
    );
  }

}

export default Availability;
