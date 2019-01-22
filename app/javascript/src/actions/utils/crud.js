import axios from "axios";
import { push } from "react-router-redux";

//const { INTERNAL_API_KEY } = process.env;
const INTERNAL_API_KEY = "hellopass";

const crud = request => dispatch => {
  dispatch({
    type: request.dispatch.begin
  });

  const secureRequestData = {
    ...request.data,
    api_key: INTERNAL_API_KEY
  };

  const options = {
    method: request.method,
    url: request.url,
    data: secureRequestData,
  }

  // added options
  if (request.headers) {
    options.headers = request.headers;
  }

  axios(options)
    .then(res => {
      dispatch({
        type: request.dispatch.end,
        payload: res
      });
      if (request.push) {
        dispatch(push(request.push));
      }
    })
    .catch(err => {
      dispatch({
        type: request.dispatch.fail,
        payload: err
      });
    });
};

export default crud;
