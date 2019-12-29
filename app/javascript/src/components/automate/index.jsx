import React, { Component } from 'react';

// semantic-ui
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Header,
  Message,
  Modal,
} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';

class Automate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: false,
      clear: true,
      date: this.formatDate((new Date())),
      dateTo: '',
      phase: "Black",
    }
  }

  formatDate = (date) => {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day} ${year}`;
}



  handleChange = (e, {name, value}) => {
    this.setState({ [name]: value });
  }

  handleCheckboxChange = (_, { checked }) => {
    this.setState({ clear: checked })
  }

  onClick = () => {
    if (!this.checkInputs()) {
      return;
    }
    const { phase, clear, date, dateTo } = this.state;
    const { onOlsonClick } = this.props;
    const startDate = new Date(date)
    const endDate = new Date(dateTo)

    if (isNaN(endDate.getTime()) || startDate.getTime() == endDate.getTime()) {
      this.setState({ loader: true })
      onOlsonClick(startDate, phase, clear, 1)
    } else {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      onOlsonClick(startDate, phase, clear, diffDays + 1)

    }
    this.close()
  }

  checkInputs = () => {
    const { date } = this.state;
    if (date.trim() == '' ||  isNaN((new Date(date)).getTime())) {
      this.setState({ error: true })
      return false;
    } else {
      this.setState({ error: false })
      return true;
    }
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

    const { clear, date, dateTo, error, phase} = this.state;
    return (
      <Modal
        closeIcon
        closeOnDimmerClick={false}
        open={this.state.open}
        trigger={<Button primary><h3>Generate Shifts</h3></Button>}
        onOpen={this.open}
        onClose={this.close}
      >
        <Header icon="fire" content="Create shifts based on team availability!"/>
        <Modal.Content>
          <Modal.Description>
            <b>GTHC's Schedule Automation works best when everyone has their availabilities up to date!</b>
            <p>
              GTHC can automatically create shifts and assign them based on user availability, and tenting rules based on tenting type. Just fill in which date and tenting type you would like to automate scheduling for below.
            </p>
          </Modal.Description>
          <Divider />
          <DateInput
            clearable={false}
            label='Date - From (Required)'
            closable
            placeholder='Date'
            name='date'
            dateFormat="MMMM D YYYY"
            iconPosition='left'
            popupPosition='bottom right'
            value={date}
            onChange={this.handleChange}
          />
          <DateInput
            clearable={false}
            minDate={date}
            label='To (Optional)'
            closable
            placeholder='Date'
            name='dateTo'
            dateFormat="MMMM D YYYY"
            iconPosition='left'
            popupPosition='bottom right'
            value={dateTo}
            onChange={this.handleChange}
          />
          <Form.Dropdown
            name="phase"
            selection
            label='Tenting Type'
            options={phaseDropdownOptions}
            onChange={this.handleChange}
            defaultValue={phase}
          />
          <Checkbox
            label="Clear older shifts on same day(s)"
            checked={clear}
            onChange={this.handleCheckboxChange}
          />
          <Message
            warning
            hidden={!error}
            icon="warning sign"
            header="Fill in Required Date"
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
