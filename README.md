# Temperature Sensor with ESP8266 and NodeJS

To use this project for your own, you need to change the *server-ip* and *port* in [./server/server.js](./server/server.js)
and you need to change the *ssid*, *Wifi-password*, *server-ip* and *port* in [./esp8266/datatransfer.ino](./esp8266/datatransfer.ino).

* The Client is build with the ESP8266 (ESP-12E) board and the DHT22 sensor.
* In this project the TCP protocol is used to send the data form the board to a server (in my case a raspberry pi).
* On the server, NodeJS is used for data handling and MongoDB to store the received data.


More information about creating a JSON object in a .ino file can be found [here](https://arduinojson.org).

I use a normal power bank to power the ESP8266.


Here are some more information for beginners in the IoT-World:
* You need to add "_ArduinoJSON_" and "_SimpleDHT_" to your Arduino-library
* On the board i used, you need to connect the pins as follows:  

Sensor-Pin    | Borad-Pin    
---------- | ---------
 \+ | 3v3
 out | D4
 \- | GND
* __First__ You need to compile and upload the [code](./esp8266/datatransfer.ino) to the board and __after__ that you can connect the sensor (in order out, -, +)
