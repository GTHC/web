import React, { Component } from 'react';

import { Form, Divider } from 'semantic-ui-react';

class CreateShiftForm extends Component {

  onInputChange = (e, { value, id }) => {
    const { updateShiftData } = this.props;
    updateShiftData({
      [id]: value,
    });
  };

  render() {
    const { title, note, userIDs } = this.props;
    return (
      <Form>
        <Divider />
        <Form.Input
          id="title"
          label="Title"
          placeholder="Enter a title here"
          value={title}
          onChange={this.onInputChange}
        />
        <Form.TextArea
          id="note"
          label="Description"
          placeholder="Shift description"
          value={note}
          onChange={this.onInputChange}
        />
        <Form.Dropdown
          fluid multiple search selection
          label="Add users to new Shift"
          placeholder="(Default: You)"
          options={[]}
        />
      </Form>
    );
  }

}

export default CreateShiftForm;
