import React, { Component } from 'react';

import { Button } from 'semantic-ui-react';

class Buttons extends Component {

  handleButtonClick = (e, data) => {
    console.log('here');
    const { activeStep, updateStep } = this.props;
    switch(data.id) {
      case 'back': {
        if (activeStep > 0) {
          updateStep(activeStep - 1)
        }
        return;
      }
      case 'next': {
        if (activeStep < 5) {
          updateStep(activeStep + 1)
        }
        return;
      }
      default:
        return;
    }
  }

  render() {
    const { activeStep } = this.props;
    return (
      <div>
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
            { activeStep < 4 ?
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
                  // disabled={login.disableNext}
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
