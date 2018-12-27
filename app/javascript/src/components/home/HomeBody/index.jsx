import React, { Component } from 'react';
import { Image, Container, Grid ,Divider, Embed, Transition } from 'semantic-ui-react';
import DukeTwitterTimeline from './DukeTwitterTimeline';
import DukeVideo from './DukeVideo';
import KvilleWeather from './KvilleWeather';
import LMTwitter from './LMTwitter';
import CDWidget from './CDWidget'; 
import PointsWidget from './PointsWidget'; 

const GridExampleVerticallyDivided = () => (
  <Grid divided='vertically'>
    <Grid.Row columns={1}>
      <Grid.Column>
        <KvilleWeather />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={4}>
        <DukeTwitterTimeline/>
      </Grid.Column>
      <Grid.Column width={8}>
        <CDWidget/>
        <PointsWidget/>
      </Grid.Column>
      <Grid.Column width={4}>
        <LMTwitter/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default GridExampleVerticallyDivided
