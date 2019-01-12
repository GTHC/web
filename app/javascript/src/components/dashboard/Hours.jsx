import React, { Component } from 'react';

// semantic-ui
import {
  Card,
  Dropdown,
  Header,
  Icon,
  Image,
  Message
} from 'semantic-ui-react';

// utils
import getHourBreakdown from './utils/getHourBreakdown';

export default class Hours extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],

      // data type and data sort info
      order: 'day',
      sort: 'all',

      // API states
      loaded: false,
      error: false,
    };
  }

  componentWillMount() {
    getHourBreakdown()
    .then(res => {
      const { data } = res.data;
      this.setState({
        data,
        loaded: true,
        error: false,
      });
    })
    .catch(err => {
      this.setState({
        error: true,
      });
    });
  }

  onInputChange = (e, { id, value }) => {
    this.setState({
      [id]: value,
    });
  };

  renderUserCard = (userData) => {
    const { order, sort } = this.state;

    return (
      <Card color="blue" key={userData.name}>
        <Card.Content >
          {userData.avatarURL &&
            <Image
              rounded
              size="mini"
              floated="right"
              src={userData.avatarURL}
            />
          }
          <Card.Header>{userData.name}</Card.Header>
          <Card.Meta>
            { sort == 'all' ? 'All Shift Hours' : 'Past Week Shift Hours'}
          </Card.Meta>
        </Card.Content>
        <Card.Content>
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
    const { loaded, error } = this.state;
    console.log(loaded);
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
              loaded && data.map(userData => this.renderUserCard(userData))
            }
          </Card.Group>
          {
            error &&
            <div>
              <br />
              <Message
                negative
                icon="x"
                header="Error"
                content="An error has occured while calculating your hour breakdown."
              />
            </div>
          }
        </Card.Content>
        <Card.Content extra>
          <Card.Description>Hour aproximations are rounded by the minute.</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
