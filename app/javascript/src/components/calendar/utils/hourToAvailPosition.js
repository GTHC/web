/**
 * hourToAvailPosition - get aprox. position of date in Availability component
 *                       which runs from 7 AM - 2AM
 * @param  {[Date]} date [Date object of either the start or end time of a shift]
 * @param {[boolean]} isEnd [tells function if this is for a start or end]
 * @return {[number]}      [row number in Availability grid]
 */
const hourToAvailPosition = date => {
  let output = date.getHours() - 4;
  if (output === -4) {
    output = 0; // 12 am
  } else if (output === -3) {
    output = 1; // 1 am
  } else if (output < 3) {
    output = 2; // 2 am - 7 am (night shift)
  }

  return output;
};

export default hourToAvailPosition;
