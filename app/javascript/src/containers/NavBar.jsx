import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// redux actions
import {
  login,
  logout,
} from './../actions/login';

// components
import { Menu } from 'semantic-ui-react';

class NavBar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  }

  handleClick = (e, data) => {
    switch (data.children) {
      case 'Home':
      // PUSH to /app
        break;
      case 'Dashboard':
      // /app/dashboard
        break;
      case 'User Profile':
      // /app/user
        break;
      default:
        return;
    }
  }

  render () {
    const { router } = this.props;
    const path = router.location.pathname;
    return (
      <div>
        <Menu fixed="top" inverted>
          <Menu.Item header>Krzyzewskiville Scheduler ⛺</Menu.Item>
          <Menu.Item
            as='a'
            active={path === '/app'}
            color="blue"
            onClick={this.handleClick}
          >
            Home
          </Menu.Item>
          <Menu.Item
            as='a'
            active={path === '/app/dashboard'}
            color="blue"
            onClick={this.handleClick}
          >
            Dashboard
          </Menu.Item>
          <Menu.Menu position="right" color="red">
            <Menu.Item
              as='a'
              active={path === '/app/user'}
              color="blue"
              onClick={this.handleClick}
            >
              User Profile
            </Menu.Item>
            <Menu.Item as='a' onClick={this.handleLogout}>Logout</Menu.Item>
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
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

export {
  NavBar
};
