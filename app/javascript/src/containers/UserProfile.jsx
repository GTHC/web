import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import UserProfileBody from './../components/user/UserProfileBody';
import NavBar from './NavBar';

// redux actions
import { updateUser, updateAvailability } from '../actions/user';

class UserProfile extends Component {
  render () {
    const { user, updateUser, updateAvailability } = this.props;
    return (
      <div>
        <NavBar />
        <div className="body">
          <UserProfileBody
            userState={user}
            userData={user.data}
            updateUser={updateUser}
            updateAvailability={updateAvailability}
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
      updateAvailability,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

export {
  UserProfile,
};
