import * as moment from 'moment';

/**
 * genDateFormat - gives a date array of [YYYY, MM, DD] from a Date object
 * @param  {Date} date [Date object]
 * @return {String}
 */
const genDateFormat = (date) => (moment(date).format('dddd, MMMM Do YYYY, h:mm a'));

/**
 * genDatesFormat - gives a string range between two dates
 * @param  {Date} start start date of a shift
 * @param  {Date} end   end date of a shift
 * @return {String}     string that will be outputted of the date range
 */
const genDatesFormat = (start, end) => {
  const startMoment = moment(start);
  const endMoment = moment(end);

  if (isSameDay(start, end)) {
    let startString = startMoment.format('dddd, MMMM Do YYYY, h:mm');
    const endString = endMoment.format('h:mm a');

    // if both dates don't happen at the same time of day (AM vs PM)
    if (startMoment.format('a') !== endMoment.format('a')) {
      startString = startMoment.format('dddd, MMMM Do YYYY, h:mm a');
    }

    return `${startString} - ${endString}`;
  } else {
    const startString = startMoment.format('dddd, MMMM Do YYYY, h:mm a');
    const endString = endMoment.format('dddd, MMMM Do YYYY, h:mm a');
    return `${startString} - ${endString}`;
  }
};

// checks if two date objects are on the same day
const isSameDay = (d1, d2) => (d1.getDate() === d2.getDate()
     && d1.getMonth() === d2.getMonth()
     && d1.getFullYear() === d2.getFullYear());

export {
  genDateFormat,
  genDatesFormat,
};
