import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';

import UserPane from './UserPane';
import EditUserPane from './EditUserPane';
import EditPasswordPane from './EditPasswordPane';
import EditUserAvatar from './EditUserAvatar';
import EditUserAvailability from './EditUserAvailability';

export default class UserProfileBody extends Component {
  render () {
    const { userData } = this.props;

    const panes = [
      { menuItem: 'User Information', render: () => <Tab.Pane>
        <UserPane user={userData.user}/>
      </Tab.Pane>, },
      { menuItem: 'Edit User\'s Information', render: () => <Tab.Pane>
        <EditUserPane {...userData} {...this.props} />
      </Tab.Pane>, },
      { menuItem: 'Edit Password', render: () => <Tab.Pane>
        <EditPasswordPane user={userData.user} {...this.props} />
      </Tab.Pane>, },
      { menuItem: 'Edit User\'s Avatar', render: () => <Tab.Pane>
        <EditUserAvatar user={userData.user} {...this.props} />
      </Tab.Pane> },
      { menuItem: 'Edit User\'s Availability', render: () => <Tab.Pane>
        <EditUserAvailability user={userData.user} {...this.props} />
      </Tab.Pane> },
    ];

    return (
      <div>
          <Tab menu={{ fluid: true, vertical: true, color: 'blue' }} panes={panes} />
      </div>
    );
  }
}
