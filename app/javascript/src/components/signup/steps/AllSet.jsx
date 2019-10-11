import React, { Component } from 'react';

class AllSet extends Component {
  render() {
    const data = this.props.data;
    const teamData = data.teamData;
    return (
      <div>
        Looks like you're all set! Make sure everything below is correct.
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
