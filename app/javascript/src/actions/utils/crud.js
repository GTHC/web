import axios from 'axios';
import { push } from 'react-router-redux';

const crud = request => (dispatch) => {
  console.log(request.url);
  dispatch({
      type: request.dispatch.begin,
    });
  axios({
      method: request.method,
      url: request.url,
      data: request.data ? request.data : null,
    })
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
