/**
 * genDateFormat - gives a date array of [YYYY, MM, DD] from a Date object
 * @param  {Date} date [Date object]
 * @return {String}
 */
const genDateFormat = (date) => {
  const dateString = date.toDateString();
  const formattedDateString = dateString.substring(0, dateString.length - 5) + ',' + dateString.substring(dateString.length - 5);
  return `${formattedDateString} at ${date.toLocaleTimeString()}`;
};

export default genDateFormat;
