import React, { Component } from 'react';

// semantic ui components
import { Form, Button } from 'semantic-ui-react';

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
      teamType: data.teamType,
      teamNumber: data.teamNumber,
      errorMessage: '',
    };
    // checks if next button should be active or not (useful for situations where user comes from a future page)
    if (data.name && data.team && data.teamType && data.teamNumber) {
      props.toggleDisableNext(false);
    }
  }

  onInputChange = (e, data) => {
    this.setState({ [data.id]: e.target.value },
      () => {this.validInput()}
    );
  }

  validInput = () => {
    const { stepType, name, team, teamType, teamNumber } = this.state;
    const { toggleDisableNext, updateTeamInfo } = this.props;
    if (name === '' || team === '' || teamType === '' || teamNumber === '') {
      this.setState({ errorMessage: 'Make sure all fields are filled.' });
      toggleDisableNext(true);
    } else {
      this.setState({ errorMessage: '' });
      updateTeamInfo(this.state);
      toggleDisableNext(false);
    }
  }

  dropdownChange = (e, data) => {
    this.setState({ teamType: data.value },
      () => {this.validInput()}
    );
  }

  render() {
    const { stepType, name, team, teamType, teamNumber, errorMessage } = this.state;
    return (
      <div>
        { stepType === 0 ?
          <div>
            <Button basic content='Create A Team' color="blue" onClick={() => { this.setState({ stepType: 1 }); }} />
            <Button basic content='Join A Team' color="blue" onClick={() => { this.setState({ stepType: 2 }); }} />
          </div>
          :
          <div>
            <Form.Input
              fluid
              value={name}
              id="name"
              label="Name"
              placeholder="Name"
              onChange={this.onInputChange}
            />
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
                  value={teamNumber}
                  id="teamNumber"
                  label="Team Number"
                  placeholder="Team Number"
                  onChange={this.onInputChange}
                />
            </div> :
              null
            }
            <Form.Dropdown
              fluid
              label="Team Type"
              placeholder='Team Type'
              search
              selection
              options={dropdownOptions}
              onChange={this.dropdownChange}
            />
          </div>
        }
        <p style={{ color: 'red' }}>
          {errorMessage}
        </p>
      </div>
    );
  }
}

export default TeamSignUp;
