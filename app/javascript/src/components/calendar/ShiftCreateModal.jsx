import React, { Component } from 'react';

// semantic-ui
import { Modal, Divider } from 'semantic-ui-react';

// components
import CreateShiftForm from './create/CreateShiftForm';
import ShiftTimeInput from './utils/ShiftTimeInput';

// util functions
import { genDateFormatWithoutTime } from './utils/dateFormatting';

class ShiftCreateModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      note: '',
      title: `Shift on ${genDateFormatWithoutTime(props.start)}`,
      user_ids: [],
      start_time: props.start,
      end_time: props.end,
    };
    this.updateShiftData = this.updateShiftData.bind(this);
  }

  updateShiftData = data => {
    this.setState(data);
  };

  render() {
    const { start, end } = this.props;
    const { start_time, end_time } = this.state;
    return (
      <React.Fragment>
        <Modal.Header>Create a new shift</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Modal.Description as="h5">Start</Modal.Description>
            {genDateFormatWithoutTime(start)}
            <ShiftTimeInput
              type="start"
              value={start_time}
              limit={end_time}
              updateShiftData={this.updateShiftData}
            />
          </Modal.Description>
          <br />
          <Modal.Description>
            <Modal.Description as="h5">End</Modal.Description>
            {genDateFormatWithoutTime(end)}
            <ShiftTimeInput
              type="end"
              value={end_time}
              limit={start_time}
              updateShiftData={this.updateShiftData}
            />
          </Modal.Description>
        </Modal.Content>
        <Divider />
        <Modal.Content>
          <CreateShiftForm
            {...this.state}
            {...this.props}
            updateShiftData={this.updateShiftData}
          />
        </Modal.Content>
      </React.Fragment>
    );
  }

}

export default ShiftCreateModal;
