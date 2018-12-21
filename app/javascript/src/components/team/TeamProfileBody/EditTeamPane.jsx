import React, { Component } from 'react';

import { Form, Message, Loader, Dimmer } from 'semantic-ui-react';

// utils
import dropdownOptions from '../../login/signup/utils/dropdownOptions';

export default class EditTeamPane extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.team.name,
      tentNumber: props.team.tent_number,
      tentType: props.team.tent_type,
      disabled: false,
      savePressed: false,
      loading: props.userState.isLoading,
    };
  }

  onInputChange = (e, { id, value }) => {
    this.setState({
      savePressed: false,
      [id]: value,
    }, () => { this.validInput(); });
  };

  onSave = () => {
    const { team, updateTeam } = this.props;
    const { name, tentNumber, tentType } = this.state;
    const data = {
      name,
      tent_number: tentNumber,
      tent_type: tentType,
    };
    this.setState({ savePressed: true });
    updateTeam(team.id, data);
  };

  validInput = () => {
    const { name, tentNumber } = this.state;
    if (name.trim() == '' || tentNumber == '') {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  };

  renderError = () => (
    <Message negative>
      <p>{ 'You are not the captain. You do not have access to changing team information.' }</p>
    </Message>
  );

  renderIsCaptain = () => {
    const { team, captain, user, userState } = this.props;
    const { disabled, name, tentNumber, tentType, loading, savePressed } = this.state;
    const error = userState.error;
    return (
      <div>
        <Message positive attached>
          <p>{ 'You are the captain. You have access to editing team information.' }</p>
        </Message>
        <Form className='attached fluid segment'>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              type="text"
              id="name"
              error={disabled}
              label="Team Name"
              placeholder="Team Name"
              value={name}
              onChange={this.onInputChange}
            />
            <Form.Input
              fluid
              type="number"
              id="tentNumber"
              error={disabled}
              label="Tent Number"
              placeholder="Tent Number"
              value={tentNumber}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Form.Dropdown
            fluid
            search
            selection
            id="tentType"
            label="Team Type"
            placeholder='Team Type'
            options={dropdownOptions}
            onChange={this.onInputChange}
            defaultValue={tentType}
          />
          <Form.Button disabled={disabled} onClick={this.onSave}>Save</Form.Button>
        </Form>
        { loading &&
          <Dimmer active>
            <Loader>Updating</Loader>
          </Dimmer>
        }
        {
          !loading && savePressed && !error &&
          <Message
            positive
            attached
            icon="check"
            header="Updated Successfully!"
            content="Team information has been updated."
          />
        }
        {
          !loading && savePressed && error &&
          <Message
            negative
            attached
            icon="x"
            header="Error"
            content="Team information has not been updated."
          />
        }
        {
          disabled &&
          <Message
            warning
            attached
            icon="exclamation triangle"
            header="Warning!"
            content="Please fill in all details."
          />
        }
      </div>
    );
  };

  render () {
    const { captain, user } = this.props;
    return (
      <div>
        {
          captain.user_id === user.id ?
          this.renderIsCaptain()
          :
          this.renderError()
        }
      </div>
    );
  }
}
