import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// redux actions
import { checkSession, logout, signupUser } from './../actions/user';
import { getAllShifts } from '../actions/shifts';
import { getAllTeams } from '../actions/teams';
import { getPosts } from './../actions/posts';

// containers
import NavBar from './NavBar';

// components
import AvailMessage from './../components/availability/AvailMessage';
import HomeBody from './../components/home/HomeBody';
import SignUp from  './../components/signup';

// utils
import { getKeys } from './../utils/onesignal';

class Home extends Component {
  componentDidMount() {
    this.props.checkSession();
    getKeys()
    .then(res => {
      const { netid } = this.props.user.data;
      const { appId } = res.data;
      // sets up OneSignal for the session
      const OneSignal = window.OneSignal || [];
      OneSignal.push(function() {
          OneSignal.init({
            appId: appId,
          });
      });
      OneSignal.push(function() {
          OneSignal.setExternalUserId(netid);
      });
    })
  }

  render() {
    const {
      // states
      user, posts, teams,
      // actions
      getAllTeams, getAllShifts, getPosts, signupUser
    } = this.props;

    return (
        <div>
          {
            user.data && user.data.team_id ?
            <div>
              <NavBar />
              <div className="body">
                <AvailMessage
                  availabilities={user.data.availabilities}
                />
                <HomeBody
                  getAllShifts={getAllShifts}
                  posts={posts}
                  getPosts={getPosts}
                />
              </div>
            </div>
            :
            <SignUp
              userID={user.data.id}
              userName={user.data.name}
              teams={teams}
              getAllTeams={getAllTeams}
              signupUser={signupUser}
            />
          }
        </div>
    );
  }
}

// connecting to redux

const mapStateToProps = (state) => {
  return {
    user: state.user,
    posts: state.posts,
    teams: state.teams,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      checkSession,
      getAllShifts,
      getAllTeams,
      getPosts,
      logout,
      signupUser,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

export {
  Home
};
