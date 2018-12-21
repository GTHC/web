import React, { Component } from "react";
// Semantic Ui Components Used
import { Dropdown, Card, Grid, Button, Header, Icon} from "semantic-ui-react";
//Endpoints not yet created, so Created Fake Data Instead
import {getHours} from "./fakeData";



export default class Hours extends Component {

  constructor(props) {
  super(props);

  this.state = {
    Rank: 'hour',
    Hours: getHours(),
    Total: false //Total used to identify if User choose Week or Total View
  };
}


//Function created to Switch between Total and Week View script for both Hour and Night rank
  hourView() {
    return this.state.Total == false ? "Week Hours : "  : "Total Hours : " ;
  };

  nightView() {
    return this.state.Total == false ? "Week Nights : "  : "Total Nights : " ;
  };

//Function determining which View to Display
  hoursNumber(user) {
    return this.state.Total == false ? user.hours.week : user.hours.total ;
  };

  nightNumber(user) {
    return this.state.Total == false ? user.Night.week : user.Night.total ;
  };

//Function determining which Rank Data to Display
  hourRank(user) {
    return this.state.Total == false ? user.rank.whour : user.rank.thour;
  };

  nightRank(user) {
    return this.state.Total == false ? user.rank.wnight : user.rank.tnight;
  };





//Function determining proper coloring of badges for certain ranks
  coloring(user, view) {
    let classes = "badge badge-"; //value of the className attribute being returned by function
    let rank;
    if(this.state.Total){
      rank = view == "hour" ? user.rank.thour : user.rank.tnight;
    }
    else {
      rank = view == "hour" ? user.rank.whour : user.rank.wnight;
    }
    if (rank == 1){
      classes+= "warning";
    }
    else if (rank ==2) {
      classes+= "secondary";
    }
    else if (rank ==3) {
      classes+= "dark";
    }
    else if (rank==12){
      classes+= "danger";
    }
    console.log(classes);
    return classes;
  };


updateTotal = (Total) => {
  this.forceUpdate();
  console.log(this.state.Total);
};


//Function sorting Data from Greatest to Least by the given Rank and Specific View (Week or Total)
handleNightorHours = (e, timeOfDay) => {
  console.log(timeOfDay);
  console.log(this.state.Total);
  let newNight; //new instance of order list used to alter State Hours value
  if (this.state.Total) { //Order by Total Hours or Night
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
  console.log(newNight)
  console.log(this.state.Rank);
  console.log(this.state.Total);
  this.setState({Rank:timeOfDay, Hours: newNight});
};


//Each User Hours and Night count displayed for a given view
  CustomCard = (props) => {
    console.log(this.state.Total);
    return <Card key={props.user.name} style={{width: "180px"}} centered>
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
          <div className="badge badge-info" >
            HourRank: {this.hourRank(props.user)}
          </div>
       </Grid.Column>
       <Grid.Column className = {this.coloring(props.user, "night")}>
         NightRank: {this.nightRank(props.user)}
       </Grid.Column>
      </Card.Content>
    </Card>
  }

// Trying to move the dropDown options out of the render component, but dropDown fucntion  is buggy
/**
dropDown () {
  const lengthOptions = [{
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

  const rankOptions = [{
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
    <div style={{display: 'inline'}}>
      <div className="week-dropdown">
        <div className="dropdown">
          View by {' '}
          <Dropdown
            labeled
            icon='left dropdown'
            icon="calendar"
            inline
            header='Adjust time span'
            options={lengthOptions}
            defaultValue={lengthOptions[0].value}
            onChange={(e, value) => {
              const Totalv = value.value === 'Week' ? false : true;
              console.log( Totalv, value);
              this.setState({Total:Totalv});
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
             header='Adjust time span'
             options={rankOptions}
             defaultValue={rankOptions[0].value}
             onChange={ (e, value) => this.handleNightorHours(e, value.value) }
           />
        </div>
       </div>
    </div>
  </div>
}
*/


  render () {
    const lengthOptions = [{
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
    ]

    const rankOptions = [{
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
    ]
    const { Total, Hours } = this.state;
    return (
    <Card fluid >
      <Header textAlign='center'>
        <Header.Content>
          <div style={{ paddingTop: '12px'}}>
            <h1>Hour Breakdown</h1>
        </div>
        </Header.Content>
      </Header>
      <Card.Content textAlign="center">
       {/*<this.dropDown />*/}
        <div  className="sorting-dropdowns" style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            display: 'inline-block',
          }}
        >
          <div style={{display: 'inline'}}>
            <div className="week-dropdown">
              <div className="dropdown">
                View by {' '}
                <Dropdown
                  labeled
                  icon='left dropdown'
                  icon="calendar"
                  inline
                  header='Adjust time span'
                  options={lengthOptions}
                  defaultValue={lengthOptions[0].value}
                  onChange={(e, value) => {
                    const Totalv = value.value === 'Week' ? false : true;
                    console.log( Totalv, value);
                    this.setState({Total:Totalv}, () => this.updateTotal());
                    console.log(this.state.Total);
                    this.handleNightorHours(e,this.state.Rank);
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
                   header='Adjust time span'
                   options={rankOptions}
                   defaultValue={rankOptions[0].value}
                   onChange={ (e, value) => this.handleNightorHours(e, value.value) }
                 />
              </div>
             </div>
          </div>
        </div>
      <br />
      <br />
    <Card.Group itemsPerRow={6}>
        {
          this.state.Hours.map((user) => (
         <this.CustomCard user={user} key={user.name}/>
              ))}
      </Card.Group>
      </Card.Content>
    </Card>
    );

  }
}
