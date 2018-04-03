import React, { Component } from 'react';

// semantic ui components
import { Form, Button, Divider } from 'semantic-ui-react';

// utils
import dropdownOptions from './utils/dropdownOptions';

class TeamSignUp extends Component {
  constructor(props) {
    super(props);
    const data = props.login.signUpData;
    this.state = {
      /**
       * stepType: This will define what is displayed for this step.
       * 0: Create Team vs Join Team?
       * 1: Create Team
       * 2: Join Team
       * @type {Number}
       */
      stepType: 0,
      name: data.name,
      team: data.team,
      tentType: data.tentType,
      tentNumber: data.tentNumber,
      isCaptain: false,
      errorMessage: '',
    };
    // checks if next button should be active or not (useful for situations where user comes from a future page)
    if (data.name && data.team && data.tentType && data.tentNumber) {
      props.toggleDisableNext(false);
    }
  }

  onInputChange = (e, data) => {
    // check if tentNumber is actually a number
    this.setState({ [data.id]: e.target.value },
      () => {this.validInput()}
    );
  }

  validInput = () => {
    const { stepType, name, team, tentType, tentNumber } = this.state;
    const { toggleDisableNext, updateTeamInfo } = this.props;
    if (stepType === 1 && (name === '' || team === '' || tentType === '' || tentNumber === '')) {
      this.setState({ errorMessage: 'Make sure all fields are filled.' });
      toggleDisableNext(true);
    } else if (stepType === 2 && (name === '' )) {
      this.setState({ errorMessage: 'Make sure all fields are filled.' });
      toggleDisableNext(true);
    } else if (isNaN(tentNumber) && stepType === 1) {
      this.setState({ errorMessage: 'Tent Number must be a number.' });
      toggleDisableNext(true);
    } else if (stepType > 0) {
      this.setState({ errorMessage: '' });
      updateTeamInfo(this.state);
      toggleDisableNext(false);
    }
  }

  dropdownChange = (e, data) => {
    this.setState({ tentType: data.value },
      () => {this.validInput()}
    );
  }

  handleGetTeams = () => {
    const { getAllTeams, login } = this.props;
    getAllTeams();
  }

  render() {
    const { stepType, name, team, tentType, tentNumber, errorMessage } = this.state;
    const { toggleDisableNext, login } = this.props;
    return (
      <div>
          <Form.Input
            fluid
            value={name}
            id="name"
            label="Your Name"
            placeholder="Name"
            onChange={this.onInputChange}
          />
        <Divider horizontal>Team Info</Divider>
        <div>
          <Button basic={stepType !== 1} content='Create A Team' color="blue" onClick={() => {
              this.setState({ stepType: 1, isCaptain: true });
              toggleDisableNext(true);
            }}
          />
          <Button basic={stepType !== 2} content='Join A Team' color="blue" onClick={() => {
              this.handleGetTeams();
              this.setState({ stepType: 2, isCaptain: false });
              toggleDisableNext(true);
            }}
          />
        </div>
        <br />
        { stepType === 1 ?
              <div>
                <Form.Input
                  fluid
                  value={team}
                  id="team"
                  label="Team Name"
                  placeholder="Team Name"
                  onChange={this.onInputChange}
                />
                <Form.Input
                  fluid
                  value={tentNumber}
                  id="tentNumber"
                  label="Team Number"
                  placeholder="Team Number"
                  onChange={this.onInputChange}
                />
                <Form.Dropdown
                  fluid
                  label="Team Type"
                  placeholder='Team Type'
                  search
                  selection
                  options={dropdownOptions}
                  onChange={this.dropdownChange}
                  defaultValue={tentType}
                />
            </div> :
              null
        }
        {stepType === 2 ?
          // TODO: Add options from API
          <Form.Dropdown
            fluid
            label="Team Name & Number"
            placeholder='Find your team'
            search
            selection
            options={login.teamDropDownOptions}
            onChange={this.dropdownChange}
          /> :
          null
      }
        <br />
        <p style={{ color: 'red' }}>
          {errorMessage}
        </p>
      </div>
    );
  }
}

export default TeamSignUp;
