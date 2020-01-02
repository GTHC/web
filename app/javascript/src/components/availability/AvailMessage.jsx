import React, { Component } from 'react';

// semantic-ui
import { Message } from 'semantic-ui-react';

class AvailMessage extends Component {
  state = { hidden: false }

  handleDismiss = () => {
    this.setState({ hidden: true })
  }

  render() {
    const { availabilities } = this.props;
    const { hidden } = this.state;
    return (
      <Message
        warning
        onDismiss={this.handleDismiss}
        hidden={availabilities.length > 0 || hidden}
        icon="warning sign"
        header="Update your Availability!"
        content="Please go to the Availability tab and fill in your availability, so your team can know when you can tent!"
      />
    );
  }

}

export default AvailMessage;
