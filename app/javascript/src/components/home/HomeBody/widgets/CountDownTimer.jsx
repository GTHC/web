import React from 'react';

// semantic-ui
import { Card } from 'semantic-ui-react';

// components
import { Timeline } from 'react-twitter-widgets';
import Countdown from 'react-count-down';

// styling
import count from './count.css';

const CountDownTimer = () => {
  const options = { endDate: '03/07/2020 6:00 PM' };

  return (
    <Card centered fluid>
      <Card.Content>
        <Card.Header
          as="h1"
          textAlign="center"
          content="Countdown to Duke vs. UNC"
        />
      </Card.Content>
      <Card.Content textAlign="center">
        <Countdown options={options}/>
      </Card.Content>
    </Card>
  );
};

export default CountDownTimer;
