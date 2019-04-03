import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from './../actions/router';

// components
import NavBarAlternate from './NavBarAlternate';

// semantic-ui
import { Divider, Header, Segment, Container, Menu, Card, Icon, Item, Image, Message } from 'semantic-ui-react';

const square = { width: 175, height: 175 }

class HowTo extends Component {

  render() {
    const { router, } = this.props;
    const path = router.location.pathname;

    return (
      <div>
        <NavBarAlternate />
        <div className="How to Page">
        <Container textalign="center" >
          <Card centered fluid color="blue" className="about-card">
            <Card.Content textAlign="center">
              <Message size='massive'> How To Use Game Tenting Help Center</Message>
              <Message
                size = 'massive'
                success
                header=''
                content='This page contains all the information you will need to succesfully use GTHC! Below are information bits, images, and narrated videos to demonstrate how to use the app.'
              />
              <center>
               <Segment circular style={square} textAlign = 'center'>
                <Header as='h2'>
                  Tutorials
                  <Header.Subheader>Narrated Videos that'll show you how to navigate through the app</Header.Subheader>
                </Header>
              </Segment>

              <Segment circular style={square} inverted color='blue' textAlign = 'center'>
                <Header as='h2' inverted>
                  Tips
                  <Header.Subheader>Informational Tips to maximize your usage of the app</Header.Subheader>
                </Header>
              </Segment>

              <Segment circular style={square} textAlign = 'center' >
                <Header as='h2'>
                FAQs
                  <Header.Subheader>Frequently asked questions by other Tenters</Header.Subheader>
                </Header>
              </Segment>
              </center>

         </Card.Content> 
                </Card>


                 <Card fluid>
                <Segment>
            <Header as='h3'>How to Create a Shift</Header>
            

            <Divider section />

            <Header as='h3'>How to delete or Update Shifts</Header>

              <Divider section />

            <Header as='h3'>Understanding the Calendar</Header>

            <Divider section />
            
            <Header as='h3'>How to use Availability</Header>
            

            <Divider section />

            <Header as='h3'>How to delete or Update Shifts</Header>

              <Divider section />

            <Header as='h3'>Understanding the Calendar</Header>
          </Segment>
          </Card>

        </Container>

        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HowTo);

export {
  HowTo
};
