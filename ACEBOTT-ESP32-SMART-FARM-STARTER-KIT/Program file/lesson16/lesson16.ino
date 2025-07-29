#include <Arduino.h>
#include <string>
#include <Wire.h>
#include <Adafruit_NeoPixel.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <U8g2lib.h>
#include <ESP32Servo.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <NTPClient.h>
#include <WebServer.h>

// Version
#define FIRMWARE_VERSION "20241021 P"

// Set WIFI name
#define WIFI_SSID "jrii"

// Set WIFI password
#define WIFI_PASSWORD "12345678"

// Connection timeout in seconds
#define WIFI_CONNECT_MAX_TIMEOUT 5

// WEB server port
#define WEB_SERVER_PORT 80
#define ALL_SENSOR_HTTP_PATH "/all"
WebServer server(WEB_SERVER_PORT); // WIFI server
int wifiConnectRetryNum = 0;       // WIFI connection retry count
int wifiConnectState = false;      // WIFI connection status
unsigned long wifiHeartbeatTime = 0;
long secondCount = 0; // Total number of seconds since startup

// Touch button
#define TOUCH_PIN 18

// Human infrared sensor
#define HUMAN_PIN 33

// Light sensor
#define BRIGHTNESS_PIN 34
#define BRIGHTNESS_MAX_VALUE 3500

// Soil moisture sensor
#define SOIL_MOISTURE_PIN 35
#define SOIL_MOISTURE_LEVEL_MAX_VALUE 100

// Water level sensor
#define WATER_LEVEL_PIN 36
#define WATER_LEVEL_MAX_VALUE 1500

// Temperature and humidity sensor
#define DHT11_PIN 23
DHT dht(DHT11_PIN, DHT11);

// Servo
Servo servo;
#define SERVO_PIN 4
#define SERVO_ANGLE_OPEN 0
#define SERVO_ANGLE_CLOSE 90
#define SERVO_HTTP_PATH "/door"

// Buzzer
#define BUZZER_PIN 25
// Water pump
#define WATER_PUMP_PIN 5
// LED
#define LED_PIN 27
#define LED_HTTP_PATH "/led"

// WS2812
#define WS2812_PIN 13
#define WS2812_NUM 4
#define WS2812_COLOR pixels.Color(r.toInt(), g.toInt(), b.toInt())
#define WS2812_COLOR_RED pixels.Color(255, 0, 0)
#define WS2812_COLOR_BLUE pixels.Color(0, 0, 255)
#define WS2812_COLOR_BLACK pixels.Color(0, 0, 0)
#define WS2812_HTTP_PATH "/rgb"
String r = "128";
String g = "128";
String b = "128";
Adafruit_NeoPixel pixels(WS2812_NUM, WS2812_PIN, NEO_GRB + NEO_KHZ800);

// OLED screen
U8G2_SSD1306_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE);

// Weather-related variables
String nameen = "";                                                     // English City Name
String wde = "";                                                        // Direction of wind
String wse = "";                                                        // Wind speed
String temp = "";                                                       // Temperature
String sd = "";                                                         // Humidity
String weather = "";                                                    // The weather
String pm25 = "";                                                       // PM2.5
String weekDays[7] = {"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"}; // Week enumeration

// Time UDP
WiFiUDP ntpUDP;
// Time
NTPClient timeClient(ntpUDP, "ntp1.aliyun.com", 60 * 60 * 8, 30 * 60 * 1000);

// Cancel automatic control
bool cancelAutoMode = false;

// String display on screen
void drawStr(uint8_t x, uint8_t y, String str)
{
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_timR10_tf);
  u8g2.setFontPosTop();
  u8g2.drawStr(x, y, str.c_str());
  u8g2.sendBuffer();
}

// Acquisition of human infrared sensors  // 0 nobody  1 Somebody
int getHumanValue()
{
  return digitalRead(HUMAN_PIN);
}

// Get the water level
int getWaterLevelValue()
{
  return analogRead(WATER_LEVEL_PIN);
}

// Get the soil moisture value
int getSoilMoistureValue()
{
  return analogRead(SOIL_MOISTURE_PIN);
}

// Whether the button is pressed or not  // 0 press   1 No press
int getButtonValue()
{
  return digitalRead(TOUCH_PIN);
}

// Set pump status
void setWaterPumpValue(int val)
{
  digitalWrite(WATER_PUMP_PIN, val);
}

// Set LED status
void setLedValue(int val)
{
  digitalWrite(LED_PIN, val);
}

// Get LED status
int getLedValue()
{
  return digitalRead(LED_PIN);
}

// Get the temperature value
float getTemperatureValue()
{
  return dht.readTemperature();
}

// Get humidity value
float getHumidityValue()
{
  return dht.readHumidity();
}

// Get light value
float getBrightnessValue()
{
  return analogRead(BRIGHTNESS_PIN);
}

// Modify RGB strip color
void ws2812ShowColor(int color)
{
  for (int i = 0; i < WS2812_NUM; i++)
  {
    pixels.setPixelColor(i, color);
  }
  pixels.show();
}

// Change the strip color RGB
void ws2812ShowRGB(int r, int g, int b)
{
  for (int i = 0; i < WS2812_NUM; i++)
  {
    pixels.setPixelColor(i, pixels.Color(r, g, b));
  }
  pixels.show();
}

// Making an HTTP GET request
String weatherHTTPGet(String url)
{
  HTTPClient httpClient;
  httpClient.begin(url);
  httpClient.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1");
  httpClient.addHeader("Referer", "https://www.weather.com.cn/");
  int httpCode = httpClient.GET();
  if (httpCode == HTTP_CODE_OK)
  {
    String body = httpClient.getString();
    httpClient.end();
    return body;
  }
  Serial.println("HTTP GET ERROR");
  return "";
}

// Update weather forecast
void refreshWeater(String cityCode)
{
  String body = weatherHTTPGet("https://d1.weather.com.cn/weather_index/" + cityCode + ".html?");
  if (body != "")
  {
    int indexStart = body.indexOf("dataSK =");
    int indexEnd = body.indexOf(";var dataZS");
    String jsonDataSK = body.substring(indexStart + 8, indexEnd);
    JsonDocument doc;
    deserializeJson(doc, jsonDataSK);
    nameen = doc["nameen"].as<String>();
    wde = doc["wde"].as<String>();
    wse = doc["wse"].as<String>();
    temp = doc["temp"].as<String>();
    sd = doc["sd"].as<String>();
    weather = doc["weathere"].as<String>();
    pm25 = doc["aqi_pm25"].as<String>();
  }   
}

// Get city code
String getCityCode()
{
  String body = weatherHTTPGet("https://wgeo.weather.com.cn/ip/?_=");
  if (body != "")
  {
    int result = body.indexOf("id=");
    if (result > -1)
    {
      return body.substring(result + 4, result + 13);
    }
  }
  return "";
}

// Initializing sensors
void initSensor()
{
  dht.begin();
  pixels.begin();
  u8g2.begin();
  u8g2.setFont(u8g2_font_timR10_tf);

  ESP32PWM::allocateTimer(1);
  servo.attach(SERVO_PIN, 500, 2500);
  servo.write(SERVO_ANGLE_CLOSE);

  pinMode(HUMAN_PIN, INPUT);
  pinMode(BRIGHTNESS_PIN, INPUT);
  pinMode(TOUCH_PIN, INPUT);
  pinMode(WATER_LEVEL_PIN, INPUT);
  pinMode(WATER_PUMP_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
}

// Connect to WIFI
void connectWifi()
{
  drawStr(0, 0, "Connect to WIFI...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println(".");
    wifiConnectRetryNum++;
    if (wifiConnectRetryNum > WIFI_CONNECT_MAX_TIMEOUT)
    {
      break;
    }
  }
  if (WiFi.status() != WL_CONNECTED)
  {
    wifiConnectState = false;
  }
  else
  {
    wifiConnectState = true;
  }
  Serial.print("IP:");
  Serial.println(WiFi.localIP());
}

// Water level threshold judgment
void waterLevelLoop()
{
  if (getWaterLevelValue() < WATER_LEVEL_MAX_VALUE)
  {
    tone(BUZZER_PIN, 262);
  }
  else
  {
    noTone(BUZZER_PIN);
  }
}

// Soil moisture threshold judgment
void soilMoistureLoop()
{
  if (!cancelAutoMode)
  {
    if (getSoilMoistureValue() < SOIL_MOISTURE_LEVEL_MAX_VALUE)
    {
      setWaterPumpValue(HIGH);
    }
    else
    {
      setWaterPumpValue(LOW);
    }
  }
}

// A function that touches a button
void buttonLoop()
{
  if (!cancelAutoMode)
  {
    int buttonLevel = getButtonValue();
    if (buttonLevel)
    {
      servo.write(SERVO_ANGLE_CLOSE);
    }
    else
    {
      servo.write(SERVO_ANGLE_OPEN);
    }
  }
}

// Function of the infrared sensor of the human body
void humanLoop()
{
  if (!cancelAutoMode)
  {
    if (getHumanValue())
    {
      // Somebody
      setLedValue(HIGH);
    }
    else
    {
      // Nobody
      setLedValue(LOW);
    }
  }
}

// Function of the light sensor
void brightnessLoop()
{
  if (!cancelAutoMode)
  {
    if (getBrightnessValue() > BRIGHTNESS_MAX_VALUE)
    {
      pixels.setPixelColor(0, WS2812_COLOR);
      pixels.setPixelColor(1, WS2812_COLOR);
      pixels.setPixelColor(2, WS2812_COLOR);
      pixels.setPixelColor(3, WS2812_COLOR);
      pixels.show();
    }
    else
    {
      ws2812ShowColor(WS2812_COLOR_BLACK);
    }
  }
}

// Time add 0
String timeFormat(int data)
{
  char buffer[2];
  sprintf(buffer, "%02u", data);
  return String(buffer);
}

int convert(char *format)
{
  struct tm *timeinfo;
  char buffer[80];
  time_t converted_time = (time_t)timeClient.getEpochTime();
  timeinfo = localtime(&converted_time);
  strftime(buffer, sizeof(buffer), format, timeinfo);
  return atoi(buffer);
}

int getYear()
{
  return convert("%Y");
}

// Oled display page
void oledSensorPage()
{
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_timR10_tf);
  u8g2.setFontPosTop();
  u8g2.drawStr(0, 0, ("moisture:  " + String(getSoilMoistureValue())).c_str());
  u8g2.drawStr(0, 15, ("water:  " + String(getWaterLevelValue())).c_str());
  u8g2.drawStr(0, 30, ("hum:  " + String(dht.readHumidity())).c_str());
  u8g2.drawStr(0, 45, ("tem:  " + String(dht.readTemperature())).c_str());
  u8g2.sendBuffer();
}

// oled weather page
void oledWeatherPage()
{
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_profont29_mr);
  u8g2.drawStr(0, 0, (timeFormat(timeClient.getHours()) + ":" + timeFormat(timeClient.getMinutes())).c_str());
  u8g2.setFont(u8g2_font_6x10_tf);
  u8g2.drawStr(80, 0, nameen.c_str());
  u8g2.setFont(u8g2_font_wqy12_t_gb2312);
  u8g2.drawStr(93, 9, weekDays[timeClient.getDay()].c_str());
  u8g2.drawStr(0, 25, "Weather:");
  u8g2.drawStr(50, 25, weather.c_str());
  u8g2.drawStr(100, 25, temp.c_str());
  u8g2.drawStr(0, 38, "PM2.5 :");
  u8g2.drawStr(45, 38, pm25.c_str());
  u8g2.drawStr(66, 38, "Hum :");
  u8g2.drawStr(100, 38, sd.c_str());
  u8g2.drawStr(0, 52, "Wind :");
  u8g2.drawStr(45, 52, wde.c_str());
  u8g2.sendBuffer();
}

void handleRoot()
{
  server.send(200, "text/plain", WiFi.localIP().toString());
}

void handleConfig()
{
  JsonDocument doc;
  doc["appCallInterval"] = 1000;
  String jsonString;
  serializeJson(doc, jsonString);
  server.send(200, "text/plain", jsonString);
}

void handleAll()
{
  cancelAutoMode = true;
  wifiHeartbeatTime = secondCount;
  JsonDocument doc;
  doc["WaterLevel"] = getWaterLevelValue();
  doc["Humidity"] = getHumidityValue();
  doc["Human"] = getHumanValue();
  doc["SoilMoisture"] = getSoilMoistureValue();
  doc["Temperature"] = getTemperatureValue();
  doc["Photoresistor"] = getBrightnessValue();
  String jsonString;
  serializeJson(doc, jsonString);
  server.send(200, "text/plain", jsonString);
}

void handleDoor()
{
  cancelAutoMode = true;
  String level = server.arg("level");
  Serial.print("level:");
  Serial.println(level);
  if (level.toInt())
  {
    servo.write(SERVO_ANGLE_OPEN);
  }
  else
  {
    servo.write(SERVO_ANGLE_CLOSE);
  }
  server.send(200, "text/plain", "ok");
}

void handleLED()
{
  cancelAutoMode = true;
  String level = server.arg("level");
  Serial.print("level:");
  Serial.println(level);
  setLedValue(level.toInt());
  server.send(200, "text/plain", "ok");
}

void handleRGB()
{
  cancelAutoMode = true;
  r = server.arg("r");
  g = server.arg("g");
  b = server.arg("b");
  Serial.print("r:");
  Serial.println(r);
  Serial.print("g:");
  Serial.println(g);
  Serial.print("b:");
  Serial.println(b);
  ws2812ShowRGB(r.toInt(), g.toInt(), b.toInt());
  server.send(200, "text/plain", "ok");
}

void debug()
{
  Serial.println("IDF VERSION:" + String(ESP.getSdkVersion()));
  Serial.println("FIRMWARE VERSION:" FIRMWARE_VERSION);
}

void setup()
{
  Serial.begin(115200);
  debug();
  initSensor();
  connectWifi();

  // Determining if the network is connected
  if (wifiConnectState)
  {
    drawStr(0, 0, "Connect WIFI success");
    delay(1000);
    drawStr(0, 0, WiFi.localIP().toString().c_str());
    delay(1000);

    server.on("/", handleRoot);
    server.on("/config", handleConfig);
    server.on(ALL_SENSOR_HTTP_PATH, handleAll);
    server.on(SERVO_HTTP_PATH, handleDoor);
    server.on(LED_HTTP_PATH, handleLED);
    server.on(WS2812_HTTP_PATH, handleRGB);
    server.begin();
    timeClient.begin();
    for (int i = 0; i < 5; i++)
    {
      while (getYear() == 1970)
      {
        delay(100);
        timeClient.update();
        Serial.println("*");
      }
    }

    refreshWeater(getCityCode());
  }
  else
  {
    drawStr(0, 0, "Connect WIFI failed");
    delay(2000);
    oledSensorPage();
  }
}

unsigned long previousTime = 0;       // Stores the last time a task was executed
const unsigned long delayTime = 1000; // Delay interval in milliseconds

int pageIndex = 2; // Page index
int autoModeTime = 0;
bool switchOn = false;
void loop()
{
  soilMoistureLoop();
  buttonLoop();
  humanLoop();
  brightnessLoop();

  unsigned long currentTime = millis(); // Gets the current system run time
  if (currentTime - previousTime >= delayTime)
  {
    // The OLED page was refreshed every 5 seconds
    if (secondCount % 5 == 0)
    {
      if (wifiConnectState)
      {
        if (pageIndex == 1)
        {
          pageIndex = 2;
        }
        else if (pageIndex == 2)
        {
          pageIndex = 1;
        }
      }
    }

    if (secondCount - wifiHeartbeatTime >= 2)
    {
      // Automatic control
      switchOn = false;
    }
    else if (secondCount >= 3)
    {
      //APP control
      switchOn = true;
    }

    if (!wifiConnectState)
    {
      oledSensorPage();
    }
    if (pageIndex == 1)
    {
      oledWeatherPage();
    }
    if (pageIndex == 2)
    {
      oledSensorPage();
    }

    secondCount = secondCount + 1;
    // The water level threshold is detected at 1-second intervals
    waterLevelLoop();
    // The time is updated every 1 second
    timeClient.update();
    previousTime = currentTime; // Update the last time the task was executed

    if (cancelAutoMode)
    {
      autoModeTime++;
    }
    if (autoModeTime == 3)
    {
      if (!switchOn) // Before closing after three seconds, determine whether the data switch is open. If it is open, the APP control will continue
      {
        cancelAutoMode = false;
      }
      autoModeTime = 0;
    }
  }

  server.handleClient();
  delay(10);
}