import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// semantic ui components
import { Container, Card, Menu, Input } from 'semantic-ui-react';

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
  signup,
  signupNewTeam
} from './../actions/login';
import { push } from './../actions/router';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeItem: 'home',
    }
  }
  handleClick = (e, data) => {
    console.log('data', data);
    // data.id is the id element in the component that is clicked
    switch (data.id) {
      case 'tenting101':
        this.props.push('/tenting101')
        return;
      case 'about':
          this.props.push('/about')
          return;
      default:
        return;
    }
  }

  render() {
    const { activeItem } = this.state;
    const { login,
            user,
            toggleLoginType,
            toggleDisableNext,
            updateUserInfo,
            updateTeamInfo,
            getAllTeams,
            loginUser,
            logoutUser,
            signup,
            signupNewTeam,
            router
          } = this.props;
    const path = router.location.pathname;
    return (
      <div>
        <Menu secondary>
          <Menu.Item header>Krzyzewskiville Scheduler ⛺</Menu.Item>
          <Menu.Item
            id='about'
            active={path === '/about'}
            onClick={this.handleClick}
           >
           About KVS
           </Menu.Item>
           <Menu.Item
            id='tenting101'
            active={path === '/tenting101'}
            onClick={this.handleClick}>
            Tenting101
            </Menu.Item>
      </Menu>
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
                    signup={signup}
                    signupNewTeam={signupNewTeam}
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
      toggleLoginType: toggleLoginType,
      toggleDisableNext: toggleDisableNext,
      updateUserInfo: updateUserInfo,
      updateTeamInfo: updateTeamInfo,
      getAllTeams: getAllTeams,
      loginUser: login, // changed login and logout action names due to login state name
      logoutUser: logout,
      signup: signup,
      signupNewTeam: signupNewTeam,
      push: push,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

export {
  Login
};
