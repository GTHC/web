import axios from 'axios';

const getShiftAvailability = (day, starting, ending) => (
  axios.get(`/api/v1/team/availability?day=${day}&starting=${starting}&ending=${ending}`)
);

export default getShiftAvailability;
