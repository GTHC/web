import React, { Component } from 'react';

export default class EditTeamPane extends Component {
  render () {
    const { captain, user } = this.props;
    return (
      <div>
        {
          captain.user_id === user.id ?
          <p style={{ color: 'green' }}>{ 'You are the captain. You have access.' }</p>
          :
          <p style={{ color: 'red' }}>{ 'You are not the captain. You have no access.' }</p>
        }
      </div>
    );
  }
}
