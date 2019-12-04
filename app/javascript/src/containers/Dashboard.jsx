import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// redux actions
import { checkSession } from './../actions/user';

// components
import NavBar from './NavBar';
import DashboardBody from '../components/dashboard/DashboardBody';

class Dashboard extends Component {
  componentDidMount() {
    this.props.checkSession();
  }

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
