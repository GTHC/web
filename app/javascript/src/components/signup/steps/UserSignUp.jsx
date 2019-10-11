import React, { Component } from 'react';

// semantic ui components
import { Form, Icon, Message } from 'semantic-ui-react';

class UserSignUp extends Component {
  constructor(props) {
    super(props);
    const data = props.data;
    this.state = {
      name: data.name,
      phone: data.phone,
    };
  }

  componentDidMount() {
    this.validInput();
  }

  onInputChange = (e, data) => {
    this.setState({ [data.id]: e.target.value },
      () => { this.validInput(); }
    );
  };

  validInput = () => {
    const { name, phone } = this.state;
    const { updateData, setDisableNext } = this.props;
    if (name === '' || phone === '') {
      setDisableNext(true);
      return;
    }

    this.setState({ errorMessage: '' });
    updateData(this.state);
    setDisableNext(false);
  };

  render() {
    const {
      name,
      phone,
      errorMessage,
    } = this.state;

    return (
      <div>
        <br />
        <Form>
          <Form.Input
            fluid
            value={name}
            id="name"
            label="Your Name"
            placeholder="Name"
            onChange={this.onInputChange}
          />
          <Form.Input
            fluid
            value={phone}
            id="phone"
            label="Phone Number"
            placeholder="Phone"
            onChange={this.onInputChange}
          />
        </Form>
        <br />
        <Message color="blue" header="Remember!">
          <Icon name="pencil" />
          Make sure you fill in all fields.
        </Message>
        <br />
      </div>
    );
  }
}

export default UserSignUp;
