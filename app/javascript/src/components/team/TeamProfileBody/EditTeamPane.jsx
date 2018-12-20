import React, { Component } from 'react';

import { Form, Message } from 'semantic-ui-react';

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
    };
  }

  onInputChange = (e, { id, value }) => {
    this.setState({
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
    updateTeam(team.id, data);
  };

  validInput = () => {
    if (this.state.name.trim() == '') {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  };

  renderError = () => (
    <Message negative>
      <p>{ 'You are not the captain. You have no access.' }</p>
    </Message>
  );

  renderIsCaptain = () => {
    const { team, captain, user } = this.props;
    const { disabled, name, tentNumber, tentType } = this.state;
    return (
      <div>
        <Message positive attached>
          <p>{ 'You are the captain. You have access.' }</p>
        </Message>
        <Form className='attached fluid segment'>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              id="name"
              error={disabled}
              label="Team Name"
              placeholder="Team Name"
              value={name}
              onChange={this.onInputChange}
            />
            <Form.Input
              fluid
              id="tentNumber"
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
