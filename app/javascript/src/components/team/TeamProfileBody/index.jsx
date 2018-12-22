import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';

import TeamPane from './TeamPane';
import EditTeamPane from './EditTeamPane';

export default class TeamProfileBody extends Component {
  render () {
    const { userData } = this.props;

    const panes = [
      { menuItem: 'Team Information', render: () => <Tab.Pane>
        <TeamPane team={userData.team}/>
      </Tab.Pane>, },
      { menuItem: 'Edit Team Information', render: () => <Tab.Pane>
        <EditTeamPane {...userData} {...this.props} />
      </Tab.Pane>, },
    ];

    return (
      <div>
        <Tab menu={{ fluid: true, vertical: true, color: 'blue' }} panes={panes} />
      </div>
    );
  }
}
