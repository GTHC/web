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

    // this allows us to gen url for local images in order
    // to preview images after selecting
    fileReader.onloadend = () => {
      this.setState({ avatarFile, src: fileReader.result });
    };

    if (avatarFile && this.isImage(avatarFile)) {
      fileReader.readAsDataURL(avatarFile);
    }
  };

  isImage = file => (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg');

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
    const { user } = this.props;
    const { src } = this.state;
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
          <Form.Button onClick={this.onSave}>Save</Form.Button>
        </Form>
      </div>
    );
  }

}

export default EditUserAvatar;
