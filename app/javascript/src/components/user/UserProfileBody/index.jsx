import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';

import UserPane from './UserPane';
import EditUserPane from './EditUserPane';
import EditPasswordPane from './EditPasswordPane';
import Schedule from './Schedule';

export default class UserProfileBody extends Component {
  render () {
    const { userData } = this.props;

    const panes = [
      { menuItem: 'User Information', render: () => <Tab.Pane>
        <UserPane user={userData.user}/>
      </Tab.Pane>, },
      { menuItem: 'Edit User Information', render: () => <Tab.Pane>
        <EditUserPane {...userData} {...this.props} />
      </Tab.Pane>, },
      { menuItem: 'Edit Password', render: () => <Tab.Pane>
        <EditPasswordPane user={userData.user} {...this.props} />
      </Tab.Pane>, },
      { menuItem: 'Edit User Availability', render: () => <Tab.Pane>
        <Schedule user={userData.user} />
      </Tab.Pane> },
    ];

    return (
      <div>
          <Tab menu={{ fluid: true, vertical: true, color: 'blue' }} panes={panes} />
      </div>
    );
  }
}
