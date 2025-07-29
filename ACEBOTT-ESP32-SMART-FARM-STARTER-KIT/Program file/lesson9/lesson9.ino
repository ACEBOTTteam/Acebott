int value=0;
int i=0;

void setup(){
  pinMode(36, INPUT);//Set the water level sensor pin to 36
  pinMode(25, OUTPUT);//Set the buzzer pin to 25
}
void loop(){
	value = analogRead(36);//Assign the value of the water level sensor to the variable value
	if (value < 1500) {//When the water level value is less than 1500, the buzzer sounds
		for(i=0;i<100;i++)//Output a frequency of sound
  		{ 
			digitalWrite(25,HIGH);//Turn on the buzzer at a high level to sound
			delay(1);//The delay is 1ms. The frequency of the sound can be changed by this delay
			digitalWrite(25,LOW);//Turn off the buzzer at low level and no sound
			delay(1);
		}
    delay(100);
	} 
	else {
		digitalWrite(25,LOW);//Otherwise, the buzzer does not sound
	}
}