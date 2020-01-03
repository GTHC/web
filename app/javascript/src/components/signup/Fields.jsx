import React, { Component } from 'react';

// semantic-ui
import { Header, Step } from 'semantic-ui-react';

// components
import Buttons from './Buttons';
import UserSignUp from './steps/UserSignUp';
import TeamSignUp from './steps/TeamSignUp';
import AllSet from './steps/AllSet';

class Fields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      disableNext: false,
    }
  }

  updateStep = (activeStep) => {
    this.setState({ activeStep })
  }

  setDisableNext = (newVal) => {
    this.setState({
      disableNext: newVal,
    })
  }

  renderStep = (step) => {
    const { data, updateData, teams } = this.props;
    switch(step) {
      case 1: {
        // name and phone
        return (
          <UserSignUp
            data={data}
            updateData={updateData}
            setDisableNext={this.setDisableNext}
          />
        );
      }
      case 2: {
        // team
        return (
          <TeamSignUp
            data={data}
            updateData={updateData}
            setDisableNext={this.setDisableNext}
            // team dropdown props
            teams={teams}
          />
        );
      }
      case 3: {
        // all set
        return (
          <AllSet data={data} />
        );
      }
    }
  }

  render() {
    const { activeStep, disableNext } = this.state;

    const steps = [
      { key: 'user', icon: 'user', title: 'User Details', description: 'Add your name and phone number.', active: (activeStep === 1) },
      { key: 'team', active: true, icon: 'users', title: 'Team Information', description: 'Let us know which team you are on!', active: (activeStep === 2) },
      { key: 'join', disabled: true, icon: 'checkmark box', title: 'All Set!', active: (activeStep === 3), completed: (activeStep === 3) },
    ];
    return (
      <div>
        { activeStep > 0 ?
          <div>
            <Step.Group fluid size="tiny" items={steps} stackable='tablet' />

            {this.renderStep(activeStep)}
          </div>
          :
          <div>
            <Header>Making it official!</Header>
            <p>
              It seems it is your first time on GTHC! Get your self set up by setting up your user details, choosing or creating your tenting team, and adding your schedule availabilty!
            </p>
          </div>
        }
        <Buttons
          activeStep={activeStep}
          disableNext={disableNext}
          updateStep={this.updateStep}
          signup={this.props.signup}
        />
      </div>
    );
  }

}

export default Fields;
