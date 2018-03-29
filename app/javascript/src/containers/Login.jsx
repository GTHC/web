import React, { Component } from 'react';

// redux
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

// semantic ui components
import { Input, Button, Icon, Container } from 'semantic-ui-react';

class Login extends Component {
  render() {
    return (
      <div>
        <Container textalign="center" >
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
