import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import NavBar from './NavBar';
import { Card } from 'semantic-ui-react';

import BigCal from '../components/calendar';

// redux actions
import {
  getAllShifts,
  updateShift,
  createShift,
  deleteShift,
  dragDropUpdate,
} from '../actions/shifts';
import { getTeam } from '../actions/team';

class Calendar extends Component {
  componentDidMount() {
    const { getAllShifts, getTeam, user } = this.props;
    getAllShifts();
    getTeam(user.data.team_id);
  }

  render () {
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
    shifts: state.shifts,
    team: state.team,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllShifts,
      updateShift,
      createShift,
      deleteShift,
      dragDropUpdate,
      getTeam,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

export {
  Calendar,
};
