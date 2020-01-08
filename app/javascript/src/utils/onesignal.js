import axios from 'axios';

const getKeys = () => (
  axios.get('/api/v1/onesignal/keys')
)

export {
  getKeys,
}
