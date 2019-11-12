import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// containers
import NavBarAlternate from './NavBarAlternate';

// actions
import { logout } from './../actions/user';


class Logout extends Component {

  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (
      <div>
        <NavBarAlternate />
        <iframe
          src="https://oauth.oit.duke.edu/oidc/logout.jsp"
          style={{
            padding: '24px',
            position: "relative",
            height: "100vh",
            width: "100%"
          }}
          scrolling="no" frameBorder="0" allowFullScreen
        />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    router: state.router,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logout: logout,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

export {
  Logout
};
