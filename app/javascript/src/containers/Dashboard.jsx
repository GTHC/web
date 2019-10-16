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
    shifts: state.shifts,
  };
};

export default connect(mapStateToProps)(Dashboard);

export {
  Dashboard,
};
