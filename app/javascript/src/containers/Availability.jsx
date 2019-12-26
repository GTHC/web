import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// containers
import NavBar from './NavBar';

// components
import { Card } from 'semantic-ui-react';

import AvailCal from './../components/availability';

// redux actions
import {
  checkSession,
  putAvail,
  postAvail,
  deleteAvail,
  dragDropUpdate,
} from '../actions/user';


class Availability extends Component {
  componentDidMount() {
    this.props.checkSession();
  }

  render() {
    const {
      user,
      putAvail, postAvail, deleteAvail, dragDropUpdate,
    } = this.props;
    return (
      <div>
        <NavBar />
        <Card fluid raised>
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
        </Card>
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
