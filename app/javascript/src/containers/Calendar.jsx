import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import NavBar from './NavBar';
import { Card, Dimmer, Icon, Image, Loader, Popup } from 'semantic-ui-react';

// components
import BigCal from '../components/calendar';
import Automate from '../components/automate';

// redux actions
import { checkSession } from './../actions/user';
import {
  getAllShifts,
  updateShift,
  createShift,
  deleteShift,
  dragDropUpdate,
} from '../actions/shifts';
import { getTeam } from '../actions/team';

// utils
import runOlson from '../utils/olson';

// images
import * as calGIF from './../images/calendar_record.gif'

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      loaderContent: '',
    }
  }

  componentDidMount() {
    const { getAllShifts, getTeam, user, checkSession } = this.props;
    checkSession();
    getAllShifts();
    getTeam(user.data.team_id);
  }

  onOlsonClick = (date, phase, clear, numOfDays) => {
    if (this.state.loader == false) {
      this.setState({ loader: true, loaderContent: 'Creating Shifts...' })
    }
    if (numOfDays == 0) {
      this.props.getAllShifts();
      this.setState({ loader: false, loaderContent: '' })
      return;
    } else {
      runOlson(date, phase, clear)
      .then(() => {
        if (numOfDays - 1 == 1) {
          this.setState({ loaderContent: `Creating Shifts for 1 more day...` })
        } else {
          this.setState({ loaderContent: `Creating Shifts for ${numOfDays - 1} more days...`})
        }
        const nextDate = new Date(date.getTime() + (3600 * 1000 * 24))
        this.onOlsonClick(nextDate, phase, clear, numOfDays - 1)
      })
    }
  }


  render () {
    const { loader, loaderContent } = this.state;

    const popupContent = (
      <span>
        <Image
          size="medium"
          src={calGIF}
        />
      </span>
    );

    return (
      <div>
        <Dimmer active={loader}>
          <Loader content={loaderContent} />
        </Dimmer>
        <NavBar />
        <div className="body">
          <Card fluid raised>
            <Automate onOlsonClick={this.onOlsonClick}/>
            <Card.Content>
              <div className="calendar">
                <BigCal {...this.props} />
              </div>
            </Card.Content>
            <Card.Content textAlign="center">
                <b>Having Trouble?</b> If you're trying to get a shift to end at 11:59, just create the shift higher up and drag down!
                <Popup
                  flowing
                  position="top center"
                  style={{ textAlign: 'center' }}
                  trigger={<Icon name="info circle" />}
                  content={popupContent}
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
    shifts: state.shifts,
    team: state.team,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      checkSession,
      getAllShifts,
      updateShift,
      createShift,
      deleteShift,
      dragDropUpdate,
      getTeam,
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

export {
  Calendar,
};
