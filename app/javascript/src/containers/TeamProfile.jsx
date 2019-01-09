import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import TeamProfileBody from './../components/team/TeamProfileBody';
import NavBar from './NavBar';

// actions
import { updateTeam, getTeam } from '../actions/team';

class TeamProfile extends Component {
  componentDidMount() {
    const { getTeam, user } = this.props;
    const userData = user.data;
    getTeam(userData.user.team_id);
  }

  render () {
    const { user, team, updateTeam } = this.props;
    return (
      <div>
        <NavBar />
        <div className="body">
          <TeamProfileBody
            teamState={team}
            userState={user}
            userData={user.data}
            updateTeam={updateTeam}
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
    team: state.team,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateTeam,
      getTeam,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamProfile);

export {
  TeamProfile,
};
