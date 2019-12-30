import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// redux actions
import { checkSession } from './../actions/user';

// containers
import NavBar from './NavBar';

// components
import AvailMessage from '../components/availability/AvailMessage';
import DashboardBody from '../components/dashboard/DashboardBody';

class Dashboard extends Component {
  componentDidMount() {
    this.props.checkSession();
  }

  render () {
    const { user, shifts } = this.props;

    return (
      <div>
        <NavBar />
        <div className="body">
          <AvailMessage availabilities={user.data.availabilities} />
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
    shifts: state.shifts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      checkSession,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export {
  Dashboard,
};
