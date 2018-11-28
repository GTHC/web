import React, { Component } from 'react';

// semantic ui components
import { Button, Form, Step, Divider } from 'semantic-ui-react';

// sub-components
import UserSignUp from './signup/UserSignUp';
import TeamSignUp from './signup/TeamSignUp';
import AllSet from './signup/AllSet';
// Availability
import Availability from './../availability/index'

class SignUpFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
    }
  }

  componentWillMount() {
    this.props.getAllTeams();
  }

  handleButtonClick = (e, data) => {
    const { activeStep } = this.state;
    const { toggleLoginType, toggleDisableNext, login, signup, signupNewTeam } = this.props;
    switch (data.id) {
      case 'back': {
        if (activeStep === 0) {
          toggleLoginType(login.type);
          return;
        }
        this.setState({ activeStep: activeStep - 1 });
        return;
      }
      case 'next': {
        if (activeStep < 3) {
          this.setState({ activeStep: activeStep + 1 });
          toggleDisableNext(true);
        }
        return;
      }
      case 'signup': {
        // signup button click
        // TODO: Add Login functionality
        const data = login.signUpData; // data collected from signup fields
        if (data.isCaptain) {
          // API call to create team and create user
          // Create User -> Create Captain -> Create Team -> Add Team ID to User
          signupNewTeam({
            user_name: data.name,
            password: data.password,
            password_confirmation: data.passwordConfirmation,
            email: data.email,
            team_name: data.team,
            tent_number: data.tentNumber,
            tent_type: data.tentType
          });
        }
        else {
          // API call to create user and add to team
          signup({
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.passwordConfirmation,
            team_id: data.teamID,
          })
        }
        return;
      }
    }
  }

  render() {
    const { activeStep } = this.state;
    const { login, toggleDisableNext, updateUserInfo, updateTeamInfo, getAllTeams } = this.props;
    const steps = [
        { key: 'user', icon: 'user', title: 'User Credentials', description: 'Add your email and create an account password.', active: (activeStep === 0) },
        { key: 'team', active: true, icon: 'users', title: 'Team Information', description: 'Let us know which team you are on!', active: (activeStep === 1) },
        { key: 'availability', disabled: true, icon: 'clock', title: 'Availability', active: (activeStep === 2) },
        { key: 'join', disabled: true, icon: 'checkmark box', title: 'All Set!', active: (activeStep === 3), completed: (activeStep === 3) },
      ];
    return (
      <div>
        <Step.Group fluid items={steps} />
        <br />
        <br />
        <Form>
          { activeStep === 0 &&
            <UserSignUp
              login={login}
              toggleDisableNext={toggleDisableNext}
              updateUserInfo={updateUserInfo}
            />
          }
          { activeStep === 1 &&
            <TeamSignUp
              login={login}
              toggleDisableNext={toggleDisableNext}
              updateTeamInfo={updateTeamInfo}
            />
          }
          { activeStep === 2 &&
            <Availability
              login={login}
              toggleDisableNext={toggleDisableNext}
            />
          }
          { activeStep === 3 &&
            <AllSet login={login} />
          }

        </Form>
        <br />
        { activeStep < 3 ?
          <Button.Group fluid>
            <Button id="back" content='Back' icon='left arrow' labelPosition='left' color="red" onClick={this.handleButtonClick} />
            <Button.Or />
            <Button id="next" content='Next' icon='right arrow' labelPosition='right' disabled={login.disableNext} color="green" onClick={this.handleButtonClick} />
          </Button.Group> :
          <Button.Group fluid>
            <Button id="back" content='Back' icon='left arrow' labelPosition='left' color="red" onClick={this.handleButtonClick} />
            <Button.Or />
            <Button id="signup" content='Sign Up and Login' icon='sign in' labelPosition='right' color="green" onClick={this.handleButtonClick} />
          </Button.Group>
        }
        <br />
        <br />
      </div>
    );
  }
}

export default SignUpFields;
