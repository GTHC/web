import React, { Component } from 'react';

// semantic ui components
import { Menu, Image, Button, Form, Step, Divider, Message, Header, Segment, Card, Grid, Table, Icon } from 'semantic-ui-react';

// logos
import * as kvilleLogo from './../../images/kville.png';
// import FAQ page
import FAQ from './FAQ';

class Step1 extends Component {
  render () {
    const square = { width: 175, height: 175 };
    return (
      <div className="body">
       <Image centered src={kvilleLogo} size='massive'/>
       <Message header='Step 1' size='large' content='Find your tent members and establish a Tent Captain.'/>
       <center>
       <Segment circular inverted style={square}>
         <Header as='h2' inverted> Black Tenting
           <Header.Subheader> Best Seats - Longest Form of Tenting </Header.Subheader>
         </Header>
       </Segment>
       <Segment circular color='blue' style={square}>
         <Header as='h2' color='blue'> Blue Tenting
           <Header.Subheader> Only available if there is room in K-Ville </Header.Subheader>
         </Header>
       </Segment>
       <Segment circular style={square}>
         <Header as='h2'> White Tenting
           <Header.Subheader> Shortest Form of Tenting </Header.Subheader>
         </Header>
       </Segment>
       </center>
       <Message header='Tenting Color' size='large' content='Decide which color tenting your group would want to do.'/>
       <Table celled inverted selectable unstackable>
         <Table.Header>
           <Table.Row>
             <Table.HeaderCell>Color</Table.HeaderCell>
             <Table.HeaderCell>Start Date</Table.HeaderCell>
             <Table.HeaderCell>End Date</Table.HeaderCell>
             <Table.HeaderCell>Day Occupancy</Table.HeaderCell>
             <Table.HeaderCell>Night Occupancy</Table.HeaderCell>
           </Table.Row>
         </Table.Header>
         <Table.Body>
           <Table.Row>
             <Table.Cell>Black</Table.Cell>
             <Table.Cell>January 12th, 2018 at 11PM</Table.Cell>
             <Table.Cell>January 23rd, 2018 at 11PM</Table.Cell>
             <Table.Cell textAlign='center'> 2 </Table.Cell>
             <Table.Cell textAlign='center'> 10 </Table.Cell>
           </Table.Row>
           <Table.Row>
             <Table.Cell>Blue</Table.Cell>
             <Table.Cell>January 23rd, 2018 at 11PM</Table.Cell>
             <Table.Cell>February 3rd, 2018 at 11PM </Table.Cell>
             <Table.Cell textAlign='center'> 1 </Table.Cell>
             <Table.Cell textAlign='center'> 6 </Table.Cell>
           </Table.Row>
           <Table.Row>
             <Table.Cell>White</Table.Cell>
             <Table.Cell>February 3rd, 2018 at 11PM </Table.Cell>
             <Table.Cell>February 14th, 2018 at 12PM</Table.Cell>
             <Table.Cell textAlign='center'> 1 </Table.Cell>
             <Table.Cell textAlign='center'> 2 </Table.Cell>
           </Table.Row>
         </Table.Body>
       </Table>
       <br />
       <FAQ />
      </div>
    );
  }
}

export default Step1;
