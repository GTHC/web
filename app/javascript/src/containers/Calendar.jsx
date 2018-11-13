import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Test from './../components/Test';
import NavBar from './NavBar';
import { Card } from 'semantic-ui-react';

import FullCalendar from 'fullcalendar-reactwrapper';
import BigCal from '../components/calendar';

const events = [{
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
  {
		title: 'All Day Event',
		start: '2017-05-01'
	},
	{
		title: 'Long Event',
		start: '2017-05-07',
		end: '2017-05-10'
	},
	{
		id: 999,
		title: 'Repeating Event',
		start: '2017-05-09T16:00:00'
	},
	{
		id: 999,
		title: 'Repeating Event',
		start: '2017-05-16T16:00:00'
	},
	{
		title: 'Conference',
		start: '2017-05-11',
		end: '2017-05-13'
	},
	{
		title: 'Meeting',
		start: '2017-05-12T10:30:00',
		end: '2017-05-12T12:30:00'
	},
	{
		title: 'Birthday Party',
		start: '2017-05-13T07:00:00'
	},
	{
		title: 'Click for Google',
		url: 'http://google.com/',
		start: new Date(),
	},
  {
		title: 'Click for Google',
		url: 'http://google.com/',
		start: '2018-11-13T07:00:00',
    end: '2018-11-13T09:00:00',
	}
];

class Calendar extends Component {
  render () {
    return (
      <div>
        <NavBar />
        <div className="body">
          {/* <Card
            raised
            height="250px"
            width="250px"
          >
            <Card.Content>
              <div className="calendar">
                test
                <FullCalendar
                  height="100px"
                   id = "your-custom-ID"
            	     header = {{
              			left: 'prev,next today myCustomButton',
              			center: 'title',
              			right: 'month,basicWeek,basicDay'
              		}}
                  defaultDate={new Date()}
            	    navLinks= {true} // can click day/week names to navigate views
            	    editable= {true}
            	    eventLimit= {true} // allow "more" link when too many events
            	    events = {events}
                	/>
              </div>
            </Card.Content>
          </Card> */}
          <BigCal />
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
