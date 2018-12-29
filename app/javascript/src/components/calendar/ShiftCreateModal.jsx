import React, { Component } from 'react';

// semantic-ui
import { Modal, Form, Grid, Divider } from 'semantic-ui-react';

// components
import CreateShiftForm from './create/CreateShiftForm';

// utils
import { genDateFormat } from './utils/dateFormatting';

class ShiftCreateModal extends Component {

  constructor(props) {
    super(props);
    const startDate = props.start.toDateString();
    const startTime = props.start.toTimeString().substring(0, 5);
    this.state = {
      note: '',
      title: `Shift on ${startDate} at ${startTime}`,
      user_ids: [],
    };
    this.updateShiftData = this.updateShiftData.bind(this);
  }

  updateShiftData = data => {
    this.setState(data);
  };

  render() {
    const { start, end } = this.props;
    return (
      <React.Fragment>
        <Modal.Header>Create a new shift</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Modal.Description as="h5">Start</Modal.Description>
            {genDateFormat(start)}
          </Modal.Description>
          <br />
          <Modal.Description>
            <Modal.Description as="h5">End</Modal.Description>
            {genDateFormat(end)}
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
