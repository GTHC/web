// Hack around
// https://github.com/ReactTraining/react-router/issues/5072
import { connect } from 'react-redux';
import { Routes } from 'react-router-dom';

const mapStateToProps = state => ({
  location: state.router.location,
});

const ConnectedSwitch = connect(mapStateToProps)(Routes);

export default ConnectedSwitch;
