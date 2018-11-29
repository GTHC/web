import React, { Component } from 'react';
import Calendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

// semantic-ui
import { Button, Modal } from 'semantic-ui-react';

// components
import ShiftViewModal from './ShiftViewModal';
import ShiftCreateModal from './ShiftCreateModal';
import ShiftUpdateModal from './ShiftUpdateModal';

const localizer = Calendar.momentLocalizer(moment);

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
    const data = {
      ...event,
      start_time: start,
      end_time: end,
    };
    this.props.updateShift(event.id, data);
  };

  moveEvent = ({ event, start, end }) => {
    const data = {
      ...event,
      start_time: start,
      end_time: end,
    };
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

  handleSelectDrag = ({ start, end }) => {
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

  render() {
    const {
      start, end,
      shiftData,
      openShiftCreate,
      openShiftView,
    } = this.state;
    const { team_shifts } = this.props.shifts;
    const events = team_shifts.map((shift) => ({
      ...shift,
      start: new Date(shift.start),
      end: new Date(shift.end),
    }));

    return (
      <div>
        <DragDropCal
          resizeable
          onEventDrop={this.moveEvent}
          onEventResize={this.resizeEvent}
          step={30}
          timeslots={4}
          selectable
          popup
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="day"
          events={events}
          onSelectEvent={this.onSelectEvent}
          onSelectSlot={this.handleSelectDrag}
          style={{ height: '80vh' }}
        />
        {/* Shift View Modal */}
        <Modal
          closeIcon
          open={openShiftView}
          onClose={() => this.onClose('view')}
        >
          <ShiftViewModal shiftData={shiftData}/>
          <Modal.Actions>
            <Button negative onClick={this.handleDelete}>Delete</Button>
            <ShiftUpdateModal
              {...this.props}
              shiftData={shiftData} updateShiftData={this.updateShiftData}
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
