class Day {
  constructor(date) {
    this.dateWithoutTime = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
    this.count = 0;
    this.daydata = [];
  }
}

class SensorEntry {
  constructor(date, temp, hum) {
    this.date = date,
    this.temperature = temp,
    this.humidity = hum
  }
}

module.exports = {
  Day,
  SensorEntry
}
