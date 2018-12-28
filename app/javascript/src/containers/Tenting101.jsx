import React, { Component } from 'react';

// semantic ui components
import { Menu, Image, Button, Form, Step, Divider, Message, Header, Segment, Card, Grid, Table, Icon } from 'semantic-ui-react';

// import Components
import Step1 from './../components/tenting/Step1';
import Essentials from './../components/tenting/Essentials';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from './../actions/router';

// logos
import * as kvilleLogo from './../images/kville.png';
import * as logo from './../images/gthc.png';

class Tenting101 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      activeItem: 'tenting101',
    };
    this.handleReset = this.handleReset.bind(this);
  }
  handleClick = (e, data) => {
    console.log('data', data);
    // data.id is the id element in the component that is clicked
    switch (data.id) {
      case 'login':
          this.props.push('/login')
          return;
      default:
        return;
    }
  }
  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
  handleButtonClick = (e, data) => {
      const { activeStep, } = this.state;
      switch (data.id) {
        case 'back': {
          if (activeStep === 0) {
            return;
          }
          this.setState({ activeStep: activeStep - 1 });
          return;
        }
        case 'next': {
          if (activeStep < 2) {
            this.setState({ activeStep: activeStep + 1 });
          }
          return;
        }
      }
    }

  render() {
    const { activeItem, activeStep, value } = this.state;
    const { router, } = this.props;
    const path = router.location.pathname;

    const steps = [
        { key: 'step1', icon: 'list alternate', title: 'Step 1', description: 'Find your team', active: (activeStep === 0) },
        { key: 'step2', active: true, icon: 'users', title: 'Step 2', description: 'Register with the Line Monitors!', active: (activeStep === 1) },
        { key: 'step3', icon: 'bed', title: 'Step 3', description: 'Get your tenting essentials!', active: (activeStep === 2), completed: (activeStep === 0) },
      ];

    return (
      <div className="body">
        <div style={{ paddingBottom: '60px'}}>
          <Menu fixed="top" inverted color="blue">
          <Menu.Item header>
            <Image src={logo} size="tiny" />
          </Menu.Item>
            <Menu.Item
            id='about'
            active={path === '/about'}
            onClick={this.handleClick}
            >
              About GTHC
            </Menu.Item>
            <Menu.Item
             id='login'
             active={path === '/login'}
             onClick={this.handleClick}>
             <Icon name="sign in" />
             Login
             </Menu.Item>
          </ Menu>
          </ div>

        <Step.Group fluid items={steps} />
        <Form>
          { activeStep === 0 &&
          <div>
            <Step1 />
          </div>
          }
          { activeStep === 1 &&
            <div>
             <Message header='Step 2' content='Tent Captain - Register your tent with the Line Monitors using the form below.' size='large' />
             <p align="middle">
             <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfrLvNTtp1jxp4SMsTQz_eHUJMYIvE9Dlq4E_TTiZwo9FThbw/viewform?embedded=true" width="700" height="520" frameborder="0" marginheight="0" marginwidth="0" align="middle">Loading...</iframe>
             </p>
            </div>
          }
          { activeStep === 2 &&
            <div>
              <Essentials />
            </div>
          }
          </Form>
        <br />
        { activeStep < 2 ?
          <Button.Group fluid>
            <Button id="back" content='Back' icon='left arrow' labelPosition='left' color="red" onClick={this.handleButtonClick} />
            <Button.Or />
            <Button id="next" content='Next' icon='right arrow' labelPosition='right' color="green" onClick={this.handleButtonClick} />
          </Button.Group> :
          <Button.Group fluid>
            <Button id="back" content='Back' icon='left arrow' labelPosition='left' color="red" onClick={this.handleButtonClick} />
            <Button.Or />
            <Button id="signup" content='Finish and Return' icon='sign in' labelPosition='right' color="green" onClick={this.handleReset} />
          </Button.Group>
        }
        <br />
        <br />
      </div>
    );
  }
}

// connecting to redux

const mapStateToProps = (state) => {
  return {
    router: state.router,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      push: push,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Tenting101);

export {
  Tenting101
};
