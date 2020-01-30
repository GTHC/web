import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// containers
import NavBar from './NavBar';

// components
import { Card, Image, Icon, Label, Popup } from 'semantic-ui-react';

import AvailCal from './../components/availability';

// redux actions
import {
  checkSession,
  putAvail,
  postAvail,
  deleteAvail,
  dragDropUpdate,
} from '../actions/user';

// images
import * as availGIF from './../images/availability_record.gif'

class Availability extends Component {
  componentDidMount() {
    this.props.checkSession();
  }

  render() {
    const {
      user,
      putAvail, postAvail, deleteAvail, dragDropUpdate,
    } = this.props;

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

    const bottomPopupContent = (
      <span>
        <Image
          size="medium"
          src={availGIF}
        />
      </span>
    );

    return (
      <div>
        <NavBar />
        <div className="body">
          <Card fluid raised>
            <Card.Content as="h5" textAlign="center">
                Drag and drop to add an availability event. Click an availability event to edit.
                <Popup
                  flowing
                  header="Availability Info"
                  position="bottom center"
                  style={{ textAlign: 'center' }}
                  trigger={<Icon name="info circle" />}
                  content={popupContent}
                />
            </Card.Content>
            <Card.Content>
              <div className="calendar">
                <AvailCal
                  availabilities={user.data.availabilities}
                  putAvail={putAvail}
                  postAvail={postAvail}
                  deleteAvail={deleteAvail}
                  dragDropUpdate={dragDropUpdate}
                />
              </div>
            </Card.Content>
            <Card.Content textAlign="center">
                <b>Having Trouble?</b> If you're trying to get a shift to end at 11:59, just create the shift higher up and drag down!
                <Popup
                  flowing
                  position="top center"
                  style={{ textAlign: 'center' }}
                  trigger={<Icon name="info circle" />}
                  content={bottomPopupContent}
                />
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }

}

// connecting to redux

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      checkSession,
      putAvail,
      postAvail,
      deleteAvail,
      dragDropUpdate,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Availability);

export {
  Availability,
};
