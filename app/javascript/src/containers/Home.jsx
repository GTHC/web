import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// redux actions
import { logout, signupUser } from './../actions/user';
import { getAllShifts } from '../actions/shifts';
import { getAllTeams } from '../actions/teams';
import { getPosts } from './../actions/posts';

// components
import NavBar from './NavBar';
import HomeBody from './../components/home/HomeBody';
import SignUp from  './../components/signup';


class Home extends Component {

  componentDidMount() {
      console.log('here')
      const { netid } = this.props.user.data;

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";
      this.div.appendChild(script);

      const OneSignal = window.OneSignal || [];
      OneSignal.push(function() {
          OneSignal.init({
              appId: "b290fd9a-eedf-44b0-8bfd-6a37646957b6",
          });
      });

      console.log(process.env.REACT_APP_ONESIGNAL_APP_ID);
      console.log('TEST netid',netid);
      OneSignal.push(function() {
          OneSignal.setExternalUserId(netid);
          // console.log('Set external User ID to netid.');
      });
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
            {this.renderOneSignal()}
          {
            user.data && user.data.team_id ?
            <div>
              <NavBar />
              <div className="body">
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
