import * as moment from 'moment';

/**
 * genDateFormat - gives a date array of [YYYY, MM, DD] from a Date object
 * @param  {Date} date [Date object]
 * @return {String}
 */
const genDateFormat = (date) => (moment(date).format('dddd, MMMM Do YYYY, h:mm a'));

const genDateFormatWithoutTime = date => (moment(date).format('dddd, MMMM Do YYYY '));

const genDateJustTime = date => (moment(date).format('h:mm a'));

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

/**
 * timeIsLater - checks if string time is later in the day than limiter Date object
 * @param  {String} time      [time created by ShiftTimeInput]
 * @param  {Date} dateLimit   [start or end date of shift]
 * @return {boolean}          [is the time later than the limiter]
 */
const timeIsLater = (time, dateLimit) => {

  // translates a time string to a new Date() with correct
  // time string -> moment w time
  const a = moment(time, 'hh:mm a');

  // translates Date object -> time string -> moment w time
  const limitString = moment(dateLimit).format('hh:mm a');
  const b = moment(limitString, 'hh:mm a');

  return moment.max(a, b) == a;
};

/**
 * timeToDate - takes time string from ShiftTimeInput and converts to date object with said time and same date as the date input
 * @param  {[string]} time [input on ShiftTimeInput]
 * @param  {[Date]} date [start or end Date object for shift]
 * @return {[Date]}      [new Date object that will replace original start or end date]
 */
const timeToDate = (time, date) => {
  const dateString = moment(date).format('MMMM Do YYYY');
  const newDateMoment = moment(`${dateString} ${time}`, 'MMMM Do YYYY hh:mm a');
  return newDateMoment.toDate();
};

export {
  genDateFormat,
  genDatesFormat,
  genDateFormatWithoutTime,
  genDateJustTime,
  timeIsLater,
  timeToDate,
};
