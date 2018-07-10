import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import TeamProfileBody from './../components/team/TeamProfileBody';
import NavBar from './NavBar';

class TeamProfile extends Component {
  render () {
    const { user } = this.props;
    return (
      <div>
        <NavBar />
        <div className="body">
          <TeamProfileBody userData={user.data} />
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

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       loginUser: login, // changed login and logout action names due to login state name
//       logoutUser: logout,
//     },
//     dispatch);
// };

export default connect(mapStateToProps)(TeamProfile);

export {
  TeamProfile,
};
