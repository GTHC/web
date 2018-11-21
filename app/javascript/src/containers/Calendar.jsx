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
      updateShift,
      createShift,
      deleteShift,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

export {
  Calendar,
};
