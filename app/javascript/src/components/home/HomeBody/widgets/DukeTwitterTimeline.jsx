import React from 'react';

import { Card } from 'semantic-ui-react';
import { Timeline } from 'react-twitter-widgets';

const DukeTwitterTimeline = () => (
  <Card fluid>
    <Card.Content>
      <div>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'dukembb',
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

export default DukeTwitterTimeline;
