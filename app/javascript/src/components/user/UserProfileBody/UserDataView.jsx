import React, { Component } from 'react';

export default class UserDataView extends Component {
  render () {
    const { user } = this.props;

    return (
      <div>
        { user.email }
      </div>
    );
  }
}
