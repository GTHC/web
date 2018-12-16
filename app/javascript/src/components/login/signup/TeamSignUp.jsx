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
      teamType: '', // User is either creating or joining a team (used in validInput())
      team: data.team,
      teamID: data.teamID,
      tentType: data.tentType,
      tentNumber: data.tentNumber,
      isCaptain: false,
      errorMessage: '',
    };
    // checks if next button should be active or not (useful for situations where user comes from a future page)
    if (data.team && data.tentType && data.tentNumber) {
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
    const { stepType, team, tentType, tentNumber, teamType } = this.state;
    const { toggleDisableNext, updateTeamInfo, login } = this.props;
    const tentNumbers = login.teams.map(team => team.tent_number);
    if (stepType === 1 && (team === '' || tentType === '' || tentNumber === '')) {
      this.setState({ errorMessage: 'Make sure all fields are filled.' });
      toggleDisableNext(true);
    } else if (isNaN(tentNumber) && stepType === 1) {
      this.setState({ errorMessage: 'Tent Number must be a number.' });
      toggleDisableNext(true);
    } else if (teamType === 'create' && tentNumbers.includes(parseInt(tentNumber))) {
      this.setState({ errorMessage: 'Tent Number is already being used by another team.' });
      toggleDisableNext(true);
      return;
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

  teamDropDownChange = (e, data) => {
    const toTitleCase = (str) => {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
    const { teams } = this.props.login;
    const team = teams.find(team => team.id === data.value);
    const tentType = toTitleCase(team.tent_type);
    this.setState({
      team: team.name,
      teamID: team.id,
      tentNumber: team.tent_number,
      tentType: tentType,
      isCaptain: false,
    },
      () => {this.validInput()}
    );
  }

  render() {
    const { stepType, team, tentType, tentNumber, errorMessage } = this.state;
    const { toggleDisableNext, login } = this.props;
    return (
      <div>
        <div>
          <Button basic={stepType !== 1} content='Create A Team' color="blue" onClick={() => {
              this.setState({
                teamType: 'create',
                stepType: 1,
                isCaptain: true,
                team: '',
                tentType: '',
                tentNumber: '',
              });
              toggleDisableNext(true);
            }}
          />
          <Button basic={stepType !== 2} content='Join A Team' color="blue" onClick={() => {
              this.setState({ teamType: 'join', stepType: 2, isCaptain: false });
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
                  id="tentType"
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
          <Form.Dropdown
            fluid
            label="Team Name & Number"
            placeholder='Find your team'
            search
            selection
            options={login.teamDropDownOptions}
            onChange={this.teamDropDownChange}
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
