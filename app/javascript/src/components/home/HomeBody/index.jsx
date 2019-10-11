import React, { Component } from 'react';

// semantic-ui
import {
  Container,
  Divider,
  Embed,
  Grid,
  Image,
  Segment,
  Transition
} from 'semantic-ui-react';

// widgets
import DukeTwitterTimeline from './widgets/DukeTwitterTimeline';
import KvilleWeather from './widgets/KvilleWeather';
import LineMonitorTwitterTimeline from './widgets/LineMonitorTwitterTimeline';
import LineMonitorPosts from './widgets/LineMonitorPosts';
import CountDownTimer from './widgets/CountDownTimer';
import FeedbackForm from './widgets/FeedbackForm';
import UpcomingGame from './widgets/UpcomingGame';


class HomeBody extends Component {

  componentDidMount() {
    this.props.getAllShifts();
    this.props.getPosts();
  }

  render() {
    const { posts } = this.props;

    return (
      <Grid columns='equal'>
        <Grid.Row>
          <Grid.Column>
            <LineMonitorPosts posts={posts}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <KvilleWeather/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <DukeTwitterTimeline/>
          </Grid.Column>
          <Grid.Column width={9}>
            <CountDownTimer/>
            <UpcomingGame/>
          </Grid.Column>
          <Grid.Column>
            <LineMonitorTwitterTimeline/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <FeedbackForm/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

}

export default HomeBody;
