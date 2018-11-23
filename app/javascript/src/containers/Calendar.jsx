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
import {
  getAllShifts,
  updateShift,
  createShift,
  deleteShift,  } from '../actions/shifts';
import { getTeam } from '../actions/team';

class Calendar extends Component {
  componentDidMount() {
    const { getAllShifts, getTeam, user } = this.props;
    const userData = user.data;
    getAllShifts();
    getTeam(userData.user.team_id);
  }

  render () {
    const {
      shifts,
      getAllShifts,
      updateShift,
      createShift,
      deleteShift,
    } = this.props;
    return (
      <div>
        <NavBar />
        <div className="body">
          <Card fluid raised>
            <Card.Content>
              <div className="calendar">
                <BigCal {...this.props} />
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
      updateShift,
      createShift,
      deleteShift,
      getTeam,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

export {
  Calendar,
};
