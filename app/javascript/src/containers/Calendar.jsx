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

const event = [{
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
  },
  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },
];
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class Calendar extends Component {
  render () {
    return (
      <div>
        <NavBar />
        <div className="body">
          Calendar
          <BigCalendar
            events={events}
            views={allViews}
            step={60}
            showMultiDayTimes
            defaultDate={new Date(2015, 3, 1)}
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
