import axios from 'axios';

const getTeamAvailability = (start_time, end_time) => (
  axios.put('/api/v1/team/availabilities', {
    start_time,
    end_time,
  })
);

export default getTeamAvailability;
