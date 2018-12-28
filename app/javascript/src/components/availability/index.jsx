import React, { Component } from 'react';

// semantic-ui
import { Grid, Segment, Divider, Button, Icon, Card } from 'semantic-ui-react';

const times = [
  '12:00 - 1:00 am',
  '1:00 - 2:00 am',
  'Night Shift 🌜',
  '7:00 - 8:00 am',
  '8:00 - 9:00 am',
  '9:00 - 10:00 am',
  '10:00 - 11:00 am',
  '11:00 - 12:00 pm',
  '12:00 - 1:00 pm',
  '1:00 - 2:00 pm',
  '2:00 - 3:00 pm',
  '3:00 - 4:00 pm',
  '4:00 - 5:00 pm',
  '5:00 - 6:00 pm',
  '6:00 - 7:00 pm',
  '7:00 - 8:00 pm',
  '8:00 - 9:00 pm',
  '9:00 - 10:00 pm',
  '10:00 - 11:00 pm',
  '11:00 - 12:00 am',
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
    let grid = (new Array(7)).fill().map(() => (new Array(20).fill(0)));
    if (props.user !== undefined) {
      grid = props.user.availability;
    }

    this.state = {
      grid: grid,
    };

    this.handleClick = this.handleClick.bind(this);
    this.renderColumns = this.renderColumns.bind(this);
  }


  handleClick = (row, column) => {
    const { updateAvailState } = this.props;
    const setNewNumber = (val) => (val < 2 ? ++val : 0);

    const grid = this.state.grid;
    const value = grid[row][column];
    grid[row][column] = setNewNumber(value);
    this.setState({ grid });
    updateAvailState(grid); //updating states in higher level components
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
    <div>
      <Grid relaxed="very" padded>
        <Grid.Row columns={3}>
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
        <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <i>Click icons below to select availability.</i>
          </Grid.Column>
        </Grid.Row>
      </Grid>

    </div>
  );

  render() {
    return (
      <div>
        {this.renderKey()}
        <Grid columns='equal' celled >
          <Grid columns={8} padded>
          {days.map(day => (
            <Grid.Column textAlign="center" key={day} color='green'>
              <Grid.Row style={{ height: '10%' }}>{day}</Grid.Row>
            </Grid.Column>
          ))}
          </Grid>
          {times.map((time, row) => (
            <Grid.Row key={time} style={{ height: '6.5%' }}>
              <Grid.Column> {time} </Grid.Column>
              {this.renderColumns(row)}
            </Grid.Row>
          ))}
        </Grid>
      </div>
    );
  }
}

export default Availability;
