import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react'

import UserDataPane from './UserDataPane';

export default class UserProfileBody extends Component {
  render () {
    const { user } = this.props.userData;

    const panes = [
      { menuItem: 'User Information', render: () => <Tab.Pane>
        <UserDataPane user={user}/>
      </Tab.Pane> },
      { menuItem: 'Edit User Information', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
      { menuItem: 'Edit Password', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    ];

    return (
      <div>
          <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
      </div>
    );
  }
}
