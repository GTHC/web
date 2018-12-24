import React, { Component } from "react";
// Semantic Ui Components Used
import { Dropdown, Card, Grid, Button, Header, Icon, Label} from "semantic-ui-react";
//Endpoints not yet created, so Created Fake Data Instead
import {getHours} from "./fakeData";



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
    return this.state.total == false ? "Week Hours : "  : "Total Hours : " ;
  };

  nightView() {
    const { total } = this.state;
    return this.state.total == false ? "Week Nights : "  : "Total Nights : " ;
  };

//Function determining which View to Display
  hoursNumber(user) {
    return this.state.total == false ? user.hours.week : user.hours.total ;
  };

  nightNumber(user) {
    return this.state.total == false ? user.Night.week : user.Night.total ;
  };

//Function determining which Rank Data to Display
  hourRank(user) {
    return this.state.total == false ? user.rank.whour : user.rank.thour;
  };

  nightRank(user) {
    return this.state.total == false ? user.rank.wnight : user.rank.tnight;
  };





//Function determining proper coloring of badges for certain ranks
  coloring(user, view) {
    let rank;
    if(this.state.total){
      rank = view == "hour" ? user.rank.thour : user.rank.tnight;
    }
    else {
      rank = view == "hour" ? user.rank.whour : user.rank.wnight;
    }
    if (rank == 1){
      return 'yellow';
    }
    else if (rank ==2) {
      return 'grey';
    }
    else if (rank ==3) {
      return "brown";
    }
    else if (rank==12){
      return "red";
    }
  };


//Function sorting Data from Greatest to Least by the given Rank and Specific View (Week or Total)
handleNightorHours = (e, timeOfDay) => {
  let newNight; //new instance of order list used to alter State Hours value
  if (timeOfDay == "Time Span") {
    return getHours();
  }
  else if (this.state.total && timeOfDay != "Time Span") { //Order by Total Hours or Night
    newNight = getHours().sort((b, a) => {
      const timeA = timeOfDay === 'Night'
        ? a.Night
        : a.hours;
      const timeB = timeOfDay === 'Night'
        ? b.Night
        : b.hours;

      return timeA.total - timeB.total;
    });
  } else { //Order by Total Hours or Night
    newNight = getHours().sort((a, b) => {
      const timeA = timeOfDay === 'Night'
        ? a.Night
        : a.hours;
      const timeB = timeOfDay === 'Night'
        ? b.Night
        : b.hours;
      return timeB.week - timeA.week;
    });
  }
  this.setState({rank:timeOfDay, hours: newNight});
};


//Each User Hours and Night count displayed for a given view
  customCard = (props) => {
    return <Card key={props.user.name} style={{width: "180px"}}>
     <Card.Content >
       <Card.Header>{props.user.name} </Card.Header>
     </Card.Content>
     <Card.Content>
       <Card.Description>
         {this.hourView()} <strong>{this.hoursNumber(props.user)} </strong>
       </Card.Description>
       <Card.Description>
         {this.nightView()} <strong>{this.nightNumber(props.user)} </strong>
       </Card.Description>
      </Card.Content>
      <Card.Content >
        <Grid.Column>
          <Label color={this.coloring(props.user, "hour")} >
            HourRank: {this.hourRank(props.user)}
          </Label>
       </Grid.Column>
       <Grid.Column>
        <Label color={this.coloring(props.user, "night")}>
          NightRank: {this.nightRank(props.user)}
        </Label>
       </Grid.Column>
      </Card.Content>
    </Card>
  }

// Trying to move the dropDown options out of the render component, but dropDown fucntion  is buggy

dropDown () {
const lengthOptions = [{
  key: 'Time Span',
  text: 'Time Span ',
  value: 'Time Span',
  content: 'Time Span',
},
  {
    key: 'Week',
    text: 'Week',
    value: 'Week',
    content: 'Week',
  },
  {
    key: 'Total',
    text: 'Total',
    value: 'Total',
    content: 'Total',
  },
];

const rankOptions = [
  {
    key: 'Hour',
    text: 'Hour',
    value: 'Hour',
    content: 'Hour',
  },
  {
    key: 'Night',
    text: 'Night',
    value: 'Night',
    content: 'Night',
  },
];
return <div  className="sorting-dropdowns" style={{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'inline-block',
  }}
>
  <div style={{display: 'inline-block'}}>
    <div className="week-dropdown">
      <div className="dropdown">
        View by {' '}
        <Dropdown
          labeled
          icon='left dropdown'
          icon="calendar"
          inline
          options={lengthOptions}
          defaultValue={lengthOptions[0].value}
          onChange={(e, { value }) => {
            const total = value === 'Week' ? false : true;
            this.setState({ total }, () => {
              this.handleNightorHours(e, this.state.rank);
            });
          }}
        />
     </div>
    </div>
    <br />
     <div className="rank-dropdown">
       <div className="dropdown">
         Rank by {' '}
         <Dropdown
           labeled
           icon="trophy"
           inline
           options={rankOptions}
           defaultValue={rankOptions[0].value}
           onChange={ (e, value) => this.handleNightorHours(e, value.value) }
         />
      </div>
     </div>
  </div>
</div>

}


  render () {
    const { total, hours } = this.state;
    return (
    <Card fluid >
      <Header textAlign='left'>
        <Header.Content>
          <div style={{ paddingTop: '12px', paddingLeft: '15px'}} >
            <h1>Hour Breakdown</h1>
        </div>
        </Header.Content>
      </Header>
      <Card.Content textAlign="center">
       <this.dropDown />
      <br />
      <br />
    <Card.Group centered >
        {
          this.state.hours.map((user) => (
         <this.customCard user={user} key={user.name} style={{paddingRight: '12px', paddingLeft: '50px'}}/>
              ))}
      </Card.Group>
      </Card.Content>
    </Card>
    );

  }
}
