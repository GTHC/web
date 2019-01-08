import React, { Component } from 'react';


// semantic-ui
import { Card, Header, Image } from 'semantic-ui-react';

// util functions
import getUpcomingGame from './utils/getUpcomingGame'; 

class UpcomingGame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '',
      espn: '',
      competitorLogo: '',
      venue: {}
    }
  }

  componentWillMount() {
    
    getUpcomingGame() 
      .then(res => { 
        console.log('res', res)
        const url = 'http://www.espn.com/mens-college-basketball/game?'; 

        const data = res.data.team.nextEvent[0]; 
        const id = data.id; 
        const name = data.name; 
        const date = data.date; 
        const espn = `${url}gameId=${id}`;

        const competitions = data.competitions[0];
        const venue = competitions.venue;
        const competitor = competitions.competitors[0].team;
        const competitorLogo = competitor.logos[0].href; 

        this.setState({
          name,
          date,
          espn,
          competitorLogo,
          venue,
        });

      }) 
    
  }

  render() {
    console.log(this.state)
    return (
      <div></div>
    );
  }

}

export default UpcomingGame;
