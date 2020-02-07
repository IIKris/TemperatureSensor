const net = require('net');

net
  .createServer(socket => {
    socket.on('readable', () => {
      const data = socket.read();
      if(Buffer.isBuffer(data)) {
        console.log(data.toString());
      }
    });
  })
  .listen(8181, 'your-server-ip-here'); //change the port and ip here
