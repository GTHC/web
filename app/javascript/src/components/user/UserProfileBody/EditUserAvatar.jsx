import React, { Component } from 'react';

import { Image, Form } from 'semantic-ui-react';

import axios from 'axios';

class EditUserAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      savePressed: false,
      avatarFile: null,
    };
  }

  onFileChange = (e, data) => {
    const avatarFile = e.currentTarget.files[0];
    this.setState({ avatarFile });
  };

  onSave = () => {
    const formData = new FormData();
    formData.append('avatarFile', this.state.avatarFile);

    // TODO: Remove this comment
    // function request to refer to:
    // axios.post('/api/v1/user/avatar', formData, {
    //   headers: { 'Content-Type': 'form-data' },
    // })
    // .then(res => console.log(res))
    // .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Form>
          <Form.Input
            type="file"
            id="avatarFile"
            onChange={this.onFileChange}
          />
          <Form.Button onClick={this.onSave}>Save</Form.Button>
        </Form>
      </div>
    );
  }

}

export default EditUserAvatar;
