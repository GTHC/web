import { push as pushRedux } from 'connected-react-router';

const push = route => (dispatch) => {
  dispatch(pushRedux(route));
}

export {
  push
}
