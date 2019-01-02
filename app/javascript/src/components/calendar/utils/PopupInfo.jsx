import React, { PureComponent } from 'react';

import { Icon, Popup, Label } from 'semantic-ui-react';

class PopupInfo extends PureComponent {

  render() {
    const content = (
      <div>
        <p>
          The colors represent the users availability.
        </p>
        <Label circular color="green">Available</Label>
        <Label circular color="yellow">Somewhat Available</Label>
        <Label circular color="red">Unavailable</Label>
      </div>
    );
    return (
      <Popup
        flowing
        style={{ textAlign: 'center' }}
        trigger={<Icon name="info circle" />}
        content={content}
      />
    );
  }

}

export default PopupInfo;
