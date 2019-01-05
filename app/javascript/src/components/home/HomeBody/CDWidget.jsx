import React from 'react';
import { Card } from 'semantic-ui-react';
import { Timeline } from 'react-twitter-widgets';
import Countdown from 'react-count-down'
import ReactDOM from 'react-dom'
import count from './count.css'; 

const CountDownTimer = () => {

  const OPTIONS = { endDate: '02/22/2019 9:00 PM'}

  return(
    <Card fluid>
      <Card.Content>
        <div>
      <div class="ui huge header"> 
      <div class = "center aligned header">
      Count Down to Duke vs UNC:</div></div>
    <p></p>       
    <Countdown options = {OPTIONS}/>               
        </div>
      </Card.Content>
    </Card>
  );
  };

export default CountDownTimer;




