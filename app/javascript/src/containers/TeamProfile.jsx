import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import TeamProfileBody from './../components/team/TeamProfileBody';
import NavBar from './NavBar';

// actions
import { updateTeam } from '../actions/team';

class TeamProfile extends Component {
  render () {
    const { user, updateTeam } = this.props;
    return (
      <div>
        <NavBar />
        <div className="body">
          <TeamProfileBody userData={user.data} updateTeam={updateTeam} />
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateTeam,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamProfile);

export {
  TeamProfile,
};
