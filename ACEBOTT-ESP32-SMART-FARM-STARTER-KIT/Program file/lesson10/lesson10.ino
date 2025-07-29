#include <Adafruit_NeoPixel.h>//Import the library of RGB strips

int value=0;
//The number of RGB lamp belt pin 13 and lights is initialized to be 4
Adafruit_NeoPixel rgb_display_13 = Adafruit_NeoPixel(4,13,NEO_GRB + NEO_KHZ800);
void setup(){
 rgb_display_13.begin();
}

void loop(){
 value = analogRead(34);
 if (value > 3500) {//If the light value is greater than 3500, set lights 1 and 3 red; 2, 4 light blue
  rgb_display_13.setPixelColor((1)-1,(((255 & 0xffffff) << 16) | ((0 & 0xffffff) << 8) | 0));
  rgb_display_13.setPixelColor((2)-1,(((0 & 0xffffff) << 16) | ((0 & 0xffffff) << 8) | 255));
  rgb_display_13.setPixelColor((3)-1,(((255 & 0xffffff) << 16) | ((0 & 0xffffff) << 8) | 0));
  rgb_display_13.setPixelColor((4)-1,(((0 & 0xffffff) << 16) | ((0 & 0xffffff) << 8) | 255));
  rgb_display_13.show();
 }
 else {
  rgb_display_13.setPixelColor((1)-1,(((0 & 0xffffff) << 16) | ((0 & 0xffffff) << 8) | 0));
  rgb_display_13.setPixelColor((2)-1,(((0 & 0xffffff) << 16) | ((0 & 0xffffff) << 8) | 0));
  rgb_display_13.setPixelColor((3)-1,(((0 & 0xffffff) << 16) | ((0 & 0xffffff) << 8) | 0));
  rgb_display_13.setPixelColor((4)-1,(((0 & 0xffffff) << 16) | ((0 & 0xffffff) << 8) | 0));
  rgb_display_13.show();
 }
}