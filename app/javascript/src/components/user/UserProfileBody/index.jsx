import React, { Component } from 'react';

import UserDataView from './UserDataView';

export default class UserProfileBody extends Component {
  render () {
    const { user } = this.props.userData;
    return (
      <div>
          <UserDataView user={user} />
      </div>
    );
  }
}
