import { push as pushRedux } from 'react-router-redux';

const push = route => (dispatch) => {
  dispatch(pushRedux(route));
}

export {
  push
}
