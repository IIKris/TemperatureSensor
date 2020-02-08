const net = require('net');
const { SensorEntry } = require('./classes.js');
const database = require('./database.js');
const port = 8181;
const host = 'your-server-ip-here';  //Change to your server-ip

database
  .createDay()
  .then((res) => console.log('Day added'))
  .catch((err) => console.log(err));

const server = net.createServer();
server.listen(port, host, 1280, () => {
  console.log(`TCP Server in running on port ${port}.`);
});

server.on('connection', function(socket) {
  let data = [];
  socket.on('data', (chunk) => {
      data.push(chunk)
  });
  socket.on('end', () => {
    let obj = JSON.parse(Buffer.concat(data));
    let entry = new SensorEntry(new Date(), obj.temperature, obj.humidity);
    database.insertSingleEntry(entry).then(() => null, (err) => console.log(err));
  });
});
