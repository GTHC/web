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
import CountDownTimer from './widgets/CountDownTimer';
import FeedbackForm from './widgets/FeedbackForm';

const HomeGrid = () => (
  <Grid columns='equal'>
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
      </Grid.Column>
      <Grid.Column>
        <LineMonitorTwitterTimeline/>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
        <FeedbackForm/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default HomeGrid;
