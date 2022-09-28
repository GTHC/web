import axios from 'axios';
import { push } from 'connected-react-router';

const crud = request => (dispatch) => {
  dispatch({
      type: request.dispatch.begin,
    });
  const options = {
    method: request.method,
    url: request.url,
    data: request.data ? request.data : null,
  };

  // added options
  if (request.headers) {
    options.headers = request.headers;
  }

  axios(options)
    .then((res) => {
      dispatch({
            type: request.dispatch.end,
            payload: res,
          });
      if (request.push) {
        dispatch(push(request.push));
      }
    })
    .catch((err) => {
      dispatch({
           type: request.dispatch.fail,
           payload: err,
         });
    });
};

export default crud;
