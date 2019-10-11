import React, { Component } from 'react';

// semantic-ui
import { Step } from 'semantic-ui-react';

// components
import Buttons from './Buttons';
import UserSignUp from './steps/UserSignUp';
import TeamSignUp from './steps/TeamSignUp';
import Availability from './../availability';
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

  updateAvailInfo = (availabilities) => {
    this.props.updateData({
      availabilities,
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
        // availability
        return (
          <Availability
            signup
            availabilities={data.availabilities}
            updateAvailInfo={this.updateAvailInfo}
          />
        );
      }
      case 4: {
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
      { key: 'availability', icon: 'clock', title: 'Availability (optional)', description: 'Let us know when you can tent!', active: (activeStep === 3) },
      { key: 'join', disabled: true, icon: 'checkmark box', title: 'All Set!', active: (activeStep === 4), completed: (activeStep === 4) },
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
            It seems it is your first time on GTHC! Welcome, and get your self set up by choosing or creating your team, and adding your schedule availabilty!
          </div>
        }
        <Buttons
          activeStep={activeStep}
          disableNext={disableNext}
          updateStep={this.updateStep}
        />
      </div>
    );
  }

}

export default Fields;
