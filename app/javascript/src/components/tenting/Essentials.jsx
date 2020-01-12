import React, { Component } from 'react';

// semantic ui components
import { Menu, Image, Button, Form, Step, Divider, Message, Header, Segment, Card, Grid, Table, Icon } from 'semantic-ui-react';

class Essentials extends Component {
  render () {
    return (
      <div>
       <Segment placeholder>
          <Grid columns={2} stackable textAlign='center'>
            <Divider vertical></Divider>
            <Grid.Row verticalAlign='middle'>
              <Grid.Column>
                <Segment><h1>Tenting Essentials</h1></Segment>
                <Image centered src="https://kenan.ethics.duke.edu/wp-content/uploads/2017/02/tenting-01-300x300.png"/>
              </Grid.Column>
              <Grid.Column>
              <Segment.Group>
                <Segment><h3> Come to K-Ville Prepared With: </h3></Segment>
                <Segment.Group>
                  <Segment as='h5' attached>1. Tent </Segment>
                  <Message attached='bottom'>
                        Fire Safe, Large 12 Person Tent (recommended)
                  </Message>
                  <Segment as='h5' attached>2. Palletes </Segment>
                  <Message attached> (Goes under the tents) </Message>
                  <Segment as='h5' attached>3. Tarp </Segment>
                  <Message attached inverted> (Over the tent, helps with heat and weather) </Message>
                  <Segment as='h5' attached>4. 0 Degree Sleeping Bags </Segment>
                  <Message attached inverted> (It gets cold in K-Ville) </Message>
                  <Segment as='h5' attached>5. Flashlights, Lanterns </Segment>
                  <Message attached inverted> (For the fun late nights in K-Ville)</Message>
                </Segment.Group>
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
    );
  }
}

export default Essentials;
