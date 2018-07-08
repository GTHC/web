import React from 'react';

import { Timeline } from 'react-twitter-widgets'

const DukeTwitterTimeline = () => (
  <div style={{ display: 'inline', float: 'right' }}>
    <Timeline
      dataSource={{
        sourceType: 'profile',
        screenName: 'dukembb'
      }}
      options={{
        username: 'TwitterDev',
        height: '400',
        width: '400'
      }}
    />
  </div>
)

export default DukeTwitterTimeline;
