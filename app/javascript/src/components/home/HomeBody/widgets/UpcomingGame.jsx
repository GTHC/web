import React, { Component } from 'react';

// semantic-ui
import { Card, Icon, Image, Loader } from 'semantic-ui-react';

// util functions
import getUpcomingGame from './utils/getUpcomingGame';
import { genDateFormat } from '../../../calendar/utils/dateFormatting';

class UpcomingGame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '',
      espn: '',
      competitorLogo: '',
      venue: {},
      loaded: false,
    };
  }

  componentWillMount() {
    // grab ESPN upcoming game data
    getUpcomingGame()
      .then(res => {
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
          loaded: true,
        });

      });
  }

  render() {
    const {
      name,
      date,
      espn,
      competitorLogo,
      venue,
      loaded,
    } = this.state;

    return loaded ?
    (
      <Card fluid>
        <Card.Content textAlign="center">
          <Card.Header>Upcoming Game</Card.Header>
          <Card.Meta>{name}</Card.Meta>
        </Card.Content>
        <Card.Content textAlign="center">
           <Image src={competitorLogo} size="tiny"/>
          <Card.Description>
            {venue.fullName}
            <Card.Meta>
              {venue.address.city}, {venue.address.state}
            </Card.Meta>
          </Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="center">
          {genDateFormat(date)}
        </Card.Content>
      </Card>
    ) :
    <Card fluid>
      <Card.Content>
        <Loader />
      </Card.Content>
    </Card>
    ;
  }

}

export default UpcomingGame;
