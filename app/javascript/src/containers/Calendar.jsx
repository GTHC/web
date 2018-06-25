import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Test from './../components/Test';
import NavBar from './NavBar';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const Cal = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  render () {
    return (
      <div>
        <NavBar />
        <div className="body">
          Calendar
          <Cal
            events={{}}
            startAccessor='startDate'
            endAccessor='endDate'
          />
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

export default connect(mapStateToProps)(Calendar);

export {
  Calendar,
};
