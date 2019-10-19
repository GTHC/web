import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import UserProfileBody from './../components/user/UserProfileBody';
import NavBar from './NavBar';

// redux actions
import {
  checkSession,
  postAvatar,
  updateUser,
  putAvail,
  postAvail,
  deleteAvail,
  dragDropUpdate,
} from '../actions/user';

class UserProfile extends Component {

  componentWillMount() {
    this.props.checkSession();
  }

  render () {
    const {
      postAvatar,
      user,
      updateUser,
      putAvail,
      postAvail,
      deleteAvail,
      dragDropUpdate,
    } = this.props;
    return (
      <div>
        <NavBar />
        <div className="body">
          <UserProfileBody
            user={user}
            userData={user.data}
            updateUser={updateUser}
            postAvatar={postAvatar}
            putAvail={putAvail}
            postAvail={postAvail}
            deleteAvail={deleteAvail}
            dragDropUpdate={dragDropUpdate}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      checkSession,
      updateUser,
      postAvatar,
      putAvail,
      postAvail,
      deleteAvail,
      dragDropUpdate,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

export {
  UserProfile,
};
