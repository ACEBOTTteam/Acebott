#include <Arduino.h>
#include <string>
#include <Wire.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <U8g2lib.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <NTPClient.h>

// Version
#define FIRMWARE_VERSION "20240531"

// Set WIFI name
#define WIFI_SSID "ACEBOTT"

// Set WIFI password
#define WIFI_PASSWORD "12345678"

// Connection timeout in seconds
#define WIFI_CONNECT_MAX_TIMEOUT 5
int wifiConnectRetryNum = 0;  // WIFI connection retry count
int wifiConnectState = false; // WIFI connection status

U8G2_SSD1306_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE);

String nameen = "";                                                     // English City Name
String wde = "";                                                        // Wind direction
String wse = "";                                                        // Wind speed
String temp = "";                                                       // Temperature
String sd = "";                                                         // Humidity
String weather = "";                                                    // Weather
String pm25 = "";                                                       // PM2.5
String weekDays[7] = {"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"}; // Week enumeration

// Time UDP
WiFiUDP ntpUDP;
// Time
NTPClient timeClient(ntpUDP, "ntp1.aliyun.com", 60 * 60 * 8, 30 * 60 * 1000);

// String display on screen
void drawStr(uint8_t x, uint8_t y, String str)
{
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_timR10_tf);
  u8g2.setFontPosTop();
  u8g2.drawStr(x, y, str.c_str());
  u8g2.sendBuffer();
}


// Making an HTTP GET request
String weatherHTTPGet(String url)
{
  HTTPClient httpClient;
  httpClient.begin(url);
  httpClient.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1");
  httpClient.addHeader("Referer", "http://www.weather.com.cn/");
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
  String body = weatherHTTPGet("http://d1.weather.com.cn/weather_index/" + cityCode + ".html?");
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

// Getting the city code
String getCityCode()
{
  String body = weatherHTTPGet("http://wgeo.weather.com.cn/ip/?_=");
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

//Time add 0
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

// oled weather page
void oledWeatherPage()
{
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_profont29_mr);
  u8g2.setFontPosTop();
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

void setup()
{
  Serial.begin(115200);
  // Connect to WIFI
  connectWifi();

  u8g2.begin();
  u8g2.setFont(u8g2_font_timR10_tf);
  // Determining if the network is connected
  if (wifiConnectState)
  {
    drawStr(0, 0, "Connect WIFI success");
    delay(1000);
    drawStr(0, 0, WiFi.localIP().toString().c_str());//Display IP address
    delay(1000);
    timeClient.begin();
    for (int i = 0; i < 5; i++)
    {
      while (getYear() == 1970) // Determines if the latest time is obtained
      {
        delay(100);
        timeClient.update();
        Serial.println("*");
      }
    }

    refreshWeater(getCityCode()); // Update weather forecast
    oledWeatherPage();            // Displaying the weather page
  }
    else
  {
    drawStr(0, 0, "Connect WIFI failed");
    delay(2000);
  }
}

void loop()
{
  delay(1000*60);//60 second interval
  timeClient.update();//Refresh time
  oledWeatherPage();//Weather page display
}