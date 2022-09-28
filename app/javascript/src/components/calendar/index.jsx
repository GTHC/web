import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

// semantic-ui
import { Button, Modal, Icon } from 'semantic-ui-react';

// components
import ShiftViewModal from './ShiftViewModal';
import ShiftCreateModal from './ShiftCreateModal';
import ShiftUpdateModal from './ShiftUpdateModal';

const localizer = momentLocalizer(moment);

const DragDropCal = withDragAndDrop(Calendar);

class BigCal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      openShiftView: false,
      openShiftCreate: false,
      shiftData: {},
      start: '',
      end: '',
    };
    this.onSelectEvent = this.onSelectEvent.bind(this);
    this.onClose = this.onClose.bind(this);
    this.updateShiftData = this.updateShiftData.bind(this);
  }

  onSelectEvent = shiftData => {
    this.setState({
      openShiftView: true,
      shiftData,
    });
  };

  resizeEvent = ({ event, start, end }) => {
    const shifts = this.props.shifts.team_shifts;
    const data = {
      ...event,
      start, end, // replaces old start and end elements for redux and frontend
      start_time: start, // API uses start_time & end_time
      end_time: end,
    };

    // updates shift data locally to remove lag and dependence of API
    this.props.dragDropUpdate(shifts, data);

    // updates on DB with API
    this.props.updateShift(event.id, data);
  };

  moveEvent = ({ event, start, end }) => {
    const shifts = this.props.shifts.team_shifts;
    const data = {
      ...event,
      start, end, // replaces old start and end elements for redux and frontend
      start_time: start, // API uses start_time & end_time
      end_time: end,
    };

    // updates shift data locally to remove lag and dependence of API
    this.props.dragDropUpdate(shifts, data);

    // updates on DB with API
    this.props.updateShift(event.id, data);
  };

  onClose = (type) => {
    switch (type) {
      case 'view': {
        this.setState({ openShiftView: false });
        return;
      }

      case 'create': {
        this.setState({ openShiftCreate: false });
        return;
      }
    }
  };

  handleSelectDrag = ({ start, end, slots }) => {
    // check if all day
    // oneDay = hours*minutes*seconds*milliseconds
    const oneDay = 24 * 60 * 60 * 1000;
    const numOfDays = Math.abs((start.getTime() - end.getTime()) / (oneDay));

    // block all day creation
    if (start == end || numOfDays >= 1) {
      return;
    }

    const { createShift } = this.props;
    this.setState({
      start, end,
      openShiftCreate: true,
    });
  };

  updateShiftData = shiftData => {
    this.setState({ shiftData });
  };

  handleDelete = () => {
    const { shiftData } = this.state;
    const { deleteShift } = this.props;
    deleteShift(shiftData.id);
    this.onClose('view');
  };

  /**
   * eventPropGetter - adds styles to each event component based
   * changes color of shift if user is assigned or not
   */
  eventPropGetter = ({ users }) => {
    const currentUser = this.props.user.data;
    let color = '#e0e1e2' // gray
    let textColor = 'black'
    if (users && users.some(e => e.id == currentUser.id)) {
      color = '#2185d0' // royal blue
      textColor = 'white'
    }
    return {
      style: {
        backgroundColor: color,
        color: textColor,
      }
    }
  }

  titleAccessor = (shift) => {
    const users = shift.users;
    const peopleNeeded = shift.peopleNeeded || 0;
    const peopleLeft = peopleNeeded - users.length;
    const names = users.map(e => e.name).sort()
    return (
      <div>
        {
          peopleLeft > 0 &&
          <div>
            <Icon color="red" name="warning" />
            This shift needs {peopleLeft} more {peopleLeft == 1 ? 'tenter' : 'tenters'}.
          </div>
        }
        { users.length > 0 &&
          <div>
            {
              users.length == 1 ?
              <Icon name="user" />
              :
              <Icon name="users" />
            }
            {names.join(", ")}
          </div>
        }
        <p>{shift.title}</p>
      </div>
    )
  }

  render() {
    const {
      start, end,
      shiftData,
      openShiftCreate,
      openShiftView,
    } = this.state;
    const { team, shifts } = this.props;
    const { team_shifts } = shifts;
    const events = team_shifts.map((shift) => ({
      ...shift,
      start: new Date(shift.start),
      end: new Date(shift.end),
    }));

    return (
      <div>
        <DragDropCal
          popup
          resizeable
          selectable
          showMultiDayTimes
          style={{ height: '80vh' }}
          onEventDrop={this.moveEvent}
          onEventResize={this.resizeEvent}
          step={30}
          timeslots={4}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="day"
          events={events}
          onSelectEvent={this.onSelectEvent}
          onSelectSlot={this.handleSelectDrag}
          eventPropGetter={this.eventPropGetter}
          titleAccessor={this.titleAccessor}
        />
        {/* Shift View Modal */}
        <Modal
          closeIcon
          open={openShiftView}
          onClose={() => this.onClose('view')}
        >
          <ShiftViewModal team={team} shiftData={shiftData}/>
          <Modal.Actions>
            <Button negative onClick={this.handleDelete}>Delete</Button>
            <ShiftUpdateModal
              {...this.props}
              shiftData={shiftData} updateShiftData={this.updateShiftData}
              closeShiftView={() => this.onClose('view')}
            />
          </Modal.Actions>
        </Modal>
        {/* Shift Create Modal */}
        <Modal
          closeIcon
          closeOnDimmerClick={false}
          open={openShiftCreate}
          onClose={() => this.onClose('create')}
        >
          <ShiftCreateModal start={start} end={end} {...this.props} onClose={this.onClose} />
        </Modal>
      </div>
    );
  }
}

export default BigCal;
