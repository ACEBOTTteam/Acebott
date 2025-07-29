#include <U8g2lib.h>//Importing OLED library
#include <Wire.h>//Import Arduino's IIC library
#include <DHT.h>//Import the temperature and humidity library
U8G2_SSD1306_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE);

String light;//Defining light variables
String hum;//Defining humidity variables
String tem;//Defining temperature variables
DHT dht23(23, 11);//Defined temperature and humidity of the pin

void Page1() {//Defines the contents of the OLED display
	u8g2.setFont(u8g2_font_timR12_tf);//Setting the display font
	u8g2.setFontPosTop();//Set font position to align against top
	u8g2.setCursor(0,0);//Set font display coordinates
	u8g2.print(String("light:  ") + String(light));//Display light values
	u8g2.setCursor(0,20);//
	u8g2.print(String("hum:  ") + String(hum));//Display humidity value
	u8g2.setCursor(0,40);
	u8g2.print(String("tem:  ") + String(tem));//Displays the temperature value
}

void setup(){//Initialize the OLED display
	u8g2.setI2CAddress(0x3C*2);
	u8g2.begin();
	light = "";
	hum = "";
	tem = "";
	dht23.begin();
	u8g2.enableUTF8Print();

}
void loop(){
	pinMode(23, INPUT);
	u8g2.firstPage();
	do
	{
		Page1();//Call display function
	}while(u8g2.nextPage());
	light = analogRead(34);//Get the light value
	tem = dht23.readTemperature();//Get the temperature value
	hum = dht23.readHumidity();//Get the humidity value
	delay(1000);
}