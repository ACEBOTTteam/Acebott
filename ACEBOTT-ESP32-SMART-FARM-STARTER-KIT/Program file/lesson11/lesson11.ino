#include <ESP32Servo.h>//Import the servo library of the esp32 controller board
int value=0;
Servo myservo;//Create the servo object
int servoPin = 14;//Set the servo pin to 14
void setup(){
	pinMode(32, INPUT);//Set the touch button pin to 32
	myservo.attach(servoPin);
}
void loop(){
	value = digitalRead(32);
	if (value == 0) {
		myservo.write(0);//When the touch button is pressed, the servo Angle is 0°
		delay(1000);//Delay 1 second
} 
else {
		myservo.write(90);//Otherwise, the servo Angle is 90°
	}
}
