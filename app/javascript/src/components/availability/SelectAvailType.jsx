import React, { Component } from 'react';

// semantic-ui
import {
  Checkbox,
  Form,
  Icon,
  Label,
  Popup,
} from 'semantic-ui-react';

class SelectAvailType extends Component {

  render() {
    const { value, handleChange } = this.props;

    const popupContent = (
      <span>
        When creating your Availability Calendar, you can switch between the options below to help your captain (or whomever is making a shift) know how available you are.
        <br />
        <br />
        <p>
          <Label circular color="green">Available</Label>:
          means you are able to tent at this time 100% of the time.
        </p>
        <p>
          <Label circular color="yellow">Somewhat Available</Label>:
           means you are able to tent, only if necessarry due to other commitments (travelling from East, end of classes, etc.).
        </p>
         <p>
           <Label circular color="red">Unavailable</Label>:
           this means you are absolutely unable to come (this will be represent by the blank spaces on your calendar).
         </p>
      </span>
    );

    return (
      <div>
        <Form>
          <Form.Field>
            Select your availability type and then, drag and drop your availabilities below!
            <Popup
              flowing
              header="Availability Info"
              style={{ textAlign: 'center' }}
              trigger={<Icon name="info circle" />}
              content={popupContent}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label='Available'
              name='checkboxRadioGroup'
              checked={value === false}
              onChange={handleChange}
            />
            <Icon color='green' name='check circle' size="big" />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label='Somewhat Available'
              name='checkboxRadioGroup'
              checked={value === true}
              onChange={handleChange}
            />
            <Icon color="yellow" name="question circle" size="big" />
          </Form.Field>
        </Form>
        <br />
        <br />
      </div>
    );
  }

}

export default SelectAvailType;
