const moment = require('moment');

const getWeek = (date) =>  moment(date).isoWeek();

module.exports = { getWeek };
