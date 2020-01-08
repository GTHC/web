import axios from 'axios';

const runOlson = (date, phase, clear) => (
  axios.put('/api/v1/olson', {
    date,
    phase,
    clear,
  })
)

export default runOlson;
