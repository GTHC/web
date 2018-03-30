import React, { Component } from 'react';

// semantic ui components
import { Form, Button } from 'semantic-ui-react';

// utils
import dropdownOptions from './utils/dropdownOptions';

class TeamSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * stepType: This will define what is displayed for this step.
       * 0: Create Team vs Join Team?
       * 1: Create Team
       * 2: Join Team
       * @type {Number}
       */
      stepType: 0,
      name: '',
      team: '',
      teamType: '',
      teamNumber: '',
    };
  }

  onInputChange = (e, data) => {
    this.setState({ [data.id]: e.target.value });
  }

  dropdownChange = (e, data) => {
    this.setState({ teamType: data.value });
    console.log(data.value);
  }

  render() {
    const { stepType, name, team, teamType, teamNumber } = this.state;
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
      </div>
    );
  }
}

export default TeamSignUp;
