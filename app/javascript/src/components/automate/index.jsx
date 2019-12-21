import React, { Component } from 'react';

// semantic-ui
import { Button, Divider, Dropdown, Header, Modal, Checkbox } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';

class Automate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      date: (new Date()).toDateString(),
      clear: true,
      phase: "Black",
    }
  }

  handleChange = (e, {name, value}) => {
    this.setState({ [name]: value });
  }

  handleCheckboxChange = (_, { checked }) => {
    this.setState({ clear: checked })
  }

  onClick = () => {
    const { phase, clear } = this.state;
    const date = new Date(this.state.date)
    this.props.onOlsonClick(date, phase, clear);
    this.close()
  }

  close = () => {
    this.setState({
      open: false,
    })
  }

  open = () => {
    this.setState({
      open: true,
    })
  }

  render() {
    const phaseDropdownOptions = [
      {
        key: 'black',
        value: 'Black',
        text: 'Black',
        label: { color: 'black', empty: true, circular: true },
      },
      {
        key: 'blue',
        value: 'Blue',
        text: 'Blue',
        label: { color: 'blue', empty: true, circular: true },
      },
      {
        key: 'white',
        value: 'White',
        text: 'White',
        label: { empty: true, circular: true },
      }
    ];
    return (
      <Modal
        closeIcon
        closeOnDimmerClick={false}
        open={this.state.open}
        trigger={<Button primary>Generate Shifts</Button>}
        onOpen={this.open}
        onClose={this.close}
      >
        <Header icon="fire" content="Create shifts based on team availability!"/>
        <Modal.Content>
          <Modal.Description>
            <b>GTHC's Tenting Algorithm works best when everyone has their availabilities up to date!</b>
            <p>
              GTHC can automatically create shifts and assign them based on user availability, and tenting rules based on tenting type. Just fill in which date and tenting type you would like to automate scheduling for below.
            </p>
          </Modal.Description>
          <Divider />
          <DateInput
            closable
            placeholder='Date'
            name='date'
            dateFormat="MMMM D YYYY"
            iconPosition='left'
            popupPosition='bottom right'
            value={this.state.date}
            onChange={this.handleChange}
          />
          <Dropdown
            name="phase"
            selection
            placeholder='Tenting Type'
            options={phaseDropdownOptions}
            onChange={this.handleChange}
            defaultValue={this.state.phase}
          />
          <br />
          <br />
          <Checkbox
            label="Clear older shifts on same day(s)"
            checked={this.state.clear}
            onChange={this.handleCheckboxChange}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={this.onClick}>Automate</Button>
        </Modal.Actions>
      </Modal>
    );
  }

}

export default Automate;
