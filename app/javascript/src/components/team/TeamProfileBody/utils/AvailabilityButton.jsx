import React, { Component } from 'react';

// semantic-ui
import { Button, Modal } from 'semantic-ui-react';

// components
import Availability from '../../../availability';

class AvailabilityButton extends Component {
  constructor(props) {
    super(props);
    const grid = this.translateToAvailabilityGrid(props.user.availability);
    this.state = {
      open: false,
      grid: grid,
    };
  };

  /**
   * translateToAvailabilityGrid - the GET team request returns availability as a 2d array of strings rather than integers, so, this functions changes it to its appropraite data type
   */
  translateToAvailabilityGrid = availability => {
    const output = [];
    for (let i = 0; i < availability.length; i++) {
      const row = [];
      for (let j = 0; j < availability[i].length; j++) {
        row.push(parseInt(availability[i][j]));
      }

      output.push(row);
    }

    return output;
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
            <Availability
              fixed
              grid={grid}
            />
          </Modal.Content>
        </Modal>
      </div>
    );
  }

}

export default AvailabilityButton;
