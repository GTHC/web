import React, { Component } from 'react';

import { Input, Message, Icon } from 'semantic-ui-react';

class PasscodeCheck extends Component {

  state = {
    error: true,
    foundPasscode: false,
    value: '',
  };

  onChange = (e, { value }) => {
    const { passcode, handleFoundPasscode } = this.props;
    this.setState({ value });
    if (value.toLowerCase() == passcode.toLowerCase()) {
      handleFoundPasscode();
      this.setState({ foundPasscode: true });
    }
  };

  render() {
    const { error, value, foundPasscode } = this.state;
    const { passcode } = this.props;
    return (
      <div>
        <Input
          fluid
          disabled={foundPasscode}
          value={value}
          onChange={this.onChange}
          label="Team Passcode"
          placeholder="Ask your captain for the team passcode to join"
        />
          <Message
            positive
            attached
            compact
            icon
            hidden={!foundPasscode}
          >
            <Icon name='thumbs up' />
            <Message.Content>
              <Message.Header>Correct Passcode</Message.Header>
              You are ready to join your team!
            </Message.Content>
          </Message>
      </div>
    );
  }

}

export default PasscodeCheck;
