import React, { Component } from 'react';

// semantic ui components
import { Form, Button, Divider, Message } from 'semantic-ui-react';

// utils
import { generate } from 'randomstring';
import dropdownOptions from './utils/dropdownOptions';
import PasscodeCheck from './utils/PasscodeCheck';

class TeamSignUp extends Component {
  constructor(props) {
    super(props);
    const data = props.data.teamData;
    this.state = {
      /**
       * stepType: This will define what is displayed for this step.
       * 0: Create Team vs Join Team?
       * 1: Create Team
       * 2: Join Team
       * @type {Number}
       */
      stepType: 0,

      // User is either creating or joining a team (used in validInput())
      type: props.data.type,
      team: data.team,
      teamID: data.teamID,
      tentType: data.tentType,
      isCaptain: false,
      errorMessage: '',
      passcode: data.passcode,

      // this is the value of the passcode input by the user when joining a team
      joinPasscode: '',
      showJoinPasscode: false, // shows PasscodeCheck component
      correctPasscode: false,
    };

    // checks if next button should be active or not
    // (useful for situations where user comes from a future page)
    if (data.team && data.tentType && data.passcode) {
      props.setDisableNext(false);
    }
  }

  onInputChange = (e, data) => {
    this.setState({ [data.id]: e.target.value },
      () => {this.validInput()}
    );
  }

  validInput = () => {
    const { stepType, team, tentType, correctPasscode } = this.state;
    const { setDisableNext, updateData } = this.props;
    if (stepType === 1 && (team === '' || tentType === '')) {
      this.setState({ errorMessage: 'Make sure all fields are filled.' });
      setDisableNext(true);
    } else if (stepType == 2 && !correctPasscode) {
      setDisableNext(true);
    } else if (stepType > 0) {
      this.setState({ errorMessage: '' });
      updateData({
        type: this.state.type,
        teamData: this.state,
      });
      setDisableNext(false);
    }
  };

  dropdownChange = (e, data) => {
    this.setState({ tentType: data.value },
      () => {this.validInput()}
    );
  }

  teamDropDownChange = (e, data) => {
    const toTitleCase = (str) => {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
    const teams = this.props.teams.all;
    const team = teams.find(team => team.id === data.value);
    const tentType = toTitleCase(team.tent_type);
    this.setState({
      team: team.name,
      teamID: team.id,
      tentType: tentType,
      passcode: team.passcode,
      isCaptain: false,
      showJoinPasscode: true,
      correctPasscode: false,
    },
      () => {this.validInput()}
    );
  };

  /**
   * handleFoundPasscode - function for PasscodeCheck component when passcode is correctly typed by user
   */
  handleFoundPasscode = () => (this.setState({ correctPasscode: true },
    () => {this.validInput();}
  ));

  render() {
    const { stepType, team, tentType, passcode, errorMessage, showJoinPasscode } = this.state;
    const { setDisableNext, teams } = this.props;
    return (
      <div>
        <div style={{ textAlign: "center"}}>
          <Button basic={stepType !== 1} content='Create A Team' color="blue" onClick={() => {
              this.setState({
                type: 'create',
                stepType: 1,
                isCaptain: true,
                team: '',
                tentType: '',
                passcode: generate(5).toUpperCase(),
                showJoinPasscode: false,
              });
              setDisableNext(true);
            }}
          />
          <Button basic={stepType !== 2} content='Join A Team' color="blue" onClick={() => {
              this.setState({
                type: 'join',
                stepType: 2,
                isCaptain: false,
                correctPasscode: false,
              });
              setDisableNext(true);
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
                <Form.Dropdown
                  upward
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
                <Message>
                  <Message.Header>Team Passcode</Message.Header>
                  Give this to your team-mates, so, they can join your team - <b>{passcode}</b>
                </Message>
            </div> :
              null
        }
        {stepType === 2 ?
          <div>
            <Form.Dropdown
              upward
              fluid
              label="Team Names"
              placeholder='Find your team'
              search
              selection
              options={teams.teamDropDownOptions}
              onChange={this.teamDropDownChange}
            />
            {
              showJoinPasscode &&
              <PasscodeCheck
                passcode={passcode} handleFoundPasscode={this.handleFoundPasscode.bind(this)}
              />
            }
          </div>
          : null
      }
        <br />
        {errorMessage &&
          <Message
            warning
            header='Uh oh...'
            content={errorMessage}
          />
        }
      </div>
    );
  }
}

export default TeamSignUp;
