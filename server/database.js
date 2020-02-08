const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const { Day } = require('./classes.js');

/*
Conenct to the mongodb collection
*/
function connect() {
  return new Promise((resolve, reject) => {
    const url = 'mongodb://localhost:27017/';
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true } ,function (err, client) {
      const dbo = client.db('sensordb');
      const collection = dbo.collection('alldata');
      resolve({collection, client});
    });
  });
}

/*
create a new Day entry in mongodb
*/
function createDayEntry() {
  return connect().then(({ collection, client}) => {
    return new Promise((resolve, reject) => {
      let date = new Date();
      let datum = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
      collection.findOne({"dateWithoutTime": datum}, async (err, res) => {
        if(err) {
          reject(err);
        } else if(res === null) {
          let day = new Day(date);
          await collection.insertOne(day, { safe: true }, (error, result) => {
            if(error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        } else {
          reject();
        }
        client.close();
      });
    });
  });
}

/*
Push an entry to "daydata"
*/
function insert(data) {
  return connect().then(({ collection, client }) => {
    return new Promise((resolve, reject) => {
      let date = new Date();
      let datum = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
      collection.updateOne(
        {"dateWithoutTime": datum},
        { $push: { daydata: data}, $inc: { count: 1 }},
        (err, res) => {
          if(err) {
            reject(err);
          } else {
            resolve(res);
          }
          client.close();
      });
    });
  });
}

module.exports = {
  createDay() {
    return createDayEntry();
  },
  insertSingleEntry(data) {
    return insert(data);
  },
}
