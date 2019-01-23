import React, { Component } from 'react';

// semantic-ui
import {
  Button,
  Checkbox,
  Form,
  Icon,
  Modal,
} from 'semantic-ui-react';

class ModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
    };
  }

  handleChange = () => {
    const { putAvail, event } = this.props;
    const newSomewhat = !event.somewhat;
    putAvail(event.id, {
      ...event,
      somewhat: newSomewhat,
    });
    event.somewhat = newSomewhat;
  };

  handleDelete = () => {
    const { deleteAvail, onClose, event } = this.props;
    deleteAvail(event.id);
    this.setState({
      open: false,
    });
    onClose();
  };

  render() {
    const {
      event,
      open,
      putAvail, deleteAvail,
      onOpen, onClose,
    } = this.props;
    return (
      <div>
        <Modal
          closeIcon
          open={open}
          onOpen={onOpen}
          onClose={onClose}
        >
          <Modal.Header>Update Availability</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <Checkbox
                  radio
                  label='Available'
                  name='checkboxRadioGroup'
                  checked={event.somewhat === false}
                  onChange={this.handleChange}
                />
                <Icon color='green' name='check circle' size="big" />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label='Somewhat Available'
                  name='checkboxRadioGroup'
                  checked={event.somewhat === true}
                  onChange={this.handleChange}
                />
                <Icon color="yellow" name="question circle" size="big" />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.handleDelete}>
              Delete
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

}

export default ModalUpdate;
