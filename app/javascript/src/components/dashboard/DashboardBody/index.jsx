import React, { Component } from 'react';

// semantic-ui
import { Grid } from 'semantic-ui-react';

// widgets
import UpcomingShifts from './widgets/UpcomingShifts';
import BreakdownHours from './widgets/BreakdownHours';

class DashboardBody extends Component {

  render() {
    const { shifts } = this.props;
    return (
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column>
            <UpcomingShifts {...shifts}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <BreakdownHours />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

}

export default DashboardBody;
