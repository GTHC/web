import React, { Component } from 'react';

// redux
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { ConnectedSwitch } from './../components';

// components
import Test from './../components/Test';
import Login from './Login';

// styles
import './../styles';


class App extends Component {
  render() {
    const { history, user } = this.props;
    return (
        <ConnectedRouter history={history}>
          <ConnectedSwitch>
            { user.isLoggedIn ? <Redirect exact from="/" to="/app" /> : <Redirect exact from="/" to="/login" />}
            <Route path="/app" component={Test} />
            <Route path="/login" component={Login} />
          </ConnectedSwitch>
        </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
};

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       getClasses: getClasses,
//       getAllMajors: getAllMajors,
//       getReqs: getReqs,
//       getAllClasses: getAllClasses,
//     },
//     dispatch);
// };

export default connect(mapStateToProps)(App);

export {
  Login
};
