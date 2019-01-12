import axios from 'axios';

const getHourBreakdown = () => (
  axios.get(`/api/v1/team/hours`)
);

export default getHourBreakdown;
