import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import NavBar from './NavBar';
import DashboardBody from '../components/dashboard/DashboardBody';

class Dashboard extends Component {
  render () {
    const { shifts } = this.props;

    return (
      <div>
        <NavBar />
        <div className="body">
          <DashboardBody shifts={shifts} />
        </div>
      </div>
    );
  }
}

// connecting to redux

const mapStateToProps = state => {
  return {
    user: state.user,
    login: state.login,
    shifts: state.shifts,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       loginUser: login, // changed login and logout action names due to login state name
//       logoutUser: logout,
//     },
//     dispatch);
// };

export default connect(mapStateToProps)(Dashboard);

export {
  Dashboard,
};
