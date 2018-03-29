import React, { Component } from 'react';

// redux
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

// semantic ui components
import { Input, Button, Icon, Container, Card } from 'semantic-ui-react';

class Login extends Component {
  renderLoginFields = () => (
    <div>
      <Input placeholder="Username" />

      <br />
      <br />

      <Input placeholder="Password" type="password" />

      <br />
      <br />

      <Button
        icon
        color="green"
        labelPosition="right"
      >
        <Icon name="checkmark" />
        Sign In!
      </Button>

      <br />
      <br />

      <Button
        icon
        color="blue"
        labelPosition="right"
      >
        <Icon name="signup" />
        Sign Up!
      </Button>
    </div>
  );

  render() {
    return (
      <div className="login">
        <Container textalign="center" >
          <Card centered fluid color="blue" className="login-card" >
            <Card.Content>
              <Card.Header>
                ⛺⛺ Welcome to your K-Ville Scheduler! ⛺⛺
              </Card.Header>
            </Card.Content>
            <Card.Content>
              { this.renderLoginFields() }
            </Card.Content>
          </Card>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
};

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       getClasses: getClasses,
//       getAllMajors: getAllMajors,
//       getReqs: getReqs,
//       getAllClasses: getAllClasses,
//     },
//     dispatch);
// };

export default connect(mapStateToProps)(Login);

export {
  Login
};
