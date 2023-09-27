const jalaliMoment = require("jalali-moment");
class PersianDate {
  constructor() {
    this.now;
  }
  now() {
    const now = jalaliMoment();
    const formattedDate = now.format("jYYYY/jM/jD HH:mm:ss");
    return formattedDate;
  }
}
module.exports = PersianDate;
