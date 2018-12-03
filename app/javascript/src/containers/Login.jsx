import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// semantic ui components
import { Container, Card, Menu, Input } from 'semantic-ui-react';

// Login components
import { LoginFields, SignUpFields } from './../components';

// FAQ
import { Link } from 'react-router-dom';

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

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeItem: 'home',
    }
  }

  render() {
    const { activeItem, secondaryItem } = this.state;
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
    return (
      <div>
        <Menu secondary>
          <Menu.Item header>Krzyzewskiville Scheduler ⛺</Menu.Item>
          <Menu.Item
            name='about KVS'
            active={activeItem === 'about'}
            onMouseOver={() => {this.setState({activeItem: 'about'})}}
            onMouseLeave={() => {this.setState({activeItem: ''})}}
           />
           <Menu.Item
             name='Tenting 101'
             active={activeItem === 'tenting101'}
             onMouseOver={() => {this.setState({activeItem: 'tenting101'})}}
             onMouseLeave={() => {this.setState({activeItem: ''})}}
            />
            <Menu.Item
              name='FAQ'
              active={activeItem === 'FAQ'}
              onMouseOver={() => {this.setState({activeItem: 'FAQ'})}}
              onMouseLeave={() => {this.setState({activeItem: ''})}}
             />
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
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

export {
  Login
};
