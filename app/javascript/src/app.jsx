import React, { Component } from 'react';

// redux tools
import { Provider } from 'react-redux';

// redux persist
import { PersistGate } from 'redux-persist/es/integration/react';

// containers
import App from './containers/App'

// CSS/styling
import 'semantic-ui-css/semantic.min.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import { configureStore, DevTools, history } from './utils/store';

const { store, persistor } = configureStore();


class Kville extends Component {
    componentDidMount() {
        // Adding OneSignal script for notifications
        const script = document.createElement("script");
        script.async = "";
        script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";
        document.body.appendChild(script);
    }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <div>
            <App history={history} />
            { process.env.NODE_ENV === 'development' ?
              <DevTools /> : null
            }
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default Kville;
