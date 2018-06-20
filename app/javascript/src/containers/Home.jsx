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
import Test from './../components/Test';
import NavBar from './NavBar';
import { Button } from 'semantic-ui-react';


class Home extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  }

  render() {
    return (
        <div>
          <NavBar />
          <div className="body">
            <Test />
            <Button
              content={this.props.user.isLoggedIn.toString()}
              onClick={this.handleLogout}
            />
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
      loginUser: login, // changed login and logout action names due to login state name
      logoutUser: logout,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

export {
  Home
};
