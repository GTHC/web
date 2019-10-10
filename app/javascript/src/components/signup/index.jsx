import React, { Component } from 'react';

// semantic-ui
import { Modal } from 'semantic-ui-react';

// components
import Fields from './Fields';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      team_id: null,
      availabilities: [],
    }
  }

  updateData = newData => {
    this.setState({ ...newData })
  }

  render() {
    return (
      <Modal open size="fullscreen">
        <Modal.Header>
          Welcome to GTHC!
        </Modal.Header>

        <Modal.Content>
          <Fields
            data={this.state}
            updateData={this.updateData}
          />
        </Modal.Content>
      </Modal>
    );
  }

}

export default SignUp;
