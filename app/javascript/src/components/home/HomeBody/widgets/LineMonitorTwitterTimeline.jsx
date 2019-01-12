import React from 'react';

// semantic-ui
import { Card } from 'semantic-ui-react';

// components
import { Timeline } from 'react-twitter-widgets';

const LineMonitorTwitterTimeline = () => (
  <Card>
    <Card.Content>
      <div>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'kville_nation',
          }}
          options={{
            username: 'TwitterDev',
            height: '400',
            width: '600',
          }}
        />
      </div>
    </Card.Content>
  </Card>
);

export default LineMonitorTwitterTimeline;
