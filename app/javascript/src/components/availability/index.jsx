import React, { Component } from 'react';

// semantic-ui
import { Grid, Segment, Divider, Button, Icon, Card } from 'semantic-ui-react';

// helpers
import _ from 'lodash';

const times = [
  '7:00 - 8:00 AM',
  '8:00 - 9:00 AM',
  '9:00 - 10:00 AM',
  '10:00 - 11:00 AM',
  '11:00 - 12:00 PM',
  '12:00 - 1:00 PM',
  '1:00 - 2:00 PM',
  '2:00 - 3:00 PM',
  '3:00 - 4:00 PM',
  '4:00 - 5:00 PM',
  '5:00 - 6:00 PM',
  '6:00 - 7:00 PM',
  '7:00 - 8:00 PM',
  '8:00 - 9:00 PM',
  '9:00 - 10:00 PM',
  '10:00 - 11:00 PM',
  '11:00 - 12:00 AM',
  '12:00 - 1:00 AM',
  '1:00 - 2:00 AM',
  'Night Shift',
];

const days = [
  'Times',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

class Availability extends Component {
  constructor(props) {
    super(props);
    let grid = (new Array(7)).fill().map(() => (new Array(20).fill(1)));
    if (props.user !== undefined) {
      console.log(props.user.availability);
      grid = props.user.availability;
    }

    this.state = {
      grid: grid,
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

  renderColumns = (col) => {
    let data = [];
    for (let i = 0; i < 7; i++) {
      data.push(
          <Grid.Column textAlign="center" key={i} onClick={() => this.handleClick(i, col)}>
            {this.renderIcon(this.state.grid[i][col])}
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
      <Grid columns={4} relaxed="very" padded>
        <Grid.Row>
          <Grid.Column textAlign="center"><h3> Key </h3></Grid.Column>
          <Grid.Column textAlign="center">
            <h4> Unavailable </h4> <Icon color='red' name='cancel' size='large' />
          </Grid.Column>
          <Grid.Column textAlign="center">
            <h4> Somewhat Available </h4> <Icon color='yellow' name='question circle' size='large' />
          </Grid.Column>
          <Grid.Column textAlign="center">
            <h4> Available </h4> <Icon color='green' name='checkmark' size='large' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
     </Card>
  );

  render() {
    return (
      <div>
        <Grid columns='equal' celled >
          {this.renderKey()}
            <Grid columns={8} padded>
            {days.map(day => (
              <Grid.Column textAlign="center" key={day} color='green'>
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
