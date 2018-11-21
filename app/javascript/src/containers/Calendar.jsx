import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Test from './../components/Test';
import NavBar from './NavBar';
import { Card } from 'semantic-ui-react';

import BigCal from '../components/calendar';

// redux actions
import { getAllShifts } from '../actions/shifts';

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
  componentDidMount() {
    this.props.getAllShifts();
  }
  render () {
    const { shifts } = this.props;
    return (
      <div>
        <NavBar />
        <div className="body">
          <Card fluid raised>
            <Card.Content>
              <div className="calendar">
                <BigCal shifts={shifts} />
              </div>
            </Card.Content>
          </Card>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllShifts,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

export {
  Calendar,
};
