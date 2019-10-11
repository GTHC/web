import React, { Component } from 'react';

class AllSet extends Component {
  render() {
    const data = this.props.data;
    const teamData = data.teamData;
    return (
      <div style={{ textAlign: "center"}}>
        <h3>Looks like you're all set! Make sure everything below is correct.</h3>
        <br />
        <br />
        <strong>Name: </strong>
        <br />
        { data.name }
        <br />
        <br />
        <strong>Phone:</strong>
        <br/>
        { data.phone }
        <br />
        <br />
        <strong>Team: </strong>
        <br />
        { teamData.team }
        <br />
        <br />
        <strong>Tent Type:</strong>
        <br/>
        { teamData.tentType }
      </div>
    );
  }
}

export default AllSet;
