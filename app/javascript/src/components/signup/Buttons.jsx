import React, { Component } from 'react';

import { Button, Divider } from 'semantic-ui-react';

class Buttons extends Component {

  handleButtonClick = (e, data) => {
    const { activeStep, updateStep, signup } = this.props;
    switch(data.id) {
      case 'back': {
        if (activeStep > 0) {
          updateStep(activeStep - 1)
        }
        return;
      }
      case 'next': {
        if (activeStep < 4) {
          updateStep(activeStep + 1)
        }
        return;
      }
      case 'final': {
        signup()
        return;
      }
      default:
        return;
    }
  }

  render() {
    const { activeStep, disableNext } = this.props;
    return (
      <div>
        <Divider />
        {
          activeStep == 0 ?
            <Button
              id="next"
              content="Let's Get Started!"
              color="blue"
              // icon='right arrow'
              onClick={this.handleButtonClick}
            />
          :
          <div>
            { activeStep < 3 ?
              <Button.Group fluid>
                <Button
                  id="back"
                  color="red"
                  content='Back'
                  icon='left arrow'
                  labelPosition='left'
                  onClick={this.handleButtonClick}
                />
                <Button.Or />
                <Button
                  id="next"
                  content='Next'
                  color="green"
                  icon='right arrow'
                  labelPosition='right'
                  disabled={disableNext}
                  onClick={this.handleButtonClick}
                />
              </Button.Group>
              :
              <Button.Group fluid>
                <Button
                  id="back"
                  color="red"
                  content='Back'
                  icon='left arrow'
                  labelPosition='left'
                  onClick={this.handleButtonClick}
                />
                <Button.Or />
                <Button
                  id="final"
                  content='Get Started!'
                  icon='sign in'
                  labelPosition='right'
                  color="green"
                  onClick={this.handleButtonClick}
                />
              </Button.Group>
            }
          </div>
        }
      </div>
    );
  }

}

export default Buttons;
