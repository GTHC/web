import React from 'react';

import Forecast from 'react-forecast';

const Weather = (props) => {
    const kvillCoordinates = {
        lat: 35.9972,
        long: -78.9424
    };

    return (
        <Forecast
            latitude={kvillCoordinates.lat}
            longitude={kvillCoordinates.long}
            name='Kville'
        />
    );
}

export default Weather;