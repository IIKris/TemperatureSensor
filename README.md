# Temperature Sensor

* The Client is build with the ESP8266 (ESP-12E) board and the DHT22 sensor.
* In this project the TCP protocol is used to send the data form the board to a server (in my case a raspberry pi).
* On the server NodeJS is used for data handling and MongoDB to store the received data.


Further informations about how to create a JSON Object in a .ino file can be found [here](https://arduinojson.org).

For the power supply of the ESP8266 i use a normal powerbank.
