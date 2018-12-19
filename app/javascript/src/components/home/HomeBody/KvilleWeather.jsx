import React from 'react';

import { Card } from 'semantic-ui-react';
import Forecast from 'react-forecast';

const Weather = (props) => {
  const kvillCoordinates = {
      lat: 35.9972,
      long: -78.9424,
    };

  return (
    <Card fluid>
      <Card.Content>
        <Forecast
            latitude={kvillCoordinates.lat}
            longitude={kvillCoordinates.long}
            name='K-Ville'
        />
      </Card.Content>
    </Card>
  );
};

export default Weather;
