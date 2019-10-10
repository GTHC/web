import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// redux actions
import { logout } from './../actions/user';
import { getAllShifts } from '../actions/shifts';
import { getPosts } from './../actions/posts';

// components
import NavBar from './NavBar';
import HomeBody from './../components/home/HomeBody';
import SignUp from  './../components/signup';


class Home extends Component {
  componentDidMount() {
    this.props.getAllShifts();
    this.props.getPosts();
  }

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const { user, posts } = this.props;

    return (
        <div>
          {
            user.data && user.data.team_id ?
            <div>
              <NavBar />
              <div className="body">
                <HomeBody posts={posts} />
              </div>
            </div>
            :
            <SignUp />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logoutUser: logout,
      getAllShifts,
      getPosts,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

export {
  Home
};
