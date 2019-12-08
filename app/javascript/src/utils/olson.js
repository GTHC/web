import axios from 'axios';

const runOlson = (date, phase) => (
  axios.put('/api/v1/olson', {
    date,
    phase,
  })
)

export default runOlson;
