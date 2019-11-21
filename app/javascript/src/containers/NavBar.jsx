import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// redux actions
import { logout } from './../actions/user';
import { push } from './../actions/router';

// components
import { Menu, Icon, Image } from 'semantic-ui-react';

// logo
import * as logo from './../images/gthc.png';

class NavBar extends Component {
  handleLogout = () => {
    this.props.logout();
  }

  handleClick = (e, data) => {
    switch (data.children[1]) {
      case 'Home':
        this.props.push('/app')
        break;
      case 'Dashboard':
        this.props.push('/app/dashboard')
        break;
      case 'Calendar':
        this.props.push('/app/calendar')
        break;
      case 'User Profile':
        this.props.push('/app/user')
        break;
      case 'Team Profile':
        this.props.push('/app/team')
        break;
      case 'Logout':
        this.props.push('/logout')
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
          <Menu.Item
            header
            fitted="vertically"
          >
            <Image src={logo} size="tiny" />
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

          <Menu.Item
            as='a'
            active={path === '/app/calendar'}
            onClick={this.handleClick}
          >
            <Icon name="calendar" />
            Calendar
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

            <Menu.Item
              as='a'
              onClick={this.handleClick}
            >
              <Icon name="sign out" />
              Logout
            </Menu.Item>

            {/* <Menu.Item as='a' onClick={this.handleLogout}>
              <Icon name="sign out" />
              Logout
            </Menu.Item> */}
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    router: state.router,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logout: logout,
      push: push,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

export {
  NavBar
};
