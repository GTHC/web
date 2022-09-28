import React, { Component } from 'react';

// calendar components
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

// components
import ModalUpdate from './ModalUpdate';

const localizer = momentLocalizer(moment);

const DragDropCal = withDragAndDrop(Calendar);

class AvailCal extends Component {

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

    const { availabilities, putAvail, dragDropUpdate } = this.props;

    const newAvails = availabilities.map(avail => (
      avail.id == event.id ? { ...event, start, end } : avail
    ));
    dragDropUpdate(newAvails);

    putAvail(event.id, {
      ...event,
      start,
      end,
    });
  };

  handleSelectDrag = ({ start, end }) => {
    const { fixed, postAvail } = this.props;
    const { somewhat } = this.state;

    if (fixed) {
      return;
    }
    // check if all day
    // oneDay = hours*minutes*seconds*milliseconds
    const oneDay = 24 * 60 * 60 * 1000;
    const numOfDays = Math.abs((start.getTime() - end.getTime()) / (oneDay));

    // block all day creation
    if (start == end || numOfDays >= 1) {
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
    if (this.props.fixed) {
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

  // Modal functions
  onOpen = () => this.setState({ open: true });
  onClose = () => this.setState({ open: false });

  render() {
    const {
      availabilities,
      fixed,
      deleteAvail, putAvail,
    } = this.props;
    const { availData, open } = this.state;

    // events for Calendar component
    const events = availabilities.map(avail => ({
      ...avail,
      title: avail.somewhat ? 'Somewhat Available' : 'Available',
      start: new Date(avail.start),
      end: new Date(avail.end),
    }));

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
          onSelectSlot={this.handleSelectDrag}
          eventPropGetter={this.eventPropGetter}
          style={{ height: '80vh' }}
        />

      </div>
    );
  }

}

export default AvailCal;
