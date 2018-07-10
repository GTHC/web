import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';

import TeamPane from './TeamPane';
import EditTeamPane from './EditTeamPane';

export default class TeamProfileBody extends Component {
  render () {
    const { captain, team, user } = this.props.userData;

    const panes = [
      { menuItem: 'Team Information', render: () => <Tab.Pane>
        <TeamPane team={team}/>
      </Tab.Pane> },
      { menuItem: 'Edit Team Information', render: () => <Tab.Pane>
        <EditTeamPane captain={captain} team={team} user={user} />
      </Tab.Pane> },
    ];

    return (
      <div>
        <Tab menu={{ fluid: true, vertical: true, color: 'blue' }} panes={panes} />
      </div>
    );
  }
}
