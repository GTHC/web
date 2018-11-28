import React, { Component } from 'react';

// semantic-ui
import { Grid, Segment, Divider, Button, Icon, Card } from 'semantic-ui-react';

// helpers
import _ from 'lodash';

const times = [
  'Night Shift',
  '7:00 - 8:15 AM',
  '8:15 - 9:30 AM',
  '9:30 - 10:45 AM',
  '10:45 - 12:00 PM',
  '12:00 - 1:15 PM',
  '1:15 - 2:30 PM',
  '2:30 - 3:45 PM',
  '3:45 - 5:00 PM',
  '5:00 - 6:15 PM',
  '6:15 - 7:30 PM',
  '7:30 - 8:45 PM',
  '8:45 - 10:00 PM',
  '10:00 - 11:15 PM',
  '11:15 - 12:30 AM',
  '12:30 - 2:00 AM', // 1 hour 30 min shift till night shift, accounts for switching
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

class Availabile extends Component {
  constructor(props) {
    super(props);
    const data = props.login.signUpData;
    props.toggleDisableNext(false);
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
          <Grid.Column><h3> Key </h3></Grid.Column>
          <Grid.Column>
            <h4> Unavailable </h4> <Icon color='red' name='cancel' size='large' />
          </Grid.Column>
          <Grid.Column>
            <h4> Somewhat Available </h4> <Icon color='yellow' name='question circle' size='large' />
          </Grid.Column>
          <Grid.Column>
            <h4> Available </h4> <Icon color='green' name='checkmark' size='large' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
     </Card>
  );

  render() {
    const { myFunction } = this.props;
    // const { toggleDisableNext } = this.props;
    // toggleDisableNext(false);

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

export default Availabile;
