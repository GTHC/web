import React, { Component } from 'react';

// redux
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

// redux actions
import { checkSession } from '../actions/user';

import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import ConnectedSwitch from './../components/utils/switch';

// components
import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';
import Calendar from './Calendar';
import UserProfile from './UserProfile';
import TeamProfile from './TeamProfile';
import Tenting101 from './Tenting101';
import About from './About';
import ResetPassword from './ResetPassword';
import ResetPasswordEdit from './ResetPasswordEdit';

// styles
import './../styles';

// routes
const AppRoutes = () => (
  <ConnectedSwitch>
    <Route exact path="/app" component={Home} />
    <Route exact path="/app/" component={Home} />
    <Route exact path="/app/dashboard" component={Dashboard} />
    <Route exact path="/app/calendar" component={Calendar} />
    <Route exact path="/app/user" component={UserProfile} />
    <Route exact path="/app/team" component={TeamProfile} />
    <Route exact path="/app/*" component={Home} />
  </ConnectedSwitch>
);


class App extends Component {
  componentDidMount() {
    this.props.checkSession();
  }

  render() {
    const { history, user } = this.props;
    return (
        <ConnectedRouter history={history}>
          <ConnectedSwitch>
            <Route exact path="/" render={() => {
              return (user.isLoggedIn ?
                <Redirect to="/app" /> :
                <Redirect to="/login" />)
            }}/>
            <Route path="/app" render={() => (
              user.isLoggedIn ?
              <AppRoutes /> :
              <Redirect to="/login" />
            )} />
            <Route path="/login" render={() => (
              user.isLoggedIn ?
              <Redirect to="/app" /> :
              <Login />
            )} />
            <Route path='/tenting101' component={Tenting101} />
            <Route path='/reset_password' component={ResetPassword} />
            <Route path='/edit_password' component={ResetPasswordEdit} />
            <Route path='/edit_password.*' component={ResetPasswordEdit} />
            <Route path='/about' component={About} />
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      checkSession,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

export {
  Login
};
