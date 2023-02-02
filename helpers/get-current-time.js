const moment = require("moment/moment");

module.exports.getTimeInMills = () => moment().valueOf();
module.exports.getTodaysDate = () => moment().format("L");
module.exports.getTodaysTime = () => moment().format("LTS");
module.exports.getYearsInMills = (year) =>
  moment.duration(year, "y").asMilliseconds();
