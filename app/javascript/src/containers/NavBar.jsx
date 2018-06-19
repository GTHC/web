import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// redux actions
import {
  login,
  logout,
} from './../actions/login';
import { push } from './../actions/router';

// components
import { Menu, Icon } from 'semantic-ui-react';

class NavBar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  }

  handleClick = (e, data) => {
    switch (data.children[1]) {
      case 'Home':
        this.props.push('/app')
        break;
      case 'Dashboard':
        this.props.push('/app/dashboard')
        break;
      case 'User Profile':
        this.props.push('/app/user')
        break;
      case 'Team Profile':
        this.props.push('/app/team')
        break;
      default:
        return;
    }
  }

  render () {
    const { router } = this.props;
    const path = router.location.pathname;
    return (
      <div style={{ paddingBottom: '75px'}}>
        <Menu fixed="top" inverted color="blue" icon="labeled">
          <Menu.Item header>
            <div style={{fontSize: '2em', paddingBottom: '4px'}}>⛺</div>
            Krzyzewskiville Scheduler
          </Menu.Item>
          <Menu.Item
            as='a'
            active={path === '/app' || path === '/app/'}
            onClick={this.handleClick}
          >
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item
            as='a'
            active={path === '/app/dashboard'}
            onClick={this.handleClick}
          >
            <Icon name="dashboard" />
            Dashboard
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item
              as='a'
              active={path === '/app/team'}
              onClick={this.handleClick}
            >
              <Icon name="users" />
              Team Profile
            </Menu.Item>
            <Menu.Item
              as='a'
              active={path === '/app/user'}
              onClick={this.handleClick}
            >
              <Icon name="user" />
              User Profile
            </Menu.Item>
            <Menu.Item as='a' onClick={this.handleLogout}>
              <Icon name="sign out" />
              Logout
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

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
      loginUser: login, // changed login and logout action names due to login state name
      logoutUser: logout,
      push: push,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

export {
  NavBar
};
