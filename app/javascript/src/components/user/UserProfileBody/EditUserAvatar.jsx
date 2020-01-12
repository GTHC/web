import React, { Component } from 'react';

// semantic-ui
import { Dimmer, Image, Form, Loader, Message } from 'semantic-ui-react';

// images
import * as defaultSrc from '../../../images/default_image.png';


class EditUserAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarFile: null,
      disabled: true,
      loading: props.user.isLoading,
      savePressed: false,
      src: props.user.data.avatarURL || defaultSrc,
    };
  }

  onFileChange = (e, data) => {
    const avatarFile = e.currentTarget.files[0];
    const fileReader = new FileReader();

    // this (onloadend) allows us to gen url for local images in order
    // to preview images after selecting
    fileReader.onloadend = () => {
      this.setState({ avatarFile, src: fileReader.result, disabled: false, savePressed: false });
    };

    if (avatarFile && this.isImage(avatarFile)) {
      // if the avatarFile is valid, the fileReader will call the onloadend function
      fileReader.readAsDataURL(avatarFile);
    } else {
      this.setState({ disabled: true, savePressed: false });
    }
  };

  isImage = file => (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg');

  onSave = () => {
    // Active Storage on rails needs a form data type
    // in order to attach an avatar file to a user
    const formData = new FormData();
    formData.append('avatarFile', this.state.avatarFile);
    this.props.postAvatar(formData);
    this.setState({ savePressed: true });
  };

  render() {
    const { error } = this.props.user;
    const {
      disabled,
      loading,
      src,
      savePressed,
    } = this.state;
    return (
      <div>
        <Form className='attached fluid segment'>
          <Image
            rounded
            bordered
            size="medium"
            src={src}
          />
          <br />
          <Form.Input
            type="file"
            id="avatarFile"
            onChange={this.onFileChange}
          />
          <Form.Button disabled={disabled} onClick={this.onSave}>Save</Form.Button>
        </Form>
        { loading && savePressed &&
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
            content="Avatar has been updated."
          />
        }
        {
          !loading && savePressed && error &&
          <Message
            negative
            attached
            icon="x"
            header="Error"
            content="Avatar has not been updated."
          />
        }
      </div>
    );
  }

}

export default EditUserAvatar;
