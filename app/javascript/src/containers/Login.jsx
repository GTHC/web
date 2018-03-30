import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// semantic ui components
import { Container, Card } from 'semantic-ui-react';

// Login components
import { LoginFields, SignUpFields } from './../components';

class Login extends Component {

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
              {/* <LoginFields />  */}
              {/* TODO: Add All Fields and add state changing */}
              <SignUpFields />
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
    login: state.login,
  };
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
