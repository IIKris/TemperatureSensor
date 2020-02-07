# Temperature Sensor

To use this project for your own, you need to change the *server-ip* and *port* in [*server.js*](./server/server.js)
and you need to change the *ssid*, *Wifi-password*, *server-ip* and *port* in [*datatransfer.ino*](./esp8266/datatransfer.ino).

* The Client is build with the ESP8266 (ESP-12E) board and the DHT22 sensor.
* In this project the TCP protocol is used to send the data form the board to a server (in my case a raspberry pi).
* On the server NodeJS is used for data handling and MongoDB to store the received data.


Further informations about how to create a JSON Object in a .ino file can be found [here](https://arduinojson.org).

For the power supply of the ESP8266 i use a normal powerbank.
