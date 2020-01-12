import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';

import TeamPane from './TeamPane';
import TeamTablePane from './TeamTablePane';
import EditTeamPane from './EditTeamPane';

export default class TeamProfileBody extends Component {
  render () {
    const panes = [
      { menuItem: 'Team Information', render: () => <Tab.Pane>
        <TeamPane {...this.props} />
      </Tab.Pane>, },
      { menuItem: 'Team Table', render: () => <Tab.Pane>
        <TeamTablePane {...this.props}  />
      </Tab.Pane>, },
      { menuItem: 'Edit Team Information', render: () => <Tab.Pane>
        <EditTeamPane {...this.props}  />
      </Tab.Pane>, },
    ];

    return (
      <div>
        <Tab menu={{ fluid: true, vertical: true, color: 'blue' }} panes={panes} />
      </div>
    );
  }
}
