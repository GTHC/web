import React, { Component } from 'react';

class AllSet extends Component {
  render() {
    const data = this.props.login.signUpData;
    const tentType = {
      'black': 'Black',
      'dblack': 'Dirty Black',
      'blue': 'Blue',
      'dblue': 'Dirty Blue',
      'white': 'White'
    };
    return (
      <div>
        By clicking "Login" you are confirming that the following information is correct:
        <br />
        <br />
        Name: { data.name }
        <br />
        Email: { data.email }
        <br />
        Team: { data.team }
        <br />
        Tent Number: { data.tentNumber }
        <br />
        Tent Type: { tentType[data.tentType] }
      </div>
    );
  }
}

export default AllSet;
