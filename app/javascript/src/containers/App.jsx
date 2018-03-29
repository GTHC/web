import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { ConnectedSwitch } from './../components'
import Test from './../components/Test'


class App extends Component {
  render() {
    return (
        <ConnectedRouter history={this.props.history}>
          <ConnectedSwitch>
            <Route exact path="/app" component={Test} />
          </ConnectedSwitch>
        </ConnectedRouter>
    );
  }
}

export default App;
