import React, { Component } from 'react';

// semantic-ui
import { Button, Modal } from 'semantic-ui-react';

// components
import Availability from '../../../availability';

class AvailabilityButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      grid: grid,
    };
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    const { grid, open } = this.state;
    const { user } = this.props;
    return (
      <div>
        <Button icon="calendar" onClick={this.open}/>

        <Modal open={open} onClose={this.close}>
          <Modal.Header>{user.name}'s Availability</Modal.Header>
          <Modal.Content scrolling>
            <Availability />
          </Modal.Content>
        </Modal>
      </div>
    );
  }

}

export default AvailabilityButton;
