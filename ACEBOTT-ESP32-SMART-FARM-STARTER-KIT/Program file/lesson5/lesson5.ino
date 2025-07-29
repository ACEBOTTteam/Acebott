int value=0;//Define the variable "value" to be assigned the value 0

void setup(){
	pinMode(33, INPUT);//The human body infrared sensor pin is set to 33
pinMode(25, OUTPUT);//Set the buzzer pin to number 25
}
void loop(){
	value = digitalRead(33);//Assign the value of the human infrared sensor to the variable value
	if (value == 1) { //When there is an animal approaching, the value of the human infrared sensor is 1, and the buzzer sends an alarm
		tone(25,262);
		delay(100);
		noTone(25);
		delay(100);
	} 
else {
		noTone(25);
 	}
}