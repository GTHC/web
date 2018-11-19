import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';

import UserPane from './UserPane';
import EditUserPane from './EditUserPane';
import EditPasswordPane from './EditPasswordPane';
import Schedule from './Schedule';

export default class UserProfileBody extends Component {
  render () {
    const { user } = this.props.userData;

    const panes = [
      { menuItem: 'Availability', render: () => <Tab.Pane>
        <Schedule user={user} />
      </Tab.Pane> },
      { menuItem: 'User Information', render: () => <Tab.Pane>
        <UserPane user={user}/>
      </Tab.Pane> },
      { menuItem: 'Edit User Information', render: () => <Tab.Pane>
        <EditUserPane user={user} />
      </Tab.Pane> },
      { menuItem: 'Edit Password', render: () => <Tab.Pane>
        <EditPasswordPane user={user} />
      </Tab.Pane> },
    ];

    return (
      <div>
          <Tab menu={{ fluid: true, vertical: true, color: 'blue' }} panes={panes} />
      </div>
    );
  }
}
