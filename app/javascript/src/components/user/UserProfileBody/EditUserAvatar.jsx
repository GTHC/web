import React, { Component } from 'react';

// semantic-ui
import { Image, Form } from 'semantic-ui-react';

// images
import * as defaultSrc from '../../../images/default_image.png';


class EditUserAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      savePressed: false,
      avatarFile: null,
      src: props.user.avatarURL || defaultSrc,
    };
  }

  onFileChange = (e, data) => {
    const avatarFile = e.currentTarget.files[0];
    const fileReader = new FileReader();

    // this (onloadend) allows us to gen url for local images in order
    // to preview images after selecting
    fileReader.onloadend = () => {
      this.setState({ avatarFile, src: fileReader.result, disabled: false, });
    };

    if (avatarFile && this.isImage(avatarFile)) {
      // if the avatarFile is valid, the fileReader will call the onloadend function
      fileReader.readAsDataURL(avatarFile);
    } else {
      this.setState({ disabled: true });
    }
  };

  isImage = file => (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg');

  onSave = () => {

    // Active Storage on rails needs a form data type
    // in order to attach an avatar file to a user
    const formData = new FormData();
    formData.append('avatarFile', this.state.avatarFile);
    this.props.postAvatar(formData);

    // TODO: Remove this comment
    // function request to refer to:
    // axios.post('/api/v1/user/avatar', formData, {
    //   headers: { 'Content-Type': 'form-data' },
    // })
    // .then(res => console.log(res))
    // .catch(err => console.log(err));
  };

  render() {
    const { user } = this.props;
    const { src, disabled } = this.state;
    return (
      <div>
        <Image
          rounded
          bordered
          size="medium"
          src={src}
        />
        <Form>
          <Form.Input
            type="file"
            id="avatarFile"
            onChange={this.onFileChange}
          />
          <Form.Button disabled={disabled} onClick={this.onSave}>Save</Form.Button>
        </Form>
      </div>
    );
  }

}

export default EditUserAvatar;
