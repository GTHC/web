import React, { Component } from 'react';

export default class UserDataPane extends Component {
  render () {
    const { user } = this.props;

    return (
      <div>
        { `Name: ${user.name}`  }
        <br />
        { `Email: ${user.email}`  }
      </div>
    );
  }
}
