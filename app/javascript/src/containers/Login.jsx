import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// semantic ui components
import { Container, Card, Menu, Input, Image } from 'semantic-ui-react';

// Login components
import { LoginFields, SignUpFields } from './../components';

import NavBarAlternate from './NavBarAlternate';

// redux actions
import {
  toggleLoginType,
  toggleDisableNext,
  updateUserInfo,
  updateTeamInfo,
  updateAvailInfo,
  getAllTeams,
  login,
  logout,
  signup,
  signupNewTeam,
  clearError,
} from './../actions/login';
import { getResetPassword } from '../actions/user';
import { push } from './../actions/router';

// logo
import * as logo from './../images/gthc_long.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
    };
  }

  handleClick = (e, data) => {
    // data.id is the id element in the component that is clicked
    switch (data.id) {
      case 'tenting101':
        this.props.push('/tenting101');
        return;
      case 'about':
        this.props.push('/about');
        return;
      default:
        return;
    }
  };

  render() {
    const { activeItem } = this.state;
    const { login,
      user,
      toggleLoginType,
      toggleDisableNext,
      updateUserInfo,
      updateTeamInfo,
      updateAvailInfo,
      getAllTeams,
      loginUser,
      logoutUser,
      signup,
      signupNewTeam,
      router,
      getResetPassword,
      push,
      clearError,
    } = this.props;
    const path = router.location.pathname;

    const cardStyle = login.type === 'login' ?
      {
        width: "520px",
        paddingBottom: "16px",
      } : {};

    return (
      <div>
        <NavBarAlternate />

        <div className={login.type}>
          <Container>
            <Card
              centered
              fluid={login.type !== 'login'}
              color="blue"
              className="login-card"
              style={cardStyle}
            >
              <Card.Content>
                <Card.Header>
                  {login.type === 'login' ?
                    <div>
                      Sign in to
                      <Image src={logo} style={{
                        paddingBottom: '12px',
                        paddingLeft: '3px',
                      }} size="medium" />
                    </div>
                    : 'Welcome to GTHC (Game Tenting Help Center) ⛺'
                  }
                </Card.Header>
              </Card.Content>
              <Card.Content>
                {login.type === 'login' &&
                  <LoginFields
                    toggleLoginType={toggleLoginType}
                    login={login}
                    user={user}
                    loginUser={loginUser}
                    logoutUser={logoutUser}
                    getResetPassword={getResetPassword}
                    push={push}
                    clearError={clearError}
                  />
                }
                {login.type === 'signup' &&
                  <SignUpFields
                    user={user}
                    toggleLoginType={toggleLoginType}
                    toggleDisableNext={toggleDisableNext}
                    login={login}
                    updateUserInfo={updateUserInfo}
                    updateTeamInfo={updateTeamInfo}
                    updateAvailInfo={updateAvailInfo}
                    getAllTeams={getAllTeams}
                    signup={signup}
                    signupNewTeam={signupNewTeam}
                    clearError={clearError}
                  />
                }
              </Card.Content>
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
    user: state.user,
    login: state.login,
    router: state.router,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logoutUser: logout,
      loginUser: login, // changed login and logout action names due to login state name
      toggleLoginType,
      toggleDisableNext,
      updateUserInfo,
      updateTeamInfo,
      updateAvailInfo,
      getAllTeams,
      signup,
      signupNewTeam,
      clearError,
      push,
      getResetPassword,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

export {
  Login
};
