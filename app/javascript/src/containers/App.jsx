import React, { Component } from "react";

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// redux actions
import { checkSession } from "../actions/user";

import { Route, Navigate  } from "react-router-dom";
import { ConnectedRouter, BrowserRouter } from "connected-react-router";
import ConnectedSwitch from "./../components/utils/switch";

// containers
import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';
import Calendar from './Calendar';
import Availability from './Availability';
import UserProfile from './UserProfile';
import TeamProfile from './TeamProfile';
import Tenting101 from './Tenting101';
import About from './About';
import AboutUs from "./AboutUs";
import Privacy from './Privacy';
import Logout from './Logout';

// styles
import "./../styles";

// routes
const AppRoutes = () => (
  <BrowserRouter>
    <ConnectedSwitch>
      <Route exact path="/app" component={Home} />
      <Route exact path="/app/" component={Home} />
      <Route exact path="/app/dashboard" component={Dashboard} />
      <Route exact path="/app/calendar" component={Calendar} />
      <Route exact path="/app/availability" component={Availability} />
      <Route exact path="/app/user" component={UserProfile} />
      <Route exact path="/app/team" component={TeamProfile} />
      <Route exact path="/app/*" component={Home} />
    </ConnectedSwitch>
  </BrowserRouter>
);

class App extends Component {
  componentDidMount() {
    this.props.checkSession();
  }

  render() {
    const { history, user } = this.props;
    return (
        <ConnectedRouter history={history}>
          <BrowserRouter>
            <ConnectedSwitch>
              <Route exact path="/" render={() => {
                return (user.isLoggedIn ?
                  <Navigate  to="/app" /> :
                  <Navigate  to="/login" />)
              }}/>
              <Route path="/app" render={() => (
                user.isLoggedIn ?
                <AppRoutes /> :
                <Navigate  to="/login" />
              )} />
              <Route path="/login" render={() => (
                user.isLoggedIn ?
                <Navigate  to="/app" /> :
                <Login />
              )} />
              <Route exact path="/about" component={About} />
              <Route path="/about/gthc" component={About} />
              <Route path="/about/us" component={AboutUs} />
              <Route path="/about/tenting" component={Tenting101} />
              <Route path='/privacy' component={Privacy} />
              <Route path='/logout' component={Logout} />
            </ConnectedSwitch>
          </BrowserRouter>
        </ConnectedRouter>
    );
  }
}

// connecting to redux

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      checkSession
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

export { Login };
