import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// semantic ui components
import { Container, Card } from 'semantic-ui-react';

// Login components
import { LoginFields, SignUpFields } from './../components';

// redux actions
import {
  toggleLoginType,
  toggleDisableNext,
  updateUserInfo,
  updateTeamInfo,
  getAllTeams,
  login,
  logout,
} from './../actions/login';

class Login extends Component {

  render() {
    const { login,
            user,
            toggleLoginType,
            toggleDisableNext,
            updateUserInfo,
            updateTeamInfo,
            getAllTeams,
            loginUser,
            logoutUser,
          } = this.props;
    return (
      <div className="login">
        <Container textalign="center" >
          <Card centered fluid color="blue" className="login-card" >
            <Card.Content>
              <Card.Header>
                { login.type === 'login' ? '⛺⛺ Welcome to your K-Ville Scheduler! ⛺⛺' :
                  '🤝🤝 Pleased to meet you! 🤝🤝'
                }
              </Card.Header>
            </Card.Content>
            <Card.Content>
              { login.type === 'login' &&
                <LoginFields
                  toggleLoginType={toggleLoginType}
                  login={login}
                  user={user}
                  loginUser={loginUser}
                  logoutUser={logoutUser}
                  />
              }
              { login.type === 'signup' &&
                <SignUpFields
                  toggleLoginType={toggleLoginType}
                  toggleDisableNext={toggleDisableNext}
                  login={login}
                  updateUserInfo={updateUserInfo}
                  updateTeamInfo={updateTeamInfo}
                  getAllTeams={getAllTeams}
                  loginUser={loginUser}
                  logoutUser={logoutUser}
                  />
              }
            </Card.Content>
          </Card>
        </Container>
      </div>
    );
  }
}

// connecting to redux

const mapStateToProps = (state) => {
  return {
    user: state.user,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      toggleLoginType: toggleLoginType,
      toggleDisableNext: toggleDisableNext,
      updateUserInfo: updateUserInfo,
      updateTeamInfo: updateTeamInfo,
      getAllTeams: getAllTeams,
      loginUser: login, // changed login and logout action names due to login state name
      logoutUser: logout,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

export {
  Login
};
