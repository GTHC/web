import React, { Component } from 'react';

// calendar components
import Calendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

// components
import SelectAvailType from './SelectAvailType';
import ModalUpdate from './ModalUpdate';

// utils
import { generate } from 'randomstring';

const localizer = Calendar.momentLocalizer(moment);

const DragDropCal = withDragAndDrop(Calendar);

class Availability extends Component {

  constructor(props) {
    super(props);
    this.state = {
      availabilities: props.availabilities,
      availData: {},
      open: false,
      somewhat: false,
    };
  }

  moveEvent = ({ event, start, end, droppedOnAllDaySlot }) => {
    if (droppedOnAllDaySlot || event.allDay || this.props.fixed) {
      return;
    }

    const { availabilities, signup, putAvail, dragDropUpdate, updateAvailInfo } = this.props;

    if (signup) {
      const newAvails = availabilities.map(avail => (
        avail.tempID == event.tempID ? { ...event, start, end } : avail
      ));
      updateAvailInfo(newAvails);
    } else {
      const newAvails = availabilities.map(avail => (
        avail.id == event.id ? { ...event, start, end } : avail
      ));
      dragDropUpdate(newAvails);

      putAvail(event.id, {
        ...event,
        start,
        end,
      });
    }
  };

  handleSelectDrag = ({ start, end }) => {
    // check if all day
    // oneDay = hours*minutes*seconds*milliseconds
    const oneDay = 24 * 60 * 60 * 1000;
    const numOfDays = Math.abs((start.getTime() - end.getTime()) / (oneDay));

    // block all day creation
    if (start == end || numOfDays >= 1) {
      return;
    }

    const { availabilities, signup, fixed, updateAvailInfo, postAvail } = this.props;
    const { somewhat } = this.state;

    if (fixed) {
      return;
    }

    if (signup) {
      const newAvails = availabilities;
      newAvails.push({
        tempID: generate(5),
        start, end,
        somewhat,
      });
      updateAvailInfo(newAvails);
    } else {
      postAvail({
        start,
        end,
        somewhat,
      });
    }
  };

  handleSomewhatChange = () => {
    this.setState({
      somewhat: !this.state.somewhat,
    });
  };

  onSelectEvent = event => {
    const { fixed, signup } = this.props;
    if (fixed) {
      return;
    }

    if (signup) {
      const { availabilities, updateAvailInfo } = this.props;
      const newEvent = {
        ...event,
        somewhat: !event.somewhat,
      };
      const newAvails = availabilities.map(avail => (
        avail.tempID == event.tempID ? newEvent : avail
      ));
      updateAvailInfo(newAvails);
    } else {
      const { putAvail } = this.props;
      const newEvent = {
        ...event,
        somewhat: !event.somewhat,
      };
      putAvail(event.id, newEvent);
    }
  };

  onDoubleClickEvent = event => {
    this.setState({
      availData: event,
      open: true,
    });
  }

  eventPropGetter = ({ somewhat }) => ({
    style: {
      backgroundColor: somewhat ? '#CCCC00' : 'green',
    },
  });

  // Modal functions
  onOpen = () => this.setState({ open: true });
  onClose = () => this.setState({ open: false });

  render() {
    const {
      availabilities,
      fixed, signup,
      deleteAvail, putAvail,
    } = this.props;
    const { availData, open, somewhat } = this.state;

    // events for Calendar component
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
          <ModalUpdate
            open={open}
            event={availData}
            onOpen={this.onOpen}
            onClose={this.onClose}
            deleteAvail={deleteAvail}
            putAvail={putAvail}
          />
        }
        <DragDropCal
          resizeable
          popup
          selectable={!fixed}
          step={15}
          timeslots={8}
          defaultView="week"
          views={['week', 'day']}
          localizer={localizer}
          events={events}
          defaultDate={new Date()}
          onEventDrop={this.moveEvent}
          onEventResize={this.moveEvent}
          onSelectEvent={this.onSelectEvent}
          onDoubleClickEvent={this.onDoubleClickEvent}
          onSelectSlot={this.handleSelectDrag}
          eventPropGetter={this.eventPropGetter}
          style={{ height: '80vh' }}
        />

      </div>
    );
  }

}

export default Availability;
