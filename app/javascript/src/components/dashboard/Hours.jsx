import React, { Component } from 'react';

// semantic-ui
import { Dropdown, Card, Grid, Button, Header, Icon, Label, Feed } from 'semantic-ui-react';

//Endpoints not yet created, so Created Fake Data Instead
import {getHours} from "./mockData";

export default class Hours extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: getHours(),
      order: 'day',
      sort: 'all',
    };
  }

  onInputChange = (e, { id, value }) => {
    this.setState({
      [id]: value,
    });
  };

  renderUserCard = (userData) => {
    const { order, sort } = this.state;

    return (
      <Card color="blue" key={userData.name} style={{
          width: '180px',
        }}>
        <Card.Content >
          <Card.Header>{userData.name}</Card.Header>
        </Card.Content>
        <Card.Content>
          Hours Spent:
          { sort == 'all' ?
            <Card.Description>
              { order == 'day' ?
                <div>
                  Day: {userData.all.day} <br />
                  Night: {userData.all.night}
                </div>
                :
                <div>
                  Night: {userData.all.night} <br />
                  Day: {userData.all.day}
                </div>
              }
            </Card.Description>
            :
            <Card.Description>
              { order == 'day' ?
                <div>
                  Day: {userData.week.day} <br />
                  Night: {userData.week.night}
                </div>
                :
                <div>
                  Night: {userData.week.night} <br />
                  Day: {userData.week.day}
                </div>
              }
            </Card.Description>
          }
        </Card.Content>
      </Card>
    );
  };

  orderData = () => {
    const { order, sort, data } = this.state;
    data.sort((a, b) => (b[sort][order] - a[sort][order]));
    return data;
  };

  renderDropDown = () => {
    const { order, sort } = this.state;

    const lengthOptions = [
      {
        text: 'All Time',
        value: 'all',
      }, {
        text: 'Recent (Past Week)',
        value: 'week',
      },
    ];

    const rankOptions = [
      {
        text: 'Most Day Hours',
        value: 'day',
      }, {
        text: 'Most Night Hours',
        value: 'night',
      },
    ];
    return (
      <div>
        <div>
          <Icon name='calendar'/>
          Sort by {' '}
          <Dropdown
            id="sort"
            labeled inline
            options={lengthOptions}
            value={sort}
            onChange={this.onInputChange}
          />
          <Icon name='trophy'/>
          Order by {' '}
          <Dropdown
            id="order"
            labeled inline
            options={rankOptions}
            value={order}
            onChange={this.onInputChange}
          />
        </div>
      </div>
    );
  };

  //begining of render function
  render() {
    const data = this.orderData();
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Hour Breakdown</Card.Header>
        </Card.Content>
        <Card.Content>
          {this.renderDropDown()}
          <br/>
          <br/>
          <Card.Group>
            {
              data.map(userData => this.renderUserCard(userData))
            }
          </Card.Group>
        </Card.Content>
      </Card>
    );
  }
}
