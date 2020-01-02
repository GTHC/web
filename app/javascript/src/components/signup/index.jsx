import React, { Component } from 'react';

// semantic-ui
import { Modal } from 'semantic-ui-react';

// components
import Fields from './Fields';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      name: props.userName,
      phone: '',
      teamData: {
        name: '',
        teamID: null,
        tentType: null,
        isCaptain: false,
        passcode: '',
      }
    }
  }

  componentDidMount() {
    this.props.getAllTeams();
  }

  updateData = newData => {
    this.setState({ ...newData })
  }

  signup = () => {
    const { signupUser, userID } = this.props;
    signupUser(userID, this.state)
  }

  render() {
    const { teams } = this.props;
    return (
      <Modal open size="fullscreen">
        <Modal.Header>
          Welcome to GTHC!
        </Modal.Header>

        <Modal.Content>
          <Fields
            // signup data
            data={this.state}
            updateData={this.updateData}
            // team info for signup dropdown
            teams={teams}
            // signup action
            signup={this.signup}
          />
        </Modal.Content>
      </Modal>
    );
  }

}

export default SignUp;
