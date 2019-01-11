import React from 'react';

// semantic-ui
import { Card } from 'semantic-ui-react';

// components
import { Timeline } from 'react-twitter-widgets';
import Countdown from 'react-count-down';

// styling
import count from './count.css';

const CountDownTimer = () => {
  const options = { endDate: '02/20/2019 9:00 PM' };

  return (
    <Card fluid>
      <Card.Content>
        <div>
          <div className="ui huge header">
          <div className="center aligned header">
          Count Down to Duke vs UNC:</div></div>
          <Countdown options = {options}/>
        </div>
      </Card.Content>
    </Card>
  );
};

export default CountDownTimer;
