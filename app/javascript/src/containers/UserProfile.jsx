import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import UserProfileBody from './../components/user/UserProfileBody';
import NavBar from './NavBar';

// redux actions
import {
  postAvatar,
  updateUser,
  postAvail,
  deleteAvail,
} from '../actions/user';

class UserProfile extends Component {
  render () {
    const {
      postAvatar,
      user,
      updateUser,
      postAvail,
      deleteAvail,
    } = this.props;
    return (
      <div>
        <NavBar />
        <div className="body">
          <UserProfileBody
            userState={user}
            userData={user.data}
            updateUser={updateUser}
            postAvatar={postAvatar}
            postAvail={postAvail}
            deleteAvail={deleteAvail}
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
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateUser,
      postAvatar,
      postAvail,
      deleteAvail,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

export {
  UserProfile,
};
