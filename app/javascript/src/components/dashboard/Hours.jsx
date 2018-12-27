import React, {Component} from "react";
// Semantic Ui Components Used
import { Dropdown, Card, Grid, Button, Header, Icon, Label, Feed } from "semantic-ui-react";
//Endpoints not yet created, so Created Fake Data Instead
import {getHours} from "./mockData";

export default class Hours extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rank: 'hour',
      hours: getHours(),
      total: false //Total used to identify if User choose Week or Total View
    };
  }

  //Function created to Switch between Total and Week View script for both Hour and Night rank

  hourView() {
    return this.state.total == false
      ? "Hours Spent: "
      : "Hours Spent: ";
  };

  nightView() {
    const {total} = this.state;
    return this.state.total == false
      ? "Nights Slept: "
      : "Nights Slept: ";
  };

  //Function determining which View to Display
  hoursNumber(user) {
    return this.state.total == false
      ? user.hours.week
      : user.hours.total;
  };

  nightNumber(user) {
    return this.state.total == false
      ? user.night.week
      : user.night.total;
  };

  //Function determining which Rank Data to Display
  hourRank(user) {
    return this.state.total == false
      ? user.rank.whour
      : user.rank.thour;
  };

  nightRank(user) {
    return this.state.total == false
      ? user.rank.wnight
      : user.rank.tnight;
  };

  //Function determining proper coloring of badges for certain ranks
  trophy(user, view) {
    let rank;
    if (this.state.total) {
      rank = view == "hour"
        ? user.rank.thour
        : user.rank.tnight;
    } else {
      rank = view == "hour"
        ? user.rank.whour
        : user.rank.wnight;
    }
    if (rank == 1) {
      return <Icon name='trophy' color='yellow'/>;
    } else if (rank == 2) {
      return <Icon name='trophy' color='grey'/>;
    } else if (rank == 3) {
      return <Icon name='trophy' color='brown'/>;
    }
  };

  //Function sorting Data from Greatest to Least by the given Rank and Specific View (Week or Total)
  handleNightorHours = (e, timeOfDay) => {
    let newNight; //new instance of order list used to alter State Hours value
    if (this.state.total) { //Order by Total Hours or Night
      newNight = getHours().sort((b, a) => {
        const timeA = timeOfDay === 'Night'
          ? a.night
          : a.hours;
        const timeB = timeOfDay === 'Night'
          ? b.night
          : b.hours;

        return timeA.total - timeB.total;
      });
    } else { //Order by Total Hours or Night
      newNight = getHours().sort((a, b) => {
        const timeA = timeOfDay === 'Night'
          ? a.night
          : a.hours;
        const timeB = timeOfDay === 'Night'
          ? b.night
          : b.hours;
        return timeB.week - timeA.week;
      });
    }
    this.setState({rank: timeOfDay, hours: newNight});
  };

  //Each User Hours and Night count displayed for a given view customCard = (props) => {
  customCard = (props) => {
  return <Card key={props.user.name} style={{
        width: "180px"
      }}>
      <Card.Content >
        <Card.Header>{props.user.name}
        </Card.Header>
      </Card.Content>
      <Card.Content>
        {this.state.total == false ? "Week " : "Total "}
        <Card.Description>
          {this.hourView()}
          <strong>{this.hoursNumber(props.user)}
          </strong>
        </Card.Description>
        <Card.Description>
          {this.nightView()}
          <strong>{this.nightNumber(props.user)}
          </strong>
        </Card.Description>
      </Card.Content>
      <Card.Content >
        <Grid.Column>
          Hours Rank: {this.hourRank(props.user)}
          {this.trophy(props.user, "hour")}
        </Grid.Column>
        <Grid.Column>
          Nights Rank: {this.nightRank(props.user)}
          {this.trophy(props.user, "night")}
        </Grid.Column>
      </Card.Content>
    </Card>
  }

  //Needed to updated 'total' state value while switching view in dropdown. Look at line 192
  handleChange(e, timeofDay) {
    const total = timeofDay === 'Week'
      ? false
      : true;
    this.setState({
      total
    }, () => {
      this.handleNightorHours(e, this.state.rank)
    });
  };

  // Trying to move the dropDown options out of the render component, but dropDown fucntion  is buggy

  dropDown = () => {
    const lengthOptions = [
      {
        key: 'Week',
        text: 'Week',
        value: 'Week',
        content: 'Week'
      }, {
        key: 'Total',
        text: 'Total',
        value: 'Total',
        content: 'Total'
      }
    ];

    const rankOptions = [
      {
        key: 'Adjust Rank',
        text: 'Adjust Rank',
        value: 'Adjust Rank',
        content: 'Adjust Rank'
      }, {
        key: 'Hour',
        text: 'Hour',
        value: 'Hour',
        content: 'Hour'
      }, {
        key: 'Night',
        text: 'Night',
        value: 'Night',
        content: 'Night'
      }
    ];
    return <div className="sorting-dropdowns" style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        display: 'inline-block'
      }}>
      <div style={{
          display: 'inline-block',
          paddingLeft: '10px'
        }}>
        <Icon name='calendar'/>
        View by {' '}
        <Dropdown labeled="labeled" inline="inline" options={lengthOptions} defaultValue={lengthOptions[0].value} onChange={(e, value) => this.handleChange(e, value.value)}/>
        <Icon name='trophy'/>
        Rank by {' '}
        <Dropdown labeled="labeled" inline="inline" options={rankOptions} defaultValue={rankOptions[0].value} onChange={(e, value) => this.handleNightorHours(e, value.value)}/>
      </div>
    </div>

  }

  //begining of render function
  render() {
    const {total, hours} = this.state;
    return (<Card fluid="fluid">
      <Header textAlign='left'>
        <Header.Content>
          <div style={{
              paddingTop: '12px',
              paddingLeft: '15px'
            }}>
            <h2>Hour Breakdown</h2>
          </div>
        </Header.Content>
      </Header>
      <Card.Content textAlign="center">
        <this.dropDown/>
        <br/>
        <br/>
        <Card.Group centered="centered">
          {
            this.state.hours.map((user) => (<this.customCard user={user} key={user.name} style={{
                paddingRight: '12px',
                paddingLeft: '50px'
              }}/>))
          }
        </Card.Group>
      </Card.Content>
    </Card>);

  }
}
