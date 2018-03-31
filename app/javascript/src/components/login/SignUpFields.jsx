import React, { Component } from 'react';

// semantic ui components
import { Button, Form, Step } from 'semantic-ui-react';

// sub-components
import UserSignUp from './signup/UserSignUp';
import TeamSignUp from './signup/TeamSignUp';

class SignUpFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
    }
  }

  handleButtonClick = (e, data) => {
    const { activeStep } = this.state;
    const { toggle, login } = this.props;
    switch (data.id) {
      case 'back': {
        if (activeStep === 0) {
          toggle(login.type);
          return;
        }
        this.setState({ activeStep: activeStep - 1 });
        return;
      }
      case 'next': {
        if (activeStep < 2) {
          this.setState({ activeStep: activeStep + 1 })
        }
      }
    }
  }

  render() {
    const { activeStep } = this.state;
    const steps = [
        { key: 'user', icon: 'user', title: 'User Credentials', description: 'Add your email and create an account password.', active: (activeStep === 0) },
        { key: 'team', active: true, icon: 'users', title: 'Team information', description: 'Let us know which team you are on!', active: (activeStep === 1) },
        { key: 'join', disabled: true, icon: 'checkmark box', title: 'All Set!', active: (activeStep === 2) },
      ];
    return (
      <div>
        <Form>
          <TeamSignUp />
        </Form>
        <br />
        <Button.Group fluid>
          <Button id="back" content='Back' icon='left arrow' labelPosition='left' color="red" onClick={this.handleButtonClick} />
          <Button.Or />
          <Button id="next" content='Next' icon='right arrow' labelPosition='right' color="green" onClick={this.handleButtonClick} />
        </Button.Group>
        <br />
        <Step.Group fluid items={steps} />
      </div>
    );
  }
}

export default SignUpFields;
