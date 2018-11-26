import React, { Component } from 'react';

// semantic-ui
import { Grid, Segment, Divider, Button, Icon, Card } from 'semantic-ui-react';

// helpers
import _ from 'lodash';

const times = [
    'Night Shift',
  '07:00 - 07:30 AM',
  '07:30 - 08:00 AM',
  '08:00 - 8:30 AM',
  '8:30 - 9:00 AM',
  '9:00 - 9:30 AM',
  '9:30 - 10:00 AM',
  '10:00- 10:30 AM',
  '10:30 - 11:00 AM',
  '11:00 - 11:30 AM',
  '11:30 - 11:59 AM',
  '12:00 - 12:30 PM',
  '12:30 - 1:00 PM',
  '01:00 - 01:30 PM',
  '01:30 - 02:00 PM',
  '02:00 - 2:30 PM',
  '2:30 - 3:00 PM',
  '3:00 - 3:30 PM',
  '3:30 - 4:00 PM',
  '4:00- 4:30 PM',
  '4:30 - 5:00 PM',
  '5:00 - 5:30 PM',
  '5:30 - 6:00 PM',
  '5:00 - 6:30 PM',
  '6:30 - 7:00 PM',
  '7:00 - 7:30 PM',
  '7:30 - 8:00 PM',
  '8:00 - 8:30 PM',
  '8:30 - 9:00 PM',
  '9:00 - 9:30 PM',
  '9:30 - 10:00 PM',

];

const days = [
  'Times',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

class Availability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: (new Array(31)).fill().map(function(){ return new Array(7).fill(0);}),
    };

    this.handleClick = this.handleClick.bind(this);
    this.renderColumns = this.renderColumns.bind(this);
  }


  handleClick = (row, column) => {
    const setNewNumber = (val) => (val < 2 ? ++val : 0);

    const grid = this.state.grid;
    const value = grid[row][column];
    grid[row][column] = setNewNumber(value);
    this.setState({ grid });
  };

  renderColumns = (row) => {
    let data = [];
    for (let i = 0; i < 7; i++) {
      data.push(
          <Grid.Column key={i} onClick={() => this.handleClick(row, i)}>
            {this.renderIcon(this.state.grid[row][i])}
          </Grid.Column>
      );
    }

    return data;
  };

  renderIcon = (type) => {
    switch (type) {
      case 0: {
        return (
          <Icon color='red' name='cancel' size='large' />
        );
      }

      case 1: {
        return (
          <Icon color='yellow' name='question circle' size='large' />
        );
      }

      case 2: {
        return (
          <Icon color='green' name='checkmark' size='large' />
        );
      }

      default: {
        return (
          <Icon color='red' name='cancel' size='large' />
        );
      }
    }
  };

  renderKey = () => (
    <Card fluid raised>
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column>Key</Grid.Column>
          <Grid.Column>
            Unavailable - <Icon color='red' name='cancel' size='large' />
          </Grid.Column>
          <Grid.Column>
            Somewhat Availabile - <Icon color='yellow' name='question circle' size='large' />
          </Grid.Column>
          <Grid.Column>
            Availabile - <Icon color='green' name='checkmark' size='large' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card>
  );

  render() {
    const { myFunction } = this.props;

    return (
      <div>
        <Grid columns='equal' celled >
          {this.renderKey()}
            <Grid columns={8} padded>
            {days.map(day => (
              <Grid.Column key={day} color='green'>
                <Grid.Row style={{height: '10%'}}>{_.capitalize(day)}</Grid.Row>
              </Grid.Column>
            ))}
            </Grid>
            {times.map((time, row) => (
              <Grid.Row key={time} style={{height: '6.5%'}}>
                <Grid.Column> {_.capitalize(time)} </Grid.Column>
                {this.renderColumns(row)}
              </Grid.Row>
            ))}
        </Grid>
      </div>
    );
  }
}

export default Availability;
