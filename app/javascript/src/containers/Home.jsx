import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// redux actions
import {
  login,
  logout,
} from './../actions/login';
import { getAllShifts } from '../actions/shifts';

// components
import HomeBody from './../components/home/HomeBody';
import NavBar from './NavBar';
import { Button } from 'semantic-ui-react';


class Home extends Component {
  componentDidMount() {
    this.props.getAllShifts();
  }

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props;

    return (
        <div>
          <NavBar />
          <div className="body">
            <HomeBody userData={user.data} />
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
      getAllShifts,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

export {
  Home
};
