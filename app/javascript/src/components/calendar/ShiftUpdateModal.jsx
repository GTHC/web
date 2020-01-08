import React, { Component } from 'react';

// semantic-ui
import { Button, Form, Modal, Divider } from 'semantic-ui-react';

// components
import UpdateShiftForm from './update/UpdateShiftForm';
import ShiftTimeInput from './utils/ShiftTimeInput';

// util functions
import { genDateFormatWithoutTime } from './utils/dateFormatting';

class ShiftUpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      start_time: props.shiftData.start,
      end_time: props.shiftData.end,
    };
    this.close = this.close.bind(this);
  }

  updateShiftData = data => {
    this.setState(data);
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  updateClose = () => {
    this.props.closeShiftView();
    this.close();
  };

  render() {
    const { open, start_time, end_time } = this.state;
    const { start, end } = this.props.shiftData;
    return (
      <Modal
        closeOnDimmerClick={false}
        open={open}
        onOpen={this.open}
        onClose={this.close}
        closeIcon
        trigger={<Button positive>Update</Button>}
      >
        <Modal.Header>Update shift</Modal.Header>
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
          <UpdateShiftForm
            {...this.state}
            {...this.props}
            close={this.updateClose}
          />
        </Modal.Content>
      </Modal>
    );
  }

}

export default ShiftUpdateModal;
