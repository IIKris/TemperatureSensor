#include <ESP8266WiFi.h>
#include <ArduinoJson.h>

#include "DHT.h"
#define DHTPIN 2
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

#ifndef STASSID
#define STASSID "your-ssid"           //change the ssid HERE
#define STAPSK  "your-wifi-password"  //change the Wifi-password HERE
#endif

const char* ssid     = STASSID;
const char* password = STAPSK;

const char* host = "your-server-ip";  //change the server-ip HERE
const uint16_t port = 8181;           //change the port HERE

void setup() {

  Serial.begin(9600);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  dht.begin(); //start sensor
}

void loop() {
  // Use WiFiClient class to create TCP connections
  WiFiClient client;
  if (!client.connect(host, port)) {
    delay(5000);
    return;
  }

  //read humidity and temperature data
  float hum = dht.readHumidity();
  float temp = dht.readTemperature();
  if (isnan(hum) || isnan(temp)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  //create a json object with the data form the sensor
  const int capacity = JSON_OBJECT_SIZE(2);
  StaticJsonDocument<capacity> doc;
  doc["temperature"].set(temp);
  doc["humidity"].set(hum);

  // This will send the json object to the server
  if (client.connected()) {
    serializeJson(doc, client);
  }

  // Close the connection
  client.stop();

  delay(5000); // execute once every 5 seconds
}
