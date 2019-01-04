import React, { Component } from 'react';
import { Image, Container, Grid ,Segment, Divider, Embed, Transition } from 'semantic-ui-react';
import DukeTwitterTimeline from './DukeTwitterTimeline';
import DukeVideo from './DukeVideo';
import KvilleWeather from './KvilleWeather';
import LMTwitter from './LMTwitter';
import CDWidget from './CDWidget'; 

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
        <CDWidget/>
      </Grid.Column>
      <Grid.Column>
        <LMTwitter/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default HomeGrid