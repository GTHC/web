import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Test from './../components/Test';
import NavBar from './NavBar';
import Hours from './../components/dashboard/Hours';
import MyShifts from './../components/dashboard/MyShifts';

class Dashboard extends Component {
  render () {
    return (
      <div>
        <NavBar />
        <div className="body">
          <Hours />
          <MyShifts {...this.props.shifts}/>
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
