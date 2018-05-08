import React, { Component } from 'react';

// redux
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { ConnectedSwitch } from './../components';

// components
import Home from './Home';
import Login from './Login';

// styles
import './../styles';

// routes
const AppRoutes = () => (
  <ConnectedSwitch>
    <Route exact path="/app" component={Home} />
  </ConnectedSwitch>
);


class App extends Component {
  render() {
    const { history, user } = this.props;
    return (
        <ConnectedRouter history={history}>
          <ConnectedSwitch>
            { user.isLoggedIn ? <Redirect exact from="/" to="/app" /> : <Redirect exact from="/" to="/login" />}
            <Route path="/app" component={AppRoutes} />
            <Route path="/login" component={Login} />
          </ConnectedSwitch>
        </ConnectedRouter>
    );
  }
}

// connecting to redux

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
