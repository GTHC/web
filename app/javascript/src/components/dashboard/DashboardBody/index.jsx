import React, { Component } from 'react';

// widgets
import UpcomingShifts from './widgets/UpcomingShifts';
import BreakdownHours from './widgets/BreakdownHours';

class DashboardBody extends Component {

  render() {
    const { shifts } = this.props;
    return (
      <div>
        <UpcomingShifts {...shifts}/>
        <BreakdownHours />
      </div>
    );
  }

}

export default DashboardBody;
