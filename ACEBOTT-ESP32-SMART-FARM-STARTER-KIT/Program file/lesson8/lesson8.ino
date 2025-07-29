int value=0;

void setup(){
  pinMode(35, INPUT);//The soil moisture sensor pin is set to 35
  pinMode(26, OUTPUT);//Set the relay pin to 26
  pinMode(13, OUTPUT);//Set the RGB strip pin to number 13
}

void loop(){
	digitalWrite(13,LOW);//Because the pulse of the pump rotation will affect the level change of PIN13 and make the light band abnormal, it needs to be kept low level.
  value = analogRead(35);//Set the value of the soil moisture sensor to the variable value
	if (value < 100) {
		digitalWrite(26,HIGH);//When the soil moisture value is less than 100, the relay closes the COM and NO ports and the water pump works
	}
	else {
    digitalWrite(26,LOW);//Otherwise, the relay closes the COM and NC ports and the water pump does not work

	}
}