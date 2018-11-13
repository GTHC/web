import React, { Component } from 'react';

// semantic-ui
import { Grid, Segment, Divider, Button, Icon, Card } from 'semantic-ui-react';

// helpers
import _ from 'lodash';

const times = [
    'Night Shift',
  '07:00 - 08:15',
  '08:15 - 09:30',
  '09:30 - 10:45',
  '10:45 - 12:00',
  '12:00 - 13:15',
  '13:15 - 14:30',
  '14:30 - 15:45',
  '15:45 - 17:00',
  '17:00 - 18:15',
  '18:15 - 19:30',
  '19:30 - 20:45',
  '20:45 - 22:00',
  // '22:00 - 23:15',
  // '23:15 - 00:30',
  // '00:30 - 02:00', // 1 hour 30 min shift till night shift, accounts for switching
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
      grid: (new Array(16)).fill().map(function(){ return new Array(7).fill(0);}),
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
